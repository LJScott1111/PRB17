var nsBandProfile = {};

nsBandProfile.args = arguments[0];
nsBandProfile.data = null;

nsBandProfile.serverCalls = require('serverCalls');

nsBandProfile.closeWindow = function() {
	Alloy.Globals.windowStack.pop();
	$.winBandProfile.close();
};

nsBandProfile.getSettings = function() {
	Alloy.Globals.getSettings($.winBandProfile);
};

nsBandProfile.markFavourite = function(e) {
	if (!e.source.selected) {

		var show_id = nsBandProfile.data.showDetails._id;
		var addShow = new nsBandProfile.serverCalls.saveUserSchedule(show_id, function(response) {
			e.source.setImage(Alloy.Globals.theme.icons.star);

			if (Titanium.App.Properties !== "android") {
				var MS_PER_MINUTE = 60000;
				var startDate = new Date((nsBandProfile.data.showDetails.start_time * 1000) - 10 * MS_PER_MINUTE);
				console.log("startDate ", startDate);

				var notification = Ti.App.iOS.scheduleLocalNotification({
					alertBody : "Your show is in next 10 minutes.",
					badge : 1,
					date : startDate,
				});

				Ti.App.iOS.addEventListener('notification', function(e) {

					Ti.API.info('background event received = ' + notification);

					// Reset the badge value
					if (e.badge > 0) {
						Ti.App.iOS.scheduleLocalNotification({
							date : new Date(new Date().getTime()),
							badge : -1
						});
					}
				});
			}

		}, function(error) {
			alert("Some error occured");
		});
	}

	e.source.selected = !e.source.selected;
};

nsBandProfile.doSocialActivity = function(e) {
	console.debug(e.source.id);
	if (e.source.id === "vwSoundCloud") {
		// Titanium.Platform.openURL(nsBandProfile.data.bandDetails.audio_link);
		if (Titanium.Platform.osname === "android") {
			Alloy.createController("GenericWebView", {
				url : nsBandProfile.data.bandDetails.audio_link
			}).getView().open();
		} else {
			Alloy.Globals.navWin.openWindow(Alloy.createController("GenericWebView", {
				url : nsBandProfile.data.bandDetails.audio_link
			}).getView());
		}

	} else if (e.source.id === "vwYouTube") {
		// Titanium.Platform.openURL(nsBandProfile.data.bandDetails.video_link);
		if (Titanium.Platform.osname === "android") {
			Alloy.createController("GenericWebView", {
				url : nsBandProfile.data.bandDetails.video_link
			}).getView().open();
		} else {
			Alloy.Globals.navWin.openWindow(Alloy.createController("GenericWebView", {
				url : nsBandProfile.data.bandDetails.video_link
			}).getView());
		}

	} else if (e.source.id === "vwWebsite") {
		// Titanium.Platform.openURL(nsBandProfile.data.bandDetails.site_link);
		if (Titanium.Platform.osname === "android") {
			Alloy.createController("GenericWebView", {
				url : nsBandProfile.data.bandDetails.site_link
			}).getView().open();
		} else {
			Alloy.Globals.navWin.openWindow(Alloy.createController("GenericWebView", {
				url : nsBandProfile.data.bandDetails.site_link
			}).getView());
		}

	} else if (e.source.id === "vwFacebook") {
		// Titanium.Platform.openURL(nsBandProfile.data.bandDetails.fb_link);
		if (Titanium.Platform.osname === "android") {
			Alloy.createController("GenericWebView", {
				url : nsBandProfile.data.bandDetails.fb_link
			}).getView().open();
		} else {
			Alloy.Globals.navWin.openWindow(Alloy.createController("GenericWebView", {
				url : nsBandProfile.data.bandDetails.fb_link
			}).getView());
		}

	} else if (e.source.id === "vwTwitter") {
		// Titanium.Platform.openURL(nsBandProfile.data.bandDetails.tw_link);
		if (Titanium.Platform.osname === "android") {
			Alloy.createController("GenericWebView", {
				url : nsBandProfile.data.bandDetails.tw_link
			}).getView().open();
		} else {
			Alloy.Globals.navWin.openWindow(Alloy.createController("GenericWebView", {
				url : nsBandProfile.data.bandDetails.tw_link
			}).getView());
		}
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
		$.svMain.setHeight(Alloy.Globals.platformHeight);
	}
};

nsBandProfile.init();

