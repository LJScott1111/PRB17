// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.lasvegas.addEventListener('click', function() {
	Alloy.Globals.openWindow("GenericWebView", {
		url : "http://punkrockbowling.com/pages/las-vegas-line-up"
	}, true, null, 'misc/right_logo');
});

$.denver.addEventListener('click', function() {
	Alloy.Globals.openWindow("GenericWebView", {
		url : "http://punkrockbowling.com/pages/prb-denver-june-2-4-2016"
	}, true, null, 'misc/right_logo');
});

$.asburypark.addEventListener('click', function() {
	Alloy.Globals.openWindow("GenericWebView", {
		url : "http://punkrockbowling.com/pages/asbury-park-lineup"
	}, true, null, 'misc/right_logo');
});
