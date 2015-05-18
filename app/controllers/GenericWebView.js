var nsGenericWebView = {};
nsGenericWebView.args = arguments[0];

nsGenericWebView.closeWindow = function() {
	Alloy.Globals.windowStack.pop();

	if (Alloy.Globals.isSignupWindow) {
		Alloy.createController("signup").getView().open();
	}
	$.winGenericWebView.close();

};

nsGenericWebView.getSettings = function() {
	Alloy.Globals.getSettings($.winGenericWebView);
};

nsGenericWebView.init = function() {
	Alloy.Globals.windowStack.push($.winGenericWebView);

	$.winGenericWebView.addEventListener('android:back', function(e) {
		console.debug("Pressing Back Will Not Close The Activity/Window");
		nsGenericWebView.closeWindow();
	});

	if (nsGenericWebView.args.map) {
		$.vwMain.height = Titanium.UI.SIZE;
		$.vwMain.width = Titanium.UI.SIZE;
		$.wvGenericWebView.scalesPageToFit = false;
	}

	$.wvGenericWebView.setUrl(nsGenericWebView.args.url);
	$.winGenericWebView.setNavBarHidden(nsGenericWebView.args.showNavBar !== true);

};

nsGenericWebView.init();
