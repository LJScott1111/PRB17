var nsVenueProfile = {};

nsVenueProfile.getMoreOptions = function(){};

nsVenueProfile.getSettings = function(){};

nsVenueProfile.init = function(){
	$.ivVenueImage.setHeight(Alloy.Globals.platformHeight * 0.30);

	$.lblVenueName.setText("The Venue Name");
	$.lblAddress1.setText("Address Line 1");
	$.lblAddress2.setText("Address Line 2");
	$.lblNumber.setText("0123456789");
	
};

nsVenueProfile.init();