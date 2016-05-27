var nsUserSchedule = {};
nsUserSchedule.args = arguments[0];
nsUserSchedule.serviceCalls = require("serverCalls");

nsUserSchedule.momentjs = require('moment');

nsUserSchedule.getDay = function(timestamp, type) {
	var dateObj = nsUserSchedule.momentjs(timestamp * 1000);

	if (type === "day") {
		return dateObj.format('dddd');
	} else {
		return dateObj.format('h:m a');
	}
};

nsUserSchedule.createList = function(shows) {
	$.vwBandSchedule.removeAllChildren();
	var len = shows.length;
	if (len > 0) {
		var tabledata = [];

		for (var i = 0; i < len; i++) {

			var time = nsUserSchedule.getDay(shows[i].showDetails.start_time, "time");

			var row = Titanium.UI.createTableViewRow({
				top : 10,
				height : Titanium.UI.SIZE,
				width : Titanium.UI.SIZE,
				rowIndex : i,
				rawData : shows[i]
			});

			var vwRowView = Titanium.UI.createView({
				height : Titanium.UI.SIZE,
				width : Titanium.UI.FILL,
				top : 0
			});

			var ivImage = Titanium.UI.createImageView({
				left : 10,
				top : 5,
				bottom : 5,
				width : Alloy.Globals.platformWidth * 0.25,
				height : Alloy.Globals.platformHeight * 0.088,
				borderColor : "#000000",
				image : shows[i].bandDetails.image_link
			});

			vwRowView.add(ivImage);

			var lblName = Titanium.UI.createLabel({
				left : Alloy.Globals.platformWidth * 0.30,
				text : shows[i].bandDetails.name,
				height : Titanium.UI.SIZE,
				width : "50%",
				color : "#000000",
				font : {
					fontSize : Alloy.Globals.theme.fonts.size20Fonts
				}
			});

			vwRowView.add(lblName);

			var lblTime = Titanium.UI.createLabel({
				right : 5,
				text : time + "\n" + shows[i].venueDetails.name,
				color : "#000000",
				height : Titanium.UI.SIZE,
				width : "30%",
				textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
				font : {
					fontSize : Alloy.Globals.theme.fonts.size15Fonts,
					fontWeight : "bold"
				}
			});

			vwRowView.add(lblTime);

			row.add(vwRowView);
			tabledata.push(row);
		}

		var tableView = Titanium.UI.createTableView({
			data : tabledata,
			top : 0,
			editable : true
		});

		tableView.addEventListener('delete', function(e) {

			nsUserSchedule.serviceCalls.deleteUserSchedule(e.row.rawData.showDetails._id, function() {

				Alloy.Globals.getAndStoreData(function() {

					nsUserSchedule.serviceCalls.getUserSchedule(function(result) {

						nsUserSchedule.args = result;
						nsUserSchedule.getList(nsUserSchedule.currentDay);
					});
				});
			});
		});

		$.vwBandSchedule.add(tableView);

	} else {
		var lblNoShows = Titanium.UI.createLabel({
			text : "No shows"
		});

		$.vwBandSchedule.add(lblNoShows);
	}
};

nsUserSchedule.currentDay = null;

