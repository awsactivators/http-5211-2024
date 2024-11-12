/* SUPPLEMENTAL 7:  JS MATH & DATE OBJECTS, AND JS TIMERS */
window.onload = pageHasLoaded;
function pageHasLoaded(){
//#1 ========
var stampOutput = document.getElementById("timeStamp");
var timeStamp = new Date();
stampOutput.innerHTML = timeStamp;

//#2 ========
var dateOut = document.getElementById("dateString");
dateOut.innerHTML = timeStamp.toDateString();

//#3 ========
var timeOut = document.getElementById("timeString");
timeOut.innerHTML = timeStamp.toTimeString();

//#4 - A ========
var dayOfWeek = document.getElementById("weekDay");
dayOfWeek.innerHTML = timeStamp.getDay();

//#4 - B
var weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
dayOfWeek.innerHTML = weekDays[timeStamp.getDay()];

//#5 ========
var bdayOut = document.getElementById("bDay");
var myBday = new Date(2017, 0, 1, 0, 0, 0, 0);
bdayOut.innerHTML = myBday.toDateString();

//#6 ========
var tMsgOut = document.getElementById("timeMessage");

function changeMsg(){
	tMsgOut.innerHTML = "Time&rsquo;s up!!";
}
var myTimer = setTimeout(changeMsg, 5000);

//#7 ========
//NOTE:  COMMENT OUT LINE 36 ABOVE IF YOU WANT TO RUN THIS CODE.
var btn_go = document.getElementById("btn_start");

function startTimer(){
	var myTimer = setTimeout(changeMsg, 5000);
}
btn_go.onclick = startTimer;


}//end onload