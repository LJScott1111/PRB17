var nsVenueProfile = {};

nsVenueProfile.args = arguments[0];
nsVenueProfile.momentjs = require('moment');

nsVenueProfile.closeWindow = function() {
	Alloy.Globals.windowStack.pop();
	$.winVenueProfile.close();
};

nsVenueProfile.getSettings = function() {
	Alloy.Globals.getSettings($.winVenueProfile);
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
				rowIndex : i,
				bandDetails:shows[i].bandDetails
			});
			
			row.addEventListener('click', function(e){
				console.log(e);
				if (Titanium.Platform.osname === "android") {
						Alloy.createController("BandProfile", {
							"id" : e.row.bandDetails._id
						}).getView().open();
					} else {
						Alloy.Globals.navWin.openWindow(Alloy.createController("BandProfile", {
							"id" : e.row.bandDetails._id
						}).getView());
					}
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
				left : Alloy.Globals.platformWidth * 0.29,
				width : Alloy.Globals.platformWidth * 0.44,
				text : shows[i].bandDetails.name,
				color : "#000000",
				font : {
					fontSize : Alloy.Globals.theme.fonts.size15Fonts
				}
			});

			vwRowView.add(lblName);

			var lblTime = Titanium.UI.createLabel({
				right : 55,
				text : time,
				color : "#000000",
				font : {
					fontSize : Alloy.Globals.theme.fonts.size15Fonts,
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

	var dayOfShow = "";
	//nsVenueProfile.momentjs(timestamp * 1000);

	var shows = [];

	for (var i = 0,
	    len = appdata.details.length; i < len; i++) {
		if (appdata.details[i].showDetails.venue_id == nsVenueProfile.args.id) {
			dayOfShow = nsVenueProfile.getDay(appdata.details[i].showDetails.start_time, "day").toLowerCase().trim();
			// (appdata.details[i].showDetails !== undefined && appdata.details[i].showDetails !== null) ? nsVenueProfile.getDay(appdata.details[i].showDetails.start_time, "day").toLowerCase().trim() : 0;
			console.debug("dayOfShow ", dayOfShow);

			if (day === dayOfShow) {
				shows.push(appdata.details[i]);
			}
		}
	}
	shows.sort(function(a, b) {
		if (a.showDetails.start_time < b.showDetails.start_time)
			return -1;
		if (a.showDetails.start_time > b.showDetails.start_time)
			return 1;
		return 0;
	});
	console.log(JSON.stringify(shows));

	// var tabledata = [];
	nsVenueProfile.createList(shows);
};

nsVenueProfile.init = function() {
	Alloy.Globals.windowStack.push($.winVenueProfile);

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
	// console.debug("VenueProile data ", JSON.stringify(nsVenueProfile.data));

	if (nsVenueProfile.data === null || nsVenueProfile.data === undefined) {
		nsVenueProfile.data = {};
		for (var i = 0,
		    len = appdata.venues.length; i < len; i++) {
			if (appdata.venues[i]._id === nsVenueProfile.args.id) {
				nsVenueProfile.data.venueDetails = JSON.parse(JSON.stringify(appdata.venues[i]));
				break;
			}
		}
	}

	console.debug("VenueProile data ", JSON.stringify(nsVenueProfile.data));

	$.ivVenueImage.setHeight(Alloy.Globals.platformHeight * 0.30);
	$.ivVenueImage.setImage(nsVenueProfile.data.venueDetails.image_link || "");
	$.lblVenueName.setText(nsVenueProfile.data.venueDetails.name || "");
	$.lblAddress1.setText(nsVenueProfile.data.venueDetails.address || "");

	// console.log(nsVenueProfile.data.venueDetails.city, ", ", nsVenueProfile.data.venueDetails.state, ", ", nsVenueProfile.data.venueDetails.zip);

	$.lblAddress2.setText((nsVenueProfile.data.venueDetails.city || "") + ", " + (nsVenueProfile.data.venueDetails.state || "") + ", " + (nsVenueProfile.data.venueDetails.zip || ""));
	$.lblNumber.setText((nsVenueProfile.data.venueDetails.phone || ""));

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

	if (Titanium.Platform.osname === "android") {
		$.svMain.setHeight(Titanium.UI.SIZE);
	} else {
		$.svMain.setHeight(Alloy.Globals.platformHeight - Alloy.Globals.theme.sizes.headerbar);
	}

	// Event listeners for show views
	$.vwDay1.addEventListener('click', function(e) {
		nsVenueProfile.getList(e.source);
	});

	$.vwDay2.addEventListener('click', function(e) {
		nsVenueProfile.getList(e.source);
	});

	$.vwDay3.addEventListener('click', function(e) {
		nsVenueProfile.getList(e.source);
	});

	$.vwDay4.addEventListener('click', function(e) {
		nsVenueProfile.getList(e.source);
	});

	nsVenueProfile.getList($.vwDay1);
};

nsVenueProfile.init();
