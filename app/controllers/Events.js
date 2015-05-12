var nsEvents = {};
nsEvents.serviceCalls = require("serverCalls");

nsEvents.activityControl = require("activityControl");
nsEvents.controller = null;

nsEvents.closeWindow = function() {
	$.winEvents.close();
};

nsEvents.getMusic = function() {
	
	var appdata = Titanium.App.Properties.getObject('appdata', {});

	if (appdata.details.length === 0) {
		$.winEvents.add(nsEvents.controller);
		var hasData = Alloy.Globals.getAndStoreData(function(fetchedData) {
			console.debug("fetchedData ", fetchedData);
			if (fetchedData) {
				Alloy.createController("MusicEvents").getView().open();
			} else {
				console.debug("All data did not get downloaded!!!");
				alert("Some error occured while fetching the details. Please try again");
			}
			$.winEvents.remove(nsEvents.controller);
		});

	} else {
		Alloy.createController("MusicEvents").getView().open();
	}
	
	// Alloy.createController("MusicEvents").getView().open();
};

nsEvents.getMovies = function() {
	Alloy.createController("MovieEvents").getView().open();
};

nsEvents.getBowling = function() {
	Alloy.createController("BowlingEvents").getView().open();
};

nsEvents.getPoker = function() {
	Alloy.createController("PokerEvents").getView().open();
};

nsEvents.getArt = function() {
	Alloy.createController("ArtEvents").getView().open();
};

nsEvents.init = function() {
	// Alloy.Globals.combinedDetails();
	nsEvents.controller = new nsEvents.activityControl($.vwMain);

	$.winEvents.addEventListener('android:back', function(e) {
		console.debug("Pressing Back Will Not Close The Activity/Window");
		nsEvents.closeWindow();
	});

	$.vwTopYellow.setHeight(Alloy.Globals.platformHeight * 0.0704);
	
	$.ivMusic.setLeft(10);
	$.ivMovies.setRight(10);
	$.ivBowling.setLeft(10);
	$.ivPoker.setRight(10);
	$.ivArt.setLeft(30);
};

nsEvents.init();
