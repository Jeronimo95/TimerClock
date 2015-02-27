global.timerclock = {version: {
					 	maj: 1,
					 	min: 2,
					 	pat: 0,
					 	sff: ""
					 },
					 website: "https://github.com/saferindoors/TimerClock",
					 updateURL: "http://updates.saferindoors.com/timerclock.json"};

global.timerclock.getversionString = function(){
	var v = global.timerclock.version
	return v.maj+"."+v.min+"."+v.pat+" "+v.sff;
}

var gui = require('nw.gui');

var w = window.screen.availWidth;
var h = window.screen.availHeight;
var thirdth = Math.floor(w/2);

var win_c = gui.Window.get();
var win_d = gui.Window.get(open("display.html"));

win_c.moveTo(10, 10);
win_c.resizeTo(550, 740);
win_d.resizeTo(960, 540);

win_c.focus();

win_c.on('close', function() {
	win_d.close(true)
	this.close(true);
});
win_d.on('close', function() {return false;});

//INIT VARS
var mode = "toTime";
var overtimemode = "continue";
var displayMilliseconds = false;
var displaySeconds = true;
var is24h = true;
var clockTimer = null;
var currentTimeAvbl = true;
var endTimeAvbl = true;
var currentTimeAct = false;
var endTimeAct = false;


//HELPERS
function addZero(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}

function setTimeDisplays (string) {
	win_d.window.document.getElementById("main_feature").innerHTML=string;
	win_c.window.document.getElementById("main_feature").innerHTML=string;
}