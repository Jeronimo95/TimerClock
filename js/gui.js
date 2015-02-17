function setCurrentAndEndTimeVisablities(){
	if(endTimeAvbl&&endTimeAct){
		win_d.window.$("#end_time_container").show();
	}else{
		win_d.window.$("#end_time_container").hide();
	}

	if(currentTimeAvbl&&currentTimeAct){
		win_d.window.$("#current_time_container").show();
	}else{
		win_d.window.$("#current_time_container").hide();
	}
}
$('#mode_sel').on('change', function() {
	timerClear();
	$("#mode_toTime").hide();
	$("#mode_countdown").hide();
	$("#mode_stopwatch").hide();
	$("#mode_bigClock").hide();
	$("#mode_"+this.value).show();

	if(this.value==="bigClock"){
		clockTimer = global.setInterval(bigClock,1);
		currentTimeAvbl = false;
		endTimeAvbl = false;
	}else if(this.value==="stopwatch"){
		currentTimeAvbl = true;
		endTimeAvbl = false;
	}else if(this.value==="toTime"){
		currentTimeAvbl = true;
		endTimeAvbl = true;
	}else if(this.value==="countdown"){
		currentTimeAvbl = true;
		endTimeAvbl = true;
	}
	setCurrentAndEndTimeVisablities();
});

$('#theme_sel').on('change', function() {
	if(win_d.window.$("#customCSS").length){
		win_d.window.$("#customCSS").remove()
	}
	if(this.value==="custom"){
		$("#customCSScont").show();
		win_d.window.$("body").attr("class", this.value);
	}else{
		$("#customCSScont").hide();
		win_d.window.$("body").attr("class", this.value);
	}
});

$("#customCSSgo").click(function(){
	if(win_d.window.$("#customCSS").length){
		win_d.window.$("#customCSS").remove()
	}
	win_d.window.$("head").append("<link id='customCSS' rel='stylesheet' href='"+$("#customCSSinput").val()+"'>");
});



$("#toTime_set").click(function(){
	toTime_do($('#toTime_input').val());
});

$('#toTime_input').keydown(function (event) {
    var keypressed = event.keyCode || event.which;
    if (keypressed == 13) {
        toTime_do($('#toTime_input').val());
    }
});

$('#toTime_input').keyup(function (event) {
    if(toTime_pattValitator($(this).val())) {
    	if($(this).parent().hasClass("has-error")) $(this).parent().removeClass("has-error");
    	if(!$(this).parent().hasClass("has-success")) $(this).parent().addClass("has-success");
    }else{
    	if($(this).parent().hasClass("has-success")) $(this).parent().removeClass("has-success");
    	if(!$(this).parent().hasClass("has-error")) $(this).parent().addClass("has-error");
    }
});

$("#toTime_clear").click(function(){
	timerClear();
});



$("#countdown_start").click(function(){
	countdownTimer_do($('#countdown_input').val());
});

$('#countdown_input').keydown(function (event) {
    var keypressed = event.keyCode || event.which;
    if (keypressed == 13) {
        countdownTimer_do($('#countdown_input').val());
    }
});

$("#countdown_stop").click(function(){
	timerClear();
})



$("#stopwatch_start").click(function(){
	stopwatch_start();
});

$("#stopwatch_clear").click(function(){
	stopwatch_clear();
});



$('input[type=radio][name=setting_timemode]').change(function() {
	if(this.value==="24"){
		is24h = true;
	}else{
		is24h = false;
	}
});
$('input[type=radio][name=setting_milliseconds]').change(function() {
	if(this.value==="true"){
		displayMilliseconds = true;
	}else{
		displayMilliseconds = false;
	}
});
$('input[type=radio][name=setting_seconds]').change(function() {
	if(this.value==="true"){
		displaySeconds = true;
	}else{
		displaySeconds = false;
	}
});

$('input[type=radio][name=setting_endtime]').change(function() {
	if(this.value==="true"){
		 endTimeAct = true;
	}else{
		 endTimeAct = false;
	}
	setCurrentAndEndTimeVisablities();
});
$('input[type=radio][name=setting_currenttime]').change(function() {
	if(this.value==="true"){
		currentTimeAct = true;
	}else{
		currentTimeAct = false;
	}
	setCurrentAndEndTimeVisablities();
});

$("#c_fullscreenDisplay").click(function(){
	win_d.toggleFullscreen();
});

$("#about").click(function(){
	var win_about = gui.Window.get(open("about.html"));
	return false;
});

$("#versionNumber").html(global.timerclock.getversionString());