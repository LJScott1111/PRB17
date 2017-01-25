var nsGenericWebView = {};

nsGenericWebView.init = function() {

	$.wvGenericWebView.setUrl($.args.url);
	console.error('FROM WEBVIEW ', $.args);
	if ($.args.addBanner == false || !$.args.addBanner) {
		$.vwMain.remove($.vwBottomView);
		return;
	};
	$.ivSponsorAd.image = Alloy.Globals.randomObj.image;
	$.vwBottomView.addEventListener('click', function() {
		Alloy.Globals.openWindow("GenericWebView", {
			source : 'webview',
			url : Alloy.Globals.randomObj.link,
			addBanner : false
		}, true);
	});

	if ($.args.click) {
		$.wvGenericWebView.addEventListener('click', function() {
			$.args.click();
		});
	};
};

nsGenericWebView.init();
