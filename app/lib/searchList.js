var nsSearchList = {};
nsSearchList.type = "";
nsSearchList.data = null;
nsSearchList.vwSearchView = null;

nsSearchList.createList = function() {

	var sbSearchBar = Titanium.UI.createSearchBar({
		barColor : '#FFD801',
		backgroundColor : "#ffffff",
		showCancel : false,
		hintText : "Search",
		height : 43,
		top : 10,
		width : "80%",
		// borderRadius : 10,
	});

	// sbSearchBar.addEventListener("change", function(e) {
	// e.value;
	// });

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
			// title : nsSearchList.data[i].name,
			filter : nsSearchList.data[i].name,
			hasChild : true,
			top : 0
		});

		row.addEventListener('click', function(e) {
			// console.debug(JSON.stringify(e));
			// console.debug(nsSearchList.type, " ", e.source.rowData.id, " ", e.source.rowData.title);
			var data = null;
			// console.debug("e.source.id ", e.source.id);
			if (e.source.id !== "ivFavouriteStar") {
				if (nsSearchList.type === "BandList") {
					if (Titanium.Platform.osname === "android") {
						Alloy.createController("BandProfile", {
							"id" : nsSearchList.data[e.row.id]._id
						}).getView().open();
					} else {
						Alloy.Globals.navWin.openWindow(Alloy.createController("BandProfile", {
							"id" : nsSearchList.data[e.row.id]._id
						}).getView());
					}
				} else if (nsSearchList.type === "VenueList") {
					if (Titanium.Platform.osname === "android") {
						Alloy.createController("VenueProfile", {
							"id" : nsSearchList.data[e.row.id]._id
						}).getView().open();
					} else {
						Alloy.Globals.navWin.openWindow(Alloy.createController("VenueProfile", {
							"id" : nsSearchList.data[e.row.id]._id
						}).getView());
					}

				}
			}
		});

		// row.filter = nsSearchList.data[i];
		// console.debug(row.filter);

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
			image : nsSearchList.data[i].image_link
		});

		vwRowView.add(ivImage);

		var lblName = Titanium.UI.createLabel({
			left : Alloy.Globals.platformWidth * 0.30,
			text : nsSearchList.data[i].name,
			color : "#000000",
			font : {
				fontSize : Alloy.Globals.theme.fonts.size20Fonts
			}
		});

		vwRowView.add(lblName);

		var ivFavouriteStar = Titanium.UI.createImageView({
			right : 35,
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

		// var ivNext = Titanium.UI.createImageView({
		// right : 10,
		// height : 30,
		// width : 20,
		// backgroundColor : "#000030"
		// });
		//
		// vwRowView.add(ivNext);
		row.add(vwRowView);

		currSection.add(row);
		lastL = l;
	}

	var table = Ti.UI.createTableView({
		top : 10,
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

	console.debug("In searchList");
	console.debug("Data: ", JSON.stringify(nsSearchList.data));

	nsSearchList.vwSearchView = Titanium.UI.createView({
		layout : "vertical",
		height : "100%",
		width : Titanium.UI.FILL,
		top : 10,
		backgroundColor : "#FFD801"
	});

	var vwList = nsSearchList.createList();
	return vwList;
};

// nsSearchList.init();
exports.init = nsSearchList.init;
