var nsVenueList = {};

nsVenueList.getSettings = function() {
	// Alloy.Globals.getSettings($.winVenueList);
};

nsVenueList.getShowsDataForCity = function() {

	var appdata = Titanium.App.Properties.getObject('appdata', {});
	var venuelist = [];
	var currentCityData = [];
	for (i in appdata.details) {

		if (appdata.details[i].venueDetails.location === $.args.city) {
			currentCityData.push({
				showDetails : appdata.details[i].showDetails,
				bandDetails : appdata.details[i].bandDetails,
				venueDetails : appdata.details[i].venueDetails
			});
			console.log(appdata.details[i].venueDetails);
			venuelist.push(appdata.details[i].venueDetails);
		}
	}
	console.error('venuelist === ', JSON.stringify(venuelist));

	var searchList = require("searchList");
	var list = searchList.init("venuelist", {
		list : venuelist,
		currentCityData : currentCityData
	}, $.args.city);
	console.debug(JSON.stringify(list));
	$.vwMain.add(list);
	Alloy.Globals.loading.hide();
};

nsVenueList.init = function() {

	Alloy.Globals.loading.show();
	var appdata = Titanium.App.Properties.getObject('appdata', {});

	if (appdata.details) {

		nsVenueList.getShowsDataForCity();

	} else {
		Alloy.Globals.getAndStoreData(function(data) {

			nsVenueList.getShowsDataForCity();
		});
	}
};

nsVenueList.init();
