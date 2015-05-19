var nsLanding = {};
Alloy.Globals.navWin = $.navWin;
nsLanding.serviceCalls = require("serverCalls");

nsLanding.activityControl = require("activityControl");
nsLanding.controller = null;

nsLanding.closeWindow = function() {
	$.winLanding.close();
};

nsLanding.getSettings = function() {
	Alloy.Globals.getSettings($.winLanding);
};

nsLanding.getBands = function() {

	var appdata = Titanium.App.Properties.getObject('appdata', {});

	console.debug("Alloy.Globals.bands emply ", JSON.stringify(appdata.bands));

	if (appdata.details.length === 0) {
		$.winLanding.add(nsLanding.controller);
		var hasData = Alloy.Globals.getAndStoreData(function(fetchedData) {
			console.debug("fetchedData ", fetchedData);
			if (fetchedData) {
				if (Titanium.Platform.osname === "android") {
					Alloy.createController("BandList").getView().open();
				} else {
					$.navWin.openWindow(Alloy.createController("BandList").getView());
				}
				$.winLanding.remove(nsLanding.controller);
			} else {
				console.debug("All data did not get downloaded!!!");
				alert(L('err_fetchingDetails'));
			}
			$.winLanding.remove(nsLanding.controller);
		});

	} else {
		console.log('Opening bands');
		if (Titanium.Platform.osname === "android") {
			Alloy.createController("BandList").getView().open();
		} else {
			console.log('Nav open');
			$.navWin.openWindow(Alloy.createController("BandList").getView());
		}
	}
};

nsLanding.getEvents = function() {
	if (Titanium.Platform.osname === "android") {
		Alloy.createController("Events").getView().open();
	} else {
		Alloy.Globals.navWin.openWindow(Alloy.createController("Events").getView());
	}

};

nsLanding.getSchedule = function() {

	$.winLanding.add(nsLanding.controller);
	var appdata = Titanium.App.Properties.getObject('appdata', {});

	if (appdata.details.length === 0) {
		var hasData = Alloy.Globals.getAndStoreData(function(fetchedData) {
			console.debug("fetchedData ", fetchedData);
			if (fetchedData) {

				var getUserSchedule = new nsLanding.serviceCalls.getUserSchedule(function(schedule) {

					console.debug(JSON.stringify(schedule));
					if (Titanium.Platform.osname === "android") {
						Alloy.createController("UserSchedule", schedule).getView().open();
					} else {
						Alloy.Globals.navWin.openWindow(Alloy.createController("UserSchedule", schedule).getView());
					}

					$.winLanding.remove(nsLanding.controller);

				}, function(error) {
					alert(L('err_fetchingDetails'));
					$.winLanding.remove(nsLanding.controller);
				});

			} else {
				console.debug("All data did not get downloaded!!!");
				alert(L('err_fetchingDetails'));
				$.winLanding.remove(nsLanding.controller);
			}
		});
	} else {
		var getUserSchedule = new nsLanding.serviceCalls.getUserSchedule(function(schedule) {

			console.debug(JSON.stringify(schedule));
			if (Titanium.Platform.osname === "android") {
				Alloy.createController("UserSchedule", schedule).getView().open();
			} else {
				Alloy.Globals.navWin.openWindow(Alloy.createController("UserSchedule", schedule).getView());
			}

			$.winLanding.remove(nsLanding.controller);

		}, function(error) {
			alert(L('err_fetchingDetails'));
			$.winLanding.remove(nsLanding.controller);
		});
	}

};

nsLanding.getVenues = function() {
	var appdata = Titanium.App.Properties.getObject('appdata', {});

	if (appdata.details.length === 0) {
		$.winLanding.add(nsLanding.controller);
		var hasData = Alloy.Globals.getAndStoreData(function(fetchedData) {
			console.debug("fetchedData ", fetchedData);
			if (fetchedData) {

				if (Titanium.Platform.osname === "android") {
					Alloy.createController("VenueList").getView().open();
				} else {
					Alloy.Globals.navWin.openWindow(Alloy.createController("VenueList").getView());
				}

				// $.winLanding.remove(nsLanding.controller);
			} else {
				console.debug("All data did not get downloaded!!!");
				alert(L('err_fetchingDetails'));
			}
			$.winLanding.remove(nsLanding.controller);
		});
	} else {
		if (Titanium.Platform.osname === "android") {
			Alloy.createController("VenueList").getView().open();
		} else {
			Alloy.Globals.navWin.openWindow(Alloy.createController("VenueList").getView());
		}
	}
};

nsLanding.getFood = function(){
	if (Titanium.Platform.osname === "android") {
		Alloy.createController("GenericWebView", {
			url : "https://punkrockbowling.com/food-vendors/"
		}).getView().open();
	} else {
		Alloy.Globals.navWin.openWindow(Alloy.createController("GenericWebView", {
			url : "https://punkrockbowling.com/food-vendors/"
		}).getView());
	}
};

nsLanding.getNews = function() {
	if (Titanium.Platform.osname === "android") {
		Alloy.createController("GenericWebView", {
			url : "twitter.html"
		}).getView().open();
	} else {
		Alloy.Globals.navWin.openWindow(Alloy.createController("GenericWebView", {
			url : "twitter.html",
			showNavBar : true
		}).getView());
	}
};

nsLanding.init = function() {

	nsLanding.controller = new nsLanding.activityControl($.vwMain);

	$.winLanding.addEventListener('android:back', function(e) {
		console.debug("Pressing Back Will Not Close The Activity/Window");
		nsLanding.closeWindow();
	});

	$.ivNews.setHeight(Alloy.Globals.platformHeight * 0.0774);

	Alloy.Globals.checkUser(function(user) {
		console.debug("Alloy.Globals.checkUser user - " + user);
		if (Titanium.Platform.osname === "android") {
			$.winLanding.open();
		} else {
			$.navWin.open();
		}
		if (user === null) {
			var signupWindow = Alloy.createController("signup").getView();
			if (OS_ANDROID) {
				signupWindow.fbProxy = Alloy.Globals.Facebook.createActivityWorker({
					lifecycleContainer : signupWindow
				});
			}
			signupWindow.open();
		};
	}, function(error) {
		console.debug("Alloy.Globals.checkUser - error - " - error);
		if (Titanium.Platform.osname === "android") {
			$.winLanding.open();
		} else {
			$.navWin.open();
		}
		var signupWindow = Alloy.createController("signup").getView();
		if (OS_ANDROID) {
			signupWindow.fbProxy = Alloy.Globals.Facebook.createActivityWorker({
				lifecycleContainer : signupWindow
			});
		}
		signupWindow.open();
	});

};

nsLanding.init();
