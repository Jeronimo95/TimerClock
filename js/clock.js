function getTime() {
	var d = new Date();
    return {
    	h: addZero(d.getHours(), 2),
    	m: addZero(d.getMinutes(), 2),
    	s: addZero(d.getSeconds(), 2),
    	ms: addZero(d.getMilliseconds(), 3)
    }
}

function bigClock() {
    var time = getTime();
    if(!is24h){
        time.ampm = time.h < 12 ? " AM" : " PM";
        time.h = time.h % 12 || 12;
    }else{
        time.ampm = "";
    }
    if(displayMilliseconds){
        time.ms = "."+time.ms;
    }else{
        time.ms = "";
    }
    if(displaySeconds){
        time.s = ":"+time.s;
    }else{
        time.s = "";
    }
    var timeString = time.h+":"+time.m+time.s+time.ms+time.ampm;
    setTimeDisplays(timeString);
}

function currentTime() {
    var time = getTime();
    if(!is24h){
        time.ampm = time.h < 12 ? " AM" : " PM";
        time.h = time.h % 12 || 12;
    }else{
        time.ampm = "";
    }
    if(displayMilliseconds){
        time.ms = "."+time.ms;
    }else{
        time.ms = "";
    }
    if(displaySeconds){
        time.s = ":"+time.s;
    }else{
        time.s = "";
    }
   win_d.window.$("#currentTime").html(time.h+":"+time.m+time.s+time.ms+time.ampm);
}
var CurrentTimeTimer = global.setInterval(currentTime, 50);