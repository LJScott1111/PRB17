// Retrieves a reference to the service and its intent
var service = Ti.Android.currentService,
    serviceIntent = service.getIntent(),
// Information passed in from the intent
    timestamp = new Date(serviceIntent.getStringExtra('timestamp')),
    bandName = serviceIntent.getStringExtra('band'),
    message = serviceIntent.getStringExtra('message');
// Wait for right moment to create and send the notification
if (new Date() > timestamp) {
	// Create a notification
	var notification = Ti.Android.createNotification({
		contentTitle : bandName,
		contentText : message,
		tickerText : bandName,
		icon : Ti.App.Android.R.drawable.appicon,
		defaults : Titanium.Android.NotificationManager.DEFAULT_SOUND
	});
	// Send the notification
	Ti.Android.NotificationManager.notify(1, notification);
	// Stop the service once the notification is sent
	Ti.Android.stopService(serviceIntent);
}