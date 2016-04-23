var nsVenueList = {};

nsVenueList.getSettings = function() {
	// Alloy.Globals.getSettings($.winVenueList);
};

nsVenueList.init = function() {

	Alloy.Globals.loading.show();
	Alloy.Globals.getAndStoreData(function(data) {
		var appdata = Titanium.App.Properties.getObject('appdata', {});

		var searchList = require("searchList");
		var list = searchList.init("VenueList", appdata.venues);
		console.debug(JSON.stringify(list));
		$.vwMain.add(list);
		Alloy.Globals.loading.hide();
	});
};

nsVenueList.init();
