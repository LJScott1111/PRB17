var nsArtEvents = {};

nsArtEvents.closeWindow = function() {
	$.winArtEvents.close();
	if (Alloy.Globals.windowStack.length > 0) {
		Alloy.Globals.windowStack[0].close();
		Alloy.Globals.windowStack.pop();
		// Closing Index - temp solution - need to login check (Service not working to check if user is already logged in) - TODO
	}
};

nsArtEvents.init = function() {

	$.winArtEvents.addEventListener('android:back', function(e) {
		console.debug("Pressing Back Will Not Close The Activity/Window");
		nsArtEvents.closeWindow();
	});
	
	// $.ivArtImage.setImage("http://postimg.org/image/ndhjkkhnt/");
	
	$.wvArtImage.setUrl("http://postimg.org/image/ndhjkkhnt/");
};

nsArtEvents.init();
