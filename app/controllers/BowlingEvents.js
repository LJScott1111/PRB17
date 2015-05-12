var nsBowlingEvents = {};

nsBowlingEvents.closeWindow = function() {
	$.winBowlingEvents.close();
};

nsBowlingEvents.init = function() {

	$.winBowlingEvents.addEventListener('android:back', function(e) {
		console.debug("Pressing Back Will Not Close The Activity/Window");
		nsBowlingEvents.closeWindow();
	});
	
	$.wvBowling.setUrl("https://punkrockbowling.com/bowling-info/");

};

nsBowlingEvents.init();
