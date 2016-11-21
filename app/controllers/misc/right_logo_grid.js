// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

Titanium.App.addEventListener('hideGridOption', function() {
	$.logo.visible = false;
});

Titanium.App.addEventListener('showGridOption', function() {
	$.logo.visible = true;
});

$.logo.addEventListener('click', function() {
	console.log('GRID CLICKED');
});
