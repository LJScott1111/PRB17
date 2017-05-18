// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var nsGroups = {};

$.groupsListView.addEventListener('itemclick', function(e) {
	
	var item = e.section.getItemAt(e.itemIndex);
	console.log('GROUPS ', item.properties.data);
	Alloy.Globals.openWindow('Chat/Chat', item.properties.data, true, null, 'misc/center_logo');
	
});

nsGroups.displayGroups = function() {
	var groups = Titanium.App.Properties.getObject('appdata').groups;
	
	var section = Ti.UI.createListSection({ headerTitle: L('available_groups')});
	
	var items = _.map(groups, function(item) {
	    return {
	        properties: {
	            data: item,
				title: item.name,
				color: '#000',
				accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE,
				height : Titanium.UI.SIZE,
				selectionStyle : (OS_IOS) ? Ti.UI.iOS.ListViewCellSelectionStyle.NONE : ''
	        }
	    };
	});
	
	section.setItems(items);
	
	$.groupsListView.appendSection(section);
};

nsGroups.init = function() {
	console.log("Initialize list of groups");
	nsGroups.displayGroups();
}();
