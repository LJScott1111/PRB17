var nsLogin = {};
nsLogin.serviceCalls = require("serverCalls");

nsLogin.activityControl = require("activityControl");
nsLogin.controller = null;

nsLogin.closeWindow = function() {
	// Alloy.Globals.windowStack.pop();
	// Alloy.createController("signup").getView().open();
	$.winLogin.close();
};

nsLogin.validateEmail = function() {
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

nsLogin.validatePassword = function() {
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

nsLogin.login = function() {
	nsLogin.controller = new nsLogin.activityControl($.vwMain);
	if (nsLogin.validateEmail() && nsLogin.validatePassword()) {

		//Login
		var tfEmail = $.tfEmail.getValue();
		var tfPass = $.tfPassword.getValue();

		this.onloadCallback = function(user) {
			console.debug("Go to next screen!");
			var hasData = Alloy.Globals.getAndStoreData(function(fetchedData) {
				console.debug("fetchedData ", fetchedData);
				// Alloy.createController("LandingPage").getView().open();
				$.winLogin.remove(nsLogin.controller);
				console.debug("length ---- " + Alloy.Globals.windowStack.length);
				// for (var i = 0,
				    // len = Alloy.Globals.windowStack.length; i < len; i++) {
				    	for (var i = Alloy.Globals.windowStack.length - 1; i >= 0; i--){
					Alloy.Globals.windowStack[i].close();
					console.debug("closing "+Alloy.Globals.windowStack[i].id);
					Alloy.Globals.windowStack.pop();
				}
				// $.winLogin.close();
			});
		};

		this.onerrorCallback = function(error) {
			console.debug("Error occured in login");
			alert("Some error occured. Please try again");
			//TODO - Proper error handling
			// alert(error.message);
			$.winLogin.remove(nsLogin.controller);
		};

		$.winLogin.add(nsLogin.controller);
		var signupService = new nsLogin.serviceCalls.login(tfEmail, tfPass, this.onloadCallback, this.onerrorCallback);

	} else {
		alert("Please enter correct details");
	}
};

nsLogin.init = function() {
	Alloy.Globals.windowStack.push($.winLogin);

	// NOT WORKING : TODO
	// var user = null;
	// try {
	// // To fetch the active user
	// user = Kinvey.getActiveUser();
	// var promise = Kinvey.User.me();
	// promise.then(function(user1) {
	// console.log("Hello User" + JSON.stringify(user1));
	// }, function(error) {
	// console.log("No user");
	// });
	// console.debug("Active User: ", JSON.stringify(user));
	//
	// } catch(e) {
	// user = null;
	// // var logout = new nsLogin.serviceCalls.logout();
	// console.debug("Kinvey user exception ", JSON.stringify(e));
	// }
	// console.debug("-- User: ", JSON.stringify(user));

	// if (user === null) {
	// Setting blank object
	Titanium.App.Properties.setObject('appdata', Alloy.Globals.appData);

	$.winLogin.addEventListener('android:back', function(e) {
		console.debug("Pressing Back Will Not Close The Activity/Window");
		nsLogin.closeWindow();
	});

	// $.vwFbConnect.setHeight(Alloy.Globals.platformHeight * 0.088);
	$.tfEmail.setHintText(L('index_tfEmail'));
	$.tfPassword.setHintText(L('login_tfPassword'));

	// $.winLogin.open();
	// }
	// else {
	// setTimeout(function() {
	// Alloy.createController("LandingPage").getView().open();
	// }, 2000);
	// }

};

nsLogin.init();
