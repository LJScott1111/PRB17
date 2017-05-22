var nsSchedule = {};
var currentCity = $.args.city;
var currentView,
    showType;
nsSchedule.propRed = {
	color : '#cc0000',
	touchEnabled : false
};
nsSchedule.propGrey = {
	color : '#c0c0c0',
	touchEnabled : true
};

nsSchedule.changeInScheduleScreen = function() {
	console.error(Alloy.Globals.currentScreen, Alloy.Globals.currentLayout);
	if (Alloy.Globals.currentScreen == 'mySchedule' && Alloy.Globals.currentLayout == 'table') {

		$.mainContent.removeAllChildren();

		nsSchedule.setLayoutToGrid();
		nsSchedule.showMySchedule();

	} else if (Alloy.Globals.currentScreen == 'mySchedule' && Alloy.Globals.currentLayout == 'grid') {

		$.mainContent.removeAllChildren();
		console.log('CALLING FROM MYSCHADULE, GRID');

		nsSchedule.setLayoutToTable();
		nsSchedule.showMySchedule();

		// var mySchedule = Alloy.createController('MySchedule', {
		// city : currentCity,
		// schedule : schedule
		// }).getView();
		//
		// $.mainContent.add(mySchedule);

	} else if (Alloy.Globals.currentScreen == 'schedule' && Alloy.Globals.currentLayout == 'table') {

		$.mainContent.removeAllChildren();
		nsSchedule.getEventsByDayForGrid();
		nsSchedule.setLayoutToGrid();

	} else if (Alloy.Globals.currentScreen == 'schedule' && Alloy.Globals.currentLayout == 'grid') {

		$.mainContent.removeAllChildren();
		var eventListByDay = Alloy.createController('EventListByDay', {
			city : currentCity,
			appdata : $.args.appdata,
			showsType : showsType
		}).getView();

		$.mainContent.add(eventListByDay);
		console.log('CALLING FROM SCHADULE, GRID');
		nsSchedule.setLayoutToTable();
	}
	console.error(Alloy.Globals.currentScreen, Alloy.Globals.currentLayout);
};

nsSchedule.setLayoutToTable = function() {
	Alloy.Globals.currentLayout = 'table';
	Titanium.App.fireEvent('changeToGrid');
};

nsSchedule.setLayoutToGrid = function() {
	Alloy.Globals.currentLayout = 'grid';
	Titanium.App.fireEvent('changeToTable');
};

var userschedule;
nsSchedule.showMySchedule = function() {

	$.mainContent.removeAllChildren();
	Titanium.App.fireEvent('showGridOption');
	console.log('CALLING FROM MYSCHADULE AE');
	nsSchedule.setLayoutToTable();

	$.my_schedule_icon.applyProperties(nsSchedule.propRed);
	$.my_schedule_text.applyProperties(nsSchedule.propRed);

	$.line_up_icon.applyProperties(nsSchedule.propGrey);
	$.line_up_text.applyProperties(nsSchedule.propGrey);

	$.schedule_icon.applyProperties(nsSchedule.propGrey);
	$.schedule_text.applyProperties(nsSchedule.propGrey);

	var openMySchedule = function(userschedule) {

		if (Alloy.Globals.currentLayout == 'grid') {

			// Change to table
			var userSchedule = Alloy.createController('UserSchedule', {
				city : currentCity,
				schedule : userschedule,
				// schedule : $.args.schedule,
				appdata : $.args.appdata,
				showsType : showsType,
				view : currentView
			}).getView();
			$.mainContent.add(userSchedule);
			nsSchedule.setLayoutToGrid();
		} else {

			// Change to grid
			var mySchedule = Alloy.createController('MySchedule', {
				city : currentCity,
				schedule : userschedule,
				// schedule : $.args.schedule,
				appdata : $.args.appdata,
				showsType : showsType,
				view : currentView
			}).getView();

			$.mainContent.add(mySchedule);
			console.log('CALLING FROM INSIDE SHOWMYSCHEDULE');
			nsSchedule.setLayoutToTable();
		}
	};

	var serviceCalls = require("serverCalls");

	if (currentView == 'fbands') {
		console.log('in fbands');

		var getUserSchedule = new serviceCalls.getUserSchedule(function(schedule) {

			userschedule = JSON.parse(JSON.stringify(schedule));
			openMySchedule(userschedule);

		}, function(error) {
			alert(L('err_fetchingDetails'));
		});
	} else {
		console.log('in cbands');

		var getUserSchedule = new serviceCalls.getUserClubSchedule(function(schedule) {

			userschedule = JSON.parse(JSON.stringify(schedule));
			openMySchedule(userschedule);

		}, function(error) {
			alert(L('err_fetchingDetails'));
		});
	}
};

nsSchedule.getEventsByDayForGrid = function() {

	var appdata = $.args.appdata;
	var bandlist = [];
	var eventSchedule = [];
	var show_date = '';
	// today = new Date(1495148400000);
	// TODO: remove: This is for testing

	for (i in appdata.details) {
		show_date = new Date(appdata.details[i].showDetails.start_time * 1000);
		if (appdata.details[i].showDetails.location.toLowerCase().replace(" ", "") === currentCity && appdata.details[i].bandDetails) {
			eventSchedule.push({
				start_time : appdata.details[i].showDetails.start_time,
				venue_id : appdata.details[i].showDetails.venue_id,
				show_id : appdata.details[i].showDetails._id,
				band_id : appdata.details[i].showDetails.band_id,
				showDetails : appdata.details[i].showDetails,
				bandDetails : appdata.details[i].bandDetails,
				venueDetails : appdata.details[i].venueDetails
			});
		}
	}

	var eventSchedule = Alloy.createController('UserSchedule', {
		city : currentCity,
		schedule : eventSchedule,
		type : 'eventSchedule',
		appdata : appdata,
		showsType : showsType
	}).getView();
	$.mainContent.add(eventSchedule);
};

$.my_schedule.addEventListener('click', function() {
	if (Alloy.Globals.currentScreen === 'mySchedule') {
		return;
	};

	Alloy.Globals.currentScreen = 'mySchedule', Alloy.Globals.currentLayout = 'table';
	nsSchedule.showMySchedule();

});

$.line_up.addEventListener('click', function() {
	if (Alloy.Globals.currentScreen === 'line_up') {
		return;
	};
	$.mainContent.removeAllChildren();
	Titanium.App.fireEvent('hideGridOption');
	console.log('CALLING FROM LINEUP AE');
	nsSchedule.setLayoutToTable();

	$.my_schedule_icon.applyProperties(nsSchedule.propGrey);
	$.my_schedule_text.applyProperties(nsSchedule.propGrey);

	$.line_up_icon.applyProperties(nsSchedule.propRed);
	$.line_up_text.applyProperties(nsSchedule.propRed);

	$.schedule_icon.applyProperties(nsSchedule.propGrey);
	$.schedule_text.applyProperties(nsSchedule.propGrey);

	var eventList = Alloy.createController('EventList', {
		city : currentCity,
		schedule : $.args.schedule,
		appdata : $.args.appdata,
		showsType : showsType
	}).getView();

	$.mainContent.add(eventList);
	Alloy.Globals.currentScreen = 'line_up', Alloy.Globals.currentLayout = 'table';
	console.log('Alloy.Globals.currentScreen = ', Alloy.Globals.currentScreen, ', Alloy.Globals.currentLayout = ', Alloy.Globals.currentLayout);
});

$.schedule.addEventListener('click', function() {
	if (Alloy.Globals.currentScreen === 'schedule') {
		return;
	};
	$.mainContent.removeAllChildren();
	Titanium.App.fireEvent('showGridOption');
	console.log('CALLING FROM SCHADULE AE');
	nsSchedule.setLayoutToTable();

	$.my_schedule_icon.applyProperties(nsSchedule.propGrey);
	$.my_schedule_text.applyProperties(nsSchedule.propGrey);

	$.line_up_icon.applyProperties(nsSchedule.propGrey);
	$.line_up_text.applyProperties(nsSchedule.propGrey);

	$.schedule_icon.applyProperties(nsSchedule.propRed);
	$.schedule_text.applyProperties(nsSchedule.propRed);

	console.error('schedule --->>>> ', JSON.stringify($.args.schedule));
	var eventListByDay = Alloy.createController('EventListByDay', {
		city : currentCity,
		schedule : $.args.schedule,
		// appdata : $.args.appdata,
		appdata : (currentView == 'fbands') ? $.args.appdata : Titanium.App.Properties.getObject('clubData'),
		showsType : showsType
	}).getView();

	$.mainContent.add(eventListByDay);
	Alloy.Globals.currentScreen = 'schedule', Alloy.Globals.currentLayout = 'table';
	console.error('Alloy.Globals.currentScreen = ', Alloy.Globals.currentScreen, ', Alloy.Globals.currentLayout = ', Alloy.Globals.currentLayout);
});
/*

 Titanium.App.addEventListener('updateScheduleArgs', function() {

 // return;
 var serviceCalls = require("serverCalls");
 if (showsType == 'festshows') {
 var getUserSchedule = new serviceCalls.getUserSchedule(function(schedule) {

 console.debug(JSON.stringify(schedule));
 userschedule = JSON.parse(JSON.stringify(schedule));

 }, function(error) {
 console.log('error Clubshows ', JSON.stringify(error));
 });
 } else {
 var getUserSchedule = new serviceCalls.getUserClubSchedule(function(schedule) {

 console.debug(JSON.stringify(schedule));
 userschedule = JSON.parse(JSON.stringify(schedule));

 }, function(error) {
 console.log('error Clubshows ', JSON.stringify(error));
 });
 }
 });
 */