nsUserSchedule.createLayout = function(data) {

	console.log('dataToCreateSchedule = ', JSON.stringify(data));

	var bandBoxHeight = Alloy.Globals.platformHeight * 0.0792;
	var bandBoxWidth = Alloy.Globals.platformWidth * 0.3434;

	var bandBoxContainerHeight = Alloy.Globals.platformHeight * 0.088;
	var venueNameViewWidth = Alloy.Globals.platformWidth * 0.1875;

	var timeBoxWidth = Alloy.Globals.platformWidth * 0.3434 / 2;

	console.log('---------- nsUserSchedule.createLayout ---------');

	this.createTimeFrameBox = function(time) {

		var timeBoxView = Titanium.UI.createView({
			layout : 'horizontal',
			height : bandBoxHeight,
			width : bandBoxWidth,
			left : 5
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
			height : Titanium.UI.FILL,
			width : 1,
			backgroundColor : '#F3CB87'
		});

		timeframeContainer.add(placeholder);

		for (i in data.timeframe.timeArray) {
			// console.error('data.timeArray ', data.timeframe.timeArray[i]);
			timeframeContainer.add(this.createTimeFrameBox(data.timeframe.timeArray[i]));
		}

		return timeframeContainer;
	};

	// Small box of band details --- starts from here
	this.createBandBox = function(bName, bImage, showTime, bandId) {

		var left = venueNameViewWidth;
		console.log('bName = ', bName, ' ', bImage, ' ', showTime);

		var startTime = nsUserSchedule.momentjs(showTime * 1000).format('H.mm');

		console.log('data.timeArray ', JSON.stringify(data.timeframe.timeArray));
		console.log('timeframe startTime ', startTime);

		for (i in data.timeframe.timeArray) {
			console.log('----> ', data.timeframe.timeArray[i].id, ' ', Math.floor(startTime));
			var block = data.timeframe.timeArray.indexOf(data.timeframe.timeArray[i]);
			if (data.timeframe.timeArray[i].id == Math.floor(startTime) && Math.floor(startTime) == Math.ceil(startTime)) {
				console.log('INDEX ', data.timeframe.timeArray.indexOf(data.timeframe.timeArray[i]));
				block = block * 2 + 1;
				console.log('In odd BLOCK ', block);
				// console.log('----> ',data.timeframe.timeArray[i].id, ' ', Math.floor(startTime));
				left = timeBoxWidth * block + 5 * block;
				break;
			} else if (data.timeframe.timeArray[i].id == Math.ceil(startTime) && Math.floor(startTime) != Math.ceil(startTime) || data.timeframe.timeArray[i].id == Math.floor(startTime) && Math.floor(startTime) != Math.ceil(startTime) && Math.floor(startTime) ==  Math.round(startTime)) {
				block = block * 2;
				console.log('INDEX ', data.timeframe.timeArray.indexOf(data.timeframe.timeArray[i]));
				console.log('In even BLOCK ', block);
				// console.log('----> ',data.timeframe.timeArray[i].id, ' ', Math.floor(startTime));
				left = (block == 0) ? left + 5 : timeBoxWidth * block + 5 * block;
				break;
			}
		}

		console.log('left ', left);

		var bandBoxView = Titanium.UI.createView({
			layout : 'horizontal',
			height : bandBoxHeight,
			width : bandBoxWidth,
			horizontalWrap : false,
			backgroundColor : '#ffffff',
			borderRadius : 3,
			left : left,
			bandId : bandId
		});

		bandBoxView.addEventListener('click', function(e){
			Alloy.Globals.openWindow("BandProfile", {
				"id" : e.source.bandId
			}, true, null, 'misc/right_logo');
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
			left : 3,
			right : 2,
			height : Titanium.UI.SIZE,
			width : Titanium.UI.FILL,
			text : bName,
			ellipsize : true,
			horizontalWrap : true,
			touchEnabled : false,
			wordWrap : true,
			textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
			color : '#000000',
			font : {
				fontSize : Alloy.Globals.theme.fonts.size10Fonts
			}
		});

		bandBoxView.add(bandImage);
		bandBoxView.add(bandName);
		return bandBoxView;
	};
	// Small box of band details --- ends here

	// Container row of bands - starts from here
	this.createBandBoxContainer = function(venue) {

		// console.log('venue = ', venue);

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

		for (i in venue.shows) {
			// console.error('venue.show = ', venue.shows[i]);
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
			left: 0,
		});

		for (i in data.showsGroupedByVenue) {
			// console.error('data.showsGroupedByVenue ', data.showsGroupedByVenue[i]);
			verticalScrollContainer.add(this.createBandBoxContainer(data.showsGroupedByVenue[i]));
		}

		mainHorizontalScrollContainer.add(this.createTimeframe());
		mainHorizontalScrollContainer.add(verticalScrollContainer);
		$.vwBandSchedule.add(mainHorizontalScrollContainer);

	};

	this.addScheduleUI();

	console.log('---------- End of nsUserSchedule.createLayout ---------');
};

