if ($.args.image) {
	$.ivSponsorAd.image = $.args.image;
};

if ($.args.url || $.args.banner_url) {
	$.vwBottomView.addEventListener('click', function() {
		Alloy.Globals.openWindow("GenericWebView", {
			url : $.args.url
		}, true, null, 'misc/center_logo');
	});
} else {
	var sponsor = Alloy.Globals.getSponsor();
	$.ivSponsorAd.image = '/icons/' + sponsor.image;
	$.vwBottomView.addEventListener('click', function() {
		Alloy.Globals.openWindow("GenericWebView", {
			url : sponsor.link
		}, true);
	});
}

Titanium.App.addEventListener('updateSponsor', function(args) {
	$.args = JSON.parse(JSON.stringify(args));
});
