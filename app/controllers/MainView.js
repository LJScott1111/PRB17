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

	$.title.text = L(location).toUpperCase();

	Alloy.Globals.nextEventCity = location;
	$.args.city = location;

	if (Alloy.Globals.nextEventCity == 'asburypark') {
		// Hide menus from menu screen
		Titanium.App.fireEvent('hideOptions');
	}

	console.error('NEXT SHOW ', location);
	Titanium.App.removeEventListener('get_next_show', nsLanding.get_next_show);
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
				}, true, null, 'misc/center_logo');
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
		}, true, null, 'misc/center_logo');
	}
};

nsLanding.openLineup = function() {

	var appdata = Titanium.App.Properties.getObject('appdata', {});
	for (i in appdata.venues) {
		if (appdata.venues[i].name.toLowerCase().trim() === 'festival lineup') {

			Alloy.Globals.openWindow("VenueProfile", {
				"id" : appdata.venues[i]._id
			}, true, null, 'misc/center_logo');
			break;
		}
	}
};

nsLanding.getLineup = function() {
	var appdata = Titanium.App.Properties.getObject('appdata', {});

	if (appdata.venues) {

		nsLanding.openLineup();
	} else {
		Alloy.Globals.getAndStoreData(function(data) {
			nsLanding.openLineup();
		});
	}
};

nsLanding.getClubShows = function() {
	Alloy.Globals.openWindow('GenericWebView', {
		url : "http://punkrockbowling.com/collections/prb-asbury-park-club-shows",
		image : "/icons/Banner_Pins.jpg",
		banner_url : "http://www.sourpussclothing.com/housewares/patches-pins.html"
	}, true, null, 'misc/center_logo');
};

nsLanding.getEvents = function() {

	Alloy.Globals.openWindow('Events', {
		secondary : $.args.secondary,
		city : $.args.city
	}, true, null, 'misc/center_logo');
};

nsLanding.getSchedule = function() {

	console.error('nsEvents.getSchedule');
	Alloy.Globals.loading.show();
	var appdata = Titanium.App.Properties.getObject('appdata', {});

	if (appdata.details.length === 0) {
		var hasData = Alloy.Globals.getAndStoreData(function(fetchedData) {
			console.debug("fetchedData ", fetchedData);
			if (fetchedData) {

				var getUserSchedule = new nsLanding.serviceCalls.getUserSchedule(function(schedule) {

					console.debug(JSON.stringify(schedule));

					Alloy.Globals.openWindow('UserSchedule', schedule, true, null, 'misc/right_logo');

					Alloy.Globals.loading.hide();

				}, function(error) {
					alert(L('err_fetchingDetails'));
					Alloy.Globals.loading.hide();
				});

			} else {
				console.debug("The data did not get downloaded!!!");
				alert(L('err_fetchingDetails'));
				Alloy.Globals.loading.hide();
			}
		});
	} else {
		var getUserSchedule = new nsLanding.serviceCalls.getUserSchedule(function(schedule) {

			console.debug(JSON.stringify(schedule));
			// Alloy.Globals.openWindow('UserSchedule', schedule, true, null, 'misc/center_logo');
			Alloy.Globals.openWindow('Schedule', {
				city : $.args.city,
				schedule : schedule
			}, true, null, 'misc/center_logo', 'misc/right_logo_grid');
			Alloy.Globals.loading.hide();

		}, function(error) {
			alert(L('err_fetchingDetails'));
			Alloy.Globals.loading.hide();
		});
	}

};

nsLanding.buyTickets = function() {
	Alloy.Globals.openWindow('GenericWebView', {
		url : "https://punkrockbowling.queueapp.com/events/17187"
	}, true, null, 'misc/center_logo');
};

nsLanding.getVenues = function() {

	/*
	 var appdata = Titanium.App.Properties.getObject('appdata', {});

	 if (appdata.details.length === 0) {
	 Alloy.Globals.loading.show();
	 var hasData = Alloy.Globals.getAndStoreData(function(fetchedData) {
	 console.debug("fetchedData ", fetchedData);
	 if (fetchedData) {

	 Alloy.Globals.openWindow('VenueList', {
	 city : $.args.city
	 }, true, null, 'misc/center_logo');

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
	 }, true, null, 'misc/center_logo');
	 }*/

};

nsLanding.getFood = function() {

	Alloy.Globals.openWindow('GenericWebView', {
		url : "http://punkrockbowling.com/pages/food-and-vendors",
		image : "/icons/Banner_Flasks.jpg",
		banner_url : "http://www.sourpussclothing.com/catalogsearch/result/?q=flask"
	}, true, null, 'misc/center_logo');
};

nsLanding.getNews = function() {

	Alloy.Globals.openWindow('NewsAndSocial', {
		prb : {
			twitter_url : "https://twitter.com/punkrockbowling",
			fb_url : "https://www.facebook.com/Punk-Rock-Bowling-and-Music-Festival-288077407910557/",
			insta_url : "https://www.instagram.com/punkrockbowling/"
		},
		sourpuss : {
			twitter_url : "https://twitter.com/SourpussBrand",
			fb_url : "https://www.facebook.com/Sourpussclothing",
			insta_url : "https://www.instagram.com/sourpussclothing/"
		}
	}, true, null, 'misc/center_logo');
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
		$.title.text = L($.args.city).toUpperCase();
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
