var nsFestLineup = {};

nsFestLineup.openBandProfile = function(e) {

	console.log('e.source.bandid: ', e.source.bandid);

	Alloy.Globals.openWindow("BandProfile", {
		"id" : e.source.bandid
	}, true, null, 'misc/center_logo');
};

nsFestLineup.init = function() {
	var device_width = Titanium.Platform.displayCaps.platformWidth;
	var device_height = Titanium.Platform.displayCaps.platformHeight;

	$.off.width = Titanium.Platform.displayCaps.platformWidth * 0.12;
	$.the_spits.width = Titanium.Platform.displayCaps.platformWidth * 0.23;
	$.the_interrupters.width = Titanium.Platform.displayCaps.platformWidth * 0.35;
	$.off.height = Titanium.Platform.displayCaps.platformHeight * 0.034;
	$.the_spits.height = Titanium.Platform.displayCaps.platformHeight * 0.034;
	$.the_interrupters.height = Titanium.Platform.displayCaps.platformHeight * 0.034;

	$.plague_vendor.width = Titanium.Platform.displayCaps.platformWidth * 0.30;
	$.drug_church.width = Titanium.Platform.displayCaps.platformWidth * 0.30;
	$.plague_vendor.height = Titanium.Platform.displayCaps.platformHeight * 0.035;
	$.drug_church.height = Titanium.Platform.displayCaps.platformHeight * 0.035;

	$.mobina_galore.width = Titanium.Platform.displayCaps.platformWidth * 0.30;
	$.new_trends.width = Titanium.Platform.displayCaps.platformWidth * 0.22;
	$.mobina_galore.height = Titanium.Platform.displayCaps.platformHeight * 0.035;
	$.new_trends.height = Titanium.Platform.displayCaps.platformHeight * 0.030;

	$.fidlar.width = Titanium.Platform.displayCaps.platformWidth * 0.23;
	$.choking_victim.width = Titanium.Platform.displayCaps.platformWidth * 0.44;
	$.fidlar.height = Titanium.Platform.displayCaps.platformHeight * 0.042;
	$.choking_victim.height = Titanium.Platform.displayCaps.platformHeight * 0.042;

	$.bouncing_souls.width = Titanium.Platform.displayCaps.platformWidth * 0.42;
	$.the_dickies.width = Titanium.Platform.displayCaps.platformWidth * 0.29;
	$.bouncing_souls.height = Titanium.Platform.displayCaps.platformHeight * 0.037;
	$.the_dickies.height = Titanium.Platform.displayCaps.platformHeight * 0.037;

	$.the_real_mckenzies.width = Titanium.Platform.displayCaps.platformWidth * 0.36;
	$.lost_in_society.width = Titanium.Platform.displayCaps.platformWidth * 0.29;
	$.the_real_mckenzies.height = Titanium.Platform.displayCaps.platformHeight * 0.034;
	$.lost_in_society.height = Titanium.Platform.displayCaps.platformHeight * 0.034;

	$.ten_can_riot.width = Titanium.Platform.displayCaps.platformWidth * 0.23;
	$.venomous_pinks.width = Titanium.Platform.displayCaps.platformWidth * 0.29;
	$.ten_can_riot.height = Titanium.Platform.displayCaps.platformHeight * 0.030;
	$.venomous_pinks.height = Titanium.Platform.displayCaps.platformHeight * 0.030;

	$.the_adicts.width = Titanium.Platform.displayCaps.platformWidth * 0.37;
	$.discharge.width = Titanium.Platform.displayCaps.platformWidth * 0.36;
	$.the_adicts.height = Titanium.Platform.displayCaps.platformHeight * 0.049;
	$.discharge.height = Titanium.Platform.displayCaps.platformHeight * 0.049;

	$.boozenglory.width = Titanium.Platform.displayCaps.platformWidth * 0.33;
	$.lions_law.width = Titanium.Platform.displayCaps.platformWidth * 0.25;
	$.boozenglory.height = Titanium.Platform.displayCaps.platformHeight * 0.025;
	$.lions_law.height = Titanium.Platform.displayCaps.platformHeight * 0.025;

	$.wolfpack.width = Titanium.Platform.displayCaps.platformWidth * 0.21;
	$.roadside_bombs.width = Titanium.Platform.displayCaps.platformWidth * 0.27;
	$.the_quitters.width = Titanium.Platform.displayCaps.platformWidth * 0.24;
	$.wolfpack.height = Titanium.Platform.displayCaps.platformHeight * 0.029;
	$.roadside_bombs.height = Titanium.Platform.displayCaps.platformHeight * 0.029;
	$.the_quitters.height = Titanium.Platform.displayCaps.platformHeight * 0.029;
};

nsFestLineup.init();
