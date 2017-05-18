var nsMySchedule = {};

$.when_view.addEventListener('click', function() {

	$.when_lbl.color = '#cc0000';
	$.where_lbl.color = '#c0c0c0';
	$.when_selected.backgroundColor = '#cc0000';
	$.where_selected.backgroundColor = 'transparent';
	nsMySchedule.showBandList();
});

$.where_view.addEventListener('click', function() {

	$.where_lbl.color = '#cc0000';
	$.when_lbl.color = '#c0c0c0';
	$.where_selected.backgroundColor = '#cc0000';
	$.when_selected.backgroundColor = 'transparent';
	nsMySchedule.showVenueList();
});

nsMySchedule.showBandList = function() {
	$.show_list.removeAllChildren();
	var bandlist = [];
	var currentCityData = [];

	for (i in $.args.schedule) {
		if ($.args.schedule[i].showDetails.location.toLowerCase().replace(" ", "") === $.args.city && $.args.schedule[i].bandDetails) {
			currentCityData.push($.args.schedule[i]);
			$.args.schedule[i].bandDetails.start_time = $.args.schedule[i].showDetails.start_time;
			bandlist.push($.args.schedule[i].bandDetails);
		}
	}
	console.error('bandList === ', JSON.stringify(bandlist));

	var searchList = require("searchList");
	var list = searchList.init("BandList", {
		list : bandlist,
		currentCityData : currentCityData,
		listType : 'time',
		screen : 'myschedule',
		showsType : $.args.showsType
	}, $.args.city);
	console.debug(JSON.stringify(list));
	Alloy.Globals.loading.hide();
	$.show_list.add(list);
};

nsMySchedule.showVenueList = function() {
	$.show_list.removeAllChildren();
	var venuelist = [];
	var currentCityData = [];
	for (i in $.args.schedule) {

		if ($.args.schedule[i].venueDetails && $.args.schedule[i].venueDetails.location.replace(" ", "") === $.args.city) {
			currentCityData.push({
				showDetails : $.args.schedule[i].showDetails,
				bandDetails : $.args.schedule[i].bandDetails,
				venueDetails : $.args.schedule[i].venueDetails
			});
			venuelist.push($.args.schedule[i].venueDetails);
		}
	}

	console.error('venuelist === ', JSON.stringify(venuelist));

	var searchList = require("searchList");
	var list = searchList.init("VenueList", {
		list : venuelist,
		currentCityData : currentCityData,
		screen : 'myschedule'
	}, $.args.city);
	console.debug(JSON.stringify(list));
	$.show_list.add(list);
	Alloy.Globals.loading.hide();
};

Titanium.App.addEventListener('updateScheduleArgs', function() {

	$.show_list.removeAllChildren();
	var showType = $.args.showType;
	var serviceCalls = require("serverCalls");
	if (showsType == 'festshows') {
		var getUserSchedule = new serviceCalls.getUserSchedule(function(schedule) {

			console.debug(JSON.stringify(schedule));
			$.args.schedule = JSON.parse(JSON.stringify(schedule));
			nsMySchedule.showBandList();

		}, function(error) {
			console.log('error Clubshows ', JSON.stringify(error));
		});
	} else {
		var getUserSchedule = new serviceCalls.getUserClubSchedule(function(schedule) {

			console.debug(JSON.stringify(schedule));
			$.args.schedule = JSON.parse(JSON.stringify(schedule));
			nsMySchedule.showBandList();

		}, function(error) {
			console.log('error Clubshows ', JSON.stringify(error));
		});
	}
});

nsMySchedule.init = function() {

	console.error('MYSCHEDULE INIT', JSON.stringify($.args.schedule));
	nsMySchedule.showBandList();
};

nsMySchedule.init();
