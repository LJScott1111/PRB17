var nsNewsAndSocial = {};

$.fb_view.addEventListener('click', function() {
	$.wvWebView.setUrl($.args.fb_url);
});

$.twitter_view.addEventListener('click', function() {
	$.wvWebView.setUrl($.args.twitter_url);
});

$.insta_view.addEventListener('click', function() {
	$.wvWebView.setUrl($.args.insta_url);
});

nsNewsAndSocial.init = function() {

	$.wvWebView.setUrl($.args.fb_url);

	var view_width = Alloy.Globals.platformWidth / 3;

	$.fb_view.width = view_width;
	$.twitter_view.width = view_width;
	$.insta_view.width = view_width;
};

nsNewsAndSocial.init();
