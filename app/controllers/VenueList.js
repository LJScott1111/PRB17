var nsVenueList = {};

// nsVenueList.args = arguments[0];

nsVenueList.getSettings = function() {
	// Alloy.Globals.getSettings($.winVenueList);
};

nsVenueList.init = function() {

	// $.activityIndicator.show(); : TODO Loading View
	Alloy.Globals.getAndStoreData(function(data) {
		var appdata = Titanium.App.Properties.getObject('appdata', {});

		var searchList = require("searchList");
		var list = searchList.init("VenueList", appdata.venues);
		console.debug(JSON.stringify(list));
		$.vwMain.add(list);
		// $.activityIndicator.hide();
	});
};

nsVenueList.init();
