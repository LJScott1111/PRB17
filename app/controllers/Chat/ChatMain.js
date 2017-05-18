// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

function doClick(e) {
  console.log("Clicked on Join Group");
  Alloy.Globals.openWindow('Chat/Groups', {}, true);
}