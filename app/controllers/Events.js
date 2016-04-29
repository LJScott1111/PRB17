var nsEvents = {};
nsEvents.serviceCalls = require("serverCalls");
var cities = JSON.parse(JSON.stringify(Alloy.Globals.CITIES));

nsEvents.getSettings = function() {
	// Alloy.Globals.getSettings($.winEvents);
};

/*
nsEvents.getMusic = function() {
	var appdata = Titanium.App.Properties.getObject('appdata', {});

	console.debug("Alloy.Globals.bands emply ", JSON.stringify(appdata.bands));

	if (appdata.details.length === 0) {
		// $.winEvents.add(nsEvents.controller);
		var hasData = Alloy.Globals.getAndStoreData(function(fetchedData) {
			console.debug("fetchedData ", fetchedData);
			if (fetchedData) {
				if (Titanium.Platform.osname === "android") {
					Alloy.createController("BandList").getView().open();
				} else {
					Alloy.Globals.navWin.openWindow(Alloy.createController("BandList").getView());
				}
				// $.winEvents.remove(nsEvents.controller);
			} else {
				console.debug("All data did not get downloaded!!!");
				alert(L('err_fetchingDetails'));
			}
			// $.winEvents.remove(nsEvents.controller);
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
*/

nsEvents.getMovies = function() {

	Alloy.Globals.openWindow('GenericWebView', {
		url : "http://www.punkrockbowling.com/pool-parties/"
	}, true);
};

nsEvents.getBowling = function() {

	Alloy.Globals.openWindow('GenericWebView', {
		url : "https://punkrockbowling.com/prborder/bowling"
	}, true);
};

nsEvents.getPoker = function() {

	Alloy.Globals.openWindow('GenericWebView', {
		url : "https://punkrockbowling.com/poker/"
	}, true);
};

nsEvents.getArt = function() {

	Alloy.Globals.openWindow('GenericWebView', {
		url : "https://www.punkrockbowling.com/art-exhibit/"
	}, true);
};

nsEvents.openCity2Event = function() {

	Alloy.Globals.openWindow('MainView', {
		city : cities[0],
		secondary: true
	}, true, L(cities[0]).toUpperCase());
};

nsEvents.openCity3Event = function() {

	Alloy.Globals.openWindow('MainView', {
		city : cities[1],
		secondary: true
	}, true, L(cities[1]).toUpperCase());
};

nsEvents.init = function() {
	// Alloy.Globals.windowStack.push($.winEvents); : TODO Loading View
	
	if ($.args.secondary) {
		
		$.city2.height = 0;
		$.city3.height = 0;
		return;
	};

	for (i in cities) {
		if (Alloy.Globals.nextEventCity == cities[i]) {
			cities.splice(i, 1);
			break;
		}
	}

	console.log(cities);

	$.lblCity2.text = L(cities[0]).toUpperCase();
	$.lblCity3.text = L(cities[1]).toUpperCase();
};

nsEvents.init();
