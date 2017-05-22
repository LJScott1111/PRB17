var nsSearchList = {};
nsSearchList.type = "";
nsSearchList.data = null;
nsSearchList.vwSearchView = null;
nsSearchList.table = null;

nsSearchList.selectedTab = null;
nsSearchList.vwAll = null;

nsSearchList.serverCalls = require('serverCalls');
nsSearchList.momentjs = require('moment');
nsSearchList.remoteImageView = require('createRemoteImageView');

var appdata = {};

nsSearchList.getList = function(day) {
	// Get list
	console.debug("day ", day);

	var dayOfShow = "";
	var listToShow = [];
	var lookup = {};

	for (i in nsSearchList.currentCityData) {
		dayOfShow = nsSearchList.momentjs(nsSearchList.currentCityData[i].showDetails.start_time * 1000).utcOffset('-0700').format('dddd').toLowerCase().trim();

		console.debug("dayOfShow ", dayOfShow);

		if (nsSearchList.type === "BandList" && day === dayOfShow) {
			listToShow.push(nsSearchList.currentCityData[i].bandDetails);
		} else if (nsSearchList.type === "VenueList") {//  && day === dayOfShow
			var venue = nsSearchList.currentCityData[i].venueDetails._id;

			if (!( venue in lookup)) {
				lookup[venue] = 1;
				listToShow.push(nsSearchList.currentCityData[i].venueDetails);
			}
		}
	}
	listToShow.sort(Alloy.Globals.sortArray('name'));
	console.log("JSON.stringify(listToShow) ", JSON.stringify(listToShow));
	return listToShow;
};

nsSearchList.createHeader = function() {
	var header = Ti.UI.createView({
		height : Titanium.UI.SIZE,
		width : Titanium.UI.SIZE,
		layout : "horizontal",
		top : 5
	});

	var viewWidth = Alloy.Globals.platformWidth / 3.15;
	/*

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
	 header.add(nsSearchList.vwAll);*/

	/*

	 var vwThurs = Titanium.UI.createView({
	 top : 5,
	 left : 2,
	 bottom : 5,
	 height : Titanium.UI.SIZE,
	 borderRadius : 5,
	 borderColor : "#000000",
	 backgroundColor : "#ffffff",
	 width : viewWidth,
	 day : "thursday",
	 selected : false
	 });

	 var lblThurs = Titanium.UI.createLabel({
	 top : 2,
	 bottom : 2,
	 height : Titanium.UI.SIZE,
	 touchEnabled : false,
	 color : "#000000",
	 text : L('thursday'),
	 font : {
	 fontSize : Alloy.Globals.theme.fonts.size15Fonts,
	 fontFamily : "KnowYourProduct"
	 }
	 });

	 vwThurs.addEventListener('click', function(e) {
	 console.log("e.source ", e.source.day);
	 nsSearchList.selectedTab = e.source.day;
	 if (!vwThurs.selected) {
	 var bands = nsSearchList.getList(e.source.day);

	 nsSearchList.vwSearchView.removeAllChildren();

	 var vwList = nsSearchList.createList(bands);
	 return vwList;
	 }
	 });

	 vwThurs.add(lblThurs);
	 header.add(vwThurs);
	 */

	/*
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
	 */

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
	/*

	 if (nsSearchList.selectedTab === "thursday") {
	 vwThurs.selected = true;
	 vwThurs.backgroundColor = "#c0c0c0";
	 } else

	 if (nsSearchList.selectedTab === "friday") {
	 vwFriday.selected = true;
	 vwFriday.backgroundColor = "#c0c0c0";
	 } else*/
	if (nsSearchList.selectedTab === "saturday") {
		vwSaturday.selected = true;
		vwSaturday.backgroundColor = "#c0c0c0";
	} else if (nsSearchList.selectedTab === "sunday") {
		vwSunday.selected = true;
		vwSunday.backgroundColor = "#c0c0c0";
	}
	/* else
	 {
	 nsSearchList.vwAll.selected = true;
	 nsSearchList.vwAll.backgroundColor = "#c0c0c0";
	 }*/

	else if (nsSearchList.selectedTab === "monday") {
		vwMonday.selected = true;
		vwMonday.backgroundColor = "#c0c0c0";
	}
	/*
	 else {
	 vwFriday.selected = true;
	 vwFriday.backgroundColor = "#c0c0c0";
	 }*/

	return header;
};

