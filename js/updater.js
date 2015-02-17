$(document).ready(function() {
	$.getJSON( global.timerclock.updateURL , function( json ) {
		var latest = json.latestVersion;
		var current = global.timerclock.version;

		if(latest.maj>current.maj || latest.min>current.min || latest.pat>current.pat){
			global.timerclock.versionLATEST = latest;
			global.timerclock.updateSite = json.updateURL;
			var win_u = gui.Window.get(open("update.html"));
			win_u.resizeTo(500, 200);
		}
	});
});