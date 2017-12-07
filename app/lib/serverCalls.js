/***
 Api.js
 Lease Tracker

 Created by Shraddha on 2017-03-14.
 */

// var moment = require('alloy/moment');

var api = {};

/*
 * Function for converting objects to structured querystring (email=example@example.com&password=AdAdw2)
 */
function queryString(data) {
	var self = this;
	for (var key in data) {
		if ( typeof data[key] === 'object' && data[key] !== null) {
			var o = data[key];
			delete data[key];
			for (var k in o) {
				var new_key = key + "[" + k + "]";
				var value = o[k];

				if (value === true) {
					value = 1;
				}

				if (value === false) {
					value = 0;
				}
				data[new_key] = value;
			}
		}
	}
	var arr = [];
	for (key in data)
	arr.push(key + '=' + data[key]);
	return arr.join("&");
};

/*
 * Function for http request
 */
function httpRequest(endpoint, method, data, successFunction, errorFunction, fileType) {

	if (!Ti.Network.online) {

		if (OS_ANDROID) {

			var dialog = Ti.UI.createAlertDialog({
				cancel : 1,
				buttonNames : ['Review Settings', 'Cancel'],
				message : 'No internet connection. Please review your data settings',
				title : 'Bunxious'
			});
			dialog.addEventListener('click', function(e) {

				if (e.index === 0) {

					var intent = Ti.Android.createIntent({
						action : 'android.settings.WIRELESS_SETTINGS'
					});
					Ti.Android.currentActivity.startActivity(intent);
				}
			});
			dialog.show();
		} else {

			alert('No internet connection. Please review your data settings');
		}

		if (errorFunction) {

			errorFunction();
		}
		return;
	}

	var url = "http://prb.buzzplay.com/api/v1/" + endpoint;

	// if (data && method == 'GET') {
	//
	// url = url + '?' + queryString(data);
	//
	// }

	var xhr = Ti.Network.createHTTPClient();

	var retries = 0;

	xhr.onload = function() {

		Ti.API.info(endpoint, this.responseText);

		if (this.status == '200' || this.status == '201') {

			try {

				var responseJSON = JSON.parse(this.responseText);

				if (responseJSON && !responseJSON.error) {

					if (successFunction) {

						successFunction(responseJSON);
					}
				}
			} catch (e) {

				if (errorFunction) {

					errorFunction(e);
				}
				Ti.API.error(endpoint, e);
			}
		} else {

			if (errorFunction) {

				errorFunction(this.response);
			}
			Ti.API.error(this.response);
		}
	};

	xhr.onerror = function(e) {

		// if (retries < 3) {
		//
		// retries++;
		// doRequest();
		// } else {

		Ti.API.info('Transmission error: ' + endpoint + ' ' + JSON.stringify(this) + this.responseText);

		// alert('There was a communication error. Please check your internet connection and try again.');

		if (errorFunction && this.responseText) {

			errorFunction(JSON.parse(this.responseText));

		} else if (errorFunction) {

			errorFunction(e);
		}
		// }
	};

	xhr.timeout = 20000;

	function doRequest() {

		xhr.open(method, url);

		// xhr.setRequestHeader('Authorization', 'Bearer ' + Titanium.App.Properties.getString('token'));
		// xhr.setRequestHeader('APPType', 'App');
		// console.log('TOKEN ', 'Bearer ' + Titanium.App.Properties.getString('token'));

		/*
		 if (fileType === 'media') {
		 xhr.setRequestHeader('enctype', 'multipart/form-data');
		 Ti.API.info('gonna hit ' + url + ' and gonna send ' + JSON.stringify(data));
		 xhr.send(data);

		 } else if (fileType == 'urlencoded') {
		 xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		 Ti.API.info('gonna hit urlencoded ' + url + ' and gonna send ' + JSON.stringify(queryString(data)));
		 xhr.send(queryString(data));
		 } else */

		if (data && method == 'POST') {

			xhr.setRequestHeader('Content-Type', 'application/json');
			Ti.API.info('gonna hit ' + url + ' and gonna send ' + JSON.stringify(JSON.stringify(data)));
			xhr.send(JSON.stringify(data));
		} else {

			xhr.setRequestHeader('Content-Type', 'application/json');
			Ti.API.info('gonna hit --> ' + url);
			xhr.send();
		}
	}

	doRequest();

}

