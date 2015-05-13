//TODO - Proper error handling
var nsServerCalls = {};

// User signup
nsServerCalls.signup = function(username, password, onloadCallback, errorCallback) {
	var promise = Kinvey.User.signup({
		username : username,
		password : password
	});
	promise.then(function(user) {
		console.debug("Signup success - user ", JSON.stringify(user));
		
		Titanium.App.Properties.setString('userid', user._id);

		var thisUser = Kinvey.setActiveUser(user);
		// var promise = Kinvey.User.me();
		// promise.then(function(user) {
		// console.debug("Active User - thisUser: ", JSON.stringify(thisUser));
		// onloadCallback(thisUser);
		// }, function(error) {
		// console.debug("Active user Error! ", error);
		// // user = null;
		// });
		console.debug("Active User - thisUser: ", JSON.stringify(thisUser));
		onloadCallback(thisUser);

	}, function(error) {
		console.debug("Signup error ", error);
		errorCallback(error);
	});

};

exports.signup = nsServerCalls.signup;

// User login
nsServerCalls.login = function(username, password, onloadCallback, errorCallback) {
	var promise = Kinvey.User.login({
		username : username,
		password : password
	});
	promise.then(function(user) {
		console.debug("Login success - user ", JSON.stringify(user));
		Titanium.App.Properties.setString('userid', user._id);

		var thisUser = Kinvey.setActiveUser(user);
		console.debug("Active User - thisUser: ", JSON.stringify(thisUser));
		onloadCallback(thisUser);

		// onloadCallback(user);
	}, function(error) {
		console.debug("Login error ", error);
		errorCallback(error);
	});
};

exports.login = nsServerCalls.login;

// User Logout
nsServerCalls.logout = function(onloadCallback, errorCallback) {
	var user = Kinvey.getActiveUser();
	if (null !== user) {
		var promise = Kinvey.User.logout();
		promise.then(function() {
			console.debug("Logout Success");
			onloadCallback();
		}, function(error) {
			console.debug("Logout Error");
			errorCallback(error);
		});
	}
};

exports.logout = nsServerCalls.logout;

// User Login with fb
nsServerCalls.fbLogin = function(onloadCallback, errorCallback) {
	Kinvey.Social.connect(null, 'facebook', {
		appId : Alloy.Globals.fbAppID(),
		success : function(response) {
			onloadCallback(response);
		}
	});
};

exports.fbLogin = nsServerCalls.fbLogin;

// Get band list
nsServerCalls.getBandList = function(onloadCallback, errorCallback) {
	var promise = Kinvey.DataStore.find('bands', null);
	promise.then(function(entities) {
		console.debug("Band List success ", JSON.stringify(entities));
		onloadCallback(entities);
		Alloy.Globals.bands = JSON.parse(JSON.stringify(entities));
		Alloy.Globals.hasBandsData = true;
	}, function(error) {
		console.debug("Band List Error ", error);
		Alloy.Globals.hasBandsData = false;
		errorCallback(error);
		Alloy.Globals.bands.length = 0;
	});
};

exports.getBandList = nsServerCalls.getBandList;

// Get venue list
nsServerCalls.getVenueList = function(onloadCallback, errorCallback) {
	var promise = Kinvey.DataStore.find('venues', null);
	promise.then(function(entities) {
		console.debug("Venue List success ", JSON.stringify(entities));
		onloadCallback(entities);
		Alloy.Globals.venues = JSON.parse(JSON.stringify(entities));
		Alloy.Globals.hasVenuesData = true;
	}, function(error) {
		console.debug("Venue List Error ", error);
		errorCallback(error);
		Alloy.Globals.hasVenuesData = false;
		Alloy.Globals.venues.length = 0;
	});
};

exports.getVenueList = nsServerCalls.getVenueList;

// Get shows
nsServerCalls.getShows = function(onloadCallback, errorCallback) {
	var promise = Kinvey.DataStore.find('shows', null);
	promise.then(function(entities) {
		console.debug("Shows success ", JSON.stringify(entities));
		Alloy.Globals.shows = JSON.parse(JSON.stringify(entities));
		Alloy.Globals.hasShowsData = true;
		onloadCallback(entities);
	}, function(error) {
		console.debug("Shows Error ", error);
		errorCallback(error);
		Alloy.Globals.hasShowsData = false;
		Alloy.Globals.shows.length = 0;
	});
};

exports.getShows = nsServerCalls.getShows;

// Get user schedule
nsServerCalls.getUserSchedule = function(onloadCallback, errorCallback) {
	var promise = Kinvey.DataStore.find('user-schedules', null);
	promise.then(function(entities) {
		console.debug("user schedule success ", JSON.stringify(entities));
		onloadCallback(entities);
	}, function(error) {
		console.debug("user schedule Error ", error);
		errorCallback(error);
	});
};

exports.getUserSchedule = nsServerCalls.getUserSchedule;

//Saving a User schedule
nsServerCalls.saveUserSchedule = function(show_id, onloadCallback, errorCallback) {
	var promise = Kinvey.DataStore.save('user-schedules', {
		// _id : 'optional-id',
		"user_id" : Titanium.App.Properties.getString('userid'),
		"show_id" : show_id,
	});
	promise.then(function(entity) {
		onloadCallback(entity);
	}, function(error) {
		errorCallback(error);
	});
};

exports.saveUserSchedule = nsServerCalls.saveUserSchedule;