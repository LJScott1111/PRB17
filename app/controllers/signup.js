/***
 * @author: Shraddha Porwal
 * Login Function
 * */

var nsIndex = {};
nsIndex.serviceCalls = require("serverCalls");

nsIndex.activityControl = require("activityControl");
nsIndex.controller = null;

nsIndex.closeWindow = function() {
	$.winIndex.exitOnClose = true;
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

nsIndex.getSettings = function() {
	// alert("Hello!");
	// Alloy.createController("Login").getView().open();
};

nsIndex.connectToFb = function() {

	var fb = require('facebook');
	fb.appid = Alloy.Globals.fbAppID();
	fb.permissions = ['email'];
	var accessToken = "";
	fb.forceDialogAuth = true;

	if (!Titanium.Network.online) {
		Titanium.UI.createAlertDialog({
			// title : L("lbl_appname"),
			message : "No Internet connetion."
		}).show();
		return;
	} else {
		fb.addEventListener('login', function(e) {
			$.winIndex.add(nsIndex.controller);
			if (e.success) {
				console.debug(JSON.stringify(e));
				console.debug(JSON.stringify(JSON.parse(e.data)));

				fb.accessToken = nsLoginManager.fb.getAccessToken();
				console.debug("accessToken " + nsLoginManager.fb.accessToken);

				var kinveyFb = new nsIndex.serviceCalls.fbLogin(function() {
					console.debug("Go to next screen!");
					var hasData = Alloy.Globals.getAndStoreData(function(fetchedData) {
						console.debug("fetchedData ", fetchedData);
						$.winIndex.remove(nsIndex.controller);
						nsIndex.closeWindow();
					});
				});

			} else if (e.error) {
				alert("Some error occured. Please try again.");
			} else if (e.cancelled) {
				alert("Login cancelled. Please try again.");
			} else {
				alert("Unknown error");
			}

		});
		fb.authorize();
	}

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
				// Alloy.createController("LandingPage").getView().open();
				Alloy.Globals.windowStack.pop();
				$.winIndex.remove(nsIndex.controller);
				nsIndex.closeWindow();
				if (Titanium.Platform.osname !== "android") {
					Alloy.Globals.askToNotify();
				}
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
		var signupService = new nsIndex.serviceCalls.signup(tfEmail, tfPass, this.onloadCallback, this.onerrorCallback);

	} else {
		alert("Please enter correct details");
	}
};

nsIndex.userCheck = function() {
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
		// var logout = new nsLogin.serviceCalls.logout();
		console.debug("Kinvey user exception ", JSON.stringify(e));
	}
};

nsIndex.init = function() {
	console.debug("Hello Signup");
	
	if (Titanium.Platform.osname !== "android") {
		$.vwMain.setTop(Alloy.Globals.platformHeight * 0.1056);
	}
	
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
		// setTimeout(function() {
			// Alloy.createController("LandingPage").getView().open();
		// }, 2000);
		$.winIndex.open();
	}

	// nsIndex.userCheck();
};

nsIndex.init();
