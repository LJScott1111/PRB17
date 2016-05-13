// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var nsSponsors = {};

nsSponsors.clickedImage = function(e) {

	var id = e.source.id;

	if (e.source.url !== "") {
		Alloy.Globals.openWindow("GenericWebView", {
			url : e.source.url
		}, true, null, 'misc/right_logo');
	}
};

$.svMain.setHeight(Alloy.Globals.platformHeight - 60); 