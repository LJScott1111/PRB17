// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.lasvegas.addEventListener('click', function() {
	Alloy.Globals.openWindow("GenericWebView", {
		url : "http://punkrockbowling.com/pages/las-vegas-line-up"
	}, true);
});

$.denver.addEventListener('click', function() {
	Alloy.Globals.openWindow("GenericWebView", {
		url : "http://punkrockbowling.com/pages/denver-lineup"
	}, true);
});

$.asburypark.addEventListener('click', function() {
	Alloy.Globals.openWindow("GenericWebView", {
		url : "http://punkrockbowling.com/pages/asbury-park-lineup"
	}, true);
});
