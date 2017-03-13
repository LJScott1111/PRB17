var args = arguments[0] || {};
var nsMenu = {};
nsMenu.serviceCalls = require("serverCalls");

Titanium.App.addEventListener('hideOptions', function() {
	$.subWrapper1.height = 0;
	$.subWrapper2.height = 0;
});

/*
 $.settings.button.addEventListener('click', function() {

 Ti.App.fireEvent('toggleMenu');
 Alloy.Globals.openWindow('Settings', {}, true, null, 'misc/center_logo');
 });
 */

$.buy_tickets.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow("GenericWebView", {
		url : "https://punkrockbowling.com/pages/prb-17-ticket-prices",
	}, true, null, 'misc/center_logo');
});

$.festival_lineup.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');

	Alloy.Globals.openWindow("FestLineup", {
		// url : "fest_lineup.png",
		/*
		 click : function() {
		 var appdata = Titanium.App.Properties.getObject('appdata', {});

		 if (appdata.details.length === 0) {
		 var hasData = Alloy.Globals.getAndStoreData(function(fetchedData) {
		 console.debug("fetchedData ", fetchedData);
		 if (fetchedData) {

		 var getUserSchedule = new nsMenu.serviceCalls.getUserSchedule(function(schedule) {

		 console.debug(JSON.stringify(schedule));

		 // Alloy.Globals.openWindow('UserSchedule', schedule, true, null, 'misc/center_logo');
		 Alloy.Globals.openWindow('Schedule', {
		 city : Alloy.Globals.nextEventCity,
		 schedule : schedule
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
		 var getUserSchedule = new nsMenu.serviceCalls.getUserSchedule(function(schedule) {

		 console.debug(JSON.stringify(schedule));
		 // Alloy.Globals.openWindow('UserSchedule', schedule, true, null, 'misc/center_logo');
		 Alloy.Globals.openWindow('Schedule', {
		 city : Alloy.Globals.nextEventCity,
		 schedule : schedule
		 }, true, null, 'misc/center_logo', 'misc/right_logo_grid');
		 Alloy.Globals.loading.hide();

		 }, function(error) {
		 alert(L('err_fetchingDetails'));
		 Alloy.Globals.loading.hide();
		 });
		 }
		 },
		 addBanner : false*/

	}, true, null, 'misc/center_logo');

});

$.bands.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	var appdata = Titanium.App.Properties.getObject('appdata', {});

	if (appdata.details.length === 0) {
		var hasData = Alloy.Globals.getAndStoreData(function(fetchedData) {
			console.debug("fetchedData ", fetchedData);
			if (fetchedData) {

				var getUserSchedule = new nsMenu.serviceCalls.getUserSchedule(function(schedule) {

					console.debug(JSON.stringify(schedule));

					// Alloy.Globals.openWindow('UserSchedule', schedule, true, null, 'misc/center_logo');
					Alloy.Globals.openWindow('Schedule', {
						city : Alloy.Globals.nextEventCity,
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
		var getUserSchedule = new nsMenu.serviceCalls.getUserSchedule(function(schedule) {

			console.debug(JSON.stringify(schedule));
			// Alloy.Globals.openWindow('UserSchedule', schedule, true, null, 'misc/center_logo');
			Alloy.Globals.openWindow('Schedule', {
				city : Alloy.Globals.nextEventCity,
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
	 city : Alloy.Globals.nextEventCity
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
	 city : Alloy.Globals.nextEventCity
	 }, true, null, 'misc/center_logo');
	 }*/

});

$.hotels.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow('GenericWebView', {
		url : "https://punkrockbowling.com/pages/golden-nugget-hotel",
		addBanner : true,
		screen : 'hotels'
	}, true, null, 'misc/center_logo');
});

$.prb_shop.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow('GenericWebView', {
		url : "https://punkrockbowling.com/collections/2016-punk-rock-bowling-merch",
		addBanner : true,
		screen : 'shop'
	}, true, null, 'misc/center_logo');
});

$.club_shows.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
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

	/*
	 Ti.App.fireEvent('toggleMenu');
	 Alloy.Globals.openWindow('GenericWebView', {
	 url : "http://buzzplay.com/PRBapp/ComingSoon.html",
	 addBanner : true
	 }, true, null, 'misc/center_logo');*/

});

$.contests.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow('GenericWebView', {
		url : "http://buzzplay.com/PRBapp/Contests.html",
		addBanner : true,
		screen : 'contest'
	}, true, null, 'misc/center_logo');
});

$.message_center.button.addEventListener('click', function() {

	// Ref: https://github.com/urbanairship/titanium-module/blob/master/example/app.js
	var UrbanAirship = Alloy.Globals.UrbanAirship;
	Ti.App.fireEvent('toggleMenu');
	UrbanAirship.displayMessageCenter();
});

