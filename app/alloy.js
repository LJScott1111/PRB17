// Kinvey credentials
var Kinvey = Alloy.Globals.Kinvey = require('kinvey-titanium-1.6.10');
var UrbanAirship = require('com.urbanairship');
var channelId = UrbanAirship.channelId;
UrbanAirship.userNotificationsEnabled = true;
UrbanAirship.addEventListener(UrbanAirship.EVENT_PUSH_RECEIVED, function(e) {
	Ti.API.info('Push received' + e.message);
	alert(e.message);
});

var deviceToken = null;

// Process incoming push notifications
function receivedPushNotification(e) {
	alert('Received push: ' + JSON.stringify(e));
}

// Save the device token for subsequent API calls
function deviceTokenSuccess(e) {
	if (Kinvey.getActiveUser() == null) {
		// Error: there must be a logged-in user.
	} else {
		Kinvey.Push.register(e.deviceToken).then(function() {
			// Successfully registered device with Kinvey.
			console.log('Registered for Kinvey push');
		}, function(error) {
			// Error registering device with Kinvey.
			console.log('Error registering device', error);
			alert(error.message);
		});
	}
};

function deviceTokenError(e) {
	alert('Failed to register for push notifications! ' + e.error);
};

Alloy.Globals.checkUser = function(callback, errorCallback) {
	var promise = Kinvey.init({
		appKey : 'kid_b1vnajEDkl',
		appSecret : '10609ec172544ae6b75923af98bfab95'
	});

	promise.then(function(user) {
		Alloy.Globals.setupPushNotifications();

		// If user is logged in using default user, the app will ask her login on every app load
		console.log('CHECK USER = ', Titanium.App.Properties.getString('defaultUser'));
		if (Titanium.App.Properties.getString('defaultUser') == true) {
			callback();
			return;
		}

		if (!user) {// For testing!
			/*
			 var promise2 = Kinvey.User.login({
			 username : 'mobile@buzzplay.com',
			 password : 'prb%2015'
			 });
			 promise2.then(function(user) {
			 console.debug("Login success - user ", JSON.stringify(user));
			 //Titanium.App.Properties.removeProperty('appdata');
			 Titanium.App.Properties.setString('userid', user._id);

			 var thisUser = Kinvey.setActiveUser(user);
			 console.debug("Active User - thisUser: ", JSON.stringify(thisUser));

			 Alloy.Globals.getAndStoreData();
			 callback(thisUser);

			 }, function(error) {
			 //Titanium.App.Properties.removeProperty('appdata');
			 console.debug("Login error ", error);
			 errorCallback(error);
			 }); */
			callback(user);

		} else {

			var thisUser = Kinvey.getActiveUser();
			Alloy.Globals.getAndStoreData();

			callback(thisUser);
		}

	}, function(error) {
		console.log("NO USER!!");
		//errorCallback(error);
		callback();
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

// Loading indicator
Alloy.Globals.loading = Alloy.createWidget("nl.fokkezb.loading");

Alloy.Globals.CITIES = ['lasvegas', 'denver', 'asburypark'];

Alloy.Globals.EVENTS = [{
	city : 'lasvegas',
	start : 1464220800000, // "2016-05-26T00:00:00",
	end : 1464652799000, //"2016-05-30T23:59:59"
}, {
	city : 'denver',
	start : 1464825600000, // "2016-06-02T00:00:00",
	end : 1465084799000, // "2016-06-04T23:59:59"
}, {
	city : 'asburypark',
	start : 1465516800000, //"2016-06-10T00:00:00",
	end : 1465775999000, //"2016-06-12T23:59:59"
}];

Alloy.Globals.SPONSORS = [{
	image : 'sourpuss_banner.png',
	link : 'http://www.sourpussclothing.com/'
}, {
	image : 'Banner_Descendents.jpg',
	link : 'http://www.sourpussclothing.com/catalogsearch/result/?q=descendents'
}, {
	image : 'Banner_Fred_Perry.jpg',
	link : 'http://www.sourpussclothing.com/brands/fred-perry'
}, {
	image : 'Banner_Swimsuits.jpg',
	link : 'http://www.sourpussclothing.com/gals/swimwear.html'
}, {
	image : 'Banner_Pins.jpg',
	link : 'http://www.sourpussclothing.com/housewares/patches-pins.html'
}, {
	image : 'Banner_Babies.jpg',
	link : 'http://www.sourpussclothing.com/kids.html'
}, {
	image : 'Banner_Flasks.jpg',
	link : 'http://www.sourpussclothing.com/catalogsearch/result/?q=flask'
}, {
	image : 'Banner_Hair_Dye.jpg',
	link : 'http://www.sourpussclothing.com/gals/beauty-supplies/hair-products.html'
}];
Alloy.Globals.sponsers_rr = [];

// Selecting array element in round robin manner
Alloy.Globals.getSponsor = function() {

	if (Alloy.Globals.sponsers_rr.length == 0) {
		Alloy.Globals.sponsers_rr = JSON.parse(JSON.stringify(Alloy.Globals.SPONSORS));
	};

	// get a random array element from
	var random = Math.floor(Math.random() * Alloy.Globals.sponsers_rr.length);

	var randomObj = Alloy.Globals.sponsers_rr[random];
	console.log('RANDOM ELEMENT ', randomObj);

	Alloy.Globals.sponsers_rr.splice(random, 1);
	return randomObj;
};

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

// Function to register for push notifications.
Alloy.Globals.setupPushNotifications = function() {
	if (Ti.Platform.name === 'iPhone OS') {
		if (parseInt(Ti.Platform.version.split(".")[0]) >= 8) {
			// Wait for user settings to be registered before registering for push notifications
			Ti.App.iOS.addEventListener('usernotificationsettings', function registerForPush() {
				// Remove event listener once registered for push notifications
				console.log('UserNotificationSEttings');
				Ti.App.iOS.removeEventListener('usernotificationsettings', registerForPush);
				Ti.Network.registerForPushNotifications({
					success : deviceTokenSuccess,
					error : deviceTokenError,
					callback : receivedPushNotification
				});
			});
			// Register notification types to use
			Ti.App.iOS.registerUserNotificationSettings({
				types : [Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT, Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND, Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE]
			});
		}
		// For iOS7 and earlier
		else {
			Ti.Network.registerForPushNotifications({
				// Specifies which notifications to receive
				types : [Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_SOUND],
				success : deviceTokenSuccess,
				error : deviceTokenError,
				callback : receivedPushNotification
			});
		}
	} else if (Ti.Platform.name === 'android') {
		// Initialize the module
		var CloudPush = require('ti.cloudpush');
		CloudPush.retrieveDeviceToken({
			success : deviceTokenSuccess,
			error : deviceTokenError
		});
		// Process incoming push notifications
		CloudPush.addEventListener('callback', function(e) {
			receivedPushNotification(e);
		});
	}
};

// App theme values
Alloy.Globals.theme = {
	"icons" : {
		"star" : "/icons/star_yellow.png",
		"star_off" : "/icons/star_white.png"
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
		"size13Fonts" : Alloy.Globals.platformHeight * 0.0228,
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

	Alloy.Globals.loading.show();

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

	/*for (var i = 0,bandLen = appdata.bands.length; i < bandLen; i++) {
	 var bandProfile = {};
	 bandProfile.bandDetails = appdata.bands[i];

	 for (var j = 0,showLen = appdata.shows.length; j < showLen; j++) {

	 if (appdata.shows[j].band_id === bandProfile.bandDetails._id) {
	 bandProfile.showDetails = JSON.parse(JSON.stringify(appdata.shows[j]));
	 // } else {
	 // continue;

	 for (var k = 0,venueLen = appdata.venues.length; k < venueLen; k++) {
	 if (bandProfile.showDetails.venue_id === appdata.venues[k]._id) {
	 bandProfile.venueDetails = JSON.parse(JSON.stringify(appdata.venues[k]));
	 combinedData.push(bandProfile);
	 }
	 }
	 }
	 }
	 }*/

	for (var j = 0,
	    showLen = appdata.shows.length; j < showLen; j++) {
		var bandProfile = {};
		bandProfile.showDetails = JSON.parse(JSON.stringify(appdata.shows[j]));
		// Find the matching band
		for (var i = 0,
		    bandLen = appdata.bands.length; i < bandLen; i++) {
			if (appdata.bands[i]._id == bandProfile.showDetails.band_id) {
				bandProfile.bandDetails = JSON.parse(JSON.stringify(appdata.bands[i]));
				break;
			}
		}
		// Find the matching venue
		for (var k = 0,
		    venueLen = appdata.venues.length; k < venueLen; k++) {
			if (appdata.venues[k]._id == bandProfile.showDetails.venue_id) {
				bandProfile.venueDetails = JSON.parse(JSON.stringify(appdata.venues[k]));
				break;
			}
		}
		combinedData.push(bandProfile);
	}

	console.debug("JSON.stringify(combinedData) ", JSON.stringify(combinedData));
	// Setting all details in appdata
	appdata.details = JSON.parse(JSON.stringify(combinedData));
	Titanium.App.fireEvent('get_next_show');
	Titanium.App.Properties.setObject('appdata', appdata);
	Alloy.Globals.loading.hide();

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

// Pageflow
Alloy.Globals.jolicode = {};
Alloy.Globals.jolicode.pageflow = {};
Alloy.Globals.jolicode.pageflow.height = Ti.Platform.displayCaps.platformHeight;
Alloy.Globals.jolicode.pageflow.width = Ti.Platform.displayCaps.platformWidth;

if (OS_ANDROID) {
	Alloy.Globals.jolicode.pageflow.height = Ti.Platform.displayCaps.platformHeight / Ti.Platform.displayCaps.logicalDensityFactor;
	Alloy.Globals.jolicode.pageflow.width = Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor;
}

// Open a controller
Alloy.Globals.openWindow = function(controller, arguments, newOne, title_text, center, rightLogo) {

	if (Alloy.Globals.pageflow.getCurrentPage() == null || newOne === true) {

		Alloy.Globals.pageflow.addChild({
			arguments : arguments,
			controller : controller,
			backButton : {
				image : '/icons/back.png',
				tintColor : '#dc0000',
				width : '35dp',
				height : '35dp',
				left : 0,
				backgroundColor : '#000000',
				hidden : newOne === true ? false : true
			},
			navBar : {
				backgroundColor : '#000000',
				left : 'misc/openMenu',
				// right : 'misc/right_logo',
				right : rightLogo,
				title : title_text,
				center : center,
				titleOptions : {
					color : '#F3CB87',
					font : {
						fontSize : Alloy.Globals.theme.fonts.size15Fonts,
						fontFamily : "KnowYourProduct"
					},
					width : Titanium.UI.SIZE
				}
			},
			direction : {
				top : 0,
				left : 1
			}
		});

		if (!newOne) {

			currentPage = controller;
		}
	} else if (currentPage != controller) {

		Alloy.Globals.pageflow.replacePage(0, {
			arguments : arguments,
			controller : controller,
			backButton : {
				hidden : true
			},
			navBar : {
				backgroundColor : '#000000',
				left : 'misc/openMenu',
				// right : 'misc/right_logo',
				right : rightLogo,
				title : title_text,
				center : center,
				titleOptions : {
					color : '#F3CB87',
					font : {
						fontSize : Alloy.Globals.theme.fonts.size15Fonts,
						fontFamily : "KnowYourProduct"
					},
					width : Titanium.UI.SIZE
				}
			},
			direction : {
				top : 0,
				left : 1
			}
		});
		currentPage = controller;
	}
};
