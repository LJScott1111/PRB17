var nsGenericWebView = {};

nsGenericWebView.init = function() {

	$.wvGenericWebView.setUrl($.args.url);

	// 	&& $.args.banner_url
	if ($.args.image) {
		Titanium.App.fireEvent('updateSponsor', {
			image : $.args.image,
			// url : $.args.banner_url
		});
		$.sponsor.ivSponsorAd.image = $.args.image;
	} else {
		Titanium.App.fireEvent('updateSponsor', {
			image : '/icons/merch_shop_ad.png',
			url : ''
		});
		$.sponsor.ivSponsorAd.image = $.args.image;
	}
};

nsGenericWebView.init();
