var nsVenueProfile = {};

nsVenueProfile.args = arguments[0];

nsVenueProfile.closeWindow = function(){
	$.winVenueProfile.close();
};

nsVenueProfile.getSettings = function(){};

nsVenueProfile.init = function(){
	
	console.debug("VenueProfile ", JSON.stringify(nsVenueProfile.args));
	
	$.winVenueProfile.addEventListener('android:back', function(e) {
		console.debug("Pressing Back Will Not Close The Activity/Window");
		nsVenueProfile.closeWindow();
	});
	
	var appdata = Titanium.App.Properties.getObject('appdata', {});
	for (var i = 0,
	    len = appdata.details.length; i < len; i++) {
		
		if(appdata.details[i].venueDetails._id === nsVenueProfile.args.id){
			nsVenueProfile.data = JSON.parse(JSON.stringify(appdata.details[i]));
			break;
		}
	}

	console.debug("VenueProile id ", JSON.stringify(nsVenueProfile.args));
	console.debug("VenueProile data ", JSON.stringify(nsVenueProfile.data));
	
	$.ivVenueImage.setHeight(Alloy.Globals.platformHeight * 0.30);

	$.lblVenueName.setText(nsVenueProfile.data.venueDetails.name);
	$.lblAddress1.setText(nsVenueProfile.data.venueDetails.address);
	$.lblAddress2.setText(nsVenueProfile.data.venueDetails.city,", ", nsVenueProfile.data.venueDetails.state,", ",nsVenueProfile.data.venueDetails.zip);
	$.lblNumber.setText(nsVenueProfile.data.venueDetails.phone);
	
};

nsVenueProfile.init();