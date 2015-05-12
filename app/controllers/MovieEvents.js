var nsMovieEvents = {};

nsMovieEvents.closeWindow = function() {
	$.winMovieEvents.close();
	if (Alloy.Globals.windowStack.length > 0) {
		Alloy.Globals.windowStack[0].close();
		Alloy.Globals.windowStack.pop();
		// Closing Index - temp solution - need to login check (Service not working to check if user is already logged in) - TODO
	}
};

nsMovieEvents.init = function() {

	$.winMovieEvents.addEventListener('android:back', function(e) {
		console.debug("Pressing Back Will Not Close The Activity/Window");
		nsMovieEvents.closeWindow();
	});
	
	// $.ivMovieImage.setImage("http://postimg.org/image/jzj62plln/");
	
	$.wvMovieImage.setUrl("http://postimg.org/image/jzj62plln/");

};

nsMovieEvents.init();
