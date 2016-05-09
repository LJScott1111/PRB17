// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var nsSettings = {};

nsSettings.showHideHint = function(label, txtField) {
	label.visible = (txtField.value.trim() == "");
};

$.emailField.addEventListener('change', function() {
	nsSettings.showHideHint($.lblHint_email, $.emailField);
});

$.edit_email_btn.addEventListener('click', function() {
	var thisUser = Kinvey.getActiveUser();
	$.emailField.value = thisUser.username;

	$.edit_email_view.height = Titanium.UI.SIZE;
	nsSettings.showHideHint($.lblHint_email, $.emailField);
	$.email.height = 0;
	$.email.visible = false;
	$.edit_email_btn.height = 0;
	$.save_email_btn.height = 15;
});

$.save_email_btn.addEventListener('click', function() {

	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

	var emailField = $.emailField.getValue();
	console.debug(emailField);
	console.debug("Email validate ", reg.test(emailField).toString());

	if (reg.test(emailField)) {

		var serviceCalls = require("serverCalls");

		//Login
		var emailField = $.emailField.getValue();

		this.onloadCallback = function(user) {

			var thisUser = Kinvey.getActiveUser();
			$.email.text = thisUser.username;

			$.edit_email_view.height = 0;
			$.email.height = Titanium.UI.SIZE;
			$.email.visible = true;
			$.save_email_btn.height = 0;
			$.edit_email_btn.height = 15;
			Alloy.Globals.loading.hide();
		};

		this.onerrorCallback = function(error) {
			console.debug("Error occured in updating email");
			alert(L('err_serviceError'));
			Alloy.Globals.loading.hide();
		};

		Alloy.Globals.loading.show();
		var updateEmail = new serviceCalls.updateUser(emailField, this.onloadCallback, this.onerrorCallback);

	} else {
		alert(L('err_loginDetails'));
	}

});

nsSettings.init = function() {

	var thisUser = Kinvey.getActiveUser();
	console.log(thisUser);
	$.email.text = thisUser.username;
	$.save_email_btn.height = 0;

	$.contact_info.text = (L('contact_info_1') + '\n\n' + L('contact_info_2') + '\n\n' + L('contact_info_3'));
	
	// Disabling update email option for username = mobile@buzzplay.com
	if (thisUser._id == '555bb6a87d5a0af11a060588') {
		$.edit_email_btn.height = 0;
		$.save_email_btn.height = 0;
	};
};

nsSettings.init();
