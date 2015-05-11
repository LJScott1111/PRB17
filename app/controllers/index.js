/***
 * @author: Shraddha Porwal
 * Login Function
 * */

var nsIndex = {};
nsIndex.serviceCalls = require("serverCalls");

nsIndex.activityControl = require("activityControl");
nsIndex.controller = null;

nsIndex.closeWindow = function() {
	$.winIndex.close();
};

nsIndex.validateEmail = function() {
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

	var tfEmail = $.tfEmail.getValue();
	console.debug(tfEmail);

	var emailResult = false;

	if (reg.test(tfEmail)) {
		emailResult = true;
	} else {
		emailResult = false;
	}

	console.debug("Email validate ", emailResult);
	return emailResult;
};

nsIndex.validatePassword = function() {
	var tfPass = $.tfPassword.getValue().trim();
	var passResult = false;

	console.debug("tfPass Value ", tfPass);

	if (tfPass !== "" && tfPass !== null) {
		passResult = true;
	} else {
		passResult = false;
	}

	return passResult;
};

nsIndex.getIt = function() {
	nsIndex.controller = new nsIndex.activityControl($.vwMain);
	if (nsIndex.validateEmail() && nsIndex.validatePassword()) {

		//Login
		var tfEmail = $.tfEmail.getValue();
		var tfPass = $.tfPassword.getValue();

		this.onloadCallback = function(user) {
			console.debug("Go to next screen!");
			var hasData = Alloy.Globals.getAndStoreData(function(fetchedData) {
				console.debug("fetchedData ", fetchedData);
				// if (fetchedData) {
					Alloy.createController("LandingPage").getView().open();
					$.winIndex.remove(nsIndex.controller);
				// } else {
					// console.debug("All data did not get downloaded!!!");
					// alert("Some error occured while fetching the band/show details");
				// }
			});
		};

		this.onerrorCallback = function(error) {
			console.debug("Error occured in login");
			alert("Some error occured. Please try again");
			//TODO - Proper error handling
			// alert(error.message);
			$.winIndex.remove(nsIndex.controller);
		};

		$.winIndex.add(nsIndex.controller);
		var signupService = new nsIndex.serviceCalls.login(tfEmail, tfPass, this.onloadCallback, this.onerrorCallback);

	} else {
		alert("Please enter correct details");
	}
};

nsIndex.init = function() {
	Alloy.Globals.windowStack.push($.winIndex);

	// NOT WORKING : TODO
	var user = null;
	try {
		// To fetch the active user
		user = Kinvey.getActiveUser();
		var promise = Kinvey.User.me();
		promise.then(function(user1) {
			console.log("Hello User" + JSON.stringify(user1));
		}, function(error) {
			console.log("No user");
		});
		console.debug("Active User: ", JSON.stringify(user));

	} catch(e) {
		user = null;
		// var logout = new nsIndex.serviceCalls.logout();
		console.debug("Kinvey user exception ", JSON.stringify(e));
	}
	console.debug("-- User: ", JSON.stringify(user));

	if (user === null) {
		// Setting blank object
		Titanium.App.Properties.setObject('appdata', Alloy.Globals.appData);

		$.winIndex.addEventListener('android:back', function(e) {
			console.debug("Pressing Back Will Not Close The Activity/Window");
			nsIndex.closeWindow();
		});

		$.vwFbConnect.setHeight(Alloy.Globals.platformHeight * 0.088);
		$.tfEmail.setHintText(L('index_tfEmail'));
		$.tfPassword.setHintText(L('index_tfPassword'));

		$.winIndex.open();
	} else {

		// Alloy.Globals.getAndStoreData();
		setTimeout(function() {
			Alloy.createController("LandingPage").getView().open();
		}, 2000);
	}

};

nsIndex.init();
