/**
 * Chat.js
 */
var args = $.args;
var nsChat = {};

// constants
var channelName = args.channelName || "PRBChannel";

var moment = require('moment');
var pubnub = Alloy.Globals.Pubnub;

var messages = [];

// ----------------------------------
// LISTEN FOR MESSAGES
// ----------------------------------
pubnub.subscribe({
    channel  : channelName,
    connect  : function() {
        console.log( "Connected" );
    },
    callback : function(message) {
        console.log( "Received :" + message );
        nsChat.addRowToMessages(message.text, message.userName, message.time ? message.time : Date.now());
    },
    error : function() {
        console.log( "Lost Connection..." );
    }
});

/**
 * Event listener set in constructor to be called when the keyboard shows or
 * hides so we can resize the container of both the ListView and TextField.
 */
nsChat.onKeyboardframechanged = function(e) {

    // FIXME: Kind of tricky since this might change in future iOS but did not
    // find a way to get the Tab Bar height from some proxy.
    var tabsHeight = 0;

    // Full screen height minus keyboard start (from top) minus tabs height
    // If the keyboard is down this will be -50, so at least do 0
    $.chatWindow.bottom = Math.max(0, Ti.Platform.displayCaps.platformHeight - e.keyboardFrame.y - tabsHeight);
};

/**
 * Called by onChange() and as event listener for the ListView's postlayout event
 * to scroll all the way down to the latest message.
 */
nsChat.scrollDown = function() {
	$.messageListView.scrollToItem(0, $.messageListView.sections[0].items.length - 1);
};

nsChat.hideKeyboard = function(e) {
    $.input.blur();
};

/**
 * Function set in the view to be called on each model before rendering it in the ListView
 *
 * @method     transformMessage
 * @param      {Object}  The original model
 * @return     {Object}  New or changed attributes
 */
nsChat.transformMessage = function(model) {

	// Convert 1|0 to bool
	var mine = !!model.get('mine');

	// Create the meta string
	var meta = (mine ? 'Sent' : 'Received') + ' ' + moment(model.get('sent')).format('HH:mm:ss');

	// Get the read-date
	// var read = model.get('read'); 
	// if (read) {
		// // Add the read-date to the meta
		// meta += ', read ' + moment(read).format('HH:mm:ss');
	// }

	return {
		template: mine ? 'mine' : 'theirs',
		meta: meta
	};
};

/**
 * Fuction retrive the last 100 messages on a channel:
 */
nsChat.fetchHistory = function() {
	pubnub.history({
	    channel: channelName,
	    callback: function(m){
	        console.log(JSON.stringify(m));
	        
	        if ( m[0].length > 0 ) {
	        	var oldMessages = m[0];
	        	
	        	for ( var i = 0, 
	        		len = oldMessages.length; i < len; i++ ) {
	        		// Add messages
	        		nsChat.addRowToMessages(oldMessages[i].text, oldMessages[i].userName, oldMessages[i].time ? oldMessages[i].time : Date.now());
	        	}
	        	
	        	nsChat.scrollDown();
	        }
	    },
	    count: 100, // 100 is the default
	    reverse: false // false is the default
	});
};

// Event handlers
// ----------------------------------
// SEND MESSAGE
// ----------------------------------
nsChat.sendMessage = function(e) {
    var chatMessage = $.input.value;
    
    pubnub.publish({
        channel  : channelName,
        message  : { text : chatMessage, userName : Titanium.App.Properties.getString('name'), time: Date.now() },
        callback : function(info) {
        	console.log("Publish callback :" + info);
            if (!info[0]) setTimeout(function() {
                nsChat.addRowToMessages(chatMessage);
            }, 2000 );
        }
    });
    
    $.input.value = "";

};

/**
 * Function add message row item into the ListView
 *
 * @method     addRowToMessages
 * @param      {string}  message text
 * @param      {string}  user name
 * @param      {string}  time
 */
nsChat.addRowToMessages = function(msg, userName, time) {
	var time = moment(time).format('MMMM Do YYYY, h:mm:ss a');
	
    var mine = ( Titanium.App.Properties.getString('name') == userName ) ? 1 : 0;
    
    // Create the meta string
	// var meta = (mine ? 'Sent' : 'Received') + ' ' + time;

	$.messagesSection.appendItems([{
		"userName": {text: userName},
		"message": {text: msg},
		"meta": {text: time},
		"template": mine ? 'mine' : 'theirs'
	}]);   
	
	nsChat.scrollDown(); 
};

nsChat.cleanup = function() {
    // let Alloy clean up listeners to global collections for data-binding
    // always call it since it'll just be empty if there are none
    $.destroy();

    // disconnect
    pubnub.unsubscribe({
	    channel : channelName,
	});
};

nsChat.init = function() {
	
	console.log("CHANNEL NAME :" + channelName);

     // Resize the container when the keyboards shows/hides
    Ti.App.addEventListener('keyboardframechanged', nsChat.onKeyboardframechanged);

    $.chatWindow.addEventListener('close', nsChat.cleanup);
    $.input.addEventListener('return', nsChat.sendMessage);
  	$.messageListView.addEventListener('itemclick', nsChat.hideKeyboard);
  	
  	// retrieve the last 100 messages on a channel
  	nsChat.fetchHistory();

}();