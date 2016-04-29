//TODO - Proper error handling
var nsServerCalls = {};

// User signup
nsServerCalls.signup = function(username, password, onloadCallback, errorCallback) {
	var promise = Kinvey.User.signup({
		username : username.toLowerCase(),
		password : password
	});
	promise.then(function(user) {
		console.debug("Signup success - user ", JSON.stringify(user));

		Titanium.App.Properties.setString('userid', user._id);

		var thisUser = Kinvey.setActiveUser(user);
		onloadCallback(thisUser);

	}, function(error) {

		console.debug("Signup error ", error);

		if (Kinvey.Error.USER_ALREADY_EXISTS) {

			console.error('Kinvey.Error.USER_ALREADY_EXISTS');
			nsServerCalls.login(username, password, onloadCallback, errorCallback);
		} else {

			errorCallback(error);
		}
	});

};

exports.signup = nsServerCalls.signup;

// User login
nsServerCalls.login = function(username, password, onloadCallback, errorCallback) {

	var promise = Kinvey.User.login({
		username : username.toLowerCase(),
		password : password
	});
	promise.then(function(user) {
		console.debug("Login success - user ", JSON.stringify(user));
		Titanium.App.Properties.removeProperty('appdata');
		Titanium.App.Properties.setString('userid', user._id);

		var thisUser = Kinvey.setActiveUser(user);
		console.debug("Active User - thisUser: ", JSON.stringify(thisUser));
		onloadCallback(thisUser);

	}, function(error) {
		Titanium.App.Properties.removeProperty('appdata');
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
			Titanium.App.Properties.removeProperty('appdata');
			Titanium.App.Properties.removeProperty('userid');
			console.debug("Titanium.App.Properties.removeProperty('userid') ", Titanium.App.Properties.getString('userid'));
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
	console.log("Logging to FB");
	var promise = Kinvey.Social.connect(null, 'facebook', {
		appId : Alloy.Globals.fbAppID(),
		permissions : ['email'],
		success : function(response) {
			console.debug("FB RESPONSE ", JSON.stringify(response));
			Titanium.App.Properties.removeProperty('appdata');
			Titanium.App.Properties.setString('login-type', "FB");
			// TODO: Need to capture userid and put it in App Properties
			Titanium.App.Properties.setString('userid', response._id);
			onloadCallback(response);
		},
		error : function(error) {
			console.debug("FB ERROR ", JSON.stringify(error));
			errorCallback(error);
		},
		create : true
	});
};

exports.fbLogin = nsServerCalls.fbLogin;

// User Logout with fb
nsServerCalls.fbLogout = function(onloadCallback, errorCallback) {
	console.log("Logging out from FB");
	var user = Kinvey.getActiveUser();
	var promise = Kinvey.Social.disconnect(user, 'facebook', {
		// appId : Alloy.Globals.fbAppID(),
		success : function(response) {
			console.debug("FB RESPONSE ", JSON.stringify(response));
			onloadCallback(response);
			Titanium.App.Properties.removeProperty('appdata');
			Titanium.App.Properties.removeProperty('userid');
			Titanium.App.Properties.removeProperty('login-type');
		},
		error : function(error) {
			console.debug("FB ERROR ", JSON.stringify(error));
		}
	});
};

exports.fbLogout = nsServerCalls.fbLogout;

// Get band list
nsServerCalls.getBandList = function(onloadCallback, errorCallback) {
	var promise = Kinvey.DataStore.find('bands', null);
	promise.then(function(entities) {
		console.debug("Band List success ", JSON.stringify(entities));

		// Alloy.Globals.bands = JSON.parse(JSON.stringify(entities));
		var appdata = Titanium.App.Properties.getObject('appdata', {});
		appdata.bands = JSON.parse(JSON.stringify(entities));
		Titanium.App.Properties.setObject('appdata', appdata);
		Alloy.Globals.hasBandsData = true;

		onloadCallback(entities);

	}, function(error) {
		console.debug("Band List Error ", error);
		Alloy.Globals.hasBandsData = false;

		// Alloy.Globals.bands.length = 0;
		var appdata = Titanium.App.Properties.getObject('appdata', {});
		appdata.bands.length = 0;
		Titanium.App.Properties.setObject('appdata', appdata);

		errorCallback(error);
	});
};

exports.getBandList = nsServerCalls.getBandList;

// Get venue list
nsServerCalls.getVenueList = function(onloadCallback, errorCallback) {
	var promise = Kinvey.DataStore.find('venues', null);
	promise.then(function(entities) {
		console.debug("Venue List success ", JSON.stringify(entities));

		// Alloy.Globals.venues = JSON.parse(JSON.stringify(entities));
		var appdata = Titanium.App.Properties.getObject('appdata', {});
		appdata.venues = JSON.parse(JSON.stringify(entities));
		Titanium.App.Properties.setObject('appdata', appdata);
		Alloy.Globals.hasVenuesData = true;

		onloadCallback(entities);

	}, function(error) {
		console.debug("Venue List Error ", error);

		Alloy.Globals.hasVenuesData = false;
		// Alloy.Globals.venues.length = 0;
		var appdata = Titanium.App.Properties.getObject('appdata', {});
		appdata.venues.length = 0;
		Titanium.App.Properties.setObject('appdata', appdata);

		errorCallback(error);
	});
};

exports.getVenueList = nsServerCalls.getVenueList;

// Get shows
nsServerCalls.getShows = function(onloadCallback, errorCallback) {
	var query = new Kinvey.Query();
	query.ascending('start_time');
	var promise = Kinvey.DataStore.find('shows', null);
	promise.then(function(entities) {
		console.log("Shows success ", JSON.stringify(entities));
		// Alloy.Globals.shows = JSON.parse(JSON.stringify(entities));

		var appdata = Titanium.App.Properties.getObject('appdata', {});
		appdata.shows = JSON.parse(JSON.stringify(entities));
		Titanium.App.Properties.setObject('appdata', appdata);

		Alloy.Globals.hasShowsData = true;
		onloadCallback(entities);

	}, function(error) {
		console.debug("Shows Error ", error);

		Alloy.Globals.hasShowsData = false;
		// Alloy.Globals.shows.length = 0;
		var appdata = Titanium.App.Properties.getObject('appdata', {});
		appdata.shows.length = 0;
		Titanium.App.Properties.setObject('appdata', appdata);

		errorCallback(error);
	});
};

exports.getShows = nsServerCalls.getShows;

// Get user schedule
// Get user schedule
nsServerCalls.getUserSchedule = function(onloadCallback, errorCallback) {
	//var promise = Kinvey.DataStore.find('user-schedules', null);
	//promise.then(function(entities) {
	//	console.debug("user schedule success ", JSON.stringify(entities));
	//	onloadCallback(entities);
	//}, function(error) {
	//	console.debug("user schedule Error ", error);
	//	errorCallback(error);
	//});

	onloadCallback(Ti.App.Properties.getList('userSchedule', []));
};

exports.getUserSchedule = nsServerCalls.getUserSchedule;

//Saving a User schedule
nsServerCalls.saveUserSchedule = function(show_id, onloadCallback, errorCallback) {
	//var promise = Kinvey.DataStore.save('user-schedules', {
	// _id : 'optional-id',
	//	"user_id" : Titanium.App.Properties.getString('userid'),
	//	"show_id" : show_id,
	//});
	//promise.then(function(entity) {
	//	onloadCallback(entity);

	//}, function(error) {
	//	errorCallback(error);
	//});

	var userSchedule = Ti.App.Properties.getList('userSchedule', []);
	
	if (userSchedule.length != 0) {
		
		for (var i in userSchedule) {
			
			if (userSchedule[i].show_id == show_id) {
				
				alert('You already added this show.');
				return;
			}
		}
	}
	
	userSchedule.push({
		show_id : show_id
	});
	
	Ti.App.Properties.setList('userSchedule', userSchedule);
	onloadCallback();
};

exports.saveUserSchedule = nsServerCalls.saveUserSchedule;

//Deleting a User schedule
nsServerCalls.deleteUserSchedule = function(show_id, onloadCallback, errorCallback) {

	/*var query = new Kinvey.Query();

	query.equalTo('user_id', Titanium.App.Properties.getString('userid'));
	query.equalTo('show_id', show_id);

	var promise = Kinvey.DataStore.find('user-schedules', query);
	promise.then(function(entities) {

		if (entities.length != 0) {

			for (var i in entities) {

				var promise = Kinvey.DataStore.destroy('user-schedules', entities[i]._id);
				promise.then(function() {
					
					onloadCallback();
				}, function(error) {
				});
			}
		}
	}, function(error) {
	});
	*/
	var userSchedule = Ti.App.Properties.getList('userSchedule', []);
	
	if (userSchedule.length != 0) {
		
		for (var i in userSchedule) {
			
			if (userSchedule[i].show_id == show_id) {
				
				userSchedule.splice(i, 1);
			}
		}
	}
	
	Ti.App.Properties.setList('userSchedule', userSchedule);

};

exports.deleteUserSchedule = nsServerCalls.deleteUserSchedule;
