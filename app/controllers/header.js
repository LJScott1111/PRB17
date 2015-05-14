var nsHeader = {};
nsHeader.args = arguments[0] || {};

nsHeader.closeWindow = function() {
	$.trigger("backButtonClick");
};

nsHeader.getSettings = function(e) {
	// console.log(e.source, " ", e.source.parent.parent);
	var currentWin = e.source.parent.parent;

	console.debug(Titanium.App.Properties.getString('userid'));
	var userid = Titanium.App.Properties.getString('userid');
	// $.trigger("settings");

	var vwOptionFullView = Titanium.UI.createView({
		height : Titanium.UI.FILL,
		top : 0,
		width : Titanium.UI.FILL,
		id : "vwOptionFullView"
	});

	var vwOption = Titanium.UI.createView({
		top : Alloy.Globals.theme.sizes.headerbar,
		right : 10,
		height : Titanium.UI.SIZE,
		width : "25%",
		backgroundColor : "#000000",
		layout : "vertical",
		borderColor : "#ffffff",
		id : "vwOption"
	});

	var lblLoginActivity = Titanium.UI.createLabel({
		top : 10,
		bottom : 10,
		height: Titanium.UI.SIZE,
		color : "#ffffff",
		touchEnabled : false,
		font : {
			fontSize : Alloy.Globals.theme.fonts.size15Fonts
		}
	});
	vwOption.add(lblLoginActivity);
	vwOptionFullView.add(vwOption);

	vwOptionFullView.addEventListener('click', function(e) {
		console.debug(currentWin.id);

		if (e.source.id === "vwOption") {
			// Open login
			// if (userid === null) {
			if(vwOption.activity === "login"){
				// Alloy.createController("Login").getView().open();
				
				currentWin.add(Alloy.createController("Login", {"win":currentWin}).getView());
				
				currentWin.remove(vwOptionFullView);
				if (currentWin.id === "winIndex") {
					// currentWin.close();
				}
			} else {
				// Call Logout and back to main screen
				var servercalls = require('serverCalls');
				var logout = new servercalls.logout(function() {
					currentWin.remove(vwOptionFullView);
					if (currentWin.id === "winLanding") {
						Alloy.createController("signup").getView().open();
					} else {
					
					console.debug(Alloy.Globals.windowStack.length);
					for (var i = Alloy.Globals.windowStack.length - 1; i >= 0; i--) {

						console.debug(Alloy.Globals.windowStack[i].id);

						console.debug("Alloy.Globals.windowStack.pop() " + Alloy.Globals.windowStack.length);
						Alloy.Globals.windowStack[i].close();
						Alloy.Globals.windowStack.pop();
						Titanium.App.Properties.removeProperty('userid');
						// Titanium.App.Properties.setString('userid', null);
						Alloy.createController("signup").getView().open();
					}}
				}, function(error) {
					// TODO
				});
			}
		} else {
			currentWin.remove(vwOptionFullView);
		}
	});

	if (currentWin.id === "winIndex") {
		console.debug("User not logged in");
		lblLoginActivity.setText("Login");
		vwOption.activity = "login";
	} else {
		console.debug("User logged in");
		lblLoginActivity.setText("Logout");
		vwOption.activity = "logout";
	}

	currentWin.add(vwOptionFullView);
};

nsHeader.init = function() {
	if (nsHeader.args.screenId === "winIndex" || nsHeader.args.screenId === "winLanding") {
		$.ivBack.setHeight(0);
		$.ivBack.setVisible(false);
	}

	// if (nsHeader.args.screenId === "winLogin") {
		// $.ivSettings.setHeight(0);
		// $.ivSettings.setVisible(false);
	// }
};

nsHeader.init();
