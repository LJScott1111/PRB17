var nsBandList = {};

// nsBandList.args = arguments[0];

nsBandList.closeWindow = function() {
	$.winBandList.close();
};

nsBandList.getSettings = function() {
};

nsBandList.init = function() {
	// console.debug("Bandlist ", JSON.stringify(nsBandList.args));

	$.winBandList.addEventListener('android:back', function(e) {
		console.debug("Pressing Back Will Not Close The Activity/Window");
		nsBandList.closeWindow();
	});

	var searchList = require("searchList");
	var list = searchList.init("BandList", Alloy.Globals.bands);
	console.debug(JSON.stringify(list));
	$.vwMain.add(list);
};

nsBandList.init();