nsSearchList.createList = function(tblData) {

	var userSchedule = Ti.App.Properties.getObject('userSchedule');
	var imageW = Alloy.Globals.platformWidth * 0.25;
	var imageH = Alloy.Globals.platformHeight * 0.088;

	if (nsSearchList.type === "BandList") {

		if (nsSearchList.selectedTab !== null) {
			nsSearchList.selectedTab.selected = true;
			nsSearchList.selectedTab.backgroundColor = "#c0c0c0";
		}
		/*

		 for (var j in tblData) {
		 for (var i in userSchedule) {
		 if (userSchedule[i].band_id == tblData[j]._id) {
		 tblData[j].selected = true;
		 }
		 }
		 }

		 */
		/*

		 var sbSearchBar = Titanium.UI.createSearchBar({
		 barColor : '#000000',
		 backgroundColor : "#ffffff",
		 showCancel : false,
		 hintText : "Search",
		 height : 43,
		 top : 10,
		 width : "80%",
		 });

		 nsSearchList.vwSearchView.add(sbSearchBar);*/

	}
	/*
	else {

	for (var j in tblData) {
	for (var i in userSchedule) {
	if (userSchedule[i].venue_id == tblData[j]._id) {
	tblData[j].selected = true;
	}
	}
	}
	}
	*/

	// var currHeader = "12";
	if (nsSearchList.listType == 'time') {
		tblData.sort(Alloy.Globals.sortArray('start_time'));
		// for (var i in tblData) {
		// console.log('tblData', JSON.stringify(tblData));
		// console.log('tblData[i].start_time ', tblData[i].start_time);
		// console.error('tblData.start_time ', new Date(tblData[i].start_time * 1000).toISOString());
		// }
	};

	var sectionArr = [];
	var index = [];
	for (var i = 0,
	    lastL,
	    l,
	    currSection,
	    len = tblData.length; i < len; i++) {

		if (tblData[i] !== undefined) {
			// console.error('new Date(tblData[i].start_time * 1000).toTimeString().substr(0, 5) ', new Date(tblData[i].start_time * 1000).toTimeString().substr(0, 5));
			// console.error('tblData[i].name.substr(0, 3) ', tblData[i].name.substr(0, 3), tblData[i].name.substr(4, 1));
			// var abbr = (tblData[i].name.substr(0, 3).toLowerCase() === 'the')? tblData[i].name.substr(4, 1):tblData[i].name.substr(0, 1);
			// console.error('abbr +++=============', abbr);
			if (nsSearchList.type === "BandList") {
				l = (nsSearchList.listType == 'time') ? Alloy.Globals.getFormattedDate(tblData[i].start_time)[1] : tblData[i].focusedName.substr(0, 1);
			} else {
				l = (nsSearchList.listType == 'time') ? Alloy.Globals.getFormattedDate(tblData[i].start_time)[1] : tblData[i].name.substr(0, 1);
			}

			if (nsSearchList.type === "BandList" && lastL != l) {
				index.push({
					title : l,
					index : i
				});
				var tableViewSectionHeader = Titanium.UI.createView({
					width : Titanium.UI.FILL,
					height : '20dp',
					backgroundColor : '#868686'
				});

				var tableViewSectionHeaderTitle = Titanium.UI.createLabel({
					text : l,
					left : '20dp',
					color : '#fff',
					font : {
						fontSize : '13dp'
					}
				});
				tableViewSectionHeader.add(tableViewSectionHeaderTitle);
				currSection = Ti.UI.createTableViewSection({
					// headerTitle : l,
					headerView : tableViewSectionHeader
				});
				sectionArr.push(currSection);
			}

			var row = Ti.UI.createTableViewRow({
				id : i,
				filter : tblData[i].name,
				hasChild : true,
				top : 0
			});

			var vwRowView = Titanium.UI.createView({
				height : Titanium.UI.SIZE,
				width : Titanium.UI.FILL,
				top : 0,
				touchEnabled : false
			});

			if (OS_IOS) {

				var ivImage = Titanium.UI.createImageView({
					left : 10,
					top : 5,
					bottom : 5,
					width : imageW,
					height : imageH,
					borderColor : "#000000",
					// image : tblData[i].image_link,
					touchEnabled : false
				});

				var imagelink = tblData[i].image_link;
				imagelink = imagelink.replace(/ /g, '');

				// console.error('imagelink ', imagelink);

				if (tblData[i].image_link && (imagelink.indexOf('.png') > -1 || imagelink.indexOf('.jpg') > -1 || imagelink.indexOf('.jpeg') > -1 )) {
					ivImage.image = imagelink;
				}

				// console.log('imagelink ', tblData[i]._id, imagelink);

				vwRowView.add(ivImage);
			} else {

				var imagelink = tblData[i].image_link;
				var remoteImage = nsSearchList.remoteImageView.createRemoteImageView({
					image : (tblData[i].image_link && (imagelink.indexOf('.png') > -1 || imagelink.indexOf('.jpg') > -1 || imagelink.indexOf('.jpeg') > -1 )) ? imagelink : '',
					defaultImage : '/icons/logo.png', // default images are also handled
					hires : true,
					width : imageW,
					height : imageH,
					touchEnabled : false,
					left : 10,
					top : 5,
					bottom : 5,
				});
				vwRowView.add(remoteImage);
			}

			var lblName = Titanium.UI.createLabel({
				left : Alloy.Globals.platformWidth * 0.30,
				text : tblData[i].name,
				color : "#ffffff",
				height : Titanium.UI.SIZE,
				touchEnabled : false,
				width : "62%",
				font : {
					fontSize : '15dp'
				}
			});

			vwRowView.add(lblName);
			/*

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

			 vwRowView.add(ivFavouriteStar);
			 }
			 */

			row.add(vwRowView);

			if (nsSearchList.type === "BandList") {
				currSection.add(row);
				lastL = l;
			} else {
				sectionArr.push(row);
			}
		}
	}

	nsSearchList.table = Ti.UI.createTableView({
		top : 0,
		// bottom : 20,
		filterAttribute : 'filter',
		filterCaseInsensitive : true,
		// searchHidden : true,
		backgroundColor : "#000000"
	});

	// if (nsSearchList.type === "BandList") {
	// nsSearchList.table.searchHidden = true;
	// }

	nsSearchList.table.addEventListener('click', function(e) {
		var data = null;
		// console.log(e.source, " ", e.source.id);
		if (nsSearchList.type === "BandList") {

			Alloy.Globals.openWindow("BandProfile", {
				"id" : tblData[e.source.id]._id,
				showsType : nsSearchList.showsType
			}, true, null, 'misc/center_logo');

		} else if (nsSearchList.type === "VenueList") {

			Alloy.Globals.openWindow("VenueProfile", {
				"id" : tblData[e.source.id]._id
			}, true, null, 'misc/center_logo');

		}
	});

	if (nsSearchList.type === "BandList" && nsSearchList.screen != 'lineup') {
		nsSearchList.vwSearchView.add(nsSearchList.createHeader());
	} else {
		nsSearchList.table.index = index;
	}

	nsSearchList.table.setData(sectionArr);

	if (nsSearchList.type !== "BandList") {
		// nsSearchList.table.setSearch(sbSearchBar);
		// nsSearchList.table.index = index;
	}

	nsSearchList.vwSearchView.add(nsSearchList.table);
	return nsSearchList.vwSearchView;
};

