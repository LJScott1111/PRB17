// Kinvey credentials
var Kinvey = Alloy.Globals.Kinvey = require('kinvey-titanium-1.3.1');
Alloy.Globals.checkUser = function(callback, errorCallback) {
	var promise = Kinvey.init({
		appKey : 'kid_b1vnajEDkl',
		appSecret : '10609ec172544ae6b75923af98bfab95'
	});

	promise.then(function(user) {
		//check user here
		console.log("USER!! ", JSON.stringify(user));
		if (user !== null) {
			console.log("User not nulll ");
			Titanium.App.Properties.setString('userid', user._id);
			callback(user);
		} else {
			Titanium.App.Properties.setString('userid', null);
			callback(user);
		}

	}, function(error) {
		console.log("NO USER!!");
		errorCallback(error);
	});
};

// Permission for notifications
Alloy.Globals.askToNotify = function() {
	var notify = Titanium.App.Properties.getBool('notify');

	if (Titanium.Platform.osname !== "android") {
		// Register for Local notifications
		var register = Titanium.App.iOS.registerUserNotificationSettings({
			types : [Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT, Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND, Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE]
		});
	}
};

// To debug Kinvey
//KINVEY_DEBUG = true;

// To close the index screen after login
Alloy.Globals.windowStack = [];

// iOS NavMenu
Alloy.Globals.navMenu = null;

//Fb appID
Alloy.Globals.fbAppID = function() {
	return 993161744029602;
};

// iOS - Android Screens UI match base
Alloy.Globals.densityFactor = (Titanium.Platform.osname === "android") ? Titanium.Platform.displayCaps.logicalDensityFactor : 1;
Alloy.Globals.platformHeight = 0;
Alloy.Globals.platformWidth = 0;

// Calculating px to dp
Alloy.Globals.pixelToDp = function(px) {
	var pixelToDP;
	pixelToDP = parseInt(px) / (Titanium.Platform.displayCaps.dpi / 160);
	return pixelToDP;
};

Alloy.Globals.init = function() {
	var height = 0;
	var width = 0;

	if (Titanium.Platform.displayCaps.platformHeight > Titanium.Platform.displayCaps.platformWidth) {
		//portrait mode
		height = Titanium.Platform.displayCaps.platformHeight;
		width = Titanium.Platform.displayCaps.platformWidth;
	} else {
		// landscape mode
		height = Titanium.Platform.displayCaps.platformWidth;
		width = Titanium.Platform.displayCaps.platformHeight;
	}

	if (Titanium.Platform.osname === "android") {
		Alloy.Globals.platformHeight = Alloy.Globals.pixelToDp(height);
		Alloy.Globals.platformWidth = Alloy.Globals.pixelToDp(width);
	} else {
		Alloy.Globals.platformHeight = height;
		Alloy.Globals.platformWidth = width;
	}

};
Alloy.Globals.init();

// Function to sort array
Alloy.Globals.sortArray = function(prop) {
	return function(a, b) {
		if (a[prop] > b[prop]) {
			return 1;
		} else if (a[prop] < b[prop]) {
			return -1;
		}
		return 0;
	};
};

// App theme values
Alloy.Globals.theme = {
	"icons" : {
		"star" : "/images/star.png",
		"star_off" : "/images/star_off.png"
	},
	"sizes" : {
		"headerbar" : Alloy.Globals.platformHeight * 0.0774,
		"logo" : Alloy.Globals.platformHeight * 0.2112,
		"landingOptionHeight" : Alloy.Globals.platformHeight * 0.088,
		"punkRockHeight" : Alloy.Globals.platformHeight * 0.42,
		"punckRockWidth" : Alloy.Globals.platformWidth * 0.60
	},
	"fonts" : {
		"size10Fonts" : Alloy.Globals.platformHeight * 0.0176,
		"size15Fonts" : Alloy.Globals.platformHeight * 0.0264,
		"size20Fonts" : Alloy.Globals.platformHeight * 0.0352,
		"size25Fonts" : Alloy.Globals.platformHeight * 0.044,
	},
	"colors" : {
		"dark" : "#000000",
		"light" : "#FFFFFF",
	}
};

