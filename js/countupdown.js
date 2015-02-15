function timerClear() {
	global.clearInterval(clockTimer);
	setTimeDisplays("00:00:00");
	win_d.window.document.getElementById("endTime").innerHTML="00:00:00";
}

function countTo(time){
	timerClear();
	clockTimer = countdown(
		time,
		function(ts){
			var h = addZero(ts.hours, 2);
			var m = addZero(ts.minutes, 2);
			var s = addZero(ts.seconds, 2);
			var ms = addZero(ts.milliseconds, 3);

			if(displayMilliseconds){
				ms = "."+ms;
			}else{
				ms = "";
			}
			if(displaySeconds){
				s = ":"+s;
			}else{
				s = "";
			}

			setTimeDisplays(h+":"+m+s+ms);

			if(ts.value>0){
				var unt_sin="Since";
			}else{
				var unt_sin="Untill";
			}
			
			var etime = (typeof time==="number") ? new Date(time) : time;
			var endH = addZero(etime.getHours(), 2);
			var endM = addZero(etime.getMinutes(), 2);
			var endS = addZero(etime.getSeconds(), 2);

			if(displaySeconds){
				endS = ":"+endS;
			}else{
				endS = "";
			}
			if(is24h){
				var ampm = "";
			}else{
				if(endH>12){
					endH=endH-12;
					var ampm = " PM";
				}else{
					var ampm = " AM";
				}
			}
			win_d.window.$("#endTime").html(unt_sin+" "+endH+":"+endM+endS+ampm);
		},
		countdown.HOURS |
    	countdown.MINUTES |
    	countdown.SECONDS |
    	countdown.MILLISECONDS);
}

//toTime
var patt12h = new RegExp(/(\d\d|\d):(\d\d)(:\d\d){0,1} (am|pm)$/i);
var patt24h = new RegExp(/(^\d\d|^\d):(\d\d)(:\d\d){0,1}$/);
var pattfull = new RegExp(/(\d\d\d\d)-(\d\d)-(\d\d) (\d\d):(\d\d)(:\d\d){0,1}$/);

function toTime_pattValitator(string){
	return (patt12h.test(string) || patt24h.test(string) || pattfull.test(string))?true:false;
}

function toTime_do(inval){
	var now = new Date();
	var todaysdateString = now.getFullYear()+"-"+addZero(now.getMonth()+1, 2)+"-"+addZero(now.getDate(), 2);
	var finaltime = null;
	if(patt12h.test(inval)){
		//12h
		var split = inval.split(":");
		if(split[0]>12){split[0]+=12};
		if(typeof split[2] == 'undefined'){
			var seconds = "";
		}else{
			var seconds = ":"+split[2];
		}
		var val24 = split[0]+":"+split[1]+seconds;
		finaltime = Date.parse(todaysdateString+" "+val24);
	}else if(patt24h.test(inval)){
		//24h
		finaltime = Date.parse(todaysdateString+" "+inval.split(" ")[0]);
	}else if(pattfull.test(inval)){
		//iso
		finaltime = Date.parse(inval)
	}else{
		return;
	}
	countTo(finaltime);
}

//set timer
function countdownTimer_do(inval) {
	var split = inval.split(":");
	var seconds = 0;

	if(split.length===1){
		seconds = split[0]*60*1000;
	}else if(split.length===2){ parseInt(split[2])
		var h = parseInt(split[0]);
		var m = parseInt(split[1]);
		var s = 0;
		seconds = ((h*60*60) + (m*60) + s)*1000;
	}else if(split.length===3){
		var h = parseInt(split[0]);
		var m = parseInt(split[1]);
		var s = parseInt(split[2]);
		seconds = ((h*60*60) + (m*60) + s)*1000;
	}else{
		return;
	}

	var date = new Date();
	date.setTime(seconds+date.getTime())
	countTo(date);

}