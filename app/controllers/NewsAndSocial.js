var nsNewsAndSocial = {};
nsNewsAndSocial.social_links = null;

nsNewsAndSocial.postLayout = function() {

	$.twitter_underline.width = $.twitter.rect.width;
	$.fb_underline.width = $.fb.rect.width;
	$.insta_underline.width = $.insta.rect.width;

	$.vwMain.removeEventListener('postlayout', nsNewsAndSocial.postLayout);
};

nsNewsAndSocial.resetLinks = function() {

	$.wvWebView.setUrl(nsNewsAndSocial.social_links.twitter_url);
	$.twitter_underline.visible = true;
	$.fb_underline.visible = false;
	$.insta_underline.visible = false;
};

$.prb_view.addEventListener('click', function() {

	nsNewsAndSocial.social_links = JSON.parse(JSON.stringify($.args.prb));
	nsNewsAndSocial.resetLinks();
});

$.sourpuss_view.addEventListener('click', function() {

	nsNewsAndSocial.social_links = JSON.parse(JSON.stringify($.args.sourpuss));
	nsNewsAndSocial.resetLinks();
});

$.fb_view.addEventListener('click', function() {
	$.wvWebView.setUrl(nsNewsAndSocial.social_links.fb_url);
	$.twitter_underline.visible = false;
	$.fb_underline.visible = true;
	$.insta_underline.visible = false;
});

$.twitter_view.addEventListener('click', function() {
	$.wvWebView.setUrl(nsNewsAndSocial.social_links.twitter_url);
	$.twitter_underline.visible = true;
	$.fb_underline.visible = false;
	$.insta_underline.visible = false;
});

$.insta_view.addEventListener('click', function() {
	$.wvWebView.setUrl(nsNewsAndSocial.social_links.insta_url);
	$.twitter_underline.visible = false;
	$.fb_underline.visible = false;
	$.insta_underline.visible = true;
});

nsNewsAndSocial.init = function() {

	nsNewsAndSocial.social_links = JSON.parse(JSON.stringify($.args.prb));
	nsNewsAndSocial.resetLinks();

	var view_width = Alloy.Globals.platformWidth / 2.1;

	$.prb_view.width = view_width;
	$.sourpuss_view.width = view_width;

	$.vwMain.addEventListener('postlayout', nsNewsAndSocial.postLayout);

};

nsNewsAndSocial.init();
