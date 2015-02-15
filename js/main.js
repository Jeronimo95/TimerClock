global.timerclock = {version: "1.1.0 DEV",
					 gitURL: "https://github.com/saferindoors/TimerClock"};
var gui = require('nw.gui');

var w = window.screen.availWidth;
var h = window.screen.availHeight;
var thirdth = Math.floor(w/2);

var win_c = gui.Window.get();
var win_d = gui.Window.get(open("display.html"));

win_c.moveTo(10, 10);
win_c.resizeTo(550, 700)
win_d.resizeTo(960, 540)
win_d.moveTo(thirdth, 10);

win_c.focus();

win_c.on('close', function() {
	win_d.close(true)
	this.close(true);
});
win_d.on('close', function() {return false;});

//INIT VARS
var mode = "toTime";
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