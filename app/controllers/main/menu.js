var args = arguments[0] || {};
var nsMenu = {};
nsMenu.serviceCalls = require("serverCalls");

$.settings.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow('Settings', {}, true, null, 'misc/right_logo');
});

$.buy_tickets.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow("GenericWebView", {
		url : "https://punkrockbowling.queueapp.com"
	}, true, null, 'misc/right_logo');
});

$.lineup.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow('Lineup', {}, true, null, 'misc/right_logo');
});

$.venues.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow('VenueList', {
		city : Alloy.Globals.nextEventCity
	}, true, null, 'misc/right_logo');
});

$.bowling.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow("GenericWebView", {
		url : "http://punkrockbowling.com/pages/bowling-1"
	}, true, null, 'misc/right_logo');
});

$.poker.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow("GenericWebView", {
		url : "http://punkrockbowling.com/pages/poker-tournament"
	}, true, null, 'misc/right_logo');
});

$.art.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow("GenericWebView", {
		url : "http://punkrockbowling.com/pages/misfit-island-lethal-amounts-juxtapoz-asg-present"
	}, true, null, 'misc/right_logo');
});

$.map.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	// TODO: Show it city-wise
	
	Alloy.Globals.openWindow("GenericWebView", {
		url : "http://cdn.shopify.com/s/files/1/0809/7981/files/Punk-Rock-Bowling-map_grande_grande.jpg?9976921872633462755"
	}, true, null, 'misc/right_logo');
});

$.food.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow("GenericWebView", {
		url : "http://punkrockbowling.com/pages/food-and-vendors"
	}, true, null, 'misc/right_logo');
});

$.sponsers.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow("Sponsors", {}, true, null, 'misc/right_logo');
});

/*
$.info.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow("GenericWebView", {
		url : "http://punkrockbowling.com/blogs/news"
	}, true, null, 'misc/right_logo');
});
*/

$.about.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow("GenericWebView", {
		url : "http://punkrockbowling.com/pages/about-us"
	}, true, null, 'misc/right_logo');
});

$.faq.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow("GenericWebView", {
		url : "http://punkrockbowling.com/pages/faqs"
	}, true, null, 'misc/right_logo');
});

$.privacy_policy.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow("GenericWebView", {
		url : "http://punkrockbowling.com/pages/privacy-policy"
	}, true, null, 'misc/right_logo');
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
	}, true, null, 'misc/right_logo');
});

$.my_schedule.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.loading.show();
	var getUserSchedule = new nsMenu.serviceCalls.getUserSchedule(function(schedule) {

		console.debug(JSON.stringify(schedule));
		Alloy.Globals.openWindow('UserSchedule', schedule, true, null, 'misc/right_logo');
		Alloy.Globals.loading.hide();

	}, function(error) {
		alert(L('err_fetchingDetails'));
		Alloy.Globals.loading.hide();
	});
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