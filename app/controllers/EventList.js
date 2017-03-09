var nsEventList = {};

nsEventList.showBandList = function() {
	$.vwMainList.removeAllChildren();
	// var appdata = Titanium.App.Properties.getObject('appdata', {});
	var appdata = $.args.appdata;
	var bandlist = [];
	var currentCityData = [];
	console.error('APPDATA ', JSON.stringify(appdata));
	for (i in appdata.details) {

		// console.log(appdata.details[i].showDetails.location.toLowerCase(), $.args.city);
		if (appdata.details[i].showDetails.location.toLowerCase().replace(" ", "") === $.args.city && appdata.details[i].bandDetails) {
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
	var list = searchList.init("BandList", {
		list : bandlist,
		currentCityData : currentCityData,
		screen : 'lineup',
		showsType : $.args.showsType
	}, $.args.city);
	console.debug(JSON.stringify(list));
	Alloy.Globals.loading.hide();
	$.vwMainList.add(list);
};

nsEventList.showVenueList = function() {
	$.vwMainList.removeAllChildren();
	var appdata = $.args.appdata;
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
		currentCityData : currentCityData,
		screen : 'lineup'
	}, $.args.city);
	console.debug(JSON.stringify(list));
	$.vwMainList.add(list);
	Alloy.Globals.loading.hide();
};

nsEventList.init = function() {
	nsEventList.showBandList();
};

nsEventList.init();
