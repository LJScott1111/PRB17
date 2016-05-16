// Kinvey credentials
var Kinvey = Alloy.Globals.Kinvey = require('kinvey-titanium-1.3.1');
Alloy.Globals.checkUser = function(callback, errorCallback) {
	var promise = Kinvey.init({
		appKey : 'kid_b1vnajEDkl',
		appSecret : '10609ec172544ae6b75923af98bfab95'
	});

	promise.then(function(user) {
		
		// If user is logged in using default user, the app will ask her login on every app load
		console.log('CHECK USER = ', Titanium.App.Properties.getString('defaultUser'));
		if (Titanium.App.Properties.getString('defaultUser') == true) {
			callback();
			return;
		}

		if (!user) { // For testing!
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

// To close the index screen after login
Alloy.Globals.windowStack = []; // TODO: remove this and related code
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

/*

Alloy.Globals.SPONSORS = [{image:'sourpuss.png',link:'http://sourpussclothing.com/'},{image:'new_noise.png',link:'http://newnoisemagazine.com/'},{image:'pabst.png',link:'http://pabstblueribbon.com/'},{image:'converse.png',link:'http://www.converse.com/us'},{image:'angry_young.png',link:'http://www.angryyoungandpoor.com/store/pc/home.asp'},{image:'screaming.png',link:'http://www.screamingimages.net/Welcome/'},{image:'asg.png',link:'http://artistseriesguitar.com/'},{image:'punknews.png',link:'http://www.punknews.org'},{image:'inked.png',link:'http://www.inkedmag.com/'},{image:'misfit_island.png',link:'http://misfitislandstudios.com/'},{image:'juxtapoz.png',link:'http://www.juxtapoz.com/'},{image:'fireball.png',link:'http://fireballwhisky.com/'},{image:'lethal_amounts.png',link:'http://www.lethalamounts.com/'},{image:'felony.png',link:'https://www.facebook.com/felonyrecords/'},{image:'matchete.png',link:'http://www.machetemfg.com/'},{image:'american.png',link:''},{image:'thehub.png',link:'http://hublbc.com/'},{image:'posers.png',link:'http://www.weareposers.com/'},{image:'rocksoff.png',link:'https://www.rocksoff.com/'},{image:'thrasher.png',link:''}];
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

*/

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
/*

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

	for (var i = 0; i < 4; i++) {
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
			lblLoginActivity.setText(L('settings_map'));
		} else if (i === 1) {
			lblLoginActivity.setText(L('settings_sponsors'));
		} else if (i === 2) {
			lblLoginActivity.setText(L('settings_privacy'));
		} else if (i === 3) {
			lblLoginActivity.setText(L('settings_faq'));
		}

		vwOption.add(lblLoginActivity);
		vwOptionFullView.add(vwOption);
	}
	vwOptionFullView.addEventListener('click', function(e) {
		console.debug(currentWin.id);
		console.log("e.source.id .. ", e.source.id);

		if (e.source.id === "vwOption_0") {
			if (currentWin.id === "winIndex") {
				// console.log("Alloy.Globals.windowStack.length - 1 ", Alloy.Globals.windowStack[Alloy.Globals.windowStack.length - 1].id);
				Alloy.Globals.windowStack[Alloy.Globals.windowStack.length - 1].close();
				Alloy.Globals.windowStack.pop();
			}

			Alloy.Globals.openWindow("GenericWebView", {
				url : "https://www.punkrockbowling.com/wp-content/uploads/2013/11/Punk-Rock-Bowling-map.jpg"
			}, true);

			currentWin.remove(vwOptionFullView);

		} else if (e.source.id === "vwOption_1") {
			if (currentWin.id === "winIndex") {
				// console.log("Alloy.Globals.windowStack.length - 1 ", Alloy.Globals.windowStack[Alloy.Globals.windowStack.length - 1].id);
				Alloy.Globals.windowStack[Alloy.Globals.windowStack.length - 1].close();
				Alloy.Globals.windowStack.pop();
			}

			Alloy.Globals.openWindow("GenericWebView", {
				url : "http://punkrockbowling.com/sponsors-vendors/"
			}, true);

			currentWin.remove(vwOptionFullView);

		} else if (e.source.id === "vwOption_2") {
			if (currentWin.id === "winIndex") {
				console.log("Alloy.Globals.windowStack.length - 1 ", Alloy.Globals.windowStack[Alloy.Globals.windowStack.length - 1].id);
				Alloy.Globals.windowStack[Alloy.Globals.windowStack.length - 1].close();
				Alloy.Globals.windowStack.pop();
			}

			Alloy.Globals.openWindow("GenericWebView", {
				url : "http://www.punkrockbowling.com/our-privacy-policy/"
			}, true);

			currentWin.remove(vwOptionFullView);

		} else if (e.source.id === "vwOption_3") {
			if (currentWin.id === "winIndex") {
				console.log("Alloy.Globals.windowStack.length - 1 ", Alloy.Globals.windowStack[Alloy.Globals.windowStack.length - 1].id);
				Alloy.Globals.windowStack[Alloy.Globals.windowStack.length - 1].close();
				Alloy.Globals.windowStack.pop();
			}

			Alloy.Globals.openWindow("GenericWebView", {
				url : "http://www.punkrockbowling.com/faq/"
			}, true);

			currentWin.remove(vwOptionFullView);

		} else {
			currentWin.remove(vwOptionFullView);
		}
	});
	currentWin.add(vwOptionFullView);
};
*/

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
				right: rightLogo,
				title : title_text,
				center: center,
				titleOptions : {
					color : '#F3CB87',
					font : {
						fontSize : Alloy.Globals.theme.fonts.size15Fonts,
						fontFamily: "KnowYourProduct"
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
				right: rightLogo,
				title : title_text,
				center: center,
				titleOptions : {
					color : '#F3CB87',
					font : {
						fontSize : Alloy.Globals.theme.fonts.size15Fonts,
						fontFamily: "KnowYourProduct"
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
