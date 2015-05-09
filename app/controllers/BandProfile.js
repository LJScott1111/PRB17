var nsBandProfile = {};

nsBandProfile.getMoreOptions = function(){};

nsBandProfile.getSettings = function(){};

nsBandProfile.init = function(){
	$.ivBandImage.setHeight(Alloy.Globals.platformHeight * 0.30);
	
	$.lblBandName.setText("The Band Name");
	$.lblDay.setText("Friday, May 22nd");
	$.lblTime.setText("9:00pm");
	$.lblVenue.setText("Venue name goes here");
	$.lblMoreInfo.setText("More info: This will be filled with bio text from PRB site");
	
};

nsBandProfile.init();

