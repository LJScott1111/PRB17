var nsSearchList = {};
nsSearchList.type = "";
nsSearchList.vwSearchView = null;

nsSearchList.createList = function() {

	var sbSearchBar = Titanium.UI.createSearchBar({
		barColor : '#000000',
		backgroundColor : "#ffffff",
		showCancel : false,
		hintText : "Search",
		height : 43,
		top : 10,
		width : "80%",
		// borderRadius : 10,
	});

	sbSearchBar.addEventListener("change", function(e) {
		e.value
	});

	nsSearchList.vwSearchView.add(sbSearchBar);

	var contacts = ["Adam", "Andrew", "Boris", "Claus", "Debby", 'Saba', 'Sana', 'Wahhab', 'Zohaib', 'Zzaid', 'Zzxad'];

	var currHeader = "A";
	var sectionArr = [];
	var index = [];

	for (var i = 0,
	    lastL,
	    l,
	    currSection,
	    len = contacts.length; i < len; i++) {

		l = contacts[i].substr(0, 1);

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
			title : contacts[i],
			filter : contacts[i]
		});

		row.addEventListener('click', function(e) {
			console.debug(JSON.stringify(e));
			// console.debug(nsSearchList.type, " ", e.source.rowData.id, " ", e.source.rowData.title);
			if(nsSearchList.type === "BandList"){
				Alloy.createController("BandProfile").getView().open();
			} else if(nsSearchList.type === "VenueList"){
				Alloy.createController("VenueProfile").getView().open();
			}
		});

		// row.filter = contacts[i];
		// console.debug(row.filter);

		var vwRowView = Titanium.UI.createView({
			height : Titanium.UI.SIZE,
			width : Titanium.UI.FILL
		});

		var ivImage = Titanium.UI.createImageView({
			left : 10,
			top : 5,
			bottom : 5,
			width : Alloy.Globals.platformWidth * 0.25,
			height : Alloy.Globals.platformHeight * 0.088,
			borderColor : "#000000"
		});

		vwRowView.add(ivImage);

		var lblName = Titanium.UI.createLabel({
			left : Alloy.Globals.platformWidth * 0.30,
			text : contacts[i],
			color : "#000000",
			font : {
				fontSize : Alloy.Globals.theme.fonts.size20Fonts
			}
		});

		vwRowView.add(lblName);

		var ivFavouriteStar = Titanium.UI.createImageView({
			right : 35,
			height : 30,
			width : 30,
			backgroundColor : "#000000",
			selected : false
		});

		vwRowView.add(ivFavouriteStar);

		var ivNext = Titanium.UI.createImageView({
			right : 10,
			height : 30,
			width : 20,
			backgroundColor : "#000030"
		});

		vwRowView.add(ivNext);
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
		filterCaseInsensitive : true
		// search : sbSearchBar,
		// searchHidden: true
	});

	table.setData(sectionArr);
	// table.search = sbSearchBar;
	table.setSearch(sbSearchBar);
	// table.filterAttribute = 'filter';
	table.index = index;
	// console.debug("table ... " + JSON.stringify(table));
	nsSearchList.vwSearchView.add(table);
	// console.debug(JSON.stringify(nsSearchList.vwSearchView));

	return nsSearchList.vwSearchView;

};

nsSearchList.init = function(type) {
	nsSearchList.type = type;
	console.debug("In searchList");

	nsSearchList.vwSearchView = Titanium.UI.createView({
		layout : "vertical",
		height : Titanium.UI.FILL,
		width : Titanium.UI.FILL,
		top : 10,
		backgroundColor : "#ffffff"
	});

	var vwList = nsSearchList.createList();
	return vwList;
};

// nsSearchList.init();
exports.init = nsSearchList.init;
