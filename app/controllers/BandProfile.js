var nsBandProfile = {};

nsBandProfile.args = arguments[0];
nsBandProfile.data = null;

nsBandProfile.serverCalls = require('serverCalls');

nsBandProfile.markFavourite = function(e) {
	var show_id = nsBandProfile.data.showDetails._id;
	if (!e.source.selected && (nsBandProfile.data.showDetails !== undefined && nsBandProfile.data.showDetails !== null)) {
		console.log('MARK favorite');
		
		var addShow = new nsBandProfile.serverCalls.saveUserSchedule(show_id, function(response) {
			e.source.selected = !e.source.selected;
			e.source.setImage(Alloy.Globals.theme.icons.star);

			var MS_PER_MINUTE = 60000;
			var startDate = (nsBandProfile.data.showDetails !== undefined && nsBandProfile.data.showDetails !== null) ? Alloy.Globals.getFormattedDate((nsBandProfile.data.showDetails.start_time) - 10 * 60) : "";
			var venueName = (nsBandProfile.data.venueDetails !== undefined && nsBandProfile.data.venueDetails !== null) ? nsBandProfile.data.venueDetails.name : "";
			var notificationTime = (nsBandProfile.data.showDetails !== undefined && nsBandProfile.data.showDetails !== null) ? new Date((nsBandProfile.data.showDetails.start_time * 1000) - 10 * MS_PER_MINUTE) : "";

			if (Titanium.Platform.osname !== "android") {
				var notification = Ti.App.iOS.scheduleLocalNotification({
					alertBody : nsBandProfile.data.bandDetails.name + "\n" + venueName + "\n" + startDate[1],
					badge : 1,
					date : notificationTime
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
			} else {
				// android_notifications

				// Create an intent using the JavaScript service file
				var intent = Ti.Android.createServiceIntent({
					url : 'android_notifications.js'
				});
				// Set the interval to run the service;
				intent.putExtra('interval', 1000);
				// Send extra data to the service;
				intent.putExtra('timestamp', notificationTime);

				intent.putExtra('band', nsBandProfile.data.bandDetails.name);
				intent.putExtra('message', venueName + "\n" + startDate[1]);

				// Start the service
				Ti.Android.startService(intent);
			}

		}, function(error) {
			alert(L('err_serviceError'));
		});
	} else {
		nsBandProfile.serverCalls.deleteUserSchedule(show_id, function() {

			e.source.setImage(Alloy.Globals.theme.icons.star_off);
			e.source.selected = !e.source.selected;
		});
	}

	
};

nsBandProfile.doSocialActivity = function(e) {
	console.debug(e.source.id);
	if (e.source.id === "ivSoundCloud") {

		Alloy.Globals.openWindow("GenericWebView", {
			url : nsBandProfile.data.bandDetails.audio_link
		}, true, null, 'misc/center_logo');

	} else if (e.source.id === "ivYouTube") {

		Alloy.Globals.openWindow("GenericWebView", {
			url : nsBandProfile.data.bandDetails.video_link
		}, true, null, 'misc/center_logo');

	} else if (e.source.id === "ivWebsite") {

		Alloy.Globals.openWindow("GenericWebView", {
			url : nsBandProfile.data.bandDetails.site_link
		}, true, null, 'misc/center_logo');

	} else if (e.source.id === "ivFacebook") {

		Alloy.Globals.openWindow("GenericWebView", {
			url : nsBandProfile.data.bandDetails.fb_link
		}, true, null, 'misc/center_logo');

	} else if (e.source.id === "ivTwitter") {

		Alloy.Globals.openWindow("GenericWebView", {
			url : nsBandProfile.data.bandDetails.tw_link
		}, true, null, 'misc/center_logo');

	}
};

nsBandProfile.init = function() {
	console.log('INIT Band Profile');

	var appdata = Titanium.App.Properties.getObject('appdata', {});
	for (var i = 0,
	    len = appdata.details.length; i < len; i++) {

		if (appdata.details[i].bandDetails !== undefined && (appdata.details[i].bandDetails._id === nsBandProfile.args.id)) {
			nsBandProfile.data = JSON.parse(JSON.stringify(appdata.details[i]));
			break;
		}
	}

	console.debug("BandProfile id ", JSON.stringify(nsBandProfile.args));
	console.debug("BandProfile data ", JSON.stringify(nsBandProfile.data));

	$.ivBandImage.setHeight(Alloy.Globals.platformHeight * 0.30);
	console.log('showDetails:' + JSON.stringify(nsBandProfile.data));

	if (nsBandProfile.data === null || nsBandProfile.data === undefined) {
		nsBandProfile.data = {};
		for (var i = 0,
		    len = appdata.bands.length; i < len; i++) {
			if (appdata.bands[i]._id === nsBandProfile.args.id) {
				nsBandProfile.data.bandDetails = JSON.parse(JSON.stringify(appdata.bands[i]));
				break;
			}
		}
	}

	console.log('bandprodata:' + JSON.stringify(nsBandProfile.data));

	var userSchedule = Ti.App.Properties.getObject('userSchedule');
	for (var i in userSchedule) {
		if (userSchedule[i].band_id == nsBandProfile.data.bandDetails._id) {
			$.ivFavouriteStar.setImage(Alloy.Globals.theme.icons.star);
			$.ivFavouriteStar.selected = true;
			break;
		}
	}

	if (nsBandProfile.data !== null && nsBandProfile.data !== undefined) {
		var datetime = (nsBandProfile.data.showDetails !== null && nsBandProfile.data.showDetails !== undefined) ? Alloy.Globals.getFormattedDate(nsBandProfile.data.showDetails.start_time) : "";

		$.lblBandName.setText(nsBandProfile.data.bandDetails.name || "");
		// Here we clean up the incoming band image_url data, and set a placeholder image if it is not set.
		var band_image_url = 
		$.ivBandImage.setImage(nsBandProfile.data.bandDetails.image_link.replace(/(\r\n|\n|\r)/gm,"") || "http://cdn.shopify.com/s/files/1/0809/7981/t/9/assets/logo.png?675478883972280314");
		$.lblDay.setText(datetime[0] || "");
		$.lblTime.setText(datetime[1] || "");
		$.lblVenue.setText((nsBandProfile.data.venueDetails !== undefined && nsBandProfile.data.venueDetails !== null) ? nsBandProfile.data.venueDetails.name : "");
		$.lblMoreInfo.setText(nsBandProfile.data.bandDetails.description || "");
	}

	$.svMain.setHeight(Alloy.Globals.platformHeight - Alloy.Globals.theme.sizes.headerbar - 1.6 * Alloy.Globals.theme.sizes.landingOptionHeight);
};

nsBandProfile.init();

