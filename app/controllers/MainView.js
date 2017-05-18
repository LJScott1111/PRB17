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

	// $.title.text = L(location).toUpperCase();

	Alloy.Globals.nextEventCity = location;
	$.args.city = location;

	// if (Alloy.Globals.nextEventCity == 'asburypark') {
	// // Hide menus from menu screen
	// Titanium.App.fireEvent('hideOptions');
	// }

	console.error('NEXT SHOW ', location);
	Titanium.App.removeEventListener('get_next_show', nsLanding.get_next_show);
	console.error('Alloy.Globals.getSponsorBanner');
	console.log(JSON.stringify(Alloy.Globals.getSponsorBanner('manNav')));
};

nsLanding.getMenu = function() {
	console.log('getMenu');
	Titanium.App.fireEvent('toggleMenu');
};

nsLanding.openNews = function() {
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
};

$.lineup_action.addEventListener('click', function() {
	Alloy.Globals.openWindow("FestLineup", {
		city : 'lasvegas'
	}, true, null, 'misc/center_logo');
});

$.club_shows_action.addEventListener('click', function() {

	Alloy.Globals.openWindow('GenericWebView', {
		url : "https://punkrockbowling.com/collections/prb-2017-club-shows-lv",
	}, true, null, 'misc/center_logo');

	return;
/*

	Alloy.Globals.loading.show();
	var clubdata = Titanium.App.Properties.getObject('clubData', {});

	if (!clubdata.details || clubdata.details.length === 0) {
		var getUserSchedule = new nsLanding.serviceCalls.getUserSchedule(function(schedule) {

			console.debug(JSON.stringify(schedule));

			var getClubShows = new nsLanding.serviceCalls.getClubShows(function(clubData) {
				Alloy.Globals.loading.hide();
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

		var getUserSchedule = new nsLanding.serviceCalls.getUserSchedule(function(schedule) {

			console.debug(JSON.stringify(schedule));
			Alloy.Globals.loading.hide();

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
	}*/

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
						city : 'lasvegas',
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
				city : 'lasvegas',
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
/*

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
	}*/

});

$.book_hotels_action.addEventListener('click', function() {

	Alloy.Globals.openWindow('GenericWebView', {
		url : "https://punkrockbowling.com/pages/golden-nugget-hotel",
		addBanner : true,
		screen : 'hotels'
	}, true, null, 'misc/center_logo');
});

$.merch_action.addEventListener('click', function() {

	Alloy.Globals.openWindow('GenericWebView', {
		url : "https://punkrockbowling.com/collections/2016-punk-rock-bowling-merch",
		addBanner : true,
		screen : 'merch'
	}, true, null, 'misc/center_logo');
});

$.news_action.addEventListener('click', nsLanding.openNews);

$.bowling_action.addEventListener('click', function() {

	Alloy.Globals.openWindow('GenericWebView', {
		url : "https://punkrockbowling.com/pages/bowling-1",
		addBanner : true,
		screen : 'bowling'
	}, true, null, 'misc/center_logo');
});

$.food_vendors_action.addEventListener('click', function() {
	Alloy.Globals.openWindow('GenericWebView', {
		url : "https://punkrockbowling.com/pages/2017-las-vegas-vending",
		addBanner : true,
		screen : 'foodVendors'
	}, true, null, 'misc/center_logo');
});

$.sponsors_action.addEventListener('click', function() {

	Alloy.Globals.openWindow("GenericWebView", {
		url : "http://www.buzzplay.com/PRBapp/Sponsors.html",
		// image : '/icons/merch_shop_ad.png',
	}, true, null, 'misc/center_logo');
});

$.buy_tickets_action.addEventListener('click', function() {

	Alloy.Globals.openWindow("GenericWebView", {
		url : "https://punkrockbowling.com/pages/prb-17-ticket-prices",
		addBanner : false
	}, true, null, 'misc/center_logo');
});

$.select_lv.addEventListener('click', function() {
	$.las_vegas_nav.visible = true;
	$.asbury_park_nav.visible = false;
	$.lv_selected.backgroundColor = '#000';
	$.ap_selected.backgroundColor = 'transparent';
});

$.select_ap.addEventListener('click', function() {
	$.las_vegas_nav.visible = false;
	$.asbury_park_nav.visible = true;
	$.ap_selected.backgroundColor = '#D70C46';
	$.lv_selected.backgroundColor = 'transparent';
});

$.ap_linup.addEventListener('click', function() {
	Alloy.Globals.openWindow("FestLineup", {
		city : 'asburypark'
	}, true, null, 'misc/center_logo');
});

$.ap_news.addEventListener('click', nsLanding.openNews);

$.ap_bands.addEventListener('click', function() {
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
						city : 'asburypark',
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
				city : 'asburypark',
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

$.ap_buy_tickets.addEventListener('click', function() {

	Alloy.Globals.openWindow("GenericWebView", {
		url : "https://www.eventbrite.com/e/punk-rock-bowling-music-festival-nj-tickets-32107295786?aff=PRBnj2day",
		addBanner : false
	}, true, null, 'misc/center_logo');
});

$.ap_my_schedule.addEventListener('click', function() {
	Alloy.Globals.openWindow('GenericWebView', {
		url : "http://buzzplay.com/PRBapp/ComingSoon.html"
	}, true, null, 'misc/center_logo');
});

$.ap_club_shows.addEventListener('click', function() {
	Alloy.Globals.openWindow('GenericWebView', {
		url : "https://punkrockbowling.com/pages/asbury-park-club-shows"
	}, true, null, 'misc/center_logo');
});

$.ap_bowling.addEventListener('click', function() {
	Alloy.Globals.openWindow('GenericWebView', {
		url : "http://buzzplay.com/PRBapp/ComingSoon.html"
	}, true, null, 'misc/center_logo');
});

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
		// $.title.text = L($.args.city).toUpperCase();
		return;
	}

	$.las_vegas_nav.visible = true;
	$.asbury_park_nav.visible = false;

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
