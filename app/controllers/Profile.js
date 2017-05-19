// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var nsProfile = {};

nsProfile.showHideHint = function(label, txtField) {
	label.visible = (txtField.value.trim() == "");
};

$.save.addEventListener('click', function() {

	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

	var emailField = $.emailField.getValue();
	var nameField = $.nameField.getValue();
	console.debug(emailField);
	console.debug("Email validate ", reg.test(emailField).toString());

	if (reg.test(emailField)) {

		var serviceCalls = require("serverCalls");

		//Login
		var emailField = $.emailField.getValue();

		this.onloadCallback = function(user) {

			Alloy.Globals.loading.hide();
			var thisUser = Kinvey.setActiveUser(user);
			$.emailField.value = user.username;
			$.nameField.value = user.name;
			Titanium.App.Properties.setString('name', name);
			console.log('Titanium.App.Properties.setString(', Titanium.App.Properties.getString('name'));
		};

		this.onerrorCallback = function(error) {
			console.debug("Error occured in updating email");
			alert(L('err_serviceError'));
			Alloy.Globals.loading.hide();
		};

		Alloy.Globals.loading.show();
		var updateEmail = new serviceCalls.updateUser(nameField, emailField, this.onloadCallback, this.onerrorCallback);

	} else {
		Alloy.Globals.loading.show();
		alert(L('err_loginDetails'));
	}

});

nsProfile.init = function() {

	var thisUser = Kinvey.getActiveUser();
	console.log(thisUser);
	$.emailField.value = thisUser.username;
	$.nameField.value = Titanium.App.Properties.getString('name');
	var thisUser = Kinvey.getActiveUser();
	$.emailField.value = thisUser.username;

	// Disabling update email option for username = defaultuserlogin@buzzplay.com
	if (thisUser._id == '57426f4751ffd5bb03b001c3') {
		$.username_view.height = 0;
		$.no_email_message.height = Titanium.UI.SIZE;
		$.no_email_message.visible = true;
	}
};

nsProfile.init();
