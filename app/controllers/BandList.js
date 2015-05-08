var nsBandList = {};

nsBandList.getMoreOptions = function() {
};

nsBandList.getSettings = function() {
};

nsBandList.init = function(){
	
	var searchList = require("searchList");
	var list = searchList.init("BandList");
	console.debug(JSON.stringify(list));
	$.vwMain.add(list);
};

nsBandList.init();
