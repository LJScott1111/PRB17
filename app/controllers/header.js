var nsHeader = {};
nsHeader.args = arguments[0] || {};
nsHeader.settingsAdded = false;

nsHeader.getSettings = function(e) {
	var currentWin = e.source.parent.parent;
	Alloy.Globals.getSettings(currentWin);
};

nsHeader.init = function() {
	if (Titanium.Platform.osname !== "android") {
		$.vwHeader.setHeight(Alloy.Globals.platformHeight * 0.1056);
	}
};

nsHeader.init();