nsSchedule.openLineup = function() {
	$.my_schedule_icon.applyProperties(nsSchedule.propGrey);
	$.my_schedule_text.applyProperties(nsSchedule.propGrey);

	$.line_up_icon.applyProperties(nsSchedule.propRed);
	$.line_up_text.applyProperties(nsSchedule.propRed);

	$.schedule_icon.applyProperties(nsSchedule.propGrey);
	$.schedule_text.applyProperties(nsSchedule.propGrey);
	Titanium.App.fireEvent('hideGridOption');
	console.error('before------------->>>>>> Alloy.Globals.currentScreen = ', Alloy.Globals.currentScreen, ', Alloy.Globals.currentLayout = ', Alloy.Globals.currentLayout);
	Alloy.Globals.currentScreen = 'line_up', Alloy.Globals.currentLayout = 'table';
	var eventList = Alloy.createController('EventList', {
		city : currentCity,
		schedule : $.args.schedule,
		appdata : (currentView == 'fbands') ? $.args.appdata : Titanium.App.Properties.getObject('clubData'),
		showsType : showsType,
		view : currentView
	}).getView();

	$.mainContent.add(eventList);
	nsSchedule.setLayoutToTable();
};

$.clubbands_view.addEventListener('click', function() {
	console.log('Alloy.Globals.currentScreen ', Alloy.Globals.currentScreen, currentCity);
	if (currentView == 'cbands') {
		return;
	};
	// currentCity = 'asburypark';
	currentView = 'cbands';
	showsType = 'clubshows';

	$.festivalbands_ul.backgroundColor = 'transparent';
	$.clubbands_ul.backgroundColor = '#D70C46';
	currentView = 'cbands';
	nsSchedule.openLineup();
});

$.festivalbands_view.addEventListener('click', function() {
	console.log('Alloy.Globals.currentScreen ', Alloy.Globals.currentScreen, currentCity);
	if (currentView == 'fbands') {
		return;
	};
	showsType = 'festshows';
	// currentCity = 'lasvegas';
	currentView = 'fbands';
	$.festivalbands_ul.backgroundColor = '#D70C46';
	$.clubbands_ul.backgroundColor = 'transparent';
	currentView = 'fbands';
	nsSchedule.openLineup();
});

nsSchedule.init = function() {

	for (var i = Alloy.Globals.scheduleEventListeners.length - 1; i >= 0; i--) {
		console.log(Alloy.Globals.scheduleEventListeners[i]);
		Titanium.App.removeEventListener(Alloy.Globals.scheduleEventListeners[i].name, Alloy.Globals.scheduleEventListeners[i].func);
		Alloy.Globals.scheduleEventListeners.pop();
	}

	Titanium.App.addEventListener('changeInScheduleScreen', nsSchedule.changeInScheduleScreen);
	Alloy.Globals.scheduleEventListeners.push({
		name : 'changeInScheduleScreen',
		func : nsSchedule.changeInScheduleScreen
	});
	console.error('nsSchedule.init CALLED........');
	console.log('ARGS SCHEDULE ', JSON.stringify($.args));

	// showsType = 'festshows';
	showsType = $.args.showsType;
	if (showsType == 'festshows') {
		currentView = 'fbands';
		$.festivalbands_ul.backgroundColor = '#D70C46';
		$.clubbands_ul.backgroundColor = 'transparent';
	} else {
		currentView = 'cbands';
		$.festivalbands_ul.backgroundColor = 'transparent';
		$.clubbands_ul.backgroundColor = '#D70C46';
	}

	if ($.args.screen == 'myschedule') {

		Alloy.Globals.currentScreen = 'mySchedule', Alloy.Globals.currentLayout = 'table';
		nsSchedule.showMySchedule();
	} else {
		nsSchedule.openLineup();
	}
};

nsSchedule.init();
