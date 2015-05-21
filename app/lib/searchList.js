var nsSearchList = {};
nsSearchList.type = "";
nsSearchList.data = null;
nsSearchList.vwSearchView = null;
nsSearchList.table = null;

nsSearchList.serverCalls = require('serverCalls');
nsSearchList.momentjs = require('moment');

nsSearchList.getList = function(day) {
	// Get list
	var appdata = Titanium.App.Properties.getObject('appdata', {});
	console.debug("day ", day);

	// day = "tuesday";

	var dayOfShow = "";
	//nsVenueProfile.momentjs(timestamp * 1000);

	var bands = [];

	for (var i = 0,
	    len = appdata.details.length; i < len; i++) {
		// if (appdata.details[i].bandDetails.band_id == nsVenueProfile.args.id) {
		// dayOfShow = nsVenueProfile.getDay(appdata.details[i].showDetails.start_time, "day").toLowerCase().trim();
		dayOfShow = nsSearchList.momentjs(appdata.details[i].showDetails.start_time * 1000).format('dddd').toLowerCase().trim();

		// (appdata.details[i].showDetails !== undefined && appdata.details[i].showDetails !== null) ? nsVenueProfile.getDay(appdata.details[i].showDetails.start_time, "day").toLowerCase().trim() : 0;
		console.debug("dayOfShow ", dayOfShow);

		if (day === dayOfShow) {
			bands.push(appdata.details[i].bandDetails);
		}
		// }
	}
	// bands.sort(function(a, b) {
	// if (a.bandDetails.start_time < b.bandDetails.start_time)
	// return -1;
	// if (a.bandDetails.start_time > b.bandDetails.start_time)
	// return 1;
	// return 0;
	// });

	bands.sort(Alloy.Globals.sortArray('name'));
	console.log(JSON.stringify(bands));
	return bands;
};

