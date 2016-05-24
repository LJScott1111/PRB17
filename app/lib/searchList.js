var nsSearchList = {};
nsSearchList.type = "";
nsSearchList.data = null;
nsSearchList.vwSearchView = null;
nsSearchList.table = null;

nsSearchList.selectedTab = null;
nsSearchList.vwAll = null;

nsSearchList.serverCalls = require('serverCalls');
nsSearchList.momentjs = require('moment');

nsSearchList.getList = function(day) {
	// Get list
	console.debug("day ", day);

	var dayOfShow = "";

	var bands = [];

	for (i in nsSearchList.currentCityData) {
		dayOfShow = nsSearchList.momentjs(nsSearchList.currentCityData[i].showDetails.start_time * 1000).format('dddd').toLowerCase().trim();

		console.debug("dayOfShow ", dayOfShow);

		if (day === dayOfShow) {
			bands.push(nsSearchList.currentCityData[i].bandDetails);
		}
	}
	bands.sort(Alloy.Globals.sortArray('name'));
	console.log("JSON.stringify(bands) ", JSON.stringify(bands));
	return bands;
};

nsSearchList.createHeader = function() {
	var header = Ti.UI.createView({
		height : Titanium.UI.SIZE,
		width : Titanium.UI.FILL,
		layout : "horizontal",
		top : 5
	});

	var viewWidth = Alloy.Globals.platformWidth / 5.3;

	nsSearchList.vwAll = Titanium.UI.createView({
		top : 5,
		left : 2,
		bottom : 5,
		height : Titanium.UI.SIZE,
		borderRadius : 5,
		borderColor : "#000000",
		backgroundColor : "#ffffff",
		width : viewWidth,
		day : "all"
	});

	var lblAll = Titanium.UI.createLabel({
		top : 2,
		bottom : 2,
		height : Titanium.UI.SIZE,
		touchEnabled : false,
		color : "#000000",
		text : L('all'),
		font : {
			fontSize : Alloy.Globals.theme.fonts.size20Fonts,
			fontFamily : "KnowYourProduct"
		}
	});

	nsSearchList.vwAll.addEventListener('click', function(e) {
		nsSearchList.selectedTab = e.source.day;
		console.log("e.source ", e.source.day);
		if (!nsSearchList.vwAll.selected) {
			nsSearchList.vwSearchView.removeAllChildren();

			var vwList = nsSearchList.createList(nsSearchList.data);
			return vwList;
		}
	});

	nsSearchList.vwAll.add(lblAll);
	header.add(nsSearchList.vwAll);

	var vwFriday = Titanium.UI.createView({
		top : 5,
		left : 2,
		bottom : 5,
		height : Titanium.UI.SIZE,
		borderRadius : 5,
		borderColor : "#000000",
		backgroundColor : "#ffffff",
		width : viewWidth,
		day : "friday",
		selected : false
	});

	var lblFriday = Titanium.UI.createLabel({
		top : 2,
		bottom : 2,
		height : Titanium.UI.SIZE,
		touchEnabled : false,
		color : "#000000",
		text : L('friday'),
		font : {
			fontSize : Alloy.Globals.theme.fonts.size20Fonts,
			fontFamily : "KnowYourProduct"
		}
	});

	vwFriday.addEventListener('click', function(e) {
		console.log("e.source ", e.source.day);
		nsSearchList.selectedTab = e.source.day;
		if (!vwFriday.selected) {
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
		borderRadius : 5,
		borderColor : "#000000",
		backgroundColor : "#ffffff",
		width : viewWidth,
		day : "saturday",
		selected : false
	});

	var lblSaturday = Titanium.UI.createLabel({
		top : 2,
		bottom : 2,
		height : Titanium.UI.SIZE,
		touchEnabled : false,
		color : "#000000",
		text : L('saturday'),
		font : {
			fontSize : Alloy.Globals.theme.fonts.size20Fonts,
			fontFamily : "KnowYourProduct"
		}
	});

	vwSaturday.addEventListener('click', function(e) {
		console.log("e.source ", e.source.day);
		nsSearchList.selectedTab = e.source.day;
		if (!vwSaturday.selected) {
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
		borderRadius : 5,
		borderColor : "#000000",
		backgroundColor : "#ffffff",
		width : viewWidth,
		day : "sunday",
		selected : false
	});

	var lblSunday = Titanium.UI.createLabel({
		top : 2,
		bottom : 2,
		height : Titanium.UI.SIZE,
		touchEnabled : false,
		color : "#000000",
		text : L('sunday'),
		font : {
			fontSize : Alloy.Globals.theme.fonts.size20Fonts,
			fontFamily : "KnowYourProduct"
		}
	});

	vwSunday.addEventListener('click', function(e) {
		console.log("e.source ", e.source.day);
		nsSearchList.selectedTab = e.source.day;
		if (!vwSunday.selected) {
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
		borderRadius : 5,
		borderColor : "#000000",
		backgroundColor : "#ffffff",
		selected : false,
		width : viewWidth,
		day : "monday"
	});

	var lblMonday = Titanium.UI.createLabel({
		top : 2,
		bottom : 2,
		height : Titanium.UI.SIZE,
		touchEnabled : false,
		color : "#000000",
		text : L('monday'),
		font : {
			fontSize : Alloy.Globals.theme.fonts.size20Fonts,
			fontFamily : "KnowYourProduct"
		}
	});

	vwMonday.addEventListener('click', function(e) {
		console.log("e.source ", e.source.day);
		nsSearchList.selectedTab = e.source.day;
		if (!vwMonday.selected) {
			var bands = nsSearchList.getList(e.source.day);

			nsSearchList.vwSearchView.removeAllChildren();

			var vwList = nsSearchList.createList(bands);
			return vwList;
		}
	});

	vwMonday.add(lblMonday);
	header.add(vwMonday);

	if (nsSearchList.selectedTab === "friday") {
		vwFriday.selected = true;
		vwFriday.backgroundColor = "#c0c0c0";
	} else if (nsSearchList.selectedTab === "saturday") {
		vwSaturday.selected = true;
		vwSaturday.backgroundColor = "#c0c0c0";
	} else if (nsSearchList.selectedTab === "sunday") {
		vwSunday.selected = true;
		vwSunday.backgroundColor = "#c0c0c0";
	} else if (nsSearchList.selectedTab === "monday") {
		vwMonday.selected = true;
		vwMonday.backgroundColor = "#c0c0c0";
	} else {
		nsSearchList.vwAll.selected = true;
		nsSearchList.vwAll.backgroundColor = "#c0c0c0";
	}

	return header;
};

nsSearchList.createList = function(tblData) {

	var userSchedule = Ti.App.Properties.getList('userSchedule');

	if (nsSearchList.type === "BandList") {

		if (nsSearchList.selectedTab !== null) {
			nsSearchList.selectedTab.selected = true;
			nsSearchList.selectedTab.backgroundColor = "#c0c0c0";
		}

		for (var j in tblData) {
			for (var i in userSchedule) {
				if (userSchedule[i].band_id == tblData[j]._id) {
					tblData[j].selected = true;
				}
			}
		}

		var sbSearchBar = Titanium.UI.createSearchBar({
			barColor : '#000000',
			backgroundColor : "#ffffff",
			showCancel : false,
			hintText : "Search",
			height : 43,
			top : 10,
			width : "80%",
		});

		nsSearchList.vwSearchView.add(sbSearchBar);

	} else {
		for (var j in tblData) {
			for (var i in userSchedule) {
				if (userSchedule[i].venue_id == tblData[j]._id) {
					tblData[j].selected = true;
				}
			}
		}
	}

	var currHeader = "A";
	var sectionArr = [];
	var index = [];
	console.debug("tblData[i] ", JSON.stringify(tblData[i]));
	for (var i = 0,
	    lastL,
	    l,
	    currSection,
	    len = tblData.length; i < len; i++) {

		if (tblData[i] !== undefined) {
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

						Alloy.Globals.openWindow("BandProfile", {
							"id" : tblData[e.source.id]._id
						}, true, null, 'misc/right_logo');

					} else if (nsSearchList.type === "VenueList") {

						Alloy.Globals.openWindow("VenueProfile", {
							"id" : tblData[e.source.id]._id
						}, true, null, 'misc/right_logo');

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
				// image : tblData[i].image_link,
				touchEnabled : false
			});

			var imagelink = tblData[i].image_link;

			if (tblData[i].image_link && (imagelink.indexOf('.png') > -1 || imagelink.indexOf('.jpg') > -1 || imagelink.indexOf('.jpeg') > -1 )) {
				ivImage.image = imagelink;
			}

			vwRowView.add(ivImage);

			var lblName = Titanium.UI.createLabel({
				left : Alloy.Globals.platformWidth * 0.30,
				text : tblData[i].name,
				color : "#ffffff",
				height : Titanium.UI.SIZE,
				touchEnabled : false,
				width : "50%",
				font : {
					fontSize : Alloy.Globals.theme.fonts.size20Fonts
				}
			});

			vwRowView.add(lblName);

			if (nsSearchList.type === "BandList") {
				var ivFavouriteStar = Titanium.UI.createImageView({
					right : 5,
					height : 30,
					width : 30,
					id : "ivFavouriteStar",
					index : i,
					selected : tblData[i].selected,
					// image : Alloy.Globals.theme.icons.star
				});

				if (!ivFavouriteStar.selected) {
					ivFavouriteStar.setImage(Alloy.Globals.theme.icons.star_off);
				} else {
					ivFavouriteStar.setImage(Alloy.Globals.theme.icons.star);
				}
/*

				ivFavouriteStar.addEventListener('click', function(e) {

					var data_id = (Titanium.Platform.osname === "android") ? tblData[e.source.index]._id : tblData[e.row.id]._id;

					for (i in nsSearchList.currentCityData) {
						
						if (nsSearchList.type === "BandList") {
							if (nsSearchList.currentCityData[i].showDetails.band_id === data_id) {
								var show_id = nsSearchList.currentCityData[i].showDetails._id;
								var addShow = new nsSearchList.serverCalls.saveUserSchedule(show_id, function(response) {
									e.source.setImage(Alloy.Globals.theme.icons.star);

									var MS_PER_MINUTE = 60000;
									var startDate = new Date((nsSearchList.currentCityData[i].showDetails.start_time * 1000) - 10 * MS_PER_MINUTE);

									// Schedule notifications for IOS
									if (Titanium.Platform.osname !== "android") {

										var notification = Ti.App.iOS.scheduleLocalNotification({
											alertBody : nsSearchList.currentCityData[i].bandDetails.name + "\n" + nsSearchList.currentCityData[i].venueDetails.name + "\n" + startDate,
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

										intent.putExtra('band', nsSearchList.currentCityData[i].bandDetails.name);
										intent.putExtra('message', nsSearchList.currentCityData[i].venueDetails.name + "\n" + startDate);

										// Start the service
										Ti.Android.startService(intent);
									}

								}, function(error) {
									alert(L('err_serviceError'));
								});

								break;
							}
						} else {
							if (nsSearchList.currentCityData[i].showDetails.venue_id === data_id) {
								var show_id = nsSearchList.currentCityData[i].showDetails._id;
								var addShow = new nsSearchList.serverCalls.saveUserSchedule(show_id, function(response) {
									e.source.setImage(Alloy.Globals.theme.icons.star);

									var MS_PER_MINUTE = 60000;
									var startDate = new Date((nsSearchList.currentCityData[i].showDetails.start_time * 1000) - 10 * MS_PER_MINUTE);
									console.log("startDate ", startDate);

									// Schedule notifications for IOS
									if (Titanium.Platform.osname !== "android") {

										var notification = Ti.App.iOS.scheduleLocalNotification({
											alertBody : nsSearchList.currentCityData[i].bandDetails.name + "\n" + nsSearchList.currentCityData[i].venueDetails.name + "\n" + startDate,
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

										intent.putExtra('band', nsSearchList.currentCityData[i].bandDetails.name);
										intent.putExtra('message', nsSearchList.currentCityData[i].venueDetails.name + "\n" + startDate);

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
*/

				vwRowView.add(ivFavouriteStar);
			}
			row.add(vwRowView);

			currSection.add(row);
			lastL = l;
		}
	}

	nsSearchList.table = Ti.UI.createTableView({
		top : 0,
		bottom : 20,
		filterAttribute : 'filter',
		filterCaseInsensitive : true,
		searchHidden : true,
		backgroundColor : "#000000",
		// headerView : nsSearchList.createHeader()
	});

	if (nsSearchList.type === "BandList") {
		//nsSearchList.table.headerView = nsSearchList.createHeader();
		nsSearchList.vwSearchView.add(nsSearchList.createHeader());
	}

	nsSearchList.table.setData(sectionArr);

	if (nsSearchList.type === "BandList") {
		nsSearchList.table.setSearch(sbSearchBar);
	}
	nsSearchList.table.index = index;

	nsSearchList.vwSearchView.add(nsSearchList.table);
	return nsSearchList.vwSearchView;

};

nsSearchList.init = function(type, data) {
	nsSearchList.selectedTab = null;
	nsSearchList.type = type;
	nsSearchList.data = JSON.parse(JSON.stringify(data.list));
	nsSearchList.currentCityData = JSON.parse(JSON.stringify(data.currentCityData));

	nsSearchList.data.sort(Alloy.Globals.sortArray('name'));
	console.log("sorted ", JSON.stringify(nsSearchList.data));

	console.debug("In searchList");
	console.debug("Data: ", JSON.stringify(nsSearchList.data));

	nsSearchList.vwSearchView = Titanium.UI.createView({
		layout : "vertical",
		height : Titanium.UI.FILL,
		width : Titanium.UI.FILL,
		top : 0,
		bottom: '60dp',
		backgroundColor : "#000000"
	});

	var vwList = nsSearchList.createList(nsSearchList.data);
	return vwList;
};

exports.init = nsSearchList.init;
