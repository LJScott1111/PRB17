var nsUserSchedule = {};

nsUserSchedule.closeWindow = function() {
	$.winUserSchedule.close();
};

nsUserSchedule.getSettings = function() {
};

nsUserSchedule.init = function(){
	$.winUserSchedule.addEventListener('android:back', function(e) {
		console.debug("Pressing Back Will Not Close The Activity/Window");
		nsUserSchedule.closeWindow();
	});
};

nsUserSchedule.init();
