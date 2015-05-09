/***
 * @author: Shraddha Porwal
 * Login Function
 * */

var nsIndex = {};

nsIndex.validateEmail = function(){
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	
	var tfEmail = $.tfEmail.getValue();
	console.debug(tfEmail);
	
	var testResult = false;
	
	if(reg.test(tfEmail)){
		testResult = true;
	} else {
		testResult = false;
	}
	
	console.debug(testResult);
	return testResult;
};

nsIndex.validatePassword = function(){
	//TODO: Need rules
	// No validation necessary, handled by Kinvey
};

nsIndex.getIt = function(){
	if(nsIndex.validateEmail()){
		console.debug("Go to next screen!");
		// TODO: Use NavigationWindow for iOS
		Alloy.createController("LandingPage").getView().open();
	}
};

nsIndex.init = function(){
	
	$.vwFbConnect.setHeight(Alloy.Globals.platformHeight * 0.088);
	$.tfEmail.setHintText(L('index_tfEmail'));
	$.tfPassword.setHintText(L('index_tfPassword'));
	
	$.winIndex.open();
};

nsIndex.init();
