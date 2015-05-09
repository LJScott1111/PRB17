var nsHeader = {};
nsHeader.args = arguments[0] || {};

nsHeader.closeWindow = function() {
	$.trigger("backButtonClick");
};

nsHeader.getSettings = function() {
	alert("Coming Soon!");
};

nsHeader.init = function(){
	if(nsHeader.args.screenId === "winIndex"){
		$.ivBack.setHeight(0);
		$.ivBack.setVisible(false);
		
		$.ivSettings.setHeight(0);
		$.ivSettings.setVisible(false);
	}
};

nsHeader.init();
