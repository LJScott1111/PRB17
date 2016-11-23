var nsSchedule = {};
nsSchedule.propRed = {
	color : '#cc0000',
	touchEnabled : false
};
nsSchedule.propGrey = {
	color : '#c0c0c0',
	touchEnabled : true
};

Titanium.App.addEventListener('changeInScheduleScreen', function(action) {

});

nsSchedule.showMySchedule = function(){
	var serviceCalls = require("serverCalls");
	var getUserSchedule = new serviceCalls.getUserSchedule(function(schedule) {

		console.error(JSON.stringify(schedule));
		var mySchedule = Alloy.createController('MySchedule', {
			city : $.args.city,
			schedule : schedule
		}).getView();

		$.mainContent.add(mySchedule);

	}, function(error) {
		alert(L('err_fetchingDetails'));
	});
};

$.my_schedule.addEventListener('click', function() {
	$.mainContent.removeAllChildren();
	Titanium.App.fireEvent('showGridOption');
	$.my_schedule_icon.applyProperties(nsSchedule.propRed);
	$.my_schedule_text.applyProperties(nsSchedule.propRed);

	$.line_up_icon.applyProperties(nsSchedule.propGrey);
	$.line_up_text.applyProperties(nsSchedule.propGrey);

	$.schedule_icon.applyProperties(nsSchedule.propGrey);
	$.schedule_text.applyProperties(nsSchedule.propGrey);

	nsSchedule.showMySchedule();
});

$.line_up.addEventListener('click', function() {
	$.mainContent.removeAllChildren();
	Titanium.App.fireEvent('hideGridOption');
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
});

$.schedule.addEventListener('click', function() {
	$.mainContent.removeAllChildren();
	Titanium.App.fireEvent('showGridOption');
	$.my_schedule_icon.applyProperties(nsSchedule.propGrey);
	$.my_schedule_text.applyProperties(nsSchedule.propGrey);

	$.line_up_icon.applyProperties(nsSchedule.propGrey);
	$.line_up_text.applyProperties(nsSchedule.propGrey);

	$.schedule_icon.applyProperties(nsSchedule.propRed);
	$.schedule_text.applyProperties(nsSchedule.propRed);

	var eventListByDay = Alloy.createController('EventListByDay', {
		city : $.args.city,
		schedule : $.args.schedule
	}).getView();

	$.mainContent.add(eventListByDay);
});

nsSchedule.init = function() {

	$.my_schedule_icon.applyProperties(nsSchedule.propRed);
	$.my_schedule_text.applyProperties(nsSchedule.propRed);

	nsSchedule.showMySchedule();
};

nsSchedule.init();