// Get All data (bands, venues, and shows) from server and store it in local
Alloy.Globals.hasBandsData = false;
Alloy.Globals.hasVenuesData = false;
Alloy.Globals.hasShowsData = false;

Alloy.Globals.getAndStoreData = function(callback) {

	var count = 0,
	    fails = 0;
	var serviceCalls = require("serverCalls");

	var getBandList = new serviceCalls.getBandList(function(data) {

		count++;
		console.debug("count++", count);
		if (count === 3) {
			var fetchedData = Alloy.Globals.combinedDetails();
			callback(fetchedData);
		}

	}, function(error) {

		fails++;
		console.debug("fails ", fails);
		callback(false);

	});
	var getVenueList = new serviceCalls.getVenueList(function(data) {

		count++;
		console.debug("count++", count);
		if (count === 3) {
			var fetchedData = Alloy.Globals.combinedDetails();
			callback(fetchedData);
		}

	}, function(error) {

		fails++;
		console.debug("fails ", fails);
		callback(false);

	});
	var getShowList = new serviceCalls.getShows(function(data) {

		count++;
		console.debug("count++", count);
		if (count === 3) {
			var fetchedData = Alloy.Globals.combinedDetails();
			callback(fetchedData);
		}

	}, function(error) {

		fails++;
		console.debug("fails ", fails);
		callback(false);

	});
};

Alloy.Globals.combinedDetails = function() {

	var appdata = Titanium.App.Properties.getObject('appdata', {});
	var combinedData = [];

	console.debug("appdata  .... " + JSON.stringify(appdata));

	console.debug("Alloy.Globals.combinedDetails ... Calling");
	for (var i = 0,
	    bandLen = appdata.bands.length; i < bandLen; i++) {
		var bandProfile = {};
		bandProfile.bandDetails = appdata.bands[i];
		console.debug("bandProfile.bandDetails " + JSON.stringify(bandProfile.bandDetails));

		for (var j = 0,
		    showLen = appdata.shows.length; j < showLen; j++) {

			if (appdata.shows[j].band_id === bandProfile.bandDetails._id) {
				bandProfile.showDetails = JSON.parse(JSON.stringify(appdata.shows[j]));
				// } else {
				// continue;

				for (var k = 0,
				    venueLen = appdata.venues.length; k < venueLen; k++) {
					if (bandProfile.showDetails.venue_id === appdata.venues[k]._id) {
						bandProfile.venueDetails = JSON.parse(JSON.stringify(appdata.venues[k]));
						combinedData.push(bandProfile);
						console.log("... ", JSON.stringify(bandProfile));
					}
				}
			}
		}
	}
	console.debug("JSON.stringify(combinedData) ", JSON.stringify(combinedData));
	// Setting all details in appdata
	appdata.details = JSON.parse(JSON.stringify(combinedData));
	Titanium.App.Properties.setObject('appdata', appdata);

	console.debug("appdata details ", JSON.stringify(Titanium.App.Properties.getObject('appdata')));
	return true;
};

// Format date object
Alloy.Globals.getFormattedDate = function(timestamp) {
	var momentjs = require('moment');
	var dateObj = momentjs(timestamp * 1000);
	var dateString = [];
	dateString[0] = dateObj.format('dddd, MMMM, Do');
	dateString[1] = dateObj.format('h:mm a');
	console.debug(JSON.stringify(dateString));
	return dateString;
};

