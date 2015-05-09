var nsLanding = {};

nsLanding.closeWindow = function() {
	$.winLanding.close();
};

nsLanding.getSettings = function() {
};

nsLanding.getBands = function() {
	Alloy.createController("BandList").getView().open();
};

nsLanding.getEvents = function() {
};

nsLanding.getSchedule = function() {
	Alloy.createController("UserSchedule").getView().open();
};

nsLanding.getVenues = function() {
	Alloy.createController("VenueList").getView().open();
};

nsLanding.init = function() {
	$.winLanding.addEventListener('android:back', function(e) {
		console.debug("Pressing Back Will Not Close The Activity/Window");
		nsLanding.closeWindow();
	});
	
	$.ivBands.setLeft(10);
	$.ivEvents.setRight(10);
	$.ivSchedule.setLeft(10);
	$.ivVenues.setRight(10);

};

nsLanding.init();