nsSearchList.init = function(type, data) {
	nsSearchList.selectedTab = null;
	nsSearchList.type = type;
	nsSearchList.data = JSON.parse(JSON.stringify(data.list));
	nsSearchList.listType = data.listType;
	console.error(nsSearchList.type, nsSearchList.listType, nsSearchList.screen);
	nsSearchList.currentCityData = JSON.parse(JSON.stringify(data.currentCityData));
	nsSearchList.screen = data.screen;
	nsSearchList.showsType = data.showsType;

	console.error('SHOWTYPE ', nsSearchList.showsType);

	if (nsSearchList.type === "BandList") {
		for (var i in nsSearchList.data) {
			var focusedName = (nsSearchList.data[i].name.substr(0, 3).toLowerCase() === 'the') ? nsSearchList.data[i].name.substr(4) : nsSearchList.data[i].name;
			// console.error('focusedName +++=============', focusedName);
			nsSearchList.data[i].focusedName = focusedName;
		}
		nsSearchList.data.sort(Alloy.Globals.sortArray('focusedName'));
	} else {
		nsSearchList.data.sort(Alloy.Globals.sortArray('name'));
	}

	// console.log("sorted ", nsSearchList.screen, JSON.stringify(nsSearchList.data));

	console.debug("In searchList");
	// console.debug("Data: ", JSON.stringify(nsSearchList.data));

	nsSearchList.vwSearchView = Titanium.UI.createView({
		layout : "vertical",
		height : Titanium.UI.FILL,
		width : Titanium.UI.FILL,
		top : 0,
		bottom : '0dp',
		backgroundColor : "#000000"
	});
	// console.error('nsSearchList.data =====>  ', JSON.stringify(nsSearchList.data));

	if (nsSearchList.screen != 'lineup') {
		console.error('nsSearchList.screen != lineup');
		var bands = nsSearchList.getList('saturday');

		// nsSearchList.vwSearchView.removeAllChildren();
		nsSearchList.selectedTab = 'saturday';
		var vwList = nsSearchList.createList(bands);
		return vwList;

	} else {

		console.error('ELSE nsSearchList.screen != lineup');

		var vwList = nsSearchList.createList(nsSearchList.data);
		return vwList;
	}
};

exports.init = nsSearchList.init;
