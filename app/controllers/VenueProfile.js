var nsVenueProfile = {};

nsVenueProfile.closeWindow = function(){
	$.winVenueProfile.close();
};

nsVenueProfile.getSettings = function(){};

nsVenueProfile.init = function(){
	$.winVenueProfile.addEventListener('android:back', function(e) {
		console.debug("Pressing Back Will Not Close The Activity/Window");
		nsVenueList.closeWindow();
	});
	
	$.ivVenueImage.setHeight(Alloy.Globals.platformHeight * 0.30);

	$.lblVenueName.setText("The Venue Name");
	$.lblAddress1.setText("Address Line 1");
	$.lblAddress2.setText("Address Line 2");
	$.lblNumber.setText("0123456789");
	
};

nsVenueProfile.init();