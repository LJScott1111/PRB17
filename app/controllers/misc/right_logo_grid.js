// Arguments passed into this controller can be accessed via the `$.args` object directly or:
// var args = $.args;
var nsRightLogoGrid = {};

console.error('$.args ------??>>>>>>?>?>? RIGHT LOGO ', JSON.stringify($.args));

nsRightLogoGrid.hideGridOption = function() {
	$.logo.visible = false;
};
nsRightLogoGrid.showGridOption = function() {
	$.logo.visible = true;
};
nsRightLogoGrid.changeToGrid = function() {
	console.error('changeToGrid ');
	$.logo.text = '\uf00a';
};
nsRightLogoGrid.changeToTable = function() {
	console.error('changeToTable');
	$.logo.text = '\uf03a';
};

$.logo.addEventListener('click', function() {
	console.log('GRID CLICKED');
	Titanium.App.fireEvent('changeInScheduleScreen');
});

nsRightLogoGrid.init = function() {
	for (var i = Alloy.Globals.rightGridEventListeners.length - 1; i >= 0; i--) {
		// console.log(Alloy.Globals.rightGridEventListeners[i]);
		Titanium.App.removeEventListener(Alloy.Globals.rightGridEventListeners[i].name, Alloy.Globals.rightGridEventListeners[i].func);
		Alloy.Globals.rightGridEventListeners.pop();
	}

	// console.error('Alloy.Globals.rightGridEventListeners BEFORE ', Alloy.Globals.rightGridEventListeners.length, Alloy.Globals.rightGridEventListeners);

	Titanium.App.addEventListener('hideGridOption', nsRightLogoGrid.hideGridOption);
	Titanium.App.addEventListener('showGridOption', nsRightLogoGrid.showGridOption);
	Titanium.App.addEventListener('changeToGrid', nsRightLogoGrid.changeToGrid);
	Titanium.App.addEventListener('changeToTable', nsRightLogoGrid.changeToTable);

	Alloy.Globals.rightGridEventListeners.push({
		name : 'hideGridOption',
		func : nsRightLogoGrid.hideGridOption
	});
	Alloy.Globals.rightGridEventListeners.push({
		name : 'showGridOption',
		func : nsRightLogoGrid.showGridOption
	});
	Alloy.Globals.rightGridEventListeners.push({
		name : 'changeToGrid',
		func : nsRightLogoGrid.changeToGrid
	});
	Alloy.Globals.rightGridEventListeners.push({
		name : 'changeToTable',
		func : nsRightLogoGrid.changeToTable
	});

	// console.error('Alloy.Globals.rightGridEventListeners AFTER ', Alloy.Globals.rightGridEventListeners.length, Alloy.Globals.rightGridEventListeners);

};

nsRightLogoGrid.init();