// Get band list
api.getBandList = function(onloadCallback, errorCallback) {
	
	var endPoint = 'Bands';

	httpRequest(endPoint, 'GET', {}, function(entities) {
		console.debug("Band List success ", JSON.stringify(entities));

		// Alloy.Globals.bands = JSON.parse(JSON.stringify(entities));
		var appdata = Titanium.App.Properties.getObject('appdata', {});
		appdata.bands = JSON.parse(JSON.stringify(entities));
		Titanium.App.Properties.setObject('appdata', appdata);
		Alloy.Globals.hasBandsData = true;

		onloadCallback(entities);

	}, function(error) {
		console.debug("Band List Error ", error);
		Alloy.Globals.hasBandsData = false;

		// Alloy.Globals.bands.length = 0;
		var appdata = Titanium.App.Properties.getObject('appdata', {});
		appdata.bands.length = 0;
		Titanium.App.Properties.setObject('appdata', appdata);

		errorCallback(error);
	});
};

// Get venue list
api.getVenueList = function(onloadCallback, errorCallback) {
	var endPoint = 'Venues';

	httpRequest(endPoint, 'GET', {}, function(entities) {
		console.debug("Venue List success ", JSON.stringify(entities));

		// Alloy.Globals.venues = JSON.parse(JSON.stringify(entities));
		var appdata = Titanium.App.Properties.getObject('appdata', {});
		appdata.venues = JSON.parse(JSON.stringify(entities));
		Titanium.App.Properties.setObject('appdata', appdata);
		Alloy.Globals.hasVenuesData = true;

		onloadCallback(entities);

	}, function(error) {
		console.debug("Venue List Error ", error);

		Alloy.Globals.hasVenuesData = false;
		// Alloy.Globals.venues.length = 0;
		var appdata = Titanium.App.Properties.getObject('appdata', {});
		appdata.venues.length = 0;
		Titanium.App.Properties.setObject('appdata', appdata);

		errorCallback(error);
	});
};

// Get shows
api.getShows = function(onloadCallback, errorCallback) {
	var endPoint = 'Shows';

	httpRequest(endPoint, 'GET', {}, function(entities) {
		console.log("Shows success ", JSON.stringify(entities));
		// Alloy.Globals.shows = JSON.parse(JSON.stringify(entities));

		var appdata = Titanium.App.Properties.getObject('appdata', {});
		appdata.shows = JSON.parse(JSON.stringify(entities));
		Titanium.App.Properties.setObject('appdata', appdata);

		Alloy.Globals.hasShowsData = true;
		onloadCallback(entities);

	}, function(error) {
		console.debug("Shows Error ", error);

		Alloy.Globals.hasShowsData = false;
		// Alloy.Globals.shows.length = 0;
		var appdata = Titanium.App.Properties.getObject('appdata', {});
		appdata.shows.length = 0;
		Titanium.App.Properties.setObject('appdata', appdata);

		errorCallback(error);
	});
};

api.getClubBands = function(onloadCallback, errorCallback) {

	var endPoint = 'ClubBands';

	httpRequest(endPoint, 'GET', {}, function(entities) {
		console.log("Bands success ", JSON.stringify(entities));

		onloadCallback(entities);

	}, function(error) {
		console.debug("Bands Error ", error);
		errorCallback(error);
	});
};

api.getClubShows = function(onloadCallback, errorCallback) {

	var clubData = Titanium.App.Properties.getObject('clubData', {});
	var appdata = Titanium.App.Properties.getObject('appdata', {});
	var combinedData = [];

	var ClubBands = new api.getClubBands(function(resp) {
		console.log('RESP BANDS ----> ', JSON.stringify(resp));
		clubData.bands = JSON.parse(JSON.stringify(resp));

		var endPoint = 'ClubShows';

		httpRequest(endPoint, 'GET', {}, function(entities) {
			console.log("ClubShows success ", JSON.stringify(entities));
			clubData.shows = JSON.parse(JSON.stringify(entities));
			clubData.venues = JSON.parse(JSON.stringify(appdata.venues));

			// onloadCallback(entities);

			for (var j = 0,
			    showLen = entities.length; j < showLen; j++) {
				var bandProfile = {};
				bandProfile.showDetails = JSON.parse(JSON.stringify(entities[j]));
				// Find the matching band
				for (var i = 0,
				    bandLen = resp.length; i < bandLen; i++) {
					if (resp[i]._id == bandProfile.showDetails.band_id) {
						bandProfile.bandDetails = JSON.parse(JSON.stringify(resp[i]));
						break;
					}
				}
				// Find the matching venue
				for (var k = 0,
				    venueLen = appdata.venues.length; k < venueLen; k++) {
					if (appdata.venues[k]._id == bandProfile.showDetails.venue_id) {
						bandProfile.venueDetails = JSON.parse(JSON.stringify(appdata.venues[k]));
						break;
					}
				}
				combinedData.push(bandProfile);
			}
			clubData.details = JSON.parse(JSON.stringify(combinedData));

			console.error('clubData --> ', JSON.stringify(clubData));

			Titanium.App.Properties.setObject('clubData', clubData);

			onloadCallback(Titanium.App.Properties.getObject('clubData', {}));

		}, function(error) {
			console.debug("Shows Error ", error);
			errorCallback(error);
		});

	}, function(err) {
		console.error('ERR BANDS ----> ', JSON.stringify(err));

		// onloadCallback(entities);
	});

};

exports.getClubShows = api.getClubShows;

// Get user schedule
api.getUserSchedule = function(onloadCallback, errorCallback) {

	onloadCallback(Ti.App.Properties.getObject('userSchedule', []));
};

//Saving a User schedule
api.saveUserSchedule = function(show_id, onloadCallback, errorCallback, showsType) {

	console.error('Ti.App.Properties.getObject( -- ', Ti.App.Properties.getObject('userSchedule'));
	var userSchedule = Ti.App.Properties.getObject('userSchedule', []);
	console.log('userSchedule( -- ', userSchedule);

	if (userSchedule.length != 0) {

		for (var i in userSchedule) {

			if (userSchedule[i].show_id == show_id) {

				alert('You already added this show.');
				return;
			}
		}
	}

	var appdata = (showsType == 'clubshows') ? Titanium.App.Properties.getObject('clubData', {}) : Titanium.App.Properties.getObject('appdata', {});
	var band_id = '',
	    venue_id = '',
	    start_time = '',
	    isShowExists = false,
	    showDetails = '',
	    bandDetails = '',
	    venueDetails = '';
	for (var j in appdata.shows) {
		if (appdata.shows[j]._id == show_id) {
			appdata.shows[j].selected = true;
			band_id = appdata.shows[j].band_id;
			venue_id = appdata.shows[j].venue_id;
			start_time = appdata.shows[j].start_time;
			for (var k in appdata.details) {
				if (appdata.details[k].showDetails._id == show_id) {
					console.log('appdata.details[k].showDetails._id ', appdata.details[k].showDetails._id, show_id);
					showDetails = appdata.details[k].showDetails,
					bandDetails = appdata.details[k].bandDetails,
					venueDetails = appdata.details[k].venueDetails;
					break;
				};
			}

		}
	}

	for (var i in userSchedule) {

		if (userSchedule[i].start_time == start_time) {

			isShowExists = true;
			break;
		}
	}

	if (isShowExists) {

		var dialogBox = Titanium.UI.createAlertDialog({
			title : L('appName'),
			message : L('overlap_time'),
			buttonNames : ['Continue', 'Cancel']
		});

		dialogBox.show();

		dialogBox.addEventListener('click', function(e) {
			if (e.index == 1) {
				return;
			} else {

				Titanium.App.Properties.setObject('appdata', appdata);

				userSchedule.push({
					show_id : show_id,
					band_id : band_id,
					venue_id : venue_id,
					showDetails : showDetails,
					bandDetails : bandDetails,
					venueDetails : venueDetails,
					start_time : start_time
				});

				Ti.App.Properties.setObject('userSchedule', userSchedule);
				onloadCallback();
			}
			dialogBox.hide();
		});
	} else {

		Titanium.App.Properties.setObject('appdata', appdata);

		userSchedule.push({
			show_id : show_id,
			band_id : band_id,
			venue_id : venue_id,
			showDetails : showDetails,
			bandDetails : bandDetails,
			venueDetails : venueDetails,

			start_time : start_time
		});

		Ti.App.Properties.setObject('userSchedule', userSchedule);
		onloadCallback();
	}

};

//Deleting a User schedule
api.deleteUserSchedule = function(show_id, onloadCallback, errorCallback) {

	var userSchedule = Ti.App.Properties.getObject('userSchedule', []);

	if (userSchedule.length != 0) {

		for (var i in userSchedule) {

			if (userSchedule[i].show_id == show_id) {

				userSchedule.splice(i, 1);
				console.log('ENTRY DELETED');
				break;
			}
		}
	}

	Ti.App.Properties.setObject('userSchedule', userSchedule);
	onloadCallback();
};

