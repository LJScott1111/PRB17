// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var nsSettings = {};

nsSettings.init = function() {

	$.contact_info.text = (L('contact_info_1') + '\n\n' + L('contact_info_2') + '\n\n' + L('contact_info_3'));
};

nsSettings.init();
