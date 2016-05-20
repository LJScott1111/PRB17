var nsGenericWebView = {};
nsGenericWebView.args = arguments[0];

nsGenericWebView.init = function() {

	if (nsGenericWebView.args.map) {
		$.vwMain.height = Titanium.UI.SIZE;
		$.vwMain.width = Titanium.UI.SIZE;
		$.wvGenericWebView.scalesPageToFit = false;
	}

	$.wvGenericWebView.setUrl(nsGenericWebView.args.url);
};

nsGenericWebView.init();
