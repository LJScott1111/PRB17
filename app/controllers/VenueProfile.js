var nsVenueProfile = {};

nsVenueProfile.args = arguments[0];
nsVenueProfile.momentjs = require('moment');

nsVenueProfile.closeWindow = function() {
	$.winVenueProfile.close();
};

nsVenueProfile.getSettings = function() {
};

nsVenueProfile.getDay = function(timestamp, type) {
	var dateObj = nsVenueProfile.momentjs(timestamp * 1000);

	if (type === "day") {
		return dateObj.format('dddd');
	} else {
		return dateObj.format('h a');
	}
};

nsVenueProfile.createList = function(shows) {
	$.vwBandSchedule.removeAllChildren();
	var len = shows.length;
	if (len > 0) {
		var tabledata = [];

		for (var i = 0; i < len; i++) {
			
			var time = nsVenueProfile.getDay(shows[i].showDetails.start_time, "time");

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
				right : 60,
				text : time,
				color : "#000000",
				font : {
					fontSize : Alloy.Globals.theme.fonts.size20Fonts,
					fontWeight : "bold"
				}
			});

			vwRowView.add(lblTime);

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

nsVenueProfile.getList = function(source) {
	
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

	var dayOfShow = "";
	//nsVenueProfile.momentjs(timestamp * 1000);

	var shows = [];

	for (var i = 0,
	    len = appdata.details.length; i < len; i++) {

		dayOfShow = nsVenueProfile.getDay(appdata.details[i].showDetails.start_time, "day").toLowerCase().trim();

		console.debug("dayOfShow ", dayOfShow);

		if (day === dayOfShow) {
			shows.push(appdata.details[i]);
		}

	}
	console.debug(JSON.stringify(shows));

	// var tabledata = [];
	nsVenueProfile.createList(shows);
};

nsVenueProfile.init = function() {

	console.debug("VenueProfile ", JSON.stringify(nsVenueProfile.args));

	$.winVenueProfile.addEventListener('android:back', function(e) {
		console.debug("Pressing Back Will Not Close The Activity/Window");
		nsVenueProfile.closeWindow();
	});

	var appdata = Titanium.App.Properties.getObject('appdata', {});
	for (var i = 0,
	    len = appdata.details.length; i < len; i++) {

		if (appdata.details[i].venueDetails._id === nsVenueProfile.args.id) {
			nsVenueProfile.data = JSON.parse(JSON.stringify(appdata.details[i]));
			break;
		}
	}

	console.debug("VenueProile id ", JSON.stringify(nsVenueProfile.args));
	console.debug("VenueProile data ", JSON.stringify(nsVenueProfile.data));

	$.ivVenueImage.setHeight(Alloy.Globals.platformHeight * 0.30);

	$.lblVenueName.setText(nsVenueProfile.data.venueDetails.name);
	$.lblAddress1.setText(nsVenueProfile.data.venueDetails.address);

	// console.log(nsVenueProfile.data.venueDetails.city, ", ", nsVenueProfile.data.venueDetails.state, ", ", nsVenueProfile.data.venueDetails.zip);

	$.lblAddress2.setText(nsVenueProfile.data.venueDetails.city + ", " + nsVenueProfile.data.venueDetails.state + ", " + nsVenueProfile.data.venueDetails.zip);
	$.lblNumber.setText(nsVenueProfile.data.venueDetails.phone);

	// Setting width of days
	$.vwDays2.setWidth(Alloy.Globals.platformWidth/2);
	
	var vwDaysWidth = Alloy.Globals.platformWidth / 4.15;
	$.vwDay1.setWidth(vwDaysWidth);
	$.vwDay1.setLeft(2);

	$.vwDay2.setWidth(vwDaysWidth);
	$.vwDay2.setLeft(2);

	$.vwDay3.setWidth(vwDaysWidth);
	$.vwDay3.setRight(2);
	
	$.vwDay4.setWidth(vwDaysWidth);
	$.vwDay4.setRight(2);

	if (Titanium.Platform.osname === "android") {
		$.svMain.setHeight(Titanium.UI.SIZE);
	} else {
		$.svMain.setHeight(Alloy.Globals.platformHeight - Alloy.Globals.theme.sizes.headerbar);
	}
	
	// Event listeners for show views
	$.vwDay1.addEventListener('click',function(e){
		nsVenueProfile.getList(e.source);
	});
	
	$.vwDay2.addEventListener('click',function(e){
		nsVenueProfile.getList(e.source);
	});
	
	$.vwDay3.addEventListener('click',function(e){
		nsVenueProfile.getList(e.source);
	});
	
	$.vwDay4.addEventListener('click',function(e){
		nsVenueProfile.getList(e.source);
	});
	
	nsVenueProfile.getList($.vwDay1);
};

nsVenueProfile.init();
