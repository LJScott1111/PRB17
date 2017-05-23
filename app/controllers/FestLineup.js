var nsFestLineup = {};

nsFestLineup.openBandProfile = function(e) {

	console.log('e.source.bandid: ', e.source.bandid);

	Alloy.Globals.openWindow("BandProfile", {
		"id" : e.source.bandid,
		showsType : 'festshows'
	}, true, null, 'misc/center_logo');
};

$.lasvegas_view.addEventListener('click', function() {
	console.log('lasvegas_view clicked');
	$.lasvegas_lineup.visible = true;
	$.asburypark_linup.visible = false;
	$.lasvegas_ul.backgroundColor = '#D70C46';
	$.asburypark_ul.backgroundColor = 'transparent';
});

$.asburypark_view.addEventListener('click', function() {
	console.log('asburypark_view clicked');
	$.lasvegas_lineup.visible = false;
	$.asburypark_linup.visible = true;
	$.lasvegas_ul.backgroundColor = 'transparent';
	$.asburypark_ul.backgroundColor = '#D70C46';
});

nsFestLineup.init = function() {
	var device_width = Titanium.Platform.displayCaps.platformWidth;
	var device_height = Titanium.Platform.displayCaps.platformHeight;

	// Las vegas labels

	$.iggy_pop.top = Titanium.Platform.displayCaps.platformHeight * 0.112;

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

	// Asbury park labels
	$.the_specials.top = Titanium.Platform.displayCaps.platformHeight * 0.153;

	$.the_specials.height = Titanium.Platform.displayCaps.platformHeight * 0.074;
	$.the_specials.width = Titanium.Platform.displayCaps.platformWidth * 0.52;

	$.charles_bradley.height = Titanium.Platform.displayCaps.platformHeight * 0.049;
	$.charles_bradley.width = Titanium.Platform.displayCaps.platformWidth * 0.49;

	$.dillinger_four.height = Titanium.Platform.displayCaps.platformHeight * 0.030;
	$.dillinger_four.width = Titanium.Platform.displayCaps.platformWidth * 0.389;

	$.the_explosion.height = Titanium.Platform.displayCaps.platformHeight * 0.022;
	$.the_explosion.width = Titanium.Platform.displayCaps.platformWidth * 0.20;

	$.pup.height = Titanium.Platform.displayCaps.platformHeight * 0.022;
	$.pup.width = Titanium.Platform.displayCaps.platformWidth * 0.053;

	$.the_templars.height = Titanium.Platform.displayCaps.platformHeight * 0.022;
	$.the_templars.width = Titanium.Platform.displayCaps.platformWidth * 0.204;

	$.crazy_brains.height = Titanium.Platform.displayCaps.platformHeight * 0.0165;
	$.crazy_brains.width = Titanium.Platform.displayCaps.platformWidth * 0.165;

	$.ravagers.height = Titanium.Platform.displayCaps.platformHeight * 0.0165;
	$.ravagers.width = Titanium.Platform.displayCaps.platformWidth * 0.113;

	$.the_vansaders.height = Titanium.Platform.displayCaps.platformHeight * 0.0165;
	$.the_vansaders.width = Titanium.Platform.displayCaps.platformWidth * 0.143;

	$.nofx.height = Titanium.Platform.displayCaps.platformHeight * 0.068;
	$.nofx.width = Titanium.Platform.displayCaps.platformWidth * 0.444;

	$.buzzcocks.height = Titanium.Platform.displayCaps.platformHeight * 0.046;
	$.buzzcocks.width = Titanium.Platform.displayCaps.platformWidth * 0.373;

	$.lifetime.height = Titanium.Platform.displayCaps.platformHeight * 0.029;
	$.lifetime.width = Titanium.Platform.displayCaps.platformWidth * 0.24;

	$.leftover_crack.height = Titanium.Platform.displayCaps.platformHeight * 0.024;
	//0322
	$.leftover_crack.width = Titanium.Platform.displayCaps.platformWidth * 0.32;

	$.pietasters.height = Titanium.Platform.displayCaps.platformHeight * 0.025;
	$.pietasters.width = Titanium.Platform.displayCaps.platformWidth * 0.21;

	$.darkbuster.height = Titanium.Platform.displayCaps.platformHeight * 0.025;
	$.darkbuster.width = Titanium.Platform.displayCaps.platformWidth * 0.236;

	$.posers.height = Titanium.Platform.displayCaps.platformHeight * 0.024;
	$.posers.width = Titanium.Platform.displayCaps.platformWidth * 0.091;

	$.bigwig.height = Titanium.Platform.displayCaps.platformHeight * 0.024;
	$.bigwig.width = Titanium.Platform.displayCaps.platformWidth * 0.118;

	$.hotblood.height = Titanium.Platform.displayCaps.platformHeight * 0.019;
	$.hotblood.width = Titanium.Platform.displayCaps.platformWidth * 0.12;

	if ($.args.city == 'lasvegas') {
		$.lasvegas_lineup.visible = true;
		$.asburypark_linup.visible = false;
		$.lasvegas_ul.backgroundColor = '#D70C46';
		$.asburypark_ul.backgroundColor = 'transparent';
	} else {
		$.lasvegas_lineup.visible = false;
		$.asburypark_linup.visible = true;
		$.lasvegas_ul.backgroundColor = 'transparent';
		$.asburypark_ul.backgroundColor = '#D70C46';
	}

};

nsFestLineup.init();
