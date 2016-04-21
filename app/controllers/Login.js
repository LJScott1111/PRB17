var nsLogin = {};
nsLogin.serviceCalls = require("serverCalls");

nsLogin.args = arguments[0];

nsLogin.closeWindow = function() {
	// Alloy.Globals.windowStack.pop();
	// Alloy.createController("signup").getView().open();
	// $.winLogin.close();

	nsLogin.args.win.remove($.vwMain);
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
	Alloy.Globals.loading.show();

	if (nsLogin.validateEmail() && nsLogin.validatePassword()) {
		//Login
		var tfEmail = $.tfEmail.getValue();
		var tfPass = $.tfPassword.getValue();

		this.onloadCallback = function(user) {
			console.debug("Go to next screen!");
			var hasData = Alloy.Globals.getAndStoreData(function(fetchedData) {
				console.debug("fetchedData ", fetchedData);
				Alloy.Globals.loading.hide();
				Alloy.Globals.isSignupWindow = false;
				nsLogin.args.win.close();
				var notify = Titanium.App.Properties.getBool('notify');
				if (Titanium.Platform.osname !== "android") {
					Alloy.Globals.askToNotify();
				}
			});
		};

		this.onerrorCallback = function(error) {
			console.debug("Error occured in login");
			alert(L('err_login'));
			//TODO - Proper error handling
			// alert(error.message);
			Alloy.Globals.loading.hide();
		};

		var signupService = new nsLogin.serviceCalls.login(tfEmail, tfPass, this.onloadCallback, this.onerrorCallback);

	} else {
		alert(L('err_loginDetails'));
	}
};

nsLogin.window = null;
nsLogin.init = function() {
	
	if (Titanium.Platform.osname !== "android") {
		$.vwTopLogin.setTop(Alloy.Globals.platformHeight * 0.1056);
	}
	
	// Setting blank object
	Titanium.App.Properties.setObject('appdata', Alloy.Globals.appData);

	$.tfEmail.setHintText(L('index_tfEmail'));
	$.tfPassword.setHintText(L('login_tfPassword'));
};
nsLogin.init();
