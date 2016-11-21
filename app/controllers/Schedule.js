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

$.my_schedule.addEventListener('click', function() {
	$.mainContent.removeAllChildren();
	Titanium.App.fireEvent('showGridOption');
	$.my_schedule_icon.applyProperties(nsSchedule.propRed);
	$.my_schedule_text.applyProperties(nsSchedule.propRed);

	$.line_up_icon.applyProperties(nsSchedule.propGrey);
	$.line_up_text.applyProperties(nsSchedule.propGrey);

	$.schedule_icon.applyProperties(nsSchedule.propGrey);
	$.schedule_text.applyProperties(nsSchedule.propGrey);
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
});

nsSchedule.init = function() {

	$.my_schedule_icon.applyProperties(nsSchedule.propRed);
	$.my_schedule_text.applyProperties(nsSchedule.propRed);

	// var eventList = Alloy.createController('EventList', {
	// city : $.args.city,
	// schedule : $.args.schedule
	// }).getView();
	//
	// $.mainContent.add(eventList);
};

nsSchedule.init();