nsUserSchedule.createDataForLayout = function(data) {

	$.vwBandSchedule.removeAllChildren();

	if (data.length == 0) {

		var lblNoShows = Titanium.UI.createLabel({
			top : 20,
			left : 20,
			right : 20,
			text : L('no_show_selected_for_this_day'),
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
	var hours = [{id:'0',value:'12',unit:'am'},{id:1,value:'1',unit:'am'},{id:2,value:'2',unit:'am'},{id:3,value:'3',unit:'am'},{id:4,value:'4',unit:'am'},{id:5,value:'5',unit:'am'},{id:6,value:'6',unit:'am'},{id:7,value:'7',unit:'am'},{id:8,value:'8',unit:'am'},{id:9,value:'9',unit:'am'},{id:10,value:'10',unit:'am'},{id:11,value:'11',unit:'am'},{id:12,value:'12',unit:'pm'},{id:13,value:'1',unit:'pm'},{id:14,value:'2',unit:'pm'},{id:15,value:'3',unit:'pm'},{id:16,value:'4',unit:'pm'},{id:17,value:'5',unit:'pm'},{id:18,value:'6',unit:'pm'},{id:19,value:'7',unit:'pm'},{id:20,value:'8',unit:'pm'},{id:21,value:'9',unit:'pm'},{id:22,value:'10',unit:'pm'},{id:23,value:'11',unit:'pm'}];

	// Get the min and max time of shows from the data set
	var min = data[0].showDetails.start_time,
	    max = data[0].showDetails.start_time;

	var minIndex = 0,
	    maxIndex = 0;
	for (i in data) {

		console.log('DATE = ', new Date(data[i].showDetails.start_time * 1000));
		// console.log(data[i].showDetails.start_time);
		// console.log(data[i].showDetails.start_time - min);
		if (data[i].showDetails.start_time <= min) {

			min = data[i].showDetails.start_time;
			minIndex = i;

		} else {

			max = data[i].showDetails.start_time;
			maxIndex = i;
		}
	}

	console.error('minIndex = ', minIndex, '/n maxIndex = ', maxIndex);

	console.log('min = ', Alloy.Globals.getFormattedDate(min), '\n max = ', Alloy.Globals.getFormattedDate(max));
	console.log('min = ', new Date(min * 1000), ' max = ', new Date(max * 1000), ' difference ', new Date(max * 1000).getHours() - new Date(min * 1000).getHours());

	var minMaxDifference = (new Date(max * 1000).getHours() - new Date(min * 1000).getHours()) + 1;
	// numberOfDateBlocks = 2 blocks for 1 hour => Example 12:00hours = block for 12:00 and 12:30 + 2 blocks for the last hour
	var numberOfDateBlocks = (new Date(max * 1000).getHours() - new Date(min * 1000).getHours()) * 2 + 2;
	console.log('numberOfDateBlocks = ', numberOfDateBlocks, ' minMaxDifference = ', minMaxDifference);

	dataToCreateSchedule.timeframe.numberOfBlocks = numberOfDateBlocks;

	min = Math.floor(nsUserSchedule.momentjs(min * 1000).format('H.mm'));
	max = Math.ceil(nsUserSchedule.momentjs(max * 1000).format('H.mm'));

	console.log('min = ', min, '\n max = ', max);

	// Create array to pass in time layout = value of DateBlocks
	var startTime = {};
	var timeArray = [];
	for (i in hours) {
		if (hours[i].id == min) {
			startTime = hours[i];
			timeArray = hours.splice(i, minMaxDifference + 1);
			break;
		}
	}

	dataToCreateSchedule.timeframe.startTime = JSON.parse(JSON.stringify(startTime));
	dataToCreateSchedule.timeframe.timeArray = JSON.parse(JSON.stringify(timeArray));

	console.log('startTime ', startTime);
	console.log('hours for the day -> timeArray = ', timeArray);
	// console.log('hours array length ', hours.length);

	// Make time data for shows (12pm, 12:30pm, 1pm, 1:30pm ... so on)
	var timeDataForShows = [];
	for (i in timeArray) {
		timeDataForShows.push(timeArray[i].value + timeArray[i].unit);
		timeDataForShows.push(timeArray[i].value + ':30' + timeArray[i].unit);
	}
	// console.log('timeDataForShows ', timeDataForShows);

	dataToCreateSchedule.timeframe.timeDataForShows = JSON.parse(JSON.stringify(timeDataForShows));

	///------------- End of time data here ---------------------------

	// Get unique venue details for selected day
	// ---------- For testing : TODO: remove later------------------
	// var venue_ids = [];
	// for (i in data) {
	// venue_ids.push(data[i].venueDetails._id);
	// }
	// console.log('venue_ids ', venue_ids.length, ' ', JSON.stringify(venue_ids));
	// ---------- For testing : TODO: remove later------------------

	var lookup = {};
	var showsGroupedByVenue = [];

	for (var item,
	    i = 0; item = data[i++]; ) {
		var venue = item.venueDetails._id;

		if (!( venue in lookup)) {
			lookup[venue] = 1;
			// showsGroupedByVenue.push(venue);
			showsGroupedByVenue.push({
				venue_id : venue,
				venueName : item.venueDetails.name,
				shows : []
			});
		}
	}

	// console.log('venue result ', showsGroupedByVenue.length, ' ', JSON.stringify(showsGroupedByVenue));

	// Group the bands/shows by venues
	for (i in showsGroupedByVenue) {

		for (j in data) {

			if (showsGroupedByVenue[i].venue_id == data[j].venueDetails._id) {
				showsGroupedByVenue[i].shows.push({
					show : data[j].showDetails,
					band : data[j].bandDetails
				});
			};
		}
	}
	console.log('venue result after ', showsGroupedByVenue.length, ' ', JSON.stringify(showsGroupedByVenue));
	dataToCreateSchedule.showsGroupedByVenue = JSON.parse(JSON.stringify(showsGroupedByVenue));

	nsUserSchedule.createLayout(dataToCreateSchedule);
};

nsUserSchedule.getList = function(source) {

	nsUserSchedule.currentDay = source;
	//UI changes
	var day = source.day.toLowerCase().trim();

	if (day === "friday") {
		$.vwDay1.selected = true;
		$.vwDay1.backgroundColor = "#c0c0c0";

		$.vwDay2.selected = false;
		$.vwDay2.backgroundColor = "#ffffff";

		$.vwDay3.selected = false;
		$.vwDay3.backgroundColor = "#ffffff";

		$.vwDay4.selected = false;
		$.vwDay4.backgroundColor = "#ffffff";

	} else if (day === "saturday") {
		$.vwDay1.selected = false;
		$.vwDay1.backgroundColor = "#ffffff";

		$.vwDay2.selected = true;
		$.vwDay2.backgroundColor = "#c0c0c0";

		$.vwDay3.selected = false;
		$.vwDay3.backgroundColor = "#ffffff";

		$.vwDay4.selected = false;
		$.vwDay4.backgroundColor = "#ffffff";

	} else if (day === "sunday") {
		$.vwDay1.selected = false;
		$.vwDay1.backgroundColor = "#ffffff";

		$.vwDay2.selected = false;
		$.vwDay2.backgroundColor = "#ffffff";

		$.vwDay3.selected = true;
		$.vwDay3.backgroundColor = "#c0c0c0";

		$.vwDay4.selected = false;
		$.vwDay4.backgroundColor = "#ffffff";

	} else if (day === "monday") {
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
	var appdata = Titanium.App.Properties.getObject('appdata', {});
	console.debug("day ", day);

	// day = "tuesday";

	console.debug("day ", day);

	var dayOfShow = "";
	//nsUserSchedule.momentjs(timestamp * 1000);

	var shows = [];

	for (var i = 0,
	    len = appdata.details.length; i < len; i++) {

		dayOfShow = nsUserSchedule.getDay(appdata.details[i].showDetails.start_time, "day").toLowerCase().trim();
		// console.debug("dayOfShow ", dayOfShow);
		if (day === dayOfShow) {
			for (var j = 0,
			    len2 = nsUserSchedule.args.length; j < len2; j++) {

				// console.log(appdata.details[i].showDetails._id, " ", nsUserSchedule.args[j].show_id);

				if (nsUserSchedule.args[j].show_id === appdata.details[i].showDetails._id) {
					shows.push(appdata.details[i]);
				}
			}
		}
	}
	console.log('shows data ', JSON.stringify(shows));

	// var tabledata = [];
	// nsUserSchedule.createList(shows);
	nsUserSchedule.createDataForLayout(shows);
};

nsUserSchedule.getShows = function() {
	var shows = [];
	var appdata = Titanium.App.Properties.getObject('appdata', {});
	for (var i = 0,
	    len = appdata.details.length; i < len; i++) {

		dayOfShow = nsUserSchedule.getDay(appdata.details[i].showDetails.start_time, "day").toLowerCase().trim();
		// console.debug("dayOfShow ", dayOfShow);
		for (var j = 0,
		    len2 = nsUserSchedule.args.length; j < len2; j++) {

			// console.log(appdata.details[i].showDetails._id, " ", nsUserSchedule.args[j].show_id);

			if (nsUserSchedule.args[j].show_id === appdata.details[i].showDetails._id) {
				// console.log(nsUserSchedule.args[j].show_id === appdata.details[i].showDetails._id);
				shows.push(appdata.details[i]);
				// console.debug(JSON.stringify(shows));
				// console.debug(i, " ", j);
			}
		}
		// console.log("1", " ", i);
	}

	console.log("User shows " + shows.length + JSON.stringify(shows));

	return shows.length;
};

nsUserSchedule.init = function() {
	console.debug("User schedule: ", JSON.stringify(nsUserSchedule.args));

	var shows = nsUserSchedule.getShows();
	console.debug("SHOWS LENGTH ", shows);

	if (shows > 0) {

		$.vwNoSchedule.setHeight(0);
		$.vwNoSchedule.setVisible(false);

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
			nsUserSchedule.getList(e.source);
		});

		$.vwDay2.addEventListener('click', function(e) {
			nsUserSchedule.getList(e.source);
		});

		$.vwDay3.addEventListener('click', function(e) {
			nsUserSchedule.getList(e.source);
		});

		$.vwDay4.addEventListener('click', function(e) {
			nsUserSchedule.getList(e.source);
		});

		nsUserSchedule.getList($.vwDay1);

	} else {
		$.lblNoSchedule.setText(L('no_schedule_data'));
		// $.vwMain.setHeight(0);
		// $.vwMain.setVisible(false);
	}
};

nsUserSchedule.init();
