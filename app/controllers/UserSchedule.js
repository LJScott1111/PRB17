var nsGridSchedule = {};
nsGridSchedule.args = [];
nsGridSchedule.momentjs = require('moment');

nsGridSchedule.getDay = function(timestamp, type) {
	var dateObj = nsGridSchedule.momentjs(timestamp * 1000).utcOffset('-0700');

	if (type === "day") {
		return dateObj.utcOffset('-0700').format('dddd');
	} else {
		return dateObj.utcOffset('-0700').format('h:m a');
	}
};

nsGridSchedule.createLayout = function(data) {

	// console.log('dataToCreateSchedule = ', JSON.stringify(data));

	var bandBoxHeight = Alloy.Globals.platformHeight * 0.0792;
	var bandBoxWidth = Alloy.Globals.platformWidth * 0.3434;

	var bandBoxContainerHeight = Alloy.Globals.platformHeight * 0.088;
	var venueNameViewWidth = Alloy.Globals.platformWidth * 0.1875;

	var timeBoxWidth = bandBoxWidth / 4;

	console.log('---------- nsGridSchedule.createLayout ---------');

	this.createTimeFrameBox = function(time) {

		var timeBoxView = Titanium.UI.createView({
			layout : 'horizontal',
			height : bandBoxHeight,
			width : bandBoxWidth
		});

		var timeLabel = Titanium.UI.createLabel({
			bottom : 2,
			height : Titanium.UI.FILL,
			width : Titanium.UI.FILL,
			text : time.value + time.unit,
			color : '#F3CB87',
			font : {
				fontSize : Alloy.Globals.theme.fonts.size10Fonts
			}
		});

		timeBoxView.add(timeLabel);
		return timeBoxView;
	};

	this.createTimeframe = function() {

		var timeframeContainer = Titanium.UI.createView({
			width : Titanium.UI.FILL,
			height : bandBoxContainerHeight / 2,
			layout : 'horizontal',
			horizontalWrap : false,
			borderColor : '#F3CB87',
			borderWidth : 1,
			left : 0,
			top : 0
		});

		var placeholder = Titanium.UI.createView({
			left : venueNameViewWidth,
			right : 5,
			height : Titanium.UI.FILL,
			width : 1,
			backgroundColor : '#F3CB87'
		});

		timeframeContainer.add(placeholder);

		console.error('data.timeframe.timeArray ', JSON.stringify(data.timeframe.timeArray));

		for (i in data.timeframe.timeArray) {
			timeframeContainer.add(this.createTimeFrameBox(data.timeframe.timeArray[i]));
		}

		return timeframeContainer;
	};

	// Small box of band details --- starts from here
	this.createBandBox = function(bName, bImage, showTime, bandId) {

		var left = venueNameViewWidth + 5;
		console.log('bName = ', bName, ' ', bImage, ' ', showTime);

		var startTime = nsGridSchedule.momentjs(showTime * 1000).utcOffset('-0700').format('H.mm');
		var displayableStartTime = nsGridSchedule.momentjs(showTime * 1000).utcOffset('-0700').format('h:mm a');

		// console.log('data.timeArray ', JSON.stringify(data.timeframe.timeArray));
		// console.log('timeframe startTime ', startTime);

		for (i in data.timeframe.timeArray) {
			// console.log('----> ', data.timeframe.timeArray[i].id, ' ', Math.floor(startTime));
			var block = 0;

			var splitedTime = startTime.split('.')[1];
			var mainTimeBlock = startTime.split('.')[0];
			// console.log('MainTimeBlock', mainTimeBlock, index);
			var index = data.timeframe.timeArray.indexOf(data.timeframe.timeArray[i]);

			if (data.timeframe.timeArray[i].id == mainTimeBlock) {

				if (splitedTime >= 0 && splitedTime <= 14) {

					block = 0;
					left = left + block * timeBoxWidth + index * bandBoxWidth;
					//break;
				} else if (splitedTime >= 15 && splitedTime <= 29) {

					block = 1;
					left = left + block * timeBoxWidth + index * bandBoxWidth;
					//break;
				} else if (splitedTime >= 30 && splitedTime <= 44) {

					block = 2;
					left = left + block * timeBoxWidth + index * bandBoxWidth;
					//break;
				} else {

					block = 3;
					left = left + block * timeBoxWidth + index * bandBoxWidth;
					//break;
				}
			}
			// console.log('LEFT:', left);
		}

		var bandBoxView = Titanium.UI.createView({
			layout : 'vertical',
			height : bandBoxHeight,
			width : bandBoxWidth,
			horizontalWrap : false,
			backgroundColor : '#ffffff',
			borderColor : '#000',
			borderRadius : 3,
			left : left,
			top : 2,
			bandId : bandId
		});

		bandBoxView.addEventListener('click', function(e) {
			Alloy.Globals.openWindow("BandProfile", {
				"id" : e.source.bandId
			}, true, null, 'misc/center_logo');
		});

		var bandImage = Titanium.UI.createImageView({
			left : 3,
			height : bandBoxHeight,
			width : bandBoxHeight,
			borderColor : '#000000',
			borderWidth : 1,
			image : bImage,
			touchEnabled : false
		});

		var bandName = Titanium.UI.createLabel({
			left : 5,
			top : 5,
			right : 5,
			width : Titanium.UI.FILL,
			text : bName,
			ellipsize : true,
			horizontalWrap : true,
			touchEnabled : false,
			wordWrap : true,
			textAlign : Titanium.UI.TEXT_ALIGNMENT_LEFT,
			color : '#000000',
			font : {
				fontSize : Alloy.Globals.theme.fonts.size10Fonts,
				fontWeight : 'bold'
			}
		});

		var bandStartTime = Titanium.UI.createLabel({
			left : 5,
			width : Titanium.UI.FILL,
			text : displayableStartTime,
			ellipsize : true,
			horizontalWrap : true,
			touchEnabled : false,
			wordWrap : true,
			textAlign : Titanium.UI.TEXT_ALIGNMENT_LEFT,
			color : '#FF0000',
			font : {
				fontSize : Alloy.Globals.theme.fonts.size10Fonts,
				fontWeight : 'bold'
			}
		});

		bandBoxView.add(bandName);
		bandBoxView.add(bandStartTime);
		return bandBoxView;
	};
	// Small box of band details --- ends here

	// Container row of bands - starts from here
	this.createBandBoxContainer = function(venue) {

		console.error('SORT THIS OUT ', JSON.stringify(venue));

		var bandBoxContainer = Titanium.UI.createView({
			width : Titanium.UI.FILL,
			height : bandBoxContainerHeight,
			layout : 'absolute',
			horizontalWrap : false,
			borderColor : '#F3CB87',
			borderWidth : 1,
			left : 0,
			top : 0
		});

		var venueNameView = Titanium.UI.createView({
			width : venueNameViewWidth,
			height : Titanium.UI.FILL,
			borderColor : '#F3CB87',
			borderWidth : 1,
			left : 0
		});

		var venueName = Titanium.UI.createLabel({
			left : 3,
			height : Titanium.UI.FILL,
			width : Titanium.UI.FILL,
			text : venue.venueName,
			textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
			color : '#F3CB87',
			font : {
				fontSize : Alloy.Globals.theme.fonts.size10Fonts
			}
		});

		venueNameView.add(venueName);
		bandBoxContainer.add(venueNameView);

		venue.shows.sort(Alloy.Globals.sortArray('start_time'));
		for (i in venue.shows) {
			console.log(new Date(venue.shows[i].show.start_time * 1000));
			bandBoxContainer.add(this.createBandBox(venue.shows[i].band.name, venue.shows[i].band.image_link, venue.shows[i].show.start_time, venue.shows[i].band._id));
		}
		return bandBoxContainer;
	};
	// Container row of bands - ends here

	// Add Schedule UI on screen
	this.addScheduleUI = function() {

		var mainHorizontalScrollContainer = Titanium.UI.createScrollView({

			width : Titanium.UI.FILL,
			height : Titanium.UI.SIZE,
			borderColor : '#000000',
			scrollType : 'horizontal',
			layout : 'vertical',
			disableBounce : true,
			contentHeight : Ti.UI.SIZE,
			contentWidth : Ti.UI.SIZE,
			top : 0
		});

		var verticalScrollContainer = Titanium.UI.createScrollView({

			width : Titanium.UI.FILL,
			height : 280,
			scrollType : 'vertical',
			layout : 'vertical',
			disableBounce : true,
			contentHeight : Ti.UI.SIZE,
			contentWidth : Ti.UI.SIZE,
			top : 0,
			left : 0,
		});

		data.showsGroupedByVenue.sort(Alloy.Globals.sortArray('start_time'));

		for (i in data.showsGroupedByVenue) {
			console.error('start_time --->>>> ', data.showsGroupedByVenue[i].start_time)
			console.log('data.showsGroupedByVenue[i] ---->>> ', JSON.stringify(data.showsGroupedByVenue[i]));
			verticalScrollContainer.add(this.createBandBoxContainer(data.showsGroupedByVenue[i]));
		}

		mainHorizontalScrollContainer.add(this.createTimeframe());
		mainHorizontalScrollContainer.add(verticalScrollContainer);
		$.vwBandSchedule.add(mainHorizontalScrollContainer);

	};

	this.addScheduleUI();

	console.log('---------- End of nsGridSchedule.createLayout ---------');
};

