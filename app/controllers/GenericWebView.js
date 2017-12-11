var nsGenericWebView = {};

if ($.args.backbutton == false) {
	$.vwMain.remove($.back);
} else {
	$.back.addEventListener('click', function() {
		Alloy.Globals.pageflow.back();
	});
}

nsGenericWebView.init = function() {

	$.wvGenericWebView.setUrl($.args.url);
	console.error('FROM WEBVIEW ', $.args);
	if ($.args.addBanner == false || !$.args.addBanner) {
		$.vwMain.remove($.vwBottomView);
		return;
	} else if ($.args.screen) {
		var banner = Alloy.Globals.getSponsorBanner($.args.screen);
		if (banner) {
			console.log('RTTYRTYRTY PPPP ', $.args.screen, JSON.stringify(banner));
			$.ivSponsorAd.image = banner.image;
			$.vwBottomView.addEventListener('click', function(e) {
				// console.log('QWERTYUIOP ', JSON.stringify(e));
				Alloy.Globals.openWindow("GenericWebView", {
					source : 'webview',
					url : banner.link,
					addBanner : false
				}, true);
			});
		}
	} else {
		// For random sponsor ad
		// $.ivSponsorAd.image = Alloy.Globals.randomObj.image;
		// $.vwBottomView.addEventListener('click', function() {
		// Alloy.Globals.openWindow("GenericWebView", {
		// source : 'webview',
		// url : Alloy.Globals.randomObj.link,
		// addBanner : false
		// }, true);
		// });
	}

	if ($.args.click) {
		$.wvGenericWebView.addEventListener('click', function() {
			$.args.click();
		});
	};
};

nsGenericWebView.init();
