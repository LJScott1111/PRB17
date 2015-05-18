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
	if (!e.source.selected && (nsBandProfile.data.showDetails !== undefined && nsBandProfile.data.showDetails !== null)) {
		console.log('MARK favorite');
		var show_id = nsBandProfile.data.showDetails._id;
		var addShow = new nsBandProfile.serverCalls.saveUserSchedule(show_id, function(response) {
			e.source.setImage(Alloy.Globals.theme.icons.star);

			var MS_PER_MINUTE = 60000;
			var startDate = (nsBandProfile.data.showDetails !== undefined && nsBandProfile.data.showDetails !== null) ? new Date((nsBandProfile.data.showDetails.start_time * 1000) - 10 * MS_PER_MINUTE) : "";
			console.log("startDate ", startDate);

			var venueName = (nsBandProfile.data.venueDetails !== undefined && nsBandProfile.data.venueDetails !== null) ? nsBandProfile.data.venueDetails.name : "";

			if (Titanium.Platform.osname !== "android") {
				var notification = Ti.App.iOS.scheduleLocalNotification({
					alertBody : nsBandProfile.data.bandDetails.name + "\n" + venueName + "\n" + startDate,
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
			} else {
				// android_notifications

				// Create an intent using the JavaScript service file
				var intent = Ti.Android.createServiceIntent({
					url : 'android_notifications.js'
				});
				// Set the interval to run the service; 
				intent.putExtra('interval', 1000);
				// Send extra data to the service;
				intent.putExtra('timestamp', startDate);
				
				intent.putExtra('band', nsBandProfile.data.bandDetails.name);
				intent.putExtra('message', venueName + "\n" + startDate);
				
				// Start the service
				Ti.Android.startService(intent);
			}

		}, function(error) {
			alert(L('err_serviceError'));
		});
	}

	e.source.selected = !e.source.selected;
};

nsBandProfile.doSocialActivity = function(e) {
	console.debug(e.source.id);
	if (e.source.id === "vwSoundCloud") {
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
	console.log('INIT Band Profile');
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

	$.ivFavouriteStar.setImage(Alloy.Globals.theme.icons.star_off);

	if (nsBandProfile.data !== null && nsBandProfile.data !== undefined) {
		var datetime = (nsBandProfile.data.showDetails !== null && nsBandProfile.data.showDetails !== undefined) ? Alloy.Globals.getFormattedDate(nsBandProfile.data.showDetails.start_time) : "";

		$.lblBandName.setText(nsBandProfile.data.bandDetails.name || "");
		$.ivBandImage.setImage(nsBandProfile.data.bandDetails.image_link || "");
		$.lblDay.setText(datetime[0] || "");
		$.lblTime.setText(datetime[1] || "");
		$.lblVenue.setText((nsBandProfile.data.venueDetails !== undefined && nsBandProfile.data.venueDetails !== null) ? nsBandProfile.data.venueDetails.name : "");
		$.lblMoreInfo.setText(nsBandProfile.data.bandDetails.description || "");
	}

	if (Titanium.Platform.osname === "android") {
		$.svMain.setHeight(Titanium.UI.SIZE);
	} else {
		$.svMain.setHeight(Alloy.Globals.platformHeight);
	}
};

nsBandProfile.init();

