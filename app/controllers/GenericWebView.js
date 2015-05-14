var nsGenericWebView = {};
nsGenericWebView.args = arguments[0];

nsGenericWebView.closeWindow = function() {
	Alloy.Globals.windowStack.pop();
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
	
	
	$.wvGenericWebView.setUrl(nsGenericWebView.args.url);

};

nsGenericWebView.init();
