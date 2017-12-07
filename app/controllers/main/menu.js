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
/*

$.profile.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow('Profile', {}, true, null, 'misc/center_logo');
});
*/

$.buy_tickets.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow("GenericWebView", {
		url : "https://wl.seetickets.us/event/Punk-Rock-Bowling-Festival-2018/355297?afflky=PunkRockBowling",
	}, true, null, 'misc/center_logo');
});
/*

$.pool_parties.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow('GenericWebView', {
		url : "https://punkrockbowling.com/pages/pool-parties",
		addBanner : true,
		screen : 'hotels'
	}, true, null, 'misc/center_logo');
});
*/

$.prb_shop.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow('GenericWebView', {
		url : "https://punkrockbowling.com/collections/2016-punk-rock-bowling-merch",
		addBanner : true,
		screen : 'shop'
	}, true, null, 'misc/center_logo');
});
/*

$.denver_prb.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow('GenericWebView', {
		url : "https://punkrockbowling.com/pages/prb-denver-june-2-4-2016",
	}, true, null, 'misc/center_logo');

	return;
});

$.denver_bowling.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow('GenericWebView', {
		url : "https://punkrockbowling.com/pages/denver-bowling",
	}, true, null, 'misc/center_logo');

	return;
});
*/

$.lasvegas_lineup.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow('GenericWebView', {
		url : "http://www.punkrockbowling.com/",
	}, true, null, 'misc/center_logo');

	return;
});

$.contests.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow('GenericWebView', {
		url : "http://buzzplay.com/PRBapp/Contests.html",
		addBanner : true,
		screen : 'contest'
	}, true, null, 'misc/center_logo');
});
/*
 $.chat.button.addEventListener('click', function() {

 Ti.App.fireEvent('toggleMenu');

 Alloy.Globals.openWindow('Chat/ChatMain', {}, true, null, 'misc/center_logo');

 });

 $.message_center.button.addEventListener('click', function() {

 // Ref: https://github.com/urbanairship/titanium-module/blob/master/example/app.js
 var UrbanAirship = Alloy.Globals.UrbanAirship;
 Ti.App.fireEvent('toggleMenu');
 UrbanAirship.displayMessageCenter();
 });
 */
/*

$.map.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');

	Alloy.Globals.openWindow("GenericWebView", {
		url : "https://punkrockbowling.com/pages/festival-site-map",
		addBanner : true,
		screen : 'map'
	}, true, null, 'misc/center_logo');
});

$.poker.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');

	Alloy.Globals.openWindow("GenericWebView", {
		url : "https://punkrockbowling.com/pages/poker-tournament",
		addBanner : true
	}, true, null, 'misc/center_logo');
});

$.food.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow('GenericWebView', {
		url : "https://punkrockbowling.com/pages/2017-las-vegas-vending",
		addBanner : true,
		screen : 'foodVendors'
	}, true, null, 'misc/center_logo');
});*/


$.sponsers.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	// Alloy.Globals.openWindow("Sponsors", {}, true, null, 'misc/center_logo');

	Alloy.Globals.openWindow("GenericWebView", {
		url : "http://buzzplay.com/PRBapp/Sponsors.html",
	}, true, null, 'misc/center_logo');
});
/*

$.faq.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow("GenericWebView", {
		url : "https://punkrockbowling.com/pages/faqs",
	}, true, null, 'misc/center_logo');
});*/


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

$.login.button.addEventListener('click', function() {

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

nsMenu.init = function() {

	if (Titanium.App.Properties.getString('defaultUser') == true) {
		$.loginview.height = Ti.UI.SIZE;
		$.logoutview.height = 0;
	} else {
		$.loginview.height = 0;
		$.logoutview.height = Ti.UI.SIZE;
	}
};

nsMenu.init();
Titanium.App.addEventListener('onLogin', nsMenu.init);
*/