Alloy.Globals.getSettings = function(currentWin) {
	console.debug(Titanium.App.Properties.getString('userid'));
	var userid = Titanium.App.Properties.getString('userid');
	var child = currentWin.getChildren();

	for (var i = 0,
	    len = child.length; i < len; i++) {
		if (child[i].id === "vwOptionFullView") {
			currentWin.remove(child[i]);
			return;
		}
	}

	var vwOptionFullView = Titanium.UI.createView({
		height : Titanium.UI.FILL,
		top : (Titanium.Platform.osname === "android" || currentWin.id === "winIndex") ? Alloy.Globals.theme.sizes.headerbar : 0,
		width : Titanium.UI.FILL,
		id : "vwOptionFullView",
		layout : "vertical",
		zIndex : 999
	});

	for (var i = 0; i < 5; i++) {
		var vwOption = Titanium.UI.createView({
			top : 0,
			right : 10,
			height : Titanium.UI.SIZE,
			width : "25%",
			backgroundColor : "#000000",
			layout : "vertical",
			borderColor : "#ffffff",
			id : "vwOption_" + i
		});

		var lblLoginActivity = Titanium.UI.createLabel({
			top : 10,
			bottom : 10,
			height : Titanium.UI.SIZE,
			color : "#ffffff",
			textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
			touchEnabled : false,
			font : {
				fontSize : Alloy.Globals.theme.fonts.size15Fonts
			}
		});

		if (i === 0) {
			if (currentWin.id === "winIndex") {
				Alloy.Globals.isSignupWindow = true;
				console.debug("User not logged in");
				lblLoginActivity.setText(L('settings_login'));
			} else {
				console.debug("User logged in");
				lblLoginActivity.setText(L('settings_logout'));
			}
		} else if (i === 1) {
			lblLoginActivity.setText(L('settings_map'));
		} else if (i === 2) {
			lblLoginActivity.setText(L('settings_sponsors'));
		} else if (i === 3) {
			lblLoginActivity.setText(L('settings_privacy'));
		} else if (i === 4) {
			lblLoginActivity.setText(L('settings_faq'));
		}

		vwOption.add(lblLoginActivity);
		vwOptionFullView.add(vwOption);
	}
	vwOptionFullView.addEventListener('click', function(e) {
		console.debug(currentWin.id);
		console.log("e.source.id .. ", e.source.id);

		if (e.source.id === "vwOption_0") {
			// Open login
			if (currentWin.id === "winIndex") {

				currentWin.add(Alloy.createController("Login", {
					"win" : currentWin
				}).getView());

				currentWin.remove(vwOptionFullView);

			} else {
				// Call Logout and back to main screen
				var servercalls = require('serverCalls');

				var login_type = Titanium.App.Properties.getString('login-type');
				if (login_type === "FB") {

					var fbLogout = new servercalls.fbLogout(function() {
						if (currentWin.id === "winLanding") {
							Alloy.createController("signup").getView().open();
						} else {

							console.debug(Alloy.Globals.windowStack.length);
							for (var i = Alloy.Globals.windowStack.length - 1; i >= 0; i--) {

								console.debug(Alloy.Globals.windowStack[i].id);

								console.debug("Alloy.Globals.windowStack.pop() " + Alloy.Globals.windowStack.length);
								Alloy.Globals.windowStack[i].close();
								Alloy.Globals.windowStack.pop();
								Titanium.App.Properties.removeProperty('userid');
								Alloy.createController("signup").getView().open();
							}
						}
						currentWin.remove(vwOptionFullView);
					}, function() {
						// Error while logout
					});

				} else {
					var logout = new servercalls.logout(function() {
						currentWin.remove(vwOptionFullView);
						if (currentWin.id === "winLanding") {
							Alloy.createController("signup").getView().open();
						} else {

							console.debug(Alloy.Globals.windowStack.length);
							for (var i = Alloy.Globals.windowStack.length - 1; i >= 0; i--) {

								console.debug(Alloy.Globals.windowStack[i].id);

								console.debug("Alloy.Globals.windowStack.pop() " + Alloy.Globals.windowStack.length);
								Alloy.Globals.windowStack[i].close();
								Alloy.Globals.windowStack.pop();
								Titanium.App.Properties.removeProperty('userid');
								Alloy.createController("signup").getView().open();
							}
						}
						// currentWin.remove(vwOptionFullView);
					}, function(error) {
						// TODO
					});
				}
			}
		} else if (e.source.id === "vwOption_1") {
			if (currentWin.id === "winIndex") {
				// console.log("Alloy.Globals.windowStack.length - 1 ", Alloy.Globals.windowStack[Alloy.Globals.windowStack.length - 1].id);
				Alloy.Globals.windowStack[Alloy.Globals.windowStack.length - 1].close();
				Alloy.Globals.windowStack.pop();
			}
			if (Titanium.Platform.osname === "android") {
				Alloy.createController("GenericWebView", {
					url : "https://www.punkrockbowling.com/wp-content/uploads/2013/11/Punk-Rock-Bowling-map.jpg"
				}).getView().open();
			} else {
				Alloy.Globals.navWin.openWindow(Alloy.createController("GenericWebView", {
					url : "https://www.punkrockbowling.com/wp-content/uploads/2013/11/Punk-Rock-Bowling-map.jpg",
					"map" : true
				}).getView());
			}
			currentWin.remove(vwOptionFullView);

		} else if (e.source.id === "vwOption_2") {
			if (currentWin.id === "winIndex") {
				// console.log("Alloy.Globals.windowStack.length - 1 ", Alloy.Globals.windowStack[Alloy.Globals.windowStack.length - 1].id);
				Alloy.Globals.windowStack[Alloy.Globals.windowStack.length - 1].close();
				Alloy.Globals.windowStack.pop();
			}
			if (Titanium.Platform.osname === "android") {
				Alloy.createController("GenericWebView", {
					url : "http://punkrockbowling.com/sponsors-vendors/"
				}).getView().open();
			} else {
				Alloy.Globals.navWin.openWindow(Alloy.createController("GenericWebView", {
					url : "http://punkrockbowling.com/sponsors-vendors/"
				}).getView());
			}
			currentWin.remove(vwOptionFullView);

		} else if (e.source.id === "vwOption_3") {
			if (currentWin.id === "winIndex") {
				console.log("Alloy.Globals.windowStack.length - 1 ", Alloy.Globals.windowStack[Alloy.Globals.windowStack.length - 1].id);
				Alloy.Globals.windowStack[Alloy.Globals.windowStack.length - 1].close();
				Alloy.Globals.windowStack.pop();
			}
			if (Titanium.Platform.osname === "android") {
				Alloy.createController("GenericWebView", {
					url : "http://www.punkrockbowling.com/our-privacy-policy/"
				}).getView().open();
			} else {
				Alloy.Globals.navWin.openWindow(Alloy.createController("GenericWebView", {
					url : "http://www.punkrockbowling.com/our-privacy-policy/"
				}).getView());
			}
			currentWin.remove(vwOptionFullView);

		} else if (e.source.id === "vwOption_4") {
			if (currentWin.id === "winIndex") {
				console.log("Alloy.Globals.windowStack.length - 1 ", Alloy.Globals.windowStack[Alloy.Globals.windowStack.length - 1].id);
				Alloy.Globals.windowStack[Alloy.Globals.windowStack.length - 1].close();
				Alloy.Globals.windowStack.pop();
			}
			if (Titanium.Platform.osname === "android") {
				Alloy.createController("GenericWebView", {
					url : "http://www.punkrockbowling.com/faq/"
				}).getView().open();
			} else {
				Alloy.Globals.navWin.openWindow(Alloy.createController("GenericWebView", {
					url : "http://www.punkrockbowling.com/faq/"
				}).getView());
			}
			currentWin.remove(vwOptionFullView);

		} else {
			currentWin.remove(vwOptionFullView);
		}
	});
	currentWin.add(vwOptionFullView);
};

// Application data for storing combined details
Alloy.Globals.appData = {
	"details" : [],
	"bands" : [],
	"shows" : [],
	"venues" : []
};

Alloy.Globals.Facebook = require('facebook');
Alloy.Globals.Facebook.appid = Alloy.Globals.fbAppID();
Alloy.Globals.Facebook.permissions = ['email'];
