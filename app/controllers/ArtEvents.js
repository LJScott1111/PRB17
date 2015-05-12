var nsArtEvents = {};

nsArtEvents.closeWindow = function() {
	$.winArtEvents.close();
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
