var nsArtEvents = {};

nsArtEvents.closeWindow = function() {
	Alloy.Globals.windowStack.pop();
	$.winArtEvents.close();
};

nsArtEvents.init = function() {
	
	Alloy.Globals.windowStack.push($.winArtEvents);

	$.winArtEvents.addEventListener('android:back', function(e) {
		console.debug("Pressing Back Will Not Close The Activity/Window");
		nsArtEvents.closeWindow();
	});
	
	// $.ivArtImage.setImage("http://postimg.org/image/ndhjkkhnt/");
	
	$.wvArtImage.setUrl("http://postimg.org/image/ndhjkkhnt/");
};

nsArtEvents.init();
