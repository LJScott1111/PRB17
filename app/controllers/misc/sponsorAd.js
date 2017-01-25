if ($.args.image) {
	$.ivSponsorAd.image = $.args.image;
}

function updateBanner() {

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
	}
}

if ($.args.addBanner) {
	updateBanner();
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
