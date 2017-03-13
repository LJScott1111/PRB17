if ($.args.image) {
	console.error('THE ARG HAS IMAGE ', $.args.image);
	$.ivSponsorAd.image = $.args.image;
}

function updateBanner() {

	var banner = Alloy.Globals.getSponsorBanner($.args.screen);
	if (banner) {
		// console.log('RTTYRTYRTY PPPP ', JSON.stringify(banner));
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

	return;
	/*

	 var sponsor = Alloy.Globals.getSponsor();
	 console.log('Alloy.Globals.getSponsor PPPP ', JSON.stringify(sponsor));

	 if (sponsor) {
	 // console.log('RTTYRTYRTY PPPP ', JSON.stringify(sponsor));
	 $.ivSponsorAd.image = sponsor.image;
	 $.vwBottomView.addEventListener('click', function(e) {
	 // console.log('QWERTYUIOP ', JSON.stringify(e));
	 Alloy.Globals.openWindow("GenericWebView", {
	 source : 'webview',
	 url : sponsor.link,
	 addBanner : false
	 }, true);
	 });
	 }*/

}

if ($.args.addBanner) {
	updateBanner();
	// Alloy.Globals.getSponsorBanner('manNav');
}

/*
 Titanium.App.addEventListener('updateSponsor', function(args) {
 $.args = JSON.parse(JSON.stringify(args));
 console.error('$.args ----> ', $.args);
 updateBanner();
 });*/

Titanium.App.addEventListener('updateBanner', function(args) {
	updateBanner();
});
