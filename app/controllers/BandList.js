var nsBandList = {};

// nsBandList.args = arguments[0];

nsBandList.closeWindow = function() {
	Alloy.Globals.windowStack.pop();
	$.winBandList.close();
};

nsBandList.getSettings = function() {
};

nsBandList.init = function() {
	Alloy.Globals.windowStack.push($.winBandList);
	// console.debug("Bandlist ", JSON.stringify(nsBandList.args));

	$.winBandList.addEventListener('android:back', function(e) {
		console.debug("Pressing Back Will Not Close The Activity/Window");
		nsBandList.closeWindow();
	});
	
	var appdata = Titanium.App.Properties.getObject('appdata', {});

	var searchList = require("searchList");
	var list = searchList.init("BandList", appdata.bands);
	console.debug(JSON.stringify(list));
	$.vwMain.add(list);
};

nsBandList.init();
