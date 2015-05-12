var nsPokerEvents = {};

nsPokerEvents.closeWindow = function() {
	$.winPokerEvents.close();
	if (Alloy.Globals.windowStack.length > 0) {
		Alloy.Globals.windowStack[0].close();
		Alloy.Globals.windowStack.pop();
		// Closing Index - temp solution - need to login check (Service not working to check if user is already logged in) - TODO
	}
};

nsPokerEvents.init = function() {

	$.winPokerEvents.addEventListener('android:back', function(e) {
		console.debug("Pressing Back Will Not Close The Activity/Window");
		nsPokerEvents.closeWindow();
	});
	
	$.wvPoker.setUrl("https://punkrockbowling.com/poker/");
};

nsPokerEvents.init();
