// Namespace
var nsLanding = {};

Alloy.Globals.navWin = $.navWin;
nsLanding.serviceCalls = require("serverCalls");

nsLanding.get_next_show = function() {

	console.log('Alloy.Globals.EVENTS ', JSON.stringify(Alloy.Globals.EVENTS));
	var today = Date.now();
	// var today = new Date('2016-05-27T00:00:00').getTime(); // to remove later - it is for testing different scenarios 
	var location = '';

	console.log('TODAY ', today);

	for (i in Alloy.Globals.EVENTS) {

		if (today <= Alloy.Globals.EVENTS[i].start || today <= Alloy.Globals.EVENTS[i].end) {

			console.log('IF - ', Alloy.Globals.EVENTS[i].city);
			location = Alloy.Globals.EVENTS[i].city;
			break;
		}

		if (location == '') {
			location = Alloy.Globals.EVENTS[2].city;
		};
	}

	console.log('LOCATION - ', location);

	// console.log('CURRENT PAGE ', Alloy.Globals.pageflow.getCurrentPage());

	Alloy.Globals.pageflow.getCurrentPage().setNavTitle(L(location).toUpperCase(), {
		color : '#F3CB87',
		font : {
			fontSize : Alloy.Globals.theme.fonts.size15Fonts,
			fontFamily : "KnowYourProduct"
		},
		width : Titanium.UI.SIZE
	});

	Alloy.Globals.nextEventCity = location;
	$.args.city = location;

	console.error('NEXT SHOW ', location);
	Titanium.App.removeEventListener('get_next_show', nsLanding.get_next_show);
};

// Titanium.App.addEventListener('get_next_show', nsLanding.get_next_show);

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
		Alloy.Globals.loading.show();
		var hasData = Alloy.Globals.getAndStoreData(function(fetchedData) {
			console.debug("fetchedData ", fetchedData);
			if (fetchedData) {

				Alloy.Globals.openWindow('BandList', {
					city : $.args.city
				}, true);
				Alloy.Globals.loading.hide();
			} else {
				console.debug("All data did not get downloaded!!!");
				alert(L('err_fetchingDetails'));
			}
			Alloy.Globals.loading.hide();
		});

	} else {
		console.log('Opening bands');
		Alloy.Globals.openWindow('BandList', {
			city : $.args.city
		}, true);
	}
};

nsLanding.getEvents = function() {

	Alloy.Globals.openWindow('Events', {
		secondary : $.args.secondary
	}, true);
};

nsLanding.getSchedule = function() {

	Alloy.Globals.loading.show();
	var appdata = Titanium.App.Properties.getObject('appdata', {});

	if (appdata.details.length === 0) {
		var hasData = Alloy.Globals.getAndStoreData(function(fetchedData) {
			console.debug("fetchedData ", fetchedData);
			if (fetchedData) {

				var getUserSchedule = new nsLanding.serviceCalls.getUserSchedule(function(schedule) {

					console.debug(JSON.stringify(schedule));

					Alloy.Globals.openWindow('UserSchedule', schedule, true);

					Alloy.Globals.loading.hide();

				}, function(error) {
					alert(L('err_fetchingDetails'));
					Alloy.Globals.loading.hide();
				});

			} else {
				console.debug("All data did not get downloaded!!!");
				alert(L('err_fetchingDetails'));
				Alloy.Globals.loading.hide();
			}
		});
	} else {
		var getUserSchedule = new nsLanding.serviceCalls.getUserSchedule(function(schedule) {

			console.debug(JSON.stringify(schedule));
			Alloy.Globals.openWindow('UserSchedule', schedule, true);
			Alloy.Globals.loading.hide();

		}, function(error) {
			alert(L('err_fetchingDetails'));
			Alloy.Globals.loading.hide();
		});
	}

};

nsLanding.getVenues = function() {
	var appdata = Titanium.App.Properties.getObject('appdata', {});

	if (appdata.details.length === 0) {
		Alloy.Globals.loading.show();
		var hasData = Alloy.Globals.getAndStoreData(function(fetchedData) {
			console.debug("fetchedData ", fetchedData);
			if (fetchedData) {

				Alloy.Globals.openWindow('VenueList', {
					city : $.args.city
				}, true);

				Alloy.Globals.loading.hide();
			} else {
				console.debug("All data did not get downloaded!!!");
				alert(L('err_fetchingDetails'));
			}
			Alloy.Globals.loading.hide();
		});
	} else {
		Alloy.Globals.openWindow('VenueList', {
			city : $.args.city
		}, true);
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

nsLanding.checkLocationPermissions = function() {

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

	if (!$.args.city) {
		Titanium.App.addEventListener('get_next_show', nsLanding.get_next_show);
	} else {
		return;
	}

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
