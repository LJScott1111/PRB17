var nsMovieEvents = {};

nsMovieEvents.closeWindow = function() {
	Alloy.Globals.windowStack.pop();
	$.winMovieEvents.close();
};

nsMovieEvents.getSettings = function() {
	Alloy.Globals.getSettings($.winMovieEvents);
};

nsMovieEvents.init = function() {
	Alloy.Globals.windowStack.push($.winMovieEvents);

	$.winMovieEvents.addEventListener('android:back', function(e) {
		console.debug("Pressing Back Will Not Close The Activity/Window");
		nsMovieEvents.closeWindow();
	});
	
	// $.ivMovieImage.setImage("http://postimg.org/image/jzj62plln/");
	
	$.wvMovieImage.setUrl("http://www.punkrockbowling.com/pool-parties/");

};

nsMovieEvents.init();
