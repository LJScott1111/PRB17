var nsEventList = {};

$.when_view.addEventListener('click', function() {

	$.when_lbl.color = '#cc0000';
	$.where_lbl.color = '#c0c0c0';
	$.when_selected.backgroundColor = '#cc0000';
	$.where_selected.backgroundColor = 'transparent';
	nsEventList.showBandList();
});

$.where_view.addEventListener('click', function() {

	$.where_lbl.color = '#cc0000';
	$.when_lbl.color = '#c0c0c0';
	$.where_selected.backgroundColor = '#cc0000';
	$.when_selected.backgroundColor = 'transparent';
	nsEventList.showVenueList();
});

nsEventList.showBandList = function() {
	$.show_list.removeAllChildren();
	var appdata = Titanium.App.Properties.getObject('appdata', {});
	var bandlist = [];
	var currentCityData = [];
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
		currentCityData : currentCityData
	}, $.args.city);
	console.debug(JSON.stringify(list));
	Alloy.Globals.loading.hide();
	$.show_list.add(list);
};

nsEventList.showVenueList = function() {
	$.show_list.removeAllChildren();
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
	$.show_list.add(list);
	Alloy.Globals.loading.hide();
};

nsEventList.init = function() {
	nsEventList.showBandList();
};

nsEventList.init();
