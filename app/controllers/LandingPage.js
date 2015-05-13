var nsLanding = {};
nsLanding.serviceCalls = require("serverCalls");

nsLanding.activityControl = require("activityControl");
nsLanding.controller = null;

nsLanding.closeWindow = function() {
	$.winLanding.close();
	if (Alloy.Globals.windowStack.length > 0) {
		Alloy.Globals.windowStack[0].close();
		Alloy.Globals.windowStack.pop();
		// Closing Index - temp solution - need to login check (Service not working to check if user is already logged in) - TODO
	}
};

nsLanding.getSettings = function() {
};

nsLanding.getBands = function() {
	var appdata = Titanium.App.Properties.getObject('appdata', {});

	if (appdata.details.length === 0) {
		$.winLanding.add(nsLanding.controller);
		var hasData = Alloy.Globals.getAndStoreData(function(fetchedData) {
			console.debug("fetchedData ", fetchedData);
			if (fetchedData) {
				Alloy.createController("BandList").getView().open();
				$.winLanding.remove(nsLanding.controller);
			} else {
				console.debug("All data did not get downloaded!!!");
				alert("Some error occured while fetching the details. Please try again");
			}
			$.winLanding.remove(nsLanding.controller);
		});

	} else {
		Alloy.createController("BandList").getView().open();
	}
};

nsLanding.getEvents = function() {
	Alloy.createController("Events").getView().open();
};

nsLanding.getSchedule = function() {

	$.winLanding.add(nsLanding.controller);
	var appdata = Titanium.App.Properties.getObject('appdata', {});

	if (appdata.details.length === 0) {
		var hasData = Alloy.Globals.getAndStoreData(function(fetchedData) {
			console.debug("fetchedData ", fetchedData);
			if (fetchedData) {

				var getUserSchedule = new nsLanding.serviceCalls.getUserSchedule(function(schedule) {

					console.debug(JSON.stringify(schedule));
					Alloy.createController("UserSchedule", schedule).getView().open();
					$.winLanding.remove(nsLanding.controller);

				}, function(error) {
					alert("Some error occured. Please try again.");
					$.winLanding.remove(nsLanding.controller);
				});

			} else {
				console.debug("All data did not get downloaded!!!");
				alert("Some error occured while fetching the details. Please try again");
				$.winLanding.remove(nsLanding.controller);
			}
		});
	} else {
		var getUserSchedule = new nsLanding.serviceCalls.getUserSchedule(function(schedule) {

			console.debug(JSON.stringify(schedule));
			Alloy.createController("UserSchedule", schedule).getView().open();
			$.winLanding.remove(nsLanding.controller);

		}, function(error) {
			alert("Some error occured. Please try again.");
			$.winLanding.remove(nsLanding.controller);
		});
	}

};

nsLanding.getVenues = function() {
	var appdata = Titanium.App.Properties.getObject('appdata', {});

	if (appdata.details.length === 0) {
		$.winLanding.add(nsLanding.controller);
		var hasData = Alloy.Globals.getAndStoreData(function(fetchedData) {
			console.debug("fetchedData ", fetchedData);
			if (fetchedData) {
				Alloy.createController("VenueList").getView().open();
				// $.winLanding.remove(nsLanding.controller);
			} else {
				console.debug("All data did not get downloaded!!!");
				alert("Some error occured while fetching the details. Please try again");
			}
			$.winLanding.remove(nsLanding.controller);
		});
	} else {
		Alloy.createController("VenueList").getView().open();
	}
};

nsLanding.init = function() {
	nsLanding.controller = new nsLanding.activityControl($.vwMain);

	$.winLanding.addEventListener('android:back', function(e) {
		console.debug("Pressing Back Will Not Close The Activity/Window");
		nsLanding.closeWindow();
	});

	$.ivBands.setLeft(10);
	$.ivEvents.setRight(10);
	$.ivSchedule.setLeft(10);
	$.ivVenues.setRight(10);

	// if (Alloy.Globals.index.length > 0) {
	// console.debug("Closing Index screen " + Alloy.Globals.index.length);
	// Alloy.Globals.index[0].close();
	// Alloy.Globals.index.pop();
	// }

};

nsLanding.init();
