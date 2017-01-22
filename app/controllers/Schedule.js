var nsSchedule = {};
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
		// city : $.args.city,
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
			city : $.args.city,
			schedule : $.args.schedule
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

nsSchedule.showMySchedule = function() {
	var serviceCalls = require("serverCalls");
	var getUserSchedule = new serviceCalls.getUserSchedule(function(schedule) {

		console.error('JSON.stringify(schedule) ', JSON.stringify(schedule));
		console.log('Alloy.Globals.currentLayout IS:::: ', Alloy.Globals.currentLayout);

		if (Alloy.Globals.currentLayout == 'grid') {

			// Change to table
			var userSchedule = Alloy.createController('UserSchedule', {
				city : $.args.city,
				schedule : schedule
			}).getView();
			$.mainContent.add(userSchedule);
			nsSchedule.setLayoutToGrid();
		} else {

			// Change to grid
			var mySchedule = Alloy.createController('MySchedule', {
				city : $.args.city,
				schedule : schedule
			}).getView();

			$.mainContent.add(mySchedule);
			console.log('CALLING FROM INSIDE SHOWMYSCHEDULE');
			nsSchedule.setLayoutToTable();
		}

	}, function(error) {
		alert(L('err_fetchingDetails'));
	});

	// Alloy.Globals.currentScreen = 'mySchedule', Alloy.Globals.currentLayout = 'table';
	console.log('Alloy.Globals.currentScreen = ', Alloy.Globals.currentScreen, ', Alloy.Globals.currentLayout = ', Alloy.Globals.currentLayout);
};

nsSchedule.getEventsByDayForGrid = function() {

	var appdata = Titanium.App.Properties.getObject('appdata', {});
	var bandlist = [];
	var eventSchedule = [];
	var show_date = '';
	// today = new Date(1495148400000);
	// TODO: remove: This is for testing

	for (i in appdata.details) {
		show_date = new Date(appdata.details[i].showDetails.start_time * 1000);
		if (appdata.details[i].showDetails.location.toLowerCase().replace(" ", "") === $.args.city && appdata.details[i].bandDetails) {
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
		city : $.args.city,
		schedule : eventSchedule,
		type : 'eventSchedule'
	}).getView();
	$.mainContent.add(eventSchedule);
};

$.my_schedule.addEventListener('click', function() {
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

	nsSchedule.showMySchedule();
	Alloy.Globals.currentScreen = 'mySchedule', Alloy.Globals.currentLayout = 'table';
});

$.line_up.addEventListener('click', function() {
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
		city : $.args.city,
		schedule : $.args.schedule
	}).getView();

	$.mainContent.add(eventList);
	Alloy.Globals.currentScreen = 'line_up', Alloy.Globals.currentLayout = 'table';
	console.log('Alloy.Globals.currentScreen = ', Alloy.Globals.currentScreen, ', Alloy.Globals.currentLayout = ', Alloy.Globals.currentLayout);
});

$.schedule.addEventListener('click', function() {
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
		city : $.args.city,
		schedule : $.args.schedule
	}).getView();

	$.mainContent.add(eventListByDay);
	Alloy.Globals.currentScreen = 'schedule', Alloy.Globals.currentLayout = 'table';
	console.error('Alloy.Globals.currentScreen = ', Alloy.Globals.currentScreen, ', Alloy.Globals.currentLayout = ', Alloy.Globals.currentLayout);
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

	$.my_schedule_icon.applyProperties(nsSchedule.propRed);
	$.my_schedule_text.applyProperties(nsSchedule.propRed);
	console.error('before------------->>>>>> Alloy.Globals.currentScreen = ', Alloy.Globals.currentScreen, ', Alloy.Globals.currentLayout = ', Alloy.Globals.currentLayout);
	Alloy.Globals.currentScreen = 'mySchedule', Alloy.Globals.currentLayout = 'table';
	nsSchedule.showMySchedule();

	console.error('after------------->>>>>> Alloy.Globals.currentScreen = ', Alloy.Globals.currentScreen, ', Alloy.Globals.currentLayout = ', Alloy.Globals.currentLayout);
};

nsSchedule.init();

// $.vwMain.addEventListener('focus', nsSchedule.init);

// var children = $.vwMain.getParent();
// console.error('SCHEDULE CHILDREN +++++++=======?????>>>>> ', JSON.stringify(children));