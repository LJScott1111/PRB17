var args = arguments[0] || {};

Alloy.Globals.pageflow = $.pageFlow;
Alloy.Globals.home = true;

// Alloy.Globals.openWindow('MainView', null, false, null, 'misc/center_logo');
Alloy.Globals.openWindow('GenericWebView', {
		url : "https://punkrockbowling.com/",
		addBanner : true,
		// screen : 'bowling'
	}, false, null, 'misc/center_logo');

