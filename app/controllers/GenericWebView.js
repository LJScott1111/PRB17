var nsGenericWebView = {};
nsGenericWebView.args = arguments[0];

nsGenericWebView.closeWindow = function() {

	if (Alloy.Globals.isSignupWindow) {
		Alloy.createController("signup").getView().open();
		// TODO: check again
	}
};

nsGenericWebView.getSettings = function() {
	// Alloy.Globals.getSettings($.winGenericWebView);
};

nsGenericWebView.init = function() {

	if (nsGenericWebView.args.map) {
		$.vwMain.height = Titanium.UI.SIZE;
		$.vwMain.width = Titanium.UI.SIZE;
		$.wvGenericWebView.scalesPageToFit = false;
	}

	$.wvGenericWebView.setUrl(nsGenericWebView.args.url);
};

nsGenericWebView.init();
