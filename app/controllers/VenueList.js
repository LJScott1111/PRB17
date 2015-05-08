var nsVenueList = {};

nsVenueList.getMoreOptions = function() {
};

nsVenueList.getSettings = function() {
};

nsVenueList.init = function(){
	
	var searchList = require("searchList");
	var list = searchList.init("VenueList");
	console.debug(JSON.stringify(list));
	$.vwMain.add(list);
};

nsVenueList.init();
