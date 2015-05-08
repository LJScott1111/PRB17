// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

var Kinvey = Alloy.Globals.Kinvey = require('kinvey-titanium-1.3.1');
Kinvey.init({
    appKey    : 'kid_b1vnajEDkl',
    appSecret : '10609ec172544ae6b75923af98bfab95'
});

Alloy.Globals.densityFactor = (Titanium.Platform.osname === "android") ? Titanium.Platform.displayCaps.logicalDensityFactor : 1;
Alloy.Globals.platformHeight = 0;
Alloy.Globals.platformWidth = 0;

// Calculating px to dp
Alloy.Globals.pixelToDp = function(px) {
	var pixelToDP;
	pixelToDP = parseInt(px) / (Titanium.Platform.displayCaps.dpi / 160);
	return pixelToDP;
};

Alloy.Globals.init = function() {
	var height = 0;
	var width = 0;

	if (Titanium.Platform.displayCaps.platformHeight > Titanium.Platform.displayCaps.platformWidth) {
		//portrait mode
		height = Titanium.Platform.displayCaps.platformHeight;
		width = Titanium.Platform.displayCaps.platformWidth;
	} else {
		// landscape mode
		height = Titanium.Platform.displayCaps.platformWidth;
		width = Titanium.Platform.displayCaps.platformHeight;
	}

	if (Titanium.Platform.osname === "android") {
		Alloy.Globals.platformHeight = Alloy.Globals.pixelToDp(height);
		Alloy.Globals.platformWidth = Alloy.Globals.pixelToDp(width);
	} else {
		Alloy.Globals.platformHeight = height;
		Alloy.Globals.platformWidth = width;
	}
};
Alloy.Globals.init();

Alloy.Globals.theme = {
	"icons" : {},
	"sizes" : {
		"headerbar" : Alloy.Globals.platformHeight * 0.1056
	},
	"fonts" : {
		"size20Fonts" : Alloy.Globals.platformHeight * 0.0352,
		"size25Fonts" : Alloy.Globals.platformHeight * 0.044,
	},
	"colors" : {
		"dark" : "#000000",
		"light" : "#FFFFFF",
	}
};