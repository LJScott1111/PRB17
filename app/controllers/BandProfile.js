var nsBandProfile = {};

nsBandProfile.args = arguments[0];
nsBandProfile.data = null;

nsBandProfile.serverCalls = require('serverCalls');

nsBandProfile.closeWindow = function() {
	Alloy.Globals.windowStack.pop();
	$.winBandProfile.close();
};

nsBandProfile.getSettings = function() {
};

nsBandProfile.markFavourite = function(e) {
	if (!e.source.selected) {

		var show_id = nsBandProfile.data.showDetails._id;
		var addShow = new nsBandProfile.serverCalls.saveUserSchedule(show_id, function(response) {
			e.source.setImage(Alloy.Globals.theme.icons.star);
		}, function(error) {
			alert("Some error occured");
		});
	}

	e.source.selected = !e.source.selected;
};

nsBandProfile.doSocialActivity = function(e) {
	console.debug(e.source.id);
	if (e.source.id === "vwSoundCloud") {
		Titanium.Platform.openURL(nsBandProfile.data.bandDetails.audio_link);
	} else if (e.source.id === "vwYouTube") {
		Titanium.Platform.openURL(nsBandProfile.data.bandDetails.video_link);
	} else if (e.source.id === "vwWebsite") {
		Titanium.Platform.openURL(nsBandProfile.data.bandDetails.site_link);
	} else if (e.source.id === "vwFacebook") {
		Titanium.Platform.openURL(nsBandProfile.data.bandDetails.fb_link);
	} else if (e.source.id === "vwTwitter") {
		Titanium.Platform.openURL(nsBandProfile.data.bandDetails.tw_link);
	}
};

nsBandProfile.init = function() {
	Alloy.Globals.windowStack.push($.winBandProfile);
	
	var appdata = Titanium.App.Properties.getObject('appdata', {});
	for (var i = 0,
	    len = appdata.details.length; i < len; i++) {

		if (appdata.details[i].bandDetails._id === nsBandProfile.args.id) {
			nsBandProfile.data = JSON.parse(JSON.stringify(appdata.details[i]));
			break;
		}
	}

	console.debug("BandProfile id ", JSON.stringify(nsBandProfile.args));
	console.debug("BandProfile data ", JSON.stringify(nsBandProfile.data));

	$.winBandProfile.addEventListener('android:back', function(e) {
		console.debug("Pressing Back Will Not Close The Activity/Window");
		nsBandProfile.closeWindow();
	});

	$.ivBandImage.setHeight(Alloy.Globals.platformHeight * 0.30);

	var datetime = Alloy.Globals.getFormattedDate(nsBandProfile.data.showDetails.start_time);

	// $.ivFavouriteStar.selected = false;
	// TODO: hard coded - need a response from service
	// if (!$.ivFavouriteStar.selected) {
	$.ivFavouriteStar.setImage(Alloy.Globals.theme.icons.star_off);
	// } else {
	// $.ivFavouriteStar.setImage(Alloy.Globals.theme.icons.star);
	// }

	$.lblBandName.setText(nsBandProfile.data.bandDetails.name);
	$.ivBandImage.setImage(nsBandProfile.data.bandDetails.image_link);
	$.lblDay.setText(datetime[0]);
	$.lblTime.setText(datetime[1]);
	$.lblVenue.setText(nsBandProfile.data.venueDetails.name);
	$.lblMoreInfo.setText(nsBandProfile.data.bandDetails.description);

	if (Titanium.Platform.osname === "android") {
		$.svMain.setHeight(Titanium.UI.SIZE);
	} else {
		$.svMain.setHeight(Alloy.Globals.platformHeight - Alloy.Globals.theme.sizes.headerbar);
	}
};

nsBandProfile.init();

