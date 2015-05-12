var nsMusicEvents = {};

nsMusicEvents.closeWindow = function() {
	$.winMusicEvents.close();
};

nsMusicEvents.createShowList = function() {

	var appdata = Titanium.App.Properties.getObject('appdata', {});
	var tabledata = [];
	var showDetails = appdata.details;
	console.debug(JSON.stringify(showDetails));
	var time = "";

	for (var i = 0,
	    len = appdata.details.length; i < len; i++) {

		time = Alloy.Globals.getFormattedDate(showDetails[i].showDetails.start_time);
		console.log("Details ",showDetails[i].bandDetails.name + "\n" + showDetails[i].venueDetails.name);

		var row = Titanium.UI.createTableViewRow({
			top : 10,
			height : Titanium.UI.SIZE,
			width : Titanium.UI.SIZE,
			rowIndex : i
		});

		// var vwRow = Titanium.UI.createView({
		//
		// });

		var lblShowDetails = Titanium.UI.createLabel({
			top : 5,
			bottom : 5,
			left : 15,
			right : 15,
			height : Titanium.UI.SIZE,
			text : showDetails[i].bandDetails.name + "\n" + showDetails[i].venueDetails.name + "\n" + time[1],
			textAlign : Titanium.UI.TEXT_ALIGNMENT_LEFT,
			font : {
				fontSize : Alloy.Globals.theme.fonts.size20Fonts
			}
		});

		row.add(lblShowDetails);
		tabledata.push(row);
	}

	var tableView = Titanium.UI.createTableView({
		data : tabledata,
		top : 0,
	});

	$.vwMain.add(tableView);
};

nsMusicEvents.init = function() {

	$.winMusicEvents.addEventListener('android:back', function(e) {
		console.debug("Pressing Back Will Not Close The Activity/Window");
		nsMusicEvents.closeWindow();
	});

	nsMusicEvents.createShowList();
};

nsMusicEvents.init();
