var nsPokerEvents = {};

nsPokerEvents.closeWindow = function() {
	Alloy.Globals.windowStack.pop();
	$.winPokerEvents.close();
};

nsPokerEvents.init = function() {
	Alloy.Globals.windowStack.push($.winPokerEvents);

	$.winPokerEvents.addEventListener('android:back', function(e) {
		console.debug("Pressing Back Will Not Close The Activity/Window");
		nsPokerEvents.closeWindow();
	});
	
	$.wvPoker.setUrl("https://punkrockbowling.com/poker/");
};

nsPokerEvents.init();
