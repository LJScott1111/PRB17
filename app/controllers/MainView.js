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

$.lineup_action.addEventListener('click', function() {
	Alloy.Globals.openWindow("FestLineup", {}, true, null, 'misc/center_logo');
});

$.club_shows_action.addEventListener('click', function() {

	Alloy.Globals.loading.show();
	var clubdata = Titanium.App.Properties.getObject('clubData', {});

	if (clubdata.details.length === 0) {
		var getUserSchedule = new nsMenu.serviceCalls.getUserSchedule(function(schedule) {

			console.debug(JSON.stringify(schedule));

			var getClubShows = new nsMenu.serviceCalls.getClubShows(function(clubData) {
				console.log('response Clubshows clubData ', JSON.stringify(clubData));
				Alloy.Globals.openWindow('Schedule', {
					city : Alloy.Globals.nextEventCity,
					schedule : schedule,
					appdata : clubData,
					showsType : 'clubshows'
				}, true, null, 'misc/center_logo', 'misc/right_logo_grid');
			}, function(error) {
				console.log('error Clubshows ', JSON.stringify(error));
			});

		}, function(error) {
			alert(L('err_fetchingDetails'));
			Alloy.Globals.loading.hide();
		});
	} else {

		var getUserSchedule = new nsMenu.serviceCalls.getUserSchedule(function(schedule) {

			console.debug(JSON.stringify(schedule));

			Alloy.Globals.openWindow('Schedule', {
				city : Alloy.Globals.nextEventCity,
				schedule : schedule,
				appdata : clubdata,
				showsType : 'clubshows'
			}, true, null, 'misc/center_logo', 'misc/right_logo_grid');

		}, function(error) {
			alert(L('err_fetchingDetails'));
			Alloy.Globals.loading.hide();
		});
	}
});

$.bands_action.addEventListener('click', function() {

	Alloy.Globals.loading.show();
	var appdata = Titanium.App.Properties.getObject('appdata', {});

	if (appdata.details.length === 0) {
		var hasData = Alloy.Globals.getAndStoreData(function(fetchedData) {
			console.debug("fetchedData ", fetchedData);
			if (fetchedData) {

				var getUserSchedule = new nsLanding.serviceCalls.getUserSchedule(function(schedule) {

					console.debug(JSON.stringify(schedule));

					// Alloy.Globals.openWindow('UserSchedule', schedule, true, null, 'misc/center_logo');
					Alloy.Globals.openWindow('Schedule', {
						city : $.args.city,
						schedule : schedule,
						appdata : Titanium.App.Properties.getObject('appdata', {})
					}, true, null, 'misc/center_logo', 'misc/right_logo_grid');

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
				schedule : schedule,
				appdata : Titanium.App.Properties.getObject('appdata', {})
			}, true, null, 'misc/center_logo', 'misc/right_logo_grid');
			Alloy.Globals.loading.hide();

		}, function(error) {
			alert(L('err_fetchingDetails'));
			Alloy.Globals.loading.hide();
		});
	}

	/*
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
	 }*/

});

$.my_schedule_action.addEventListener('click', function() {

	console.error('nsEvents.getSchedule');

	Alloy.Globals.openWindow('GenericWebView', {
		url : "http://buzzplay.com/PRBapp/ComingSoon.html",
		addBanner : true
	}, true, null, 'misc/center_logo');
	return;

	//// TODO: Later
	Alloy.Globals.loading.show();
	var appdata = Titanium.App.Properties.getObject('appdata', {});

	if (appdata.details.length === 0) {
		var hasData = Alloy.Globals.getAndStoreData(function(fetchedData) {
			console.debug("fetchedData ", fetchedData);
			if (fetchedData) {

				var getUserSchedule = new nsLanding.serviceCalls.getUserSchedule(function(schedule) {

					console.debug(JSON.stringify(schedule));

					// Alloy.Globals.openWindow('UserSchedule', schedule, true, null, 'misc/center_logo');
					Alloy.Globals.openWindow('Schedule', {
						city : $.args.city,
						schedule : schedule,
						appdata : Titanium.App.Properties.getObject('appdata', {})
					}, true, null, 'misc/center_logo', 'misc/right_logo_grid');

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
				schedule : schedule,
				appdata : Titanium.App.Properties.getObject('appdata', {})
			}, true, null, 'misc/center_logo', 'misc/right_logo_grid');
			Alloy.Globals.loading.hide();

		}, function(error) {
			alert(L('err_fetchingDetails'));
			Alloy.Globals.loading.hide();
		});
	}
});

$.book_hotels_action.addEventListener('click', function() {

	Alloy.Globals.openWindow('GenericWebView', {
		url : "https://punkrockbowling.com/pages/golden-nugget-hotel",
		addBanner : true
	}, true, null, 'misc/center_logo');
});

$.merch_action.addEventListener('click', function() {

	Alloy.Globals.openWindow('GenericWebView', {
		url : "https://punkrockbowling.com/collections/2016-punk-rock-bowling-merch",
		addBanner : true
	}, true, null, 'misc/center_logo');
});

$.news_action.addEventListener('click', function() {

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
		},
		hard_times : {
			twitter_url : "https://twitter.com/RealPunkNews/",
			fb_url : "https://www.facebook.com/thehardtimesnews/",
			insta_url : "https://www.instagram.com/TheHardTimesNews/"
		}
	}, true, null, 'misc/center_logo');
});

$.bowling_action.addEventListener('click', function() {

	Alloy.Globals.openWindow('GenericWebView', {
		url : "https://punkrockbowling.com/pages/bowling-1",
		addBanner : true
	}, true, null, 'misc/center_logo');
});

$.food_vendors_action.addEventListener('click', function() {
	Alloy.Globals.openWindow('GenericWebView', {
		url : "http://buzzplay.com/PRBapp/ComingSoon.html",
		addBanner : true
	}, true, null, 'misc/center_logo');
});

$.sponsors_action.addEventListener('click', function() {

	/*
	 Alloy.Globals.openWindow("Sponsors", {
	 addBanner: true
	 }, true, null, 'misc/center_logo');*/

	Alloy.Globals.openWindow("GenericWebView", {
		url : "http://www.Buzzplay.com/PRBapp/Sponsors.html",
		// image : '/icons/merch_shop_ad.png',
	}, true, null, 'misc/center_logo');
});

$.buy_tickets_action.addEventListener('click', function() {

	Alloy.Globals.openWindow("GenericWebView", {
		url : "https://punkrockbowling.com/pages/prb-17-ticket-prices",
		addBanner : false
	}, true, null, 'misc/center_logo');
});

/*

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
 }

 };
 */

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
