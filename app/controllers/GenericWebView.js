var nsGenericWebView = {};

nsGenericWebView.init = function() {

	$.wvGenericWebView.setUrl($.args.url);

	if ($.args.image && $.args.banner_url) {
		Titanium.App.fireEvent('updateSponsor', {
			image : $.args.image,
			url : $.args.banner_url
		});
		$.sponsor.ivSponsorAd.image = $.args.image;
	}
};

nsGenericWebView.init();
