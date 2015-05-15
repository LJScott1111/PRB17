var nsHeader = {};
nsHeader.args = arguments[0] || {};
nsHeader.settingsAdded = false;

nsHeader.closeWindow = function() {
	$.trigger("backButtonClick");
};

nsHeader.getSettings = function(e) {
	var currentWin = e.source.parent.parent;
	Alloy.Globals.getSettings(currentWin, nsHeader.settingsAdded);
	nsHeader.settingsAdded = !nsHeader.settingsAdded;
};

nsHeader.init = function() {
	if (nsHeader.args.screenId === "winIndex" || nsHeader.args.screenId === "winLanding") {
		$.ivBack.setHeight(0);
		$.ivBack.setVisible(false);
	}
};

nsHeader.init();
