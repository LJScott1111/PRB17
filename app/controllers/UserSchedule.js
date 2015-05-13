var nsUserSchedule = {};
nsUserSchedule.args = arguments[0];

nsUserSchedule.momentjs = require('moment');

nsUserSchedule.closeWindow = function() {
	$.winUserSchedule.close();
};

nsUserSchedule.getSettings = function() {
};

nsUserSchedule.getDay = function(timestamp, type) {
	var dateObj = nsUserSchedule.momentjs(timestamp * 1000);

	if (type === "day") {
		return dateObj.format('dddd');
	} else {
		return dateObj.format('h a');
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
				rowIndex : i
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
				color : "#000000",
				font : {
					fontSize : Alloy.Globals.theme.fonts.size20Fonts
				}
			});

			vwRowView.add(lblName);

			var lblTime = Titanium.UI.createLabel({
				right : 15,
				text : time,
				color : "#000000",
				font : {
					fontSize : Alloy.Globals.theme.fonts.size20Fonts,
					fontWeight : "bold"
				}
			});

			vwRowView.add(lblTime);

			/*
			 var ivFavouriteStar = Titanium.UI.createImageView({
			 right : 10,
			 height : 40,
			 width : 40,
			 id : "ivFavouriteStar",
			 // backgroundColor : "#000000",
			 selected : false
			 });

			 if (!ivFavouriteStar.selected) {
			 ivFavouriteStar.setImage(Alloy.Globals.theme.icons.star_off);
			 } else {
			 ivFavouriteStar.setImage(Alloy.Globals.theme.icons.star);
			 }

			 ivFavouriteStar.addEventListener('click', function(e) {
			 if (!e.source.selected) {
			 e.source.setImage(Alloy.Globals.theme.icons.star);
			 } else {
			 e.source.setImage(Alloy.Globals.theme.icons.star_off);
			 }
			 e.source.selected = !e.source.selected;
			 });

			 vwRowView.add(ivFavouriteStar);
			 */

			row.add(vwRowView);
			tabledata.push(row);
		}

		$.vwBandSchedule.add(Titanium.UI.createTableView({
			data : tabledata,
			top : 0
		}));

	} else {
		var lblNoShows = Titanium.UI.createLabel({
			text : "No shows"
		});

		$.vwBandSchedule.add(lblNoShows);
	}
};

nsUserSchedule.getList = function(source) {

	console.debug(JSON.stringify(source));

	//UI changes
	var day = source.day.toLowerCase().trim();

	if (day === "friday") {
		$.vwDay1.selected = true;
		$.vwDay1.backgroundColor = "#F1F1F1";

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
		$.vwDay2.backgroundColor = "#F1F1F1";

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
		$.vwDay3.backgroundColor = "#F1F1F1";

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
		$.vwDay4.backgroundColor = "#F1F1F1";
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

		console.debug("dayOfShow ", dayOfShow);

		if (day === dayOfShow) {
			for (var j = 0,
			    len = nsUserSchedule.args.length; j < len; j++) {

				console.log(appdata.details[i].showDetails._id, " ", nsUserSchedule.args[j].show_id);

				if (nsUserSchedule.args[j].show_id === appdata.details[i].showDetails._id) {
					shows.push(appdata.details[i]);
				}
			}

		}

	}
	console.debug(JSON.stringify(shows));

	// var tabledata = [];
	nsUserSchedule.createList(shows);
};

nsUserSchedule.init = function() {
	$.winUserSchedule.addEventListener('android:back', function(e) {
		console.debug("Pressing Back Will Not Close The Activity/Window");
		nsUserSchedule.closeWindow();
	});

	console.debug("User schedule: ", JSON.stringify(nsUserSchedule.args));

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
};

nsUserSchedule.init();
