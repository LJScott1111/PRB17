// Kinvey credentials
var Kinvey = Alloy.Globals.Kinvey = require('kinvey-titanium-1.3.1');
Alloy.Globals.checkUser = function(callback, errorCallback) {
	var promise = Kinvey.init({
		appKey : 'kid_b1vnajEDkl',
		appSecret : '10609ec172544ae6b75923af98bfab95'
	});

	// var loggedIn = false;
	promise.then(function(user) {
		//check user here
		console.log("USER!! ", JSON.stringify(user));
		if (user !== null) {
			console.log("User not nulll ");
			Titanium.App.Properties.setString('userid', user._id);
		} else {
			Titanium.App.Properties.setString('userid', null);
		}
		// loggedIn = true;
		callback(user);
	}, function(error) {
		console.log("NO USER!!");
		// loggedIn = false;
		errorCallback(error);
	});
	// return loggedIn;
};

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

	// Status bar -iphone - not working
	// if(Titanium.Platform.osname === "iphone"){
	// var statusbar = require("com.widbook.statusbar");
	// statusbar.show();
	// }
};
Alloy.Globals.init();

// App theme values
Alloy.Globals.theme = {
	"icons" : {
		"star" : "/images/star.png",
		"star_off" : "/images/star_off.png"
	},
	"sizes" : {
		"headerbar" : Alloy.Globals.platformHeight * 0.0774,
		"logo" : Alloy.Globals.platformHeight * 0.2112,
		"landingOptionHeight" : Alloy.Globals.platformHeight * 0.1056,
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
// Alloy.Globals.bands = [];
Alloy.Globals.hasBandsData = false;
// Alloy.Globals.venues = [];
Alloy.Globals.hasVenuesData = false;
// Alloy.Globals.shows = [];
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

// Alloy.Globals.combinedShowDetails = [];
Alloy.Globals.combinedDetails = function() {

	var appdata = Titanium.App.Properties.getObject('appdata', {});
	var combinedData = [];

	console.debug("appdata  .... " + JSON.stringify(appdata));

	// bandProfile.bandDetails = JSON.parse(JSON.stringify(nsSearchList.data[e.row.id]));
	console.debug("Alloy.Globals.combinedDetails ... Calling");
	for (var i = 0,
	    bandLen = appdata.bands.length; i < bandLen; i++) {

		var bandProfile = {};
		bandProfile.bandDetails = appdata.bands[i];

		for (var j = 0,
		    showLen = appdata.shows.length; j < showLen; j++) {

			if (appdata.shows[j].band_id === bandProfile.bandDetails._id) {
				bandProfile.showDetails = JSON.parse(JSON.stringify(appdata.shows[j]));
			}

			for (var k = 0,
			    venueLen = appdata.venues.length; k < venueLen; k++) {
				if (bandProfile.showDetails.venue_id === appdata.venues[k]._id) {
					bandProfile.venueDetails = JSON.parse(JSON.stringify(appdata.venues[k]));
					// Alloy.Globals.combinedShowDetails.push(bandProfile);
					combinedData.push(bandProfile);
					console.log("... ", JSON.stringify(bandProfile));
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
	/*

	 var dateObj = new Date(timestamp);
	 var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	 var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	 function nth(d) {
	 if (d > 3 && d < 21)
	 return 'th';
	 // thanks kennebec
	 switch (d % 10) {
	 case 1:
	 return "st";
	 case 2:
	 return "nd";
	 case 3:
	 return "rd";
	 default:
	 return "th";
	 }
	 }

	 var dateString = weekday[dateObj.getDay()] + ", " + monthNames[dateObj.getMonth() + 1] + " " + dateObj.getDate() + nth(dateObj.getDate());
	 console.debug(dateString);
	 return dateString;
	 */

	var momentjs = require('moment');
	var dateObj = momentjs(timestamp * 1000);
	var dateString = [];
	dateString[0] = dateObj.format('dddd, MMMM, Do');
	dateString[1] = dateObj.format('h:mm a');
	console.debug(JSON.stringify(dateString));
	return dateString;
};

Alloy.Globals.getSettings = function(currentWin) {
	// var currentWin = e.source.parent.parent;

	console.debug(Titanium.App.Properties.getString('userid'));
	var userid = Titanium.App.Properties.getString('userid');
	// $.trigger("settings");

	var vwOptionFullView = Titanium.UI.createView({
		height : Titanium.UI.FILL,
		top : 0,
		width : Titanium.UI.FILL,
		id : "vwOptionFullView"
	});

	var vwOption = Titanium.UI.createView({
		top : 0,
		right : 10,
		height : Titanium.UI.SIZE,
		width : "25%",
		backgroundColor : "#000000",
		layout : "vertical",
		borderColor : "#ffffff",
		id : "vwOption"
	});

	var lblLoginActivity = Titanium.UI.createLabel({
		top : 10,
		bottom : 10,
		height : Titanium.UI.SIZE,
		color : "#ffffff",
		touchEnabled : false,
		font : {
			fontSize : Alloy.Globals.theme.fonts.size15Fonts
		}
	});
	vwOption.add(lblLoginActivity);
	vwOptionFullView.add(vwOption);

	vwOptionFullView.addEventListener('click', function(e) {
		console.debug(currentWin.id);

		if (e.source.id === "vwOption") {
			// Open login
			// if (userid === null) {
			if (vwOption.activity === "login") {
				// Alloy.createController("Login").getView().open();

				currentWin.add(Alloy.createController("Login", {
					"win" : currentWin
				}).getView());

				currentWin.remove(vwOptionFullView);
				if (currentWin.id === "winIndex") {
					// currentWin.close();
				}
			} else {
				// Call Logout and back to main screen
				var servercalls = require('serverCalls');
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
							// Titanium.App.Properties.setString('userid', null);
							Alloy.createController("signup").getView().open();
						}
					}
				}, function(error) {
					// TODO
				});
			}
		} else {
			currentWin.remove(vwOptionFullView);
		}
	});

	if (currentWin.id === "winIndex") {
		console.debug("User not logged in");
		lblLoginActivity.setText("Login");
		vwOption.activity = "login";
	} else {
		console.debug("User logged in");
		lblLoginActivity.setText("Logout");
		vwOption.activity = "logout";
	}

	currentWin.add(vwOptionFullView);
};

// Application data for storing combined details
Alloy.Globals.appData = {
	"details" : [],
	"bands" : [],
	"shows" : [],
	"venues" : []
};
