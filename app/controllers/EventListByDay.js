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

nsEventList.getDay = function(timestamp, type) {
	var dateObj = nsGridSchedule.momentjs(timestamp * 1000).utcOffset('-0700');

	if (type === "day") {
		return dateObj.utcOffset('-0700').format('dddd');
	} else {
		return dateObj.utcOffset('-0700').format('h:m a');
	}
};

nsEventList.showBandList = function() {
	$.show_list.removeAllChildren();
	var appdata = ($.args.showsType == 'festshows') ? Titanium.App.Properties.getObject('appdata', {}) : Titanium.App.Properties.getObject('clubData', {});
	var bandlist = [];
	var currentCityData = [];
	var show_date = '';
	
	for (i in appdata.details) {
		show_date = new Date(appdata.details[i].showDetails.start_time * 1000);
		if (appdata.details[i].showDetails.location.toLowerCase().replace(" ", "") === $.args.city && appdata.details[i].bandDetails) {
			currentCityData.push({
				showDetails : appdata.details[i].showDetails,
				bandDetails : appdata.details[i].bandDetails,
				venueDetails : appdata.details[i].venueDetails
			});
			appdata.details[i].bandDetails.start_time = appdata.details[i].showDetails.start_time;
			bandlist.push(appdata.details[i].bandDetails);
		}
	}
	console.error('bandList === ', JSON.stringify(bandlist));

	var searchList = require("searchList");
	var list = searchList.init("BandList", {
		list : bandlist,
		currentCityData : currentCityData,
		listType : 'time',
		screen : 'schedule',
		showsType : $.args.showsType
	}, $.args.city);
	console.debug(JSON.stringify(list));
	Alloy.Globals.loading.hide();
	$.show_list.add(list);
};

nsEventList.showVenueList = function() {
	$.show_list.removeAllChildren();
	var appdata = ($.args.showsType == 'festshows') ? Titanium.App.Properties.getObject('appdata', {}) : Titanium.App.Properties.getObject('clubData', {});
	var venuelist = [];
	var currentCityData = [];
	var show_date = '';

	for (i in appdata.details) {
		show_date = new Date(appdata.details[i].showDetails.start_time * 1000);

		if (appdata.details[i].venueDetails && appdata.details[i].venueDetails.location.replace(" ", "") === $.args.city) {
			currentCityData.push({
				showDetails : appdata.details[i].showDetails,
				bandDetails : appdata.details[i].bandDetails,
				venueDetails : appdata.details[i].venueDetails
			});
			venuelist.push(appdata.details[i].venueDetails);
		}
	}

	console.error('venuelist === ', JSON.stringify(venuelist));

	var searchList = require("searchList");
	var list = searchList.init("VenueList", {
		list : venuelist,
		currentCityData : currentCityData,
		screen : 'schedule'
	}, $.args.city);
	console.debug(JSON.stringify(list));
	$.show_list.add(list);
	Alloy.Globals.loading.hide();
};

nsEventList.init = function() {
	nsEventList.showBandList();
};

nsEventList.init();
