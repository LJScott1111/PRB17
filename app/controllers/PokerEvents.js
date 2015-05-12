var nsPokerEvents = {};

nsPokerEvents.closeWindow = function() {
	$.winPokerEvents.close();
};

nsPokerEvents.init = function() {

	$.winPokerEvents.addEventListener('android:back', function(e) {
		console.debug("Pressing Back Will Not Close The Activity/Window");
		nsPokerEvents.closeWindow();
	});
	
	$.wvPoker.setUrl("https://punkrockbowling.com/poker/");
};

nsPokerEvents.init();
