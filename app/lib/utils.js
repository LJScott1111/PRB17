
exports.networkCheck = function(callback) {

	if (!Ti.Network.online) {

		var dialog = Ti.UI.createAlertDialog({
			cancel : 1,
			buttonNames : ['Review Settings', 'Cancel'],
			message : 'No internet connection. Please review your data settings.',
			title : L('appName')
		});
		dialog.addEventListener('click', function(e) {

			if (e.index === 0) {

				if (OS_ANDROID) {
					var intent = Ti.Android.createIntent({
						action : "android.settings.SETTINGS"
					});
					Ti.Android.currentActivity.startActivity(intent);

					Titanium.App.fireEvent('closeApp');
				} else {
					var settingsURL = Ti.App.iOS.applicationOpenSettingsURL;
					if (Ti.Platform.canOpenURL(settingsURL)) {

						Ti.Platform.openURL(settingsURL);
						Titanium.API.fireEvent('closeApp');
					}

				}

			} else {

				Titanium.App.fireEvent('closeApp');
			}
		});
		dialog.show();
	} else {

		if (callback) {
			callback(true);
		};
	}
};

// Location check
var locationEnableCheck = function(callback) {

	// Check if enabled and if not send user to the GPS settings
	if (!Ti.Geolocation.locationServicesEnabled) {

		console.log('Location services are not enabled.');

		var confirm = Titanium.UI.createAlertDialog({
			title : L("appName"),
			message : L("enableLocation_err"),
			buttonNames : ['OK', 'Cancel']
		});

		confirm.show();

		confirm.addEventListener('click', function(e) {
			console.debug(JSON.stringify(e));
			if (e.index === 0) {
				confirm.hide();
				if (OS_ANDROID) {

					var settingsIntent = Titanium.Android.createIntent({
						action : 'android.settings.LOCATION_SOURCE_SETTINGS'
					});
					Ti.Android.currentActivity.startActivity(settingsIntent);
					Titanium.App.fireEvent('closeApp');
				} else {

					var settingsURL = Ti.App.iOS.applicationOpenSettingsURL;
					if (Ti.Platform.canOpenURL(settingsURL)) {
						Ti.Platform.openURL(settingsURL);
						Titanium.App.fireEvent('closeApp');
					}
				}
			} else {
				Titanium.App.fireEvent('closeApp');
			}
		});
	} else {

		console.log('Location services are enabled.');
		if (callback) {
			callback(true);
		};
	}
};

exports.locationEnableCheck = locationEnableCheck;

// Get User location
exports.getLocation = function getLocation(callback) {

	console.log('GET LOCATION CALLED ');
	Titanium.Geolocation.distanceFilter = 10;
	//Check if Geolocation is enabled
	locationEnableCheck(function() {

		if (OS_ANDROID) {

			Titanium.Geolocation.purpose = "Find location of device.";
			Titanium.Geolocation.manualMode = true;
			Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;

			var gpsProvider = Titanium.Geolocation.Android.createLocationProvider({
				name : Titanium.Geolocation.PROVIDER_NETWORK || Titanium.Geolocation.PROVIDER_GPS,
				minUpdateTime : 60,
				minUpdateDistance : 100
			});
			Titanium.Geolocation.Android.addLocationProvider(gpsProvider);

			var gpsRule = Titanium.Geolocation.Android.createLocationRule({
				provider : Titanium.Geolocation.PROVIDER_GPS || Titanium.Geolocation.PROVIDER_NETWORK,
				// Updates should be accurate to 100m
				accuracy : 100,
				// Updates should be no older than 5m
				maxAge : 300000,
				// But  no more frequent than once per 10 seconds
				minAge : 10000
			});
			Titanium.Geolocation.Android.addLocationRule(gpsRule);

		} else {

			Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;

			Titanium.Geolocation.preferredProvider = Titanium.Geolocation.PROVIDER_GPS;
			var authCode = Titanium.Geolocation.locationServicesAuthorization;

			console.debug("authCode ", authCode);

			if (authCode === 0 || authCode === "AUTHORIZATION_DENIED" || authCode === "AUTHORIZATION_RESTRICTED") {

				// Not authorized
				console.debug('NOT AUTHORIZED :(');
				var confirm = Titanium.UI.createAlertDialog({
					title : L("appName"),
					message : L("userDisabledLocation_err"),
					buttonNames : ['OK']
				});

				confirm.show();

				confirm.addEventListener('click', function(e) {
					console.debug(JSON.stringify(e));
					if (e.index === 0) {
						confirm.hide();
					}
				});
			} else {
				console.debug(' AUTHORIZED, authCode = ', authCode);
				auth = true;
			}
		}
		Titanium.Geolocation.getCurrentPosition(function(e) {
			// if (OS_ANDROID) {
				// Alloy.CFG.isSimulator = false;
			// };
			if (Alloy.CFG.isSimulator) {
				e = {
					coords : {
						"latitude" : 12.9191277,
						"longitude" : 77.5914538
					}
				};
				callback(e.coords);
			} else if (e.error) {
				Ti.API.info("Alloy.Globals.getCurrentLocation(): Error in getting current position. - ", e.error);
				var confirm = Titanium.UI.createAlertDialog({
					title : L("appName"),
					message : L("locationData_err"),
					buttonNames : ['OK']
				});

				confirm.show();

				confirm.addEventListener('click', function(e) {
					console.debug(JSON.stringify(e));
					if (e.index === 0) {
						confirm.hide();
						Titanium.App.fireEvent('closeApp');
					}
				});
			} else {
				Ti.API.info("Alloy.Globals.getCurrentLocation(): Success in reading current position - [" + e.coords.latitude + ", " + e.coords.longitude + "].");
				console.log('GPS RESULTS ', JSON.stringify(e));

				if (e.coords.latitude && e.coords.longitude) {
					callback(e.coords);
				} else {

					var confirm = Titanium.UI.createAlertDialog({
						title : L("appName"),
						message : L("locationData_err"),
						buttonNames : ['OK']
					});

					confirm.show();

					confirm.addEventListener('click', function(e) {
						console.debug(JSON.stringify(e));
						if (e.index === 0) {
							getLocation(callback);
						}
					});

				}
			}
		});
	});
};

exports.locationEnableCheck = locationEnableCheck;
