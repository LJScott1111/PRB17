var nsBandList = {};

// nsBandList.args = arguments[0];

nsBandList.getSettings = function() {
	// Alloy.Globals.getSettings($.winBandList);
};

nsBandList.init = function() {

	// $.activityIndicator.show();: TODO Loading View
	Alloy.Globals.getAndStoreData(function(data) {
		var appdata = Titanium.App.Properties.getObject('appdata', {});

		var searchList = require("searchList");
		var list = searchList.init("BandList", appdata.bands);
		console.debug(JSON.stringify(list));
		$.vwMain.add(list);
		// $.activityIndicator.hide();
	});
};

nsBandList.init();