nsSearchList.createHeader = function() {
	var header = Ti.UI.createView({
		height : Titanium.UI.SIZE,
		width : Titanium.UI.FILL,
		// backgroundColor: 'red',
		layout : "horizontal",
		top : 5
	});

	var viewWidth = Alloy.Globals.platformWidth / 5.3;

	var vwAll = Titanium.UI.createView({
		top : 5,
		left : 2,
		bottom : 5,
		height : Titanium.UI.SIZE,
		borderRadius : 10,
		borderColor : "#000000",
		width : viewWidth,
		// backgroundColor : "c0c0c0",
		// selected : true,
		day : "all"
	});

	var lblAll = Titanium.UI.createLabel({
		top : 5,
		bottom : 5,
		height : Titanium.UI.SIZE,
		touchEnabled : false,
		color : "#000000",
		text : L('all'),
		font : {
			fontSize : Alloy.Globals.theme.fonts.size10Fonts
		}
	});

	vwAll.addEventListener('click', function(e) {
		console.log("e.source ", e.source.day);
		if (!vwAll.selected) {
			vwAll.selected = true;
			vwAll.backgroundColor = "#c0c0c0";

			vwFriday.selected = false;
			vwFriday.backgroundColor = "#ffffff";

			vwSaturday.selected = false;
			vwSaturday.backgroundColor = "#ffffff";

			vwSunday.selected = false;
			vwSunday.backgroundColor = "#ffffff";

			vwMonday.selected = false;
			vwMonday.backgroundColor = "#ffffff";

			nsSearchList.vwSearchView.removeAllChildren();

			var vwList = nsSearchList.createList(nsSearchList.data);
			return vwList;
		}
	});

	vwAll.add(lblAll);
	header.add(vwAll);

	var vwFriday = Titanium.UI.createView({
		top : 5,
		left : 2,
		bottom : 5,
		height : Titanium.UI.SIZE,
		borderRadius : 10,
		borderColor : "#000000",
		width : viewWidth,
		day : "friday",
		selected : false
	});

	var lblFriday = Titanium.UI.createLabel({
		top : 5,
		bottom : 5,
		height : Titanium.UI.SIZE,
		touchEnabled : false,
		color : "#000000",
		text : L('friday'),
		font : {
			fontSize : Alloy.Globals.theme.fonts.size10Fonts
		}
	});

	vwFriday.addEventListener('click', function(e) {
		console.log("e.source ", e.source.day);
		if (!vwFriday.selected) {
			vwAll.selected = false;
			vwAll.backgroundColor = "#ffffff";

			vwFriday.selected = true;
			vwFriday.backgroundColor = "#c0c0c0";

			vwSaturday.selected = false;
			vwSaturday.backgroundColor = "#ffffff";

			vwSunday.selected = false;
			vwSunday.backgroundColor = "#ffffff";

			vwMonday.selected = false;
			vwMonday.backgroundColor = "#ffffff";

			var bands = nsSearchList.getList(e.source.day);

			nsSearchList.vwSearchView.removeAllChildren();

			var vwList = nsSearchList.createList(bands);
			return vwList;
		}
	});

	vwFriday.add(lblFriday);
	header.add(vwFriday);

	var vwSaturday = Titanium.UI.createView({
		top : 5,
		left : 2,
		bottom : 5,
		height : Titanium.UI.SIZE,
		borderRadius : 10,
		borderColor : "#000000",
		width : viewWidth,
		day : "saturday",
		selected : false
	});

	var lblSaturday = Titanium.UI.createLabel({
		top : 5,
		bottom : 5,
		height : Titanium.UI.SIZE,
		touchEnabled : false,
		color : "#000000",
		text : L('saturday'),
		font : {
			fontSize : Alloy.Globals.theme.fonts.size10Fonts
		}
	});

	vwSaturday.addEventListener('click', function(e) {
		console.log("e.source ", e.source.day);
		if (!vwSaturday.selected) {
			vwAll.selected = false;
			vwAll.backgroundColor = "#ffffff";

			vwFriday.selected = false;
			vwFriday.backgroundColor = "#ffffff";

			vwSaturday.selected = true;
			vwSaturday.backgroundColor = "#c0c0c0";

			vwSunday.selected = false;
			vwSunday.backgroundColor = "#ffffff";

			vwMonday.selected = false;
			vwMonday.backgroundColor = "#ffffff";

			var bands = nsSearchList.getList(e.source.day);

			nsSearchList.vwSearchView.removeAllChildren();

			var vwList = nsSearchList.createList(bands);
			return vwList;
		}
	});

	vwSaturday.add(lblSaturday);
	header.add(vwSaturday);

	var vwSunday = Titanium.UI.createView({
		top : 5,
		left : 2,
		bottom : 5,
		height : Titanium.UI.SIZE,
		borderRadius : 10,
		borderColor : "#000000",
		width : viewWidth,
		day : "sunday",
		selected : false
	});

	var lblSunday = Titanium.UI.createLabel({
		top : 5,
		bottom : 5,
		height : Titanium.UI.SIZE,
		touchEnabled : false,
		color : "#000000",
		text : L('sunday'),
		font : {
			fontSize : Alloy.Globals.theme.fonts.size10Fonts
		}
	});

	vwSunday.addEventListener('click', function(e) {
		console.log("e.source ", e.source.day);
		if (!vwSunday.selected) {
			vwAll.selected = false;
			vwAll.backgroundColor = "#ffffff";

			vwFriday.selected = false;
			vwFriday.backgroundColor = "#ffffff";

			vwSaturday.selected = false;
			vwSaturday.backgroundColor = "#ffffff";

			vwSunday.selected = true;
			vwSunday.backgroundColor = "#c0c0c0";

			vwMonday.selected = false;
			vwMonday.backgroundColor = "#ffffff";

			var bands = nsSearchList.getList(e.source.day);

			nsSearchList.vwSearchView.removeAllChildren();

			var vwList = nsSearchList.createList(bands);
			return vwList;
		}
	});

	vwSunday.add(lblSunday);
	header.add(vwSunday);

	var vwMonday = Titanium.UI.createView({
		top : 5,
		left : 2,
		bottom : 5,
		height : Titanium.UI.SIZE,
		borderRadius : 10,
		borderColor : "#000000",
		selected : false,
		width : viewWidth,
		day : "monday"
	});

	var lblMonday = Titanium.UI.createLabel({
		top : 5,
		bottom : 5,
		height : Titanium.UI.SIZE,
		touchEnabled : false,
		color : "#000000",
		text : L('monday'),
		font : {
			fontSize : Alloy.Globals.theme.fonts.size10Fonts
		}
	});

	vwMonday.addEventListener('click', function(e) {
		console.log("e.source ", e.source.day);
		if (!vwMonday.selected) {
			vwAll.selected = false;
			vwAll.backgroundColor = "#ffffff";

			vwFriday.selected = false;
			vwFriday.backgroundColor = "#ffffff";

			vwSaturday.selected = false;
			vwSaturday.backgroundColor = "#ffffff";

			vwSunday.selected = false;
			vwSunday.backgroundColor = "#ffffff";

			vwMonday.selected = true;
			vwMonday.backgroundColor = "#c0c0c0";

			var bands = nsSearchList.getList(e.source.day);

			nsSearchList.vwSearchView.removeAllChildren();

			var vwList = nsSearchList.createList(bands);
			return vwList;
		}
	});

	vwMonday.add(lblMonday);
	header.add(vwMonday);

	return header;
};

