var args = arguments[0] || {};
var nsMenu = {};
nsMenu.serviceCalls = require("serverCalls");

Titanium.App.addEventListener('hideOptions', function(){
	$.subWrapper1.height = 0;
	$.subWrapper2.height = 0;
});

$.settings.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow('Settings', {}, true, null, 'misc/center_logo');
});

$.buy_tickets.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow("GenericWebView", {
		url : "https://punkrockbowling.com/collections/2016-punk-rock-bowling-merch"
	}, true, null, 'misc/center_logo');
});

$.lineup.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow('Lineup', {}, true, null, 'misc/center_logo');
});

$.fest_events.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow('Events', {
		// secondary : $.args.secondary,
		city : Alloy.Globals.nextEventCity
	}, true, null, 'misc/center_logo');
});

$.venues.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow('VenueList', {
		city : Alloy.Globals.nextEventCity
	}, true, null, 'misc/center_logo');
});

$.bowling.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow('GenericWebView', {
		url : "https://punkrockbowling.com/collections/2016-punk-rock-bowling-merch",
		image: "/icons/Banner_Pins.jpg",
		banner_url: "https://punkrockbowling.com/collections/2016-punk-rock-bowling-merch"
	}, true, null, 'misc/center_logo');
});

$.poker.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow('GenericWebView', {
		url : "https://punkrockbowling.com/collections/2016-punk-rock-bowling-merch",
		image: "/icons/Banner_Babies.jpg",
		banner_url: "https://punkrockbowling.com/collections/2016-punk-rock-bowling-merch"
	}, true, null, 'misc/center_logo');
});

$.art.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow('GenericWebView', {
		url : "https://punkrockbowling.com/collections/2016-punk-rock-bowling-merch",
		image: "/icons/Banner_Hair_Dye.jpg",
		banner_url: "https://punkrockbowling.com/collections/2016-punk-rock-bowling-merch"
	}, true, null, 'misc/center_logo');
});

$.map.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	
	Alloy.Globals.openWindow("GenericWebView", {
		url : "prb_map_2016.png"
	}, true, null, 'misc/center_logo');
});

$.poolparty.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	
	Alloy.Globals.openWindow("GenericWebView", {
		url : "https://punkrockbowling.com/collections/2016-punk-rock-bowling-merch"
	}, true, null, 'misc/center_logo');
});

$.food.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow('GenericWebView', {
		url : "https://punkrockbowling.com/collections/2016-punk-rock-bowling-merch",
		image: "/icons/Banner_Flasks.jpg",
		banner_url: "https://punkrockbowling.com/collections/2016-punk-rock-bowling-merch"
	}, true, null, 'misc/center_logo');
});

$.sponsers.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow("Sponsors", {}, true, null, 'misc/center_logo');
});

$.about.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow("GenericWebView", {
		url : "http://punkrockbowling.com/pages/about-us"
	}, true, null, 'misc/center_logo');
});

$.faq.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow("GenericWebView", {
		url : "https://punkrockbowling.com/collections/2016-punk-rock-bowling-merch"
	}, true, null, 'misc/center_logo');
});

$.privacy_policy.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow("GenericWebView", {
		url : "http://punkrockbowling.com/pages/privacy-policy"
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
		sourpuss: {
			twitter_url : "https://twitter.com/SourpussBrand",
			fb_url : "https://www.facebook.com/Sourpussclothing",
			insta_url : "https://www.instagram.com/sourpussclothing/"
		}
	}, true, null, 'misc/center_logo');
});

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

$.my_schedule.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.loading.show();
	var getUserSchedule = new nsMenu.serviceCalls.getUserSchedule(function(schedule) {

		console.debug(JSON.stringify(schedule));
		Alloy.Globals.openWindow('UserSchedule', schedule, true, null, 'misc/center_logo');
		Alloy.Globals.loading.hide();

	}, function(error) {
		alert(L('err_fetchingDetails'));
		Alloy.Globals.loading.hide();
	});
});

$.profile.button.addEventListener('click', function(){
	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow('Profile', {}, true, null, 'misc/center_logo');
});

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