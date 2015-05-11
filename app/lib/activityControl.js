/***
 * @author: Shraddha Porwal
 * Activity indicator
 * */

ActivityControl = function(vwParent) {
	var center = vwParent.getCenter;
	var vwActivityBg = Titanium.UI.createView({
		layout : "absolute",
		backgroundColor : "transparent",
		//opacity: "0.2",
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		center : center,
		//borderRadius: 44
	});

	var vwActivityView = Titanium.UI.createView({
		layout : "absolute",
		center : center,
		// backgroundColor: "#aaa",
		// borderColor: "#ffffff",
		width : 80,
		height : 80
		// borderWidth: 1
	});

	var actInd = Ti.UI.createActivityIndicator({
		color : "#ffffff",
		font : {
			// fontFamily : "AvenirNext-Regular",
			fontSize : 17.5,
			fontWeight : "bold"
		},
		//message : " Loading ...",
		// style : Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE
	});

	if (Titanium.Platform.osname === "android") {
		actInd.setStyle(Titanium.UI.ActivityIndicatorStyle.BIG_DARK);
	} else {
		actInd.setStyle(Titanium.UI.iPhone.ActivityIndicatorStyle.DARK);
	}

	vwActivityView.add(actInd);
	vwActivityBg.add(vwActivityView);
	actInd.show();

	return vwActivityBg;
};

module.exports = ActivityControl;
