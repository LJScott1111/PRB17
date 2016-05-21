// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
// var sponsor = Alloy.Globals.getSponsor();

$.ivSponsorAd.image = $.args.image;

if ($.args.url != '' || $.args.banner_url) {
	$.vwBottomView.addEventListener('click', function() {
		Alloy.Globals.openWindow("GenericWebView", {
			url : $.args.url
		}, true, null, 'misc/right_logo');
	});
};

Titanium.App.addEventListener('updateSponsor', function(args) {
	$.args = JSON.parse(JSON.stringify(args));
});
