var args = arguments[0] || {};

console.debug('Menu args -- ', JSON.stringify(args));

$.title.text = args.title;
$.icon.image = args.icon;

exports.button = $.container;