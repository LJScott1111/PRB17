var nsBowlingEvents = {};

nsBowlingEvents.closeWindow = function() {
	$.winBowlingEvents.close();
	if (Alloy.Globals.windowStack.length > 0) {
		Alloy.Globals.windowStack[0].close();
		Alloy.Globals.windowStack.pop();
		// Closing Index - temp solution - need to login check (Service not working to check if user is already logged in) - TODO
	}
};

nsBowlingEvents.init = function() {

	$.winBowlingEvents.addEventListener('android:back', function(e) {
		console.debug("Pressing Back Will Not Close The Activity/Window");
		nsBowlingEvents.closeWindow();
	});
	
	$.wvBowling.setUrl("https://punkrockbowling.com/bowling-info/");

};

nsBowlingEvents.init();
