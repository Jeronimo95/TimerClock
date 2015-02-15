var stopwatch = null;

function msToTime(duration) {
    var milliseconds = parseInt((duration%1000))
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

    hours = addZero(hours, 2);
    minutes = addZero(minutes, 2);
    seconds = addZero(seconds, 2);
    milliseconds = addZero(milliseconds, 3);

	if(displayMilliseconds){
		milliseconds = "."+milliseconds;
	}else{
		milliseconds = "";
	}
	if(displaySeconds){
		seconds = ":"+seconds;
	}else{
		seconds = "";
	}
	
    return hours + ":" + minutes + seconds + milliseconds;
}

function stopwatch_start() {
	if(stopwatch===null){
		stopwatch = new Timer();
	}
	stopwatch.start();
	clockTimer = global.setInterval(stopwatch_display,100);
}

function stopwatch_clear() {
	stopwatch = new Timer();
}

function stopwatch_display() {
	var ms = stopwatch.milliseconds();
	setTimeDisplays(msToTime(ms));
}