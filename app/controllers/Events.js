var nsEvents = {};
nsEvents.serviceCalls = require("serverCalls");

nsEvents.activityControl = require("activityControl");
nsEvents.controller = null;

nsEvents.closeWindow = function() {
	Alloy.Globals.windowStack.pop();
	$.winEvents.close();
};

nsEvents.getSettings = function() {
	Alloy.Globals.getSettings($.winEvents);
};

nsEvents.getMusic = function() {
	var appdata = Titanium.App.Properties.getObject('appdata', {});

	console.debug("Alloy.Globals.bands emply ", JSON.stringify(appdata.bands));

	if (appdata.details.length === 0) {
		$.winEvents.add(nsEvents.controller);
		var hasData = Alloy.Globals.getAndStoreData(function(fetchedData) {
			console.debug("fetchedData ", fetchedData);
			if (fetchedData) {
				if (Titanium.Platform.osname === "android") {
					Alloy.createController("BandList").getView().open();
				} else {
					Alloy.Globals.navWin.openWindow(Alloy.createController("BandList").getView());
				}
				$.winEvents.remove(nsEvents.controller);
			} else {
				console.debug("All data did not get downloaded!!!");
				alert("Some error occured while fetching the details. Please try again");
			}
			$.winEvents.remove(nsEvents.controller);
		});

	} else {
		console.log('Opening bands');
		if (Titanium.Platform.osname === "android") {
			Alloy.createController("BandList").getView().open();
		} else {
			console.log('Nav open');
			Alloy.Globals.navWin.openWindow(Alloy.createController("BandList").getView());
		}
	}
};

nsEvents.getMovies = function() {
	if (Titanium.Platform.osname === "android") {
		Alloy.createController("MovieEvents").getView().open();
	} else {
		Alloy.Globals.navWin.openWindow(Alloy.createController("MovieEvents").getView());
	}
	// Alloy.createController("MovieEvents").getView().open();
};

nsEvents.getBowling = function() {
	if (Titanium.Platform.osname === "android") {
		Alloy.createController("BowlingEvents").getView().open();
	} else {
		Alloy.Globals.navWin.openWindow(Alloy.createController("BowlingEvents").getView());
	}
	// Alloy.createController("BowlingEvents").getView().open();
};

nsEvents.getPoker = function() {
	if (Titanium.Platform.osname === "android") {
		Alloy.createController("PokerEvents").getView().open();
	} else {
		Alloy.Globals.navWin.openWindow(Alloy.createController("PokerEvents").getView());
	}
	// Alloy.createController("PokerEvents").getView().open();
};

nsEvents.getArt = function() {
	if (Titanium.Platform.osname === "android") {
		Alloy.createController("ArtEvents").getView().open();
	} else {
		Alloy.Globals.navWin.openWindow(Alloy.createController("ArtEvents").getView());
	}
	// Alloy.createController("ArtEvents").getView().open();
};

nsEvents.init = function() {
	Alloy.Globals.windowStack.push($.winEvents);
	nsEvents.controller = new nsEvents.activityControl($.vwMain);

	$.winEvents.addEventListener('android:back', function(e) {
		console.debug("Pressing Back Will Not Close The Activity/Window");
		nsEvents.closeWindow();
	});

	// $.vwTopYellow.setHeight(Alloy.Globals.platformHeight * 0.0704);

	$.ivMusic.setLeft(10);
	$.ivMovies.setRight(10);
	$.ivBowling.setLeft(10);
	$.ivPoker.setRight(10);
	$.ivArt.setLeft(30);
};

nsEvents.init();
