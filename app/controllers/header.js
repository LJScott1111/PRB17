var nsHeader = {};
nsHeader.args = arguments[0] || {};

nsHeader.closeWindow = function() {
	$.trigger("backButtonClick");
};

nsHeader.getSettings = function(e) {
	console.log(e.source," ", e.source.parent.parent);
	console.debug(Titanium.App.Properties.getString('userid'));
	var userid = Titanium.App.Properties.getString('userid');
	// $.trigger("settings");
	
	// var vwOptionFullView = Titanium.UI.createView({
		// // height: Titanium
		// top: Alloy.Globals.theme.sizes.headerbar,
// 		
	// });
};

nsHeader.init = function(){
	if(nsHeader.args.screenId === "winIndex" || nsHeader.args.screenId === "winLanding"){
		$.ivBack.setHeight(0);
		$.ivBack.setVisible(false);
	}
};

nsHeader.init();
