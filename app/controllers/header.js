var nsHeader = {};
nsHeader.args = arguments[0] || {};

nsHeader.closeWindow = function() {
	$.trigger("backButtonClick");
};

nsHeader.getSettings = function() {
	$.trigger("settings");
};

nsHeader.init = function(){
	if(nsHeader.args.screenId === "winIndex" || nsHeader.args.screenId === "winLanding"){
		$.ivBack.setHeight(0);
		$.ivBack.setVisible(false);
	}
};

nsHeader.init();
