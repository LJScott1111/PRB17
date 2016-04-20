// Namespace
var nsLanding = {};

Alloy.Globals.navWin = $.navWin;
nsLanding.serviceCalls = require("serverCalls");

// nsLanding.activityControl = require("activityControl"); : TODO Loading View
// nsLanding.controller = null;

nsLanding.getSettings = function() {
	// Alloy.Globals.getSettings($.winLanding); TODO: remove later
};

nsLanding.getMenu = function() {
	console.log('getMenu');
	Titanium.App.fireEvent('toggleMenu');
};

nsLanding.getBands = function() {

	var appdata = Titanium.App.Properties.getObject('appdata', {});

	console.debug("Alloy.Globals.bands emply ", JSON.stringify(appdata.bands));

	if (appdata.details.length === 0) {
		// $.winLanding.add(nsLanding.controller);
		var hasData = Alloy.Globals.getAndStoreData(function(fetchedData) {
			console.debug("fetchedData ", fetchedData);
			if (fetchedData) {

				Alloy.Globals.openWindow('BandList', {}, true);
				// $.winLanding.remove(nsLanding.controller); : TODO Loading View
			} else {
				console.debug("All data did not get downloaded!!!");
				alert(L('err_fetchingDetails'));
			}
			// $.winLanding.remove(nsLanding.controller);
		});

	} else {
		console.log('Opening bands');
		Alloy.Globals.openWindow('BandList', {}, true);
	}
};

nsLanding.getEvents = function() {

	Alloy.Globals.openWindow('Events', {}, true);
};

nsLanding.getSchedule = function() {

	// $.winLanding.add(nsLanding.controller);
	var appdata = Titanium.App.Properties.getObject('appdata', {});

	if (appdata.details.length === 0) {
		var hasData = Alloy.Globals.getAndStoreData(function(fetchedData) {
			console.debug("fetchedData ", fetchedData);
			if (fetchedData) {

				var getUserSchedule = new nsLanding.serviceCalls.getUserSchedule(function(schedule) {

					console.debug(JSON.stringify(schedule));

					Alloy.Globals.openWindow('UserSchedule', schedule, true);

					// $.winLanding.remove(nsLanding.controller);

				}, function(error) {
					alert(L('err_fetchingDetails'));
					// $.winLanding.remove(nsLanding.controller);
				});

			} else {
				console.debug("All data did not get downloaded!!!");
				alert(L('err_fetchingDetails'));
				// $.winLanding.remove(nsLanding.controller);
			}
		});
	} else {
		var getUserSchedule = new nsLanding.serviceCalls.getUserSchedule(function(schedule) {

			console.debug(JSON.stringify(schedule));
			Alloy.Globals.openWindow('UserSchedule', schedule, true);
			// $.winLanding.remove(nsLanding.controller);

		}, function(error) {
			alert(L('err_fetchingDetails'));
			// $.winLanding.remove(nsLanding.controller);
		});
	}

};

nsLanding.getVenues = function() {
	var appdata = Titanium.App.Properties.getObject('appdata', {});

	if (appdata.details.length === 0) {
		// $.winLanding.add(nsLanding.controller);
		var hasData = Alloy.Globals.getAndStoreData(function(fetchedData) {
			console.debug("fetchedData ", fetchedData);
			if (fetchedData) {

				Alloy.Globals.openWindow('VenueList', {}, true);

				// $.winLanding.remove(nsLanding.controller);
			} else {
				console.debug("All data did not get downloaded!!!");
				alert(L('err_fetchingDetails'));
			}
			// $.winLanding.remove(nsLanding.controller);
		});
	} else {
		Alloy.Globals.openWindow('VenueList', {}, true);
	}
};

nsLanding.getFood = function() {

	Alloy.Globals.openWindow('GenericWebView', {
		url : "https://punkrockbowling.com/food-vendors/"
	}, true);
};

nsLanding.getNews = function() {

	Alloy.Globals.openWindow('GenericWebView', {
		url : "/twitter.html"
	}, true);
};

nsLanding.checkLocationPermissions = function() {// TODO: failing, check again

	var utils = require('utils');

	utils.networkCheck(function() {

		utils.locationEnableCheck(function() {

			utils.getLocation(function(coords) {

				console.log('Locations - ', coords);
			});
			Titanium.App.removeEventListener('checkLocationPermissions', nsLanding.checkLocationPermissions);
		});
	});
};

Titanium.App.addEventListener('checkLocationPermissions', nsLanding.checkLocationPermissions);

nsLanding.init = function() {

	// nsLanding.controller = new nsLanding.activityControl($.vwMain);

	Alloy.Globals.checkUser(function(user) {
		console.debug("Alloy.Globals.checkUser user - " + user);

		if (!user) {
			var signupWindow = Alloy.createController("signup").getView();
			if (OS_ANDROID) {
				signupWindow.fbProxy = Alloy.Globals.Facebook.createActivityWorker({
					lifecycleContainer : signupWindow
				});
			}
			signupWindow.open();
		} else {
			// Titanium.App.fireEvent('checkLocationPermissions'); TODO: failing, check again
		}
	}, function(error) {
		console.debug("Alloy.Globals.checkUser - error - " - error);

		var signupWindow = Alloy.createController("signup").getView();
		if (OS_ANDROID) {
			signupWindow.fbProxy = Alloy.Globals.Facebook.createActivityWorker({
				lifecycleContainer : signupWindow
			});
		}
		signupWindow.open();

	});

};

nsLanding.init();
