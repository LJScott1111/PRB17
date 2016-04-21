var nsBandList = {};

nsBandList.getSettings = function() {
	// Alloy.Globals.getSettings($.winBandList);
};

nsBandList.init = function() {

	Alloy.Globals.loading.show();
	Alloy.Globals.getAndStoreData(function(data) {
		var appdata = Titanium.App.Properties.getObject('appdata', {});

		var searchList = require("searchList");
		var list = searchList.init("BandList", appdata.bands);
		console.debug(JSON.stringify(list));
		$.vwMain.add(list);
		Alloy.Globals.loading.hide();
	});
};

nsBandList.init();
