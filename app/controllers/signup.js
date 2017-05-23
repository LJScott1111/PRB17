/***
 * @author: Shraddha Porwal
 * Login Function
 * */

var nsIndex = {};
nsIndex.serviceCalls = require("serverCalls");

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

nsIndex.user_exists = function() {

	$.activityIndicator.show();
	$.indicatorView.height = Titanium.UI.SIZE;
	$.indicatorView.visible = true;

	setTimeout(function() {
		$.activityIndicator.hide();
		$.indicatorView.height = 0;
		$.indicatorView.visible = false;
	}, 3000);

	Titanium.App.removeEventListener('user_exists', nsIndex.user_exists);
};

Titanium.App.addEventListener('user_exists', nsIndex.user_exists);

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
	// If user skips signin, in that case, to get the show data logging in using default user.
	// If user is logged in using default user, the app will ask her login on every app load

	console.log('SKIP SIGNIN CALLED');
	if (Kinvey.getActiveUser()) {
		console.error('Kinvey.getActiveUser() ', Kinvey.getActiveUser() );
		Alloy.Globals.getAndStoreData();
		var thisUser = Kinvey.setActiveUser(Kinvey.getActiveUser());
		console.debug("Active User - thisUser: ", JSON.stringify(thisUser));
		var randName = thisUser.name + Math.floor(Math.random() * 1000);
		Titanium.App.Properties.setString('name', randName);
		console.log('Titanium.App.Properties.setString(', Titanium.App.Properties.getString('name'));
		nsIndex.closeWindow();
		Titanium.App.fireEvent('onLogin');
		return;
	};

	Alloy.Globals.checkUser(function(user) {

		if (!user) {

			var Kinvey = Alloy.Globals.Kinvey;
			var promise2 = Kinvey.User.login({
				username : 'defaultuserlogin@buzzplay.com',
				password : 'prb%2016'
			});
			promise2.then(function(user) {
				console.debug("Login success - user ", JSON.stringify(user));
				//Titanium.App.Properties.removeProperty('appdata');
				Titanium.App.Properties.setString('userid', user._id);

				var thisUser = Kinvey.setActiveUser(user);
				console.debug("Active User - thisUser: ", JSON.stringify(thisUser));
				var randName = thisUser.name + Math.floor(Math.random() * 1000);
				Titanium.App.Properties.setString('name', randName);
				console.log('Titanium.App.Properties.setString(', Titanium.App.Properties.getString('name'));

				//Alloy.Globals.setupPushNotifications();

				Titanium.App.Properties.setString('defaultUser', true);

				Alloy.Globals.getAndStoreData();
				nsIndex.closeWindow();
				Titanium.App.fireEvent('onLogin');
				Titanium.App.fireEvent('checkLocationPermissions');
			}, function(error) {
				alert(L('err_serviceError'));
			});
		} else {

			Alloy.Globals.getAndStoreData();
			var thisUser = Kinvey.setActiveUser(user);
			console.debug("Active User - thisUser: ", JSON.stringify(thisUser));
			var randName = thisUser.name + Math.floor(Math.random() * 1000);
			Titanium.App.Properties.setString('name', randName);
			console.log('Titanium.App.Properties.setString(', Titanium.App.Properties.getString('name'));
			nsIndex.closeWindow();
			Titanium.App.fireEvent('onLogin');
			Titanium.App.fireEvent('checkLocationPermissions');
		}
	}, function(error) {

		alert(L('err_serviceError'));
	});
};
/*

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

 Alloy.Globals.loading.show();
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

 Alloy.Globals.loading.hide();
 }

 };
 */

nsIndex.loginServiceCall = function() {

	//Login
	var emailField = $.emailField.getValue();
	var tfPass = $.passwordField.getValue();

	this.onloadCallback = function(user) {
		console.debug("Go to next screen!");

		var thisUser = Kinvey.setActiveUser(user);
		Titanium.App.fireEvent('onLogin');
		console.debug("Active User - thisUser: ", JSON.stringify(thisUser));
		if (thisUser.name) {
			Titanium.App.Properties.setString('name', thisUser.name);
		} else {
			var name = thisUser.username.substring(0, thisUser.username.lastIndexOf("@"));
			Titanium.App.Properties.setString('name', name);
		}
		console.log('Titanium.App.Properties.setString(', Titanium.App.Properties.getString('name'));

		var hasData = Alloy.Globals.getAndStoreData(function(fetchedData) {

			console.debug("fetchedData ", fetchedData);
			Alloy.Globals.loading.hide();
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
		Alloy.Globals.loading.hide();
	};

	Alloy.Globals.loading.show();
	var signupService = new nsIndex.serviceCalls.signup(emailField, tfPass, this.onloadCallback, this.onerrorCallback);
};

nsIndex.login = function() {

	console.log('TRYING TO LOGIN');
	var user = Kinvey.getActiveUser();
	if (nsIndex.validateEmail() && nsIndex.validatePassword()) {

		if (Kinvey.getActiveUser()) {

			nsIndex.serviceCalls.logout(function() {
				Titanium.App.fireEvent('onLogin');

				nsIndex.loginServiceCall();
			}, function(error) {
				alert(L('err_loginDetails'));
			});
		} else {
			nsIndex.loginServiceCall();
		}

	} else {
		alert(L('err_loginDetails'));
	}
};

/*
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
 };*/

nsIndex.init = function() {

	nsIndex.showHideHint($.lblHint_email, $.emailField);
	nsIndex.showHideHint($.lblHint_pass, $.passwordField);

	console.debug("Hello Signup");

	if (Titanium.Platform.osname !== "android") {
		$.vwMain.setTop(Alloy.Globals.platformHeight * 0.1056);
	}

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

		$.winIndex.open();
	} else {
		$.winIndex.open();
	}

	// nsIndex.userCheck();
};

nsIndex.init();
