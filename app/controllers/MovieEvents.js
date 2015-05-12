var nsMovieEvents = {};

nsMovieEvents.closeWindow = function() {
	$.winMovieEvents.close();
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
