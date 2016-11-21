var nsEvents = {};
nsEvents.serviceCalls = require("serverCalls");
var cities = JSON.parse(JSON.stringify(Alloy.Globals.CITIES));

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
/*

nsEvents.getDaily = function() {
	Alloy.Globals.openWindow('GenericWebView', {
		url : "http://punkrockbowling.com/pages/las-vegas-line-up",
		image: "/icons/Banner_Pins.jpg",
		banner_url: "http://www.sourpussclothing.com/housewares/patches-pins.html"
	}, true, null, 'misc/center_logo');
};
*/

nsEvents.getBands = function(){
	var appdata = Titanium.App.Properties.getObject('appdata', {});

	console.debug("Alloy.Globals.bands emply ", JSON.stringify(appdata.bands));

	if (appdata.details.length === 0) {
		Alloy.Globals.loading.show();
		var hasData = Alloy.Globals.getAndStoreData(function(fetchedData) {
			console.debug("fetchedData ", fetchedData);
			if (fetchedData) {

				Alloy.Globals.openWindow('BandList', {
					city : $.args.city
				}, true, null, 'misc/center_logo');
				Alloy.Globals.loading.hide();
			} else {
				console.debug("All data did not get downloaded!!!");
				alert(L('err_fetchingDetails'));
			}
			Alloy.Globals.loading.hide();
		});

	} else {
		console.log('Opening bands');
		Alloy.Globals.openWindow('BandList', {
			city : $.args.city
		}, true, null, 'misc/center_logo');
	}
};

nsEvents.getClubShows = function() {
	Alloy.Globals.openWindow('GenericWebView', {
		url : "http://punkrockbowling.com/collections/prb-asbury-park-club-shows",
		image: "/icons/Banner_Pins.jpg",
		banner_url: "http://www.sourpussclothing.com/housewares/patches-pins.html"
	}, true, null, 'misc/center_logo');
};

nsEvents.getMovies = function() {

	Alloy.Globals.openWindow('GenericWebView', {
		url : "http://punkrockbowling.com/pages/pool-parties",
		image: "/icons/Banner_Swimsuits.jpg",
		banner_url: "http://www.sourpussclothing.com/gals/swimwear.html"
	}, true, null, 'misc/center_logo');
};

nsEvents.getBowling = function() {

	Alloy.Globals.openWindow('GenericWebView', {
		url : "http://punkrockbowling.com/collections/prb-asbury-park-club-shows",
		image: "/icons/Banner_Pins.jpg",
		banner_url: "http://www.sourpussclothing.com/housewares/patches-pins.html"
	}, true, null, 'misc/center_logo');
};

nsEvents.getPoker = function() {

	Alloy.Globals.openWindow('GenericWebView', {
		url : "http://punkrockbowling.com/pages/poker-tournament",
		image: "/icons/Banner_Babies.jpg",
		banner_url: "http://www.sourpussclothing.com/kids.html"
	}, true, null, 'misc/center_logo');
};

nsEvents.getArt = function() {

	Alloy.Globals.openWindow('GenericWebView', {
		url : "http://punkrockbowling.com/pages/misfit-island-lethal-amounts-juxtapoz-asg-present",
		image: "/icons/Banner_Hair_Dye.jpg",
		banner_url: "http://www.sourpussclothing.com/kids.html"
	}, true, null, 'misc/center_logo');
};

nsEvents.openCity2Event = function() {

	Alloy.Globals.openWindow('MainView', {
		city : cities[0],
		secondary : true
	}, true, null, 'misc/center_logo');
};

nsEvents.openCity3Event = function() {

	Alloy.Globals.openWindow('MainView', {
		city : cities[1],
		secondary : true
	}, true, null, 'misc/center_logo');
};

nsEvents.init = function() {

	$.title.text = L($.args.city).toUpperCase();
	/*
	if ($.args.secondary) {

		$.city2.height = 0;
		$.city3.height = 0;
		return;
	};
	*/
	
	for (i in cities) {
		if (Alloy.Globals.nextEventCity == cities[i]) {
			cities.splice(i, 1);
			break;
		}
	}

	console.log(cities);

	// $.lblCity2.text = L(cities[0]).toUpperCase();
	// $.lblCity3.text = L(cities[1]).toUpperCase();
};

nsEvents.init();
