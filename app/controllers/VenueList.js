var nsVenueList = {};

// nsVenueList.args = arguments[0];

nsVenueList.closeWindow = function() {
	Alloy.Globals.windowStack.pop();
	$.winVenueList.close();
};

nsVenueList.getSettings = function() {
	Alloy.Globals.getSettings($.winVenueList);
};

nsVenueList.init = function(){
	Alloy.Globals.windowStack.push($.winVenueList);
	
	$.winVenueList.addEventListener('android:back', function(e) {
		console.debug("Pressing Back Will Not Close The Activity/Window");
		nsVenueList.closeWindow();
	});
	
	var appdata = Titanium.App.Properties.getObject('appdata', {});
	
	var searchList = require("searchList");
	var list = searchList.init("VenueList", appdata.venues);
	console.debug(JSON.stringify(list));
	$.vwMain.add(list);
};

nsVenueList.init();
