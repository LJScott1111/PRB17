// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

// var sponsor = Alloy.Globals.getSponsor();

$.ivSponsorAd.image = '/icons/sourpuss_banner.png';

// if (sponsor.link != '') {
$.vwBottomView.addEventListener('click', function() {
	Alloy.Globals.openWindow("GenericWebView", {
		url : 'http://sourpussclothing.com/'
	}, true, null, 'misc/right_logo');
});
// };