nsGridSchedule.createDataForLayout = function(data) {

	$.vwBandSchedule.removeAllChildren();

	if (data.length == 0) {

		var lblNoShows = Titanium.UI.createLabel({
			top : 20,
			left : 20,
			right : 20,
			text : ($.args.type != 'eventSchedule') ? L('no_show_selected_for_this_day') : L('no_show_on_this_day'),
			textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
			color : "#F5C787",
			font : {
				fontSize : Alloy.Globals.theme.fonts.size15Fonts,
				fontFamily : "KnowYourProduct"
			}
		});

		$.vwBandSchedule.add(lblNoShows);
		return;
	}

	var dataToCreateSchedule = {
		timeframe : {}
	};

	// Hours array by default
	// var hours = [{id:'0',value:'12',unit:'am'},{id:1,value:'1',unit:'am'},{id:2,value:'2',unit:'am'},{id:3,value:'3',unit:'am'},{id:4,value:'4',unit:'am'},{id:5,value:'5',unit:'am'},{id:6,value:'6',unit:'am'},{id:7,value:'7',unit:'am'},{id:8,value:'8',unit:'am'},{id:9,value:'9',unit:'am'},{id:10,value:'10',unit:'am'},{id:11,value:'11',unit:'am'},{id:12,value:'12',unit:'pm'},{id:13,value:'1',unit:'pm'},{id:14,value:'2',unit:'pm'},{id:15,value:'3',unit:'pm'},{id:16,value:'4',unit:'pm'},{id:17,value:'5',unit:'pm'},{id:18,value:'6',unit:'pm'},{id:19,value:'7',unit:'pm'},{id:20,value:'8',unit:'pm'},{id:21,value:'9',unit:'pm'},{id:22,value:'10',unit:'pm'},{id:23,value:'11',unit:'pm'}];
	var hours = [{
		id : '0',
		value : '12',
		unit : 'am'
	}, {
		id : 1,
		value : '1',
		unit : 'am'
	}, {
		id : 2,
		value : '2',
		unit : 'am'
	}, {
		id : 14,
		value : '2',
		unit : 'pm'
	}, {
		id : 15,
		value : '3',
		unit : 'pm'
	}, {
		id : 16,
		value : '4',
		unit : 'pm'
	}, {
		id : 17,
		value : '5',
		unit : 'pm'
	}, {
		id : 18,
		value : '6',
		unit : 'pm'
	}, {
		id : 19,
		value : '7',
		unit : 'pm'
	}, {
		id : 20,
		value : '8',
		unit : 'pm'
	}, {
		id : 21,
		value : '9',
		unit : 'pm'
	}, {
		id : 22,
		value : '10',
		unit : 'pm'
	}, {
		id : 23,
		value : '11',
		unit : 'pm'
	}];

	// Get the min and max time of shows from the data set
	var min = data[0].showDetails.start_time,
	    max = data[0].showDetails.start_time;
	// console.log('MINMAX', min, max);
	console.error('DATA ', JSON.stringify(data));

	var minIndex = 0,
	    maxIndex = 0;
	for (i in data) {

		// console.log('DATE = ', new Date(data[i].showDetails.start_time * 1000));
		if (data[i].showDetails.start_time <= min) {

			min = data[i].showDetails.start_time;
			minIndex = i;

		} else {

			max = data[i].showDetails.start_time;
			maxIndex = i;
		}
	}

	/*
	 console.error('minIndex = ', minIndex, '/n maxIndex = ', maxIndex);
	 console.log('min = ', Alloy.Globals.getFormattedDate(min), '\n max = ', Alloy.Globals.getFormattedDate(max));
	 console.log('min = ', new Date(min * 1000), ' max = ', new Date(max * 1000), ' difference ', new Date(max * 1000).getHours() - new Date(min * 1000).getHours());
	 console.log('min = ', new Date(min * 1000).toISOString(), '\n max = ', new Date(max * 1000).toISOString());
	 console.error('min = ', new Date(min * 1000).toTimeString(), '\n max = ', new Date(max * 1000).toTimeString());*/

	var minMaxDifference = (new Date(max * 1000).getHours() - new Date(min * 1000).getHours()) + 1;
	// numberOfDateBlocks = 4 blocks for 1 hour => Example 12:00hours = block for 12:00, 12:15, 12:30 and 12:45 + 4 blocks for the last hour
	var numberOfDateBlocks = (new Date(max * 1000).getHours() - new Date(min * 1000).getHours()) * 4 + 4;

	dataToCreateSchedule.timeframe.numberOfBlocks = numberOfDateBlocks;

	min = Math.floor(nsGridSchedule.momentjs(min * 1000).utcOffset('-0700').format('H.mm'));
	max = Math.ceil(nsGridSchedule.momentjs(max * 1000).utcOffset('-0700').format('H.mm'));

	// console.log('min = ', min, '\n max = ', max);

	// Create array to pass in time layout = value of DateBlocks
	var startTime = {},
	    endTime = {};
	var timeArray = hours;
	for (var i in hours) {
		if (hours[i].id == min) {

			console.error('hours[i].id == min ', hours[i].id, min, i);
			startTime = hours[i];
			timeArray = hours.slice(parseInt(i));
			console.error('timeArray ---> ', JSON.stringify(timeArray));
			break;
		}
	}

	// for (var i in hours) {
	// if (hours[i].id == max) {
	// endTime = hours[i];
	// timeArray = timeArray.splice(0, (parseInt(i) + 1));
	// break;
	// }
	// }

	dataToCreateSchedule.timeframe.startTime = JSON.parse(JSON.stringify(startTime));
	dataToCreateSchedule.timeframe.endTime = JSON.parse(JSON.stringify(endTime));
	dataToCreateSchedule.timeframe.timeArray = JSON.parse(JSON.stringify(timeArray));

	// console.log('startTime ', startTime);
	// console.log('endTime ', endTime);
	// console.log('hours for the day -> timeArray = ', JSON.stringify(timeArray));

	var lookup = {};
	var showsGroupedByVenue = [];

	for (var item,
	    i = 0; item = data[i++]; ) {
		var venue = item.venueDetails._id;

		if (!( venue in lookup)) {
			lookup[venue] = 1;
			showsGroupedByVenue.push({
				venue_id : venue,
				venueName : item.venueDetails.name,
				shows : []
			});
		}
	}

	// Group the bands/shows by venues
	for (i in showsGroupedByVenue) {

		for (j in data) {

			if (showsGroupedByVenue[i].venue_id == data[j].venueDetails._id) {
				showsGroupedByVenue[i].shows.push({
					show : data[j].showDetails,
					band : data[j].bandDetails,
					start_time : data[j].showDetails.start_time
				});
				// showsGroupedByVenue[i].start_time= data[j].showDetails.start_time;
			};
		}
	}
	// console.log('venue result after ', showsGroupedByVenue.length, ' ', JSON.stringify(showsGroupedByVenue));
	dataToCreateSchedule.showsGroupedByVenue = JSON.parse(JSON.stringify(showsGroupedByVenue));

	nsGridSchedule.createLayout(dataToCreateSchedule);
};

