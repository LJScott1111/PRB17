var nsBandList = {};

nsBandList.getShowsDataForCity = function() {

	var appdata = Titanium.App.Properties.getObject('appdata', {});
	var bandlist = [];
	var currentCityData = [];
	for (i in appdata.details) {

		if (appdata.details[i].showDetails.location.replace(" ", "") === $.args.city && appdata.details[i].bandDetails) {
			currentCityData.push({
				showDetails : appdata.details[i].showDetails,
				bandDetails : appdata.details[i].bandDetails,
				venueDetails : appdata.details[i].venueDetails
			});
			bandlist.push(appdata.details[i].bandDetails);
		}
	}
	console.error('bandList === ', JSON.stringify(bandlist));

	var searchList = require("searchList");
	var list = searchList.init("BandList", {list: bandlist, currentCityData: currentCityData}, $.args.city);
	console.debug(JSON.stringify(list));
	$.vwMain.add(list);
	Alloy.Globals.loading.hide();
};

nsBandList.init = function() {

	Alloy.Globals.loading.show();
	var appdata = Titanium.App.Properties.getObject('appdata', {});

	if (appdata.details) {

		nsBandList.getShowsDataForCity();

	} else {
		Alloy.Globals.getAndStoreData(function(data) {

			nsBandList.getShowsDataForCity();
		});
	}
};

nsBandList.init();
