// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var thisUser = Kinvey.getActiveUser();

console.log(thisUser);

$.email.text = thisUser.username;