nsGridSchedule.getList = function(source) {

	nsGridSchedule.currentDay = source;
	//UI changes
	var day = source.toLowerCase().trim();

	if (day === "friday") {
		Alloy.Globals.selectedDay = 'friday';
		$.vwDay1.selected = true;
		$.vwDay1.backgroundColor = "#c0c0c0";

		$.vwDay2.selected = false;
		$.vwDay2.backgroundColor = "#ffffff";

		$.vwDay3.selected = false;
		$.vwDay3.backgroundColor = "#ffffff";

		$.vwDay4.selected = false;
		$.vwDay4.backgroundColor = "#ffffff";

	} else if (day === "saturday") {
		Alloy.Globals.selectedDay = 'saturday';
		$.vwDay1.selected = false;
		$.vwDay1.backgroundColor = "#ffffff";

		$.vwDay2.selected = true;
		$.vwDay2.backgroundColor = "#c0c0c0";

		$.vwDay3.selected = false;
		$.vwDay3.backgroundColor = "#ffffff";

		$.vwDay4.selected = false;
		$.vwDay4.backgroundColor = "#ffffff";

	} else if (day === "sunday") {
		Alloy.Globals.selectedDay = 'sunday';
		$.vwDay1.selected = false;
		$.vwDay1.backgroundColor = "#ffffff";

		$.vwDay2.selected = false;
		$.vwDay2.backgroundColor = "#ffffff";

		$.vwDay3.selected = true;
		$.vwDay3.backgroundColor = "#c0c0c0";

		$.vwDay4.selected = false;
		$.vwDay4.backgroundColor = "#ffffff";

	} else if (day === "monday") {
		Alloy.Globals.selectedDay = 'monday';
		$.vwDay1.selected = false;
		$.vwDay1.backgroundColor = "#ffffff";

		$.vwDay2.selected = false;
		$.vwDay2.backgroundColor = "#ffffff";

		$.vwDay3.selected = false;
		$.vwDay3.backgroundColor = "#ffffff";

		$.vwDay4.selected = true;
		$.vwDay4.backgroundColor = "#c0c0c0";
	}

	// Get list
	var appdata = (showsType != 'clubshows') ? Titanium.App.Properties.getObject('appdata', {}) : Titanium.App.Properties.getObject('clubData', {});
	console.debug("day ", day);

	// console.debug("day ", day);

	var dayOfShow = "";
	var shows = [];

	for (var i = 0,
	    len = appdata.details.length; i < len; i++) {

		dayOfShow = nsGridSchedule.getDay(appdata.details[i].showDetails.start_time, "day").toLowerCase().trim();
		if (day === dayOfShow) {
			for (var j = 0,
			    len2 = nsGridSchedule.args.length; j < len2; j++) {
				if (nsGridSchedule.args[j].show_id === appdata.details[i].showDetails._id) {
					shows.push(appdata.details[i]);
				}
			}
		}
	}
	// console.log('shows data ', JSON.stringify(shows));
	nsGridSchedule.createDataForLayout(shows);
};

nsGridSchedule.getShows = function() {
	var shows = [];
	var appdata = (showsType != 'clubshows') ? Titanium.App.Properties.getObject('appdata', {}) : Titanium.App.Properties.getObject('clubData', {});
	for (var i = 0,
	    len = appdata.details.length; i < len; i++) {

		dayOfShow = nsGridSchedule.getDay(appdata.details[i].showDetails.start_time, "day").toLowerCase().trim();
		for (var j = 0,
		    len2 = nsGridSchedule.args.length; j < len2; j++) {

			if (nsGridSchedule.args[j].show_id === appdata.details[i].showDetails._id) {
				shows.push(appdata.details[i]);
			}
		}
	}

	// console.log("User shows " + shows.length + JSON.stringify(shows));

	return shows.length;
};

nsGridSchedule.init = function() {
	nsGridSchedule.args = JSON.parse(JSON.stringify($.args.schedule));
	console.error('nsGridSchedule grid added nsGridSchedule.args ', JSON.stringify($.args));
	// nsGridSchedule.args.sort(Alloy.Globals.sortArray('start_time'));

	var shows = nsGridSchedule.getShows();
	console.debug("SHOWS LENGTH ", shows);

	// if (shows > 0) {

	// $.vwNoSchedule.setHeight(0);
	// $.vwNoSchedule.setVisible(false);

	// Setting width of days
	$.vwDays2.setWidth(Alloy.Globals.platformWidth / 2);

	var vwDaysWidth = Alloy.Globals.platformWidth / 4.15;
	$.vwDay1.setWidth(vwDaysWidth);
	$.vwDay1.setLeft(2);

	$.vwDay2.setWidth(vwDaysWidth);
	$.vwDay2.setLeft(2);

	$.vwDay3.setWidth(vwDaysWidth);
	$.vwDay3.setRight(2);

	$.vwDay4.setWidth(vwDaysWidth);
	$.vwDay4.setRight(2);

	// Event listeners for show views
	$.vwDay1.addEventListener('click', function(e) {
		nsGridSchedule.getList(e.source.day);
	});

	$.vwDay2.addEventListener('click', function(e) {
		nsGridSchedule.getList(e.source.day);
	});

	$.vwDay3.addEventListener('click', function(e) {
		nsGridSchedule.getList(e.source.day);
	});

	$.vwDay4.addEventListener('click', function(e) {
		nsGridSchedule.getList(e.source.day);
	});

	if (Alloy.Globals.selectedDay) {
		nsGridSchedule.getList(Alloy.Globals.selectedDay);
	} else {
		nsGridSchedule.getList($.vwDay1.day);
	}

	// } else {
	// $.lblNoSchedule.setText(L('no_schedule_data'));
	// $.vwMain.setHeight(0);
	// $.vwMain.setVisible(false);
	// }
};

nsGridSchedule.init();
