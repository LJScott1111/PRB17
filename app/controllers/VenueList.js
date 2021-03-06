var nsVenueList = {};

nsVenueList.getShowsDataForCity = function() {

	var appdata = Titanium.App.Properties.getObject('appdata', {});
	var venuelist = [];
	var currentCityData = [];
	for (i in appdata.details) {

		if (appdata.details[i].venueDetails && appdata.details[i].venueDetails.location.replace(" ", "") === $.args.city) {
			currentCityData.push({
				showDetails : appdata.details[i].showDetails,
				bandDetails : appdata.details[i].bandDetails,
				venueDetails : appdata.details[i].venueDetails
			});
			// console.log(JSON.stringify(appdata.details[i].venueDetails));
		}
	}

	for (i in appdata.venues) {
		if (appdata.venues[i].location === $.args.city) {
			venuelist.push(appdata.venues[i]);
		}
	}

	console.error('venuelist === ', JSON.stringify(venuelist));

	var searchList = require("searchList");
	var list = searchList.init("VenueList", {
		list : venuelist,
		currentCityData : currentCityData
	}, $.args.city);
	console.debug(JSON.stringify(list));
	$.list_view.add(list);
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
