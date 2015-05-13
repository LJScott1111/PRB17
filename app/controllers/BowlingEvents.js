var nsBowlingEvents = {};

nsBowlingEvents.closeWindow = function() {
	Alloy.Globals.windowStack.pop();
	$.winBowlingEvents.close();
};

nsBowlingEvents.init = function() {
	Alloy.Globals.windowStack.push($.winBowlingEvents);

	$.winBowlingEvents.addEventListener('android:back', function(e) {
		console.debug("Pressing Back Will Not Close The Activity/Window");
		nsBowlingEvents.closeWindow();
	});
	
	$.wvBowling.setUrl("https://punkrockbowling.com/bowling-info/");

};

nsBowlingEvents.init();