nsSearchList.createList = function(tblData) {

	var sbSearchBar = Titanium.UI.createSearchBar({
		barColor : '#FFD801',
		backgroundColor : "#ffffff",
		showCancel : false,
		hintText : "Search",
		height : 43,
		top : 10,
		width : "80%",
	});

	nsSearchList.vwSearchView.add(sbSearchBar);

	var currHeader = "A";
	var sectionArr = [];
	var index = [];

	for (var i = 0,
	    lastL,
	    l,
	    currSection,
	    len = tblData.length; i < len; i++) {

		l = tblData[i].name.substr(0, 1);

		if (lastL != l) {
			index.push({
				title : l,
				index : i
			});
			currSection = Ti.UI.createTableViewSection({
				headerTitle : l
			});
			sectionArr.push(currSection);
		}

		var row = Ti.UI.createTableViewRow({
			id : i,
			filter : tblData[i].name,
			hasChild : true,
			top : 0
		});

		row.addEventListener('click', function(e) {
			var data = null;
			console.log(e.source, " ", e.source.id);
			if (e.source.id !== "ivFavouriteStar") {
				if (nsSearchList.type === "BandList") {
					if (Titanium.Platform.osname === "android") {
						Alloy.createController("BandProfile", {
							"id" : tblData[e.source.id]._id
						}).getView().open();
					} else {
						Alloy.Globals.navWin.openWindow(Alloy.createController("BandProfile", {
							"id" : tblData[e.row.id]._id
						}).getView());
					}
				} else if (nsSearchList.type === "VenueList") {
					if (Titanium.Platform.osname === "android") {
						Alloy.createController("VenueProfile", {
							"id" : tblData[e.source.id]._id
						}).getView().open();
					} else {
						Alloy.Globals.navWin.openWindow(Alloy.createController("VenueProfile", {
							"id" : tblData[e.row.id]._id
						}).getView());
					}
				}
			}
		});

		var vwRowView = Titanium.UI.createView({
			height : Titanium.UI.SIZE,
			width : Titanium.UI.FILL,
			top : 0,
			touchEnabled : false
		});

		var ivImage = Titanium.UI.createImageView({
			left : 10,
			top : 5,
			bottom : 5,
			width : Alloy.Globals.platformWidth * 0.25,
			height : Alloy.Globals.platformHeight * 0.088,
			borderColor : "#000000",
			image : tblData[i].image_link,
			touchEnabled : false
		});

		vwRowView.add(ivImage);

		var lblName = Titanium.UI.createLabel({
			left : Alloy.Globals.platformWidth * 0.30,
			text : tblData[i].name,
			color : "#000000",
			height : Titanium.UI.SIZE,
			touchEnabled : false,
			width : "50%",
			font : {
				fontSize : Alloy.Globals.theme.fonts.size20Fonts
			}
		});

		vwRowView.add(lblName);

		var ivFavouriteStar = Titanium.UI.createImageView({
			right : 5,
			height : 40,
			width : 40,
			id : "ivFavouriteStar",
			index : i,
			selected : false
		});

		if (!ivFavouriteStar.selected) {
			ivFavouriteStar.setImage(Alloy.Globals.theme.icons.star_off);
		} else {
			ivFavouriteStar.setImage(Alloy.Globals.theme.icons.star);
		}

		ivFavouriteStar.addEventListener('click', function(e) {

			// console.debug(tblData[e.row.id]._id);
			var data_id = (Titanium.Platform.osname === "android") ? tblData[e.source.index]._id : tblData[e.row.id]._id;

			var appdata = Titanium.App.Properties.getObject('appdata', {});
			for (var i = 0,
			    len = appdata.details.length; i < len; i++) {

				if (nsSearchList.type === "BandList") {
					if (appdata.details[i].showDetails.band_id === data_id) {
						var show_id = appdata.details[i].showDetails._id;
						var addShow = new nsSearchList.serverCalls.saveUserSchedule(show_id, function(response) {
							e.source.setImage(Alloy.Globals.theme.icons.star);

							var MS_PER_MINUTE = 60000;
							var startDate = new Date((appdata.details[i].showDetails.start_time * 1000) - 10 * MS_PER_MINUTE);
							console.log("startDate ", startDate);

							// Schedule notifications for IOS
							if (Titanium.Platform.osname !== "android") {

								var notification = Ti.App.iOS.scheduleLocalNotification({
									alertBody : appdata.details[i].bandDetails.name + "\n" + appdata.details[i].venueDetails.name + "\n" + startDate,
									badge : 1,
									date : startDate,
								});

								Ti.App.iOS.addEventListener('notification', function(e) {

									Ti.API.info('background event received = ' + notification);

									// Reset the badge value
									if (e.badge > 0) {
										Ti.App.iOS.scheduleLocalNotification({
											date : new Date(new Date().getTime()),
											badge : -1
										});
									}
								});
							} else {
								// Create an intent using the JavaScript service file
								var intent = Ti.Android.createServiceIntent({
									url : 'android_notifications.js'
								});
								// Set the interval to run the service;
								intent.putExtra('interval', 1000);
								// Send extra data to the service;
								intent.putExtra('timestamp', startDate);

								intent.putExtra('band', appdata.details[i].bandDetails.name);
								intent.putExtra('message', appdata.details[i].venueDetails.name + "\n" + startDate);

								// Start the service
								Ti.Android.startService(intent);
							}

						}, function(error) {
							alert(L('err_serviceError'));
						});

						break;
					}
				} else {
					if (appdata.details[i].showDetails.venue_id === data_id) {
						var show_id = appdata.details[i].showDetails._id;
						var addShow = new nsSearchList.serverCalls.saveUserSchedule(show_id, function(response) {
							e.source.setImage(Alloy.Globals.theme.icons.star);

							var MS_PER_MINUTE = 60000;
							var startDate = new Date((appdata.details[i].showDetails.start_time * 1000) - 10 * MS_PER_MINUTE);
							console.log("startDate ", startDate);

							// Schedule notifications for IOS
							if (Titanium.Platform.osname !== "android") {

								var notification = Ti.App.iOS.scheduleLocalNotification({
									alertBody : appdata.details[i].bandDetails.name + "\n" + appdata.details[i].venueDetails.name + "\n" + startDate,
									badge : 1,
									date : startDate,
								});

								Ti.App.iOS.addEventListener('notification', function(e) {

									Ti.API.info('background event received = ' + notification);

									// Reset the badge value
									if (e.badge > 0) {
										Ti.App.iOS.scheduleLocalNotification({
											date : new Date(new Date().getTime()),
											badge : -1
										});
									}
								});
							} else {
								// Create an intent using the JavaScript service file
								var intent = Ti.Android.createServiceIntent({
									url : 'android_notifications.js'
								});
								// Set the interval to run the service;
								intent.putExtra('interval', 1000);
								// Send extra data to the service;
								intent.putExtra('timestamp', startDate);

								intent.putExtra('band', appdata.details[i].bandDetails.name);
								intent.putExtra('message', appdata.details[i].venueDetails.name + "\n" + startDate);

								// Start the service
								Ti.Android.startService(intent);
							}

						}, function(error) {
							alert(L('err_serviceError'));
						});

						break;
					}
				}

			}

			e.source.selected = !e.source.selected;
		});

		vwRowView.add(ivFavouriteStar);

		row.add(vwRowView);

		currSection.add(row);
		lastL = l;
	}

	nsSearchList.table = Ti.UI.createTableView({
		top : 0,
		// index: index,
		// data: sectionArr,
		// search : sbSearchBar,
		filterAttribute : 'filter',
		filterCaseInsensitive : true,
		// borderColor: "red",
		// search : sbSearchBar,
		searchHidden : true,
		backgroundColor : "#ffffff",
		// headerView : nsSearchList.createHeader()
	});

	if (nsSearchList.type === "BandList") {
		nsSearchList.table.headerView = nsSearchList.createHeader();
	}

	nsSearchList.table.setData(sectionArr);
	// nsSearchList.table.search = sbSearchBar;
	nsSearchList.table.setSearch(sbSearchBar);
	// nsSearchList.table.filterAttribute = 'filter';
	nsSearchList.table.index = index;
	nsSearchList.vwSearchView.add(nsSearchList.table);
	return nsSearchList.vwSearchView;

};

nsSearchList.init = function(type, data) {
	nsSearchList.type = type;
	nsSearchList.data = JSON.parse(JSON.stringify(data));

	nsSearchList.data.sort(Alloy.Globals.sortArray('name'));
	console.log("sorted ", JSON.stringify(nsSearchList.data));

	console.debug("In searchList");
	console.debug("Data: ", JSON.stringify(nsSearchList.data));

	nsSearchList.vwSearchView = Titanium.UI.createView({
		layout : "vertical",
		height : "100%",
		width : Titanium.UI.FILL,
		top : 0,
		backgroundColor : "#FFD801"
	});

	var vwList = nsSearchList.createList(nsSearchList.data);
	return vwList;
};

exports.init = nsSearchList.init;
