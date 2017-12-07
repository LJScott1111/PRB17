var args = arguments[0] || {};
var nsMenu = {};
nsMenu.serviceCalls = require("serverCalls");

Titanium.App.addEventListener('hideOptions', function() {
	$.subWrapper1.height = 0;
	$.subWrapper2.height = 0;
});

$.buy_tickets.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow("GenericWebView", {
		url : "https://wl.seetickets.us/event/Punk-Rock-Bowling-Festival-2018/355297?afflky=PunkRockBowling",
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

$.sponsers.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');

	Alloy.Globals.openWindow("GenericWebView", {
		url : "http://buzzplay.com/PRBapp/Sponsors.html",
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


