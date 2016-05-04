var args = arguments[0] || {};
var nsMenu = {};
nsMenu.serviceCalls = require("serverCalls");

$.settings.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow('Settings', {}, true);
});

$.lineup.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow('Lineup', {}, true);
});

$.venues.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow('VenueList', {
		city : Alloy.Globals.nextEventCity
	}, true);
});

$.movies.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	// TODO: Add info
});

$.bowling.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	// TODO: Add info
});

$.poker.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	// TODO: Add info
});

$.art.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	// TODO: Add info
});

$.map.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	// TODO: Add info
});

$.food.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	// TODO: Add info
});

$.sponsers.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow("GenericWebView", {
		url : "http://punkrockbowling.com/pages/sponsor-page"
	}, true);
});

$.info.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow("GenericWebView", {
		url : "http://punkrockbowling.com/blogs/news"
	}, true);
});

$.about.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow("GenericWebView", {
		url : "http://punkrockbowling.com/pages/about-us"
	}, true);
});

$.faq.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow("GenericWebView", {
		url : "http://punkrockbowling.com/pages/about-us"
	}, true);
});

$.privacy_policy.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow("GenericWebView", {
		url : "http://punkrockbowling.com/pages/privacy-policy"
	}, true);
});

$.social.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.openWindow("GenericWebView", {
		url : "http://punkrockbowling.com/blogs/news"
	}, true);
});

$.my_schedule.button.addEventListener('click', function() {

	Ti.App.fireEvent('toggleMenu');
	Alloy.Globals.loading.show();
	var getUserSchedule = new nsMenu.serviceCalls.getUserSchedule(function(schedule) {

		console.debug(JSON.stringify(schedule));
		Alloy.Globals.openWindow('UserSchedule', schedule, true);
		Alloy.Globals.loading.hide();

	}, function(error) {
		alert(L('err_fetchingDetails'));
		Alloy.Globals.loading.hide();
	});
});