$.map.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');

	Alloy.Globals.openWindow("GenericWebView", {
		url : "https://punkrockbowling.com/pages/festival-site-map",
		addBanner : true,
		screen : 'map'
	}, true, null, 'misc/center_logo');
});

$.venues.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow('VenueList', {
		city : Alloy.Globals.nextEventCity
	}, true, null, 'misc/center_logo');
});

$.poker.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');

	Alloy.Globals.openWindow("GenericWebView", {
		url : "https://punkrockbowling.com/pages/poker-tournament",
		addBanner : true
	}, true, null, 'misc/center_logo');
});

/*

 $.about.button.addEventListener('click', function() {

 Ti.App.fireEvent('toggleMenu');
 Alloy.Globals.openWindow("GenericWebView", {
 url : "http://punkrockbowling.com/pages/about-us"
 }, true, null, 'misc/center_logo');
 });
 */

$.food.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow('GenericWebView', {
		url : "http://buzzplay.com/PRBapp/ComingSoon.html",
		addBanner : true,
		screen : 'foodVendors'
	}, true, null, 'misc/center_logo');
});

$.sponsers.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	// Alloy.Globals.openWindow("Sponsors", {}, true, null, 'misc/center_logo');

	Alloy.Globals.openWindow("GenericWebView", {
		url : "http://www.buzzplay.com/PRBapp/Sponsors.html",
	}, true, null, 'misc/center_logo');
});

$.faq.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow("GenericWebView", {
		url : "https://punkrockbowling.com/pages/faqs",
	}, true, null, 'misc/center_logo');
});

$.privacy_policy.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow("GenericWebView", {
		url : "http://punkrockbowling.com/pages/privacy-policy",
	}, true, null, 'misc/center_logo');
});

$.info.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
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
/*

 $.denver.button.addEventListener('click', function() {
 Ti.App.fireEvent('toggleMenu');
 Alloy.Globals.openWindow("GenericWebView", {
 url : "https://punkrockbowling.com/collections/2016-punk-rock-bowling-merch"
 }, true, null, 'misc/center_logo');
 });

 $.asburypark.button.addEventListener('click', function() {
 Ti.App.fireEvent('toggleMenu');
 Alloy.Globals.openWindow("GenericWebView", {
 url : "https://punkrockbowling.com/collections/2016-punk-rock-bowling-merch"
 }, true, null, 'misc/center_logo');
 });

 */

$.my_schedule.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');

	Alloy.Globals.openWindow('GenericWebView', {
		url : "http://buzzplay.com/PRBapp/ComingSoon.html",
		addBanner : true
	}, true, null, 'misc/center_logo');
	return;

	//// TODO: Later
	console.error('nsEvents.getSchedule');
	Alloy.Globals.loading.show();
	var appdata = Titanium.App.Properties.getObject('appdata', {});

	if (appdata.details.length === 0) {
		var hasData = Alloy.Globals.getAndStoreData(function(fetchedData) {
			console.debug("fetchedData ", fetchedData);
			if (fetchedData) {

				var getUserSchedule = new nsMenu.serviceCalls.getUserSchedule(function(schedule) {

					console.debug(JSON.stringify(schedule));

					// Alloy.Globals.openWindow('UserSchedule', schedule, true, null, 'misc/center_logo');
					Alloy.Globals.openWindow('Schedule', {
						city : Alloy.Globals.nextEventCity,
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
		var getUserSchedule = new nsMenu.serviceCalls.getUserSchedule(function(schedule) {

			console.debug(JSON.stringify(schedule));
			// Alloy.Globals.openWindow('UserSchedule', schedule, true, null, 'misc/center_logo');
			Alloy.Globals.openWindow('Schedule', {
				city : Alloy.Globals.nextEventCity,
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
	 Ti.App.fireEvent('toggleMenu');
	 Alloy.Globals.loading.show();
	 var getUserSchedule = new nsMenu.serviceCalls.getUserSchedule(function(schedule) {

	 console.debug(JSON.stringify(schedule));
	 Alloy.Globals.openWindow('UserSchedule', schedule, true, null, 'misc/center_logo');
	 Alloy.Globals.loading.hide();

	 }, function(error) {
	 alert(L('err_fetchingDetails'));
	 Alloy.Globals.loading.hide();
	 });*/

});
/*
 $.profile.button.addEventListener('click', function(){
 Ti.App.fireEvent('toggleMenu');
 Alloy.Globals.openWindow('Profile', {}, true, null, 'misc/center_logo');
 });
 */

$.log_out.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.loading.show();
	var logout = new nsMenu.serviceCalls.logout(function() {

		Alloy.Globals.loading.hide();
		var signupWindow = Alloy.createController("signup").getView();
		signupWindow.open();

	}, function(error) {
		alert(L('err_fetchingDetails'));
		Alloy.Globals.loading.hide();
	});
});
