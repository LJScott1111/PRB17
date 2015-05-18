var nsSearchList = {};
nsSearchList.type = "";
nsSearchList.data = null;
nsSearchList.vwSearchView = null;

nsSearchList.serverCalls = require('serverCalls');

nsSearchList.createList = function() {

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
	    len = nsSearchList.data.length; i < len; i++) {

		l = nsSearchList.data[i].name.substr(0, 1);

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
			filter : nsSearchList.data[i].name,
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
							"id" : nsSearchList.data[e.source.id]._id
						}).getView().open();
					} else {
						Alloy.Globals.navWin.openWindow(Alloy.createController("BandProfile", {
							"id" : nsSearchList.data[e.row.id]._id
						}).getView());
					}
				} else if (nsSearchList.type === "VenueList") {
					if (Titanium.Platform.osname === "android") {
						Alloy.createController("VenueProfile", {
							"id" : nsSearchList.data[e.source.id]._id
						}).getView().open();
					} else {
						Alloy.Globals.navWin.openWindow(Alloy.createController("VenueProfile", {
							"id" : nsSearchList.data[e.row.id]._id
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
			image : nsSearchList.data[i].image_link,
			touchEnabled : false
		});

		vwRowView.add(ivImage);

		var lblName = Titanium.UI.createLabel({
			left : Alloy.Globals.platformWidth * 0.30,
			text : nsSearchList.data[i].name,
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

			// console.debug(nsSearchList.data[e.row.id]._id);
			var data_id = (Titanium.Platform.osname === "android") ? nsSearchList.data[e.source.index]._id : nsSearchList.data[e.row.id]._id;

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

	var table = Ti.UI.createTableView({
		top : 0,
		// index: index,
		// data: sectionArr,
		// search : sbSearchBar,
		filterAttribute : 'filter',
		filterCaseInsensitive : true,
		// borderColor: "red",
		// search : sbSearchBar,
		searchHidden : true,
		backgroundColor : "#ffffff"
	});

	table.setData(sectionArr);
	// table.search = sbSearchBar;
	table.setSearch(sbSearchBar);
	// table.filterAttribute = 'filter';
	table.index = index;
	nsSearchList.vwSearchView.add(table);
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

	var vwList = nsSearchList.createList();
	return vwList;
};

exports.init = nsSearchList.init;
