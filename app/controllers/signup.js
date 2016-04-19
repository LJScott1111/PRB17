/***
 * @author: Shraddha Porwal
 * Login Function
 * */

var nsIndex = {};
nsIndex.serviceCalls = require("serverCalls");

nsIndex.activityControl = require("activityControl");
nsIndex.controller = null;

nsIndex.showHideHint = function(label, txtField) {
	label.visible = (txtField.value.trim() == "");
};

$.emailField.addEventListener('change', function() {
	nsIndex.showHideHint($.lblHint_email, $.emailField);
});

$.passwordField.addEventListener('change', function() {
	nsIndex.showHideHint($.lblHint_pass, $.passwordField);
});

nsIndex.closeWindow = function() {
	$.winIndex.close();
};

nsIndex.validateEmail = function() {
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

	var emailField = $.emailField.getValue();
	console.debug(emailField);

	var emailResult = false;

	if (reg.test(emailField)) {
		emailResult = true;
	} else {
		emailResult = false;
	}

	console.debug("Email validate ", emailResult);
	return emailResult;
};

nsIndex.validatePassword = function() {
	var tfPass = $.passwordField.getValue().trim();
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

nsIndex.skipSignUp = function() {
	nsIndex.closeWindow();
};

nsIndex.connectToFb = function() {
	var accessToken = "";
	// fb.forceDialogAuth = true;

	if (!Titanium.Network.online) {
		Titanium.UI.createAlertDialog({
			// title : L("lbl_appname"),
			message : L('err_noConnection')
		}).show();
		return;
	} else {

		$.winIndex.add(nsIndex.controller);
		var kinveyFb = new nsIndex.serviceCalls.fbLogin(function(response) {
			console.debug("Go to next screen!");
			var hasData = Alloy.Globals.getAndStoreData(function(fetchedData) {
				console.debug("fetchedData ", fetchedData);
			});
			nsIndex.closeWindow();
		}, function(error) {
			console.debug("FB ERROR ", error);
			alert(L('err_facebook'));
		});

		$.winIndex.remove(nsIndex.controller);
	}

};

nsIndex.login = function() {
	if (nsIndex.validateEmail() && nsIndex.validatePassword()) {

		//Login
		var emailField = $.emailField.getValue();
		var tfPass = $.passwordField.getValue();

		this.onloadCallback = function(user) {
			console.debug("Go to next screen!");
			var hasData = Alloy.Globals.getAndStoreData(function(fetchedData) {
				console.debug("fetchedData ", fetchedData);
				// Alloy.createController("LandingPage").getView().open();
				Alloy.Globals.windowStack.pop();
				$.winIndex.remove(nsIndex.controller);
				Alloy.Globals.isSignupWindow = false;
				nsIndex.closeWindow();
				if (Titanium.Platform.osname !== "android") {
					Alloy.Globals.askToNotify();
				}
				Titanium.App.fireEvent('checkLocationPermissions');
			});
		};

		this.onerrorCallback = function(error) {
			console.debug("Error occured in login");
			alert(L('err_serviceError'));
			//TODO - Proper error handling
			// alert(error.message);
			$.winIndex.remove(nsIndex.controller);
		};

		$.winIndex.add(nsIndex.controller);
		var signupService = new nsIndex.serviceCalls.signup(emailField, tfPass, this.onloadCallback, this.onerrorCallback);

	} else {
		alert(L('err_loginDetails'));
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

	nsIndex.showHideHint($.lblHint_email, $.emailField);
	nsIndex.showHideHint($.lblHint_pass, $.passwordField);
	
	nsIndex.controller = new nsIndex.activityControl($.vwMain);
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
		// user = null;
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

		// $.vwFbConnect.setHeight(Alloy.Globals.platformHeight * 0.088);
		// $.emailField.setHintText(L('index_tfEmail'));
		// $.passwordField.setHintText(L('index_tfPassword'));

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