// Clubshow user schedule
// Get user schedule
api.getUserClubSchedule = function(onloadCallback, errorCallback) {

	onloadCallback(Ti.App.Properties.getObject('userClubSchedule', []));
};

//Saving a User schedule
api.saveUserClubSchedule = function(show_id, onloadCallback, errorCallback, showsType) {

	console.error('Ti.App.Properties.getObject( userClubSchedule-- ', Ti.App.Properties.getObject('userClubSchedule'));
	var userClubSchedule = Ti.App.Properties.getObject('userClubSchedule', []);
	console.log('userClubSchedule( -- ', userClubSchedule);

	if (userClubSchedule.length != 0) {

		for (var i in userClubSchedule) {

			if (userClubSchedule[i].show_id == show_id) {

				alert('You already added this show.');
				return;
			}
		}
	}

	var appdata = Titanium.App.Properties.getObject('clubData', {});
	var band_id = '',
	    venue_id = '',
	    start_time = '',
	    isShowExists = false,
	    showDetails = '',
	    bandDetails = '',
	    venueDetails = '';
	for (var j in appdata.shows) {
		if (appdata.shows[j]._id == show_id) {
			appdata.shows[j].selected = true;
			band_id = appdata.shows[j].band_id;
			venue_id = appdata.shows[j].venue_id;
			start_time = appdata.shows[j].start_time;
			for (var k in appdata.details) {
				if (appdata.details[k].showDetails._id == show_id) {
					console.log('appdata.details[k].showDetails._id ', appdata.details[k].showDetails._id, show_id);
					showDetails = appdata.details[k].showDetails,
					bandDetails = appdata.details[k].bandDetails,
					venueDetails = appdata.details[k].venueDetails;
					break;
				};
			}

		}
	}

	for (var i in userClubSchedule) {

		if (userClubSchedule[i].start_time == start_time) {

			isShowExists = true;
			break;
		}
	}

	if (isShowExists) {

		var dialogBox = Titanium.UI.createAlertDialog({
			title : L('appName'),
			message : L('overlap_time'),
			buttonNames : ['Continue', 'Cancel']
		});

		dialogBox.show();

		dialogBox.addEventListener('click', function(e) {
			if (e.index == 1) {
				return;
			} else {

				Titanium.App.Properties.setObject('clubData', appdata);

				userClubSchedule.push({
					show_id : show_id,
					band_id : band_id,
					venue_id : venue_id,
					showDetails : showDetails,
					bandDetails : bandDetails,
					venueDetails : venueDetails,
					start_time : start_time
				});

				Ti.App.Properties.setObject('userClubSchedule', userClubSchedule);
				onloadCallback();
			}
			dialogBox.hide();
		});
	} else {

		Titanium.App.Properties.setObject('clubData', appdata);

		userClubSchedule.push({
			show_id : show_id,
			band_id : band_id,
			venue_id : venue_id,
			showDetails : showDetails,
			bandDetails : bandDetails,
			venueDetails : venueDetails,

			start_time : start_time
		});

		Ti.App.Properties.setObject('userClubSchedule', userClubSchedule);
		onloadCallback();
	}

};

//Deleting a User schedule
api.deleteClubUserSchedule = function(show_id, onloadCallback, errorCallback) {

	var userClubSchedule = Ti.App.Properties.getObject('userClubSchedule', []);

	if (userClubSchedule.length != 0) {

		for (var i in userClubSchedule) {

			if (userClubSchedule[i].show_id == show_id) {

				userClubSchedule.splice(i, 1);
				console.log('ENTRY DELETED');
				break;
			}
		}
	}

	Ti.App.Properties.setObject('userClubSchedule', userClubSchedule);
	onloadCallback();
};

api.getBannerInfo = function(onloadCallback, errorCallback) {

	var endPoint = 'Banners';

	httpRequest(function(entities) {
		console.log("Shows success ", JSON.stringify(entities));
		onloadCallback(entities);

	}, function(error) {
		console.debug("Shows Error ", error);
		errorCallback(error);
	});
};

api.getGroups = function(onloadCallback, errorCallback) {
	var endPoint = 'Groups';

	httpRequest(endPoint, 'GET', {}, function(entities) {
		console.log("Chat Groups :", JSON.stringify(entities));

		var appdata = Titanium.App.Properties.getObject('appdata', {});
		appdata.groups = JSON.parse(JSON.stringify(entities));
		Titanium.App.Properties.setObject('appdata', appdata);

		onloadCallback(entities);

	}, function(error) {
		console.debug("Shows Error ", error);
		errorCallback(error);
	});
};

module.exports = api;
