var nsVenueList = {};

// nsVenueList.args = arguments[0];

nsVenueList.closeWindow = function() {
	$.winVenueList.close();
};

nsVenueList.getSettings = function() {
};

nsVenueList.init = function(){
	$.winVenueList.addEventListener('android:back', function(e) {
		console.debug("Pressing Back Will Not Close The Activity/Window");
		nsVenueList.closeWindow();
	});
	
	var searchList = require("searchList");
	var list = searchList.init("VenueList", Alloy.Globals.venues);
	console.debug(JSON.stringify(list));
	$.vwMain.add(list);
};

nsVenueList.init();
