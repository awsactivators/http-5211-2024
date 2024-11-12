/* LAB 8.2 - STOP TIME */


//create page load listener
window.onload = counter;

//create page load function
function counter() {
	//create variables for required HTML elements
	
	var startBtn = document.getElementById("btnStart");
	var stopBtn = document.getElementById("btnStop");
	var timeDisplay = document.getElementById("timeDisplay");
	var hoursOut = document.getElementById("hoursOut");
	var minsOut = document.getElementById("minsOut");
	var secsOut = document.getElementById("secsOut");

	//create time variable so all functions have access to it
	
	
	//Function for leading zero in counter
	function addLeadingZero(value) {
		if(value < 10){
			return '0' + value;
		} else {
			return value;
		}
	}

	var timerInterval = null;

	// CREATE FUNCTION THAT DISPLAYS THE TIM
	function displayTime() {
		var dateVar = new Date();
		var hours = dateVar.getHours();
		var minutes = dateVar.getMinutes();
		var seconds = dateVar.getSeconds();
		var displayHours = addLeadingZero(hours);
		var displayMinutes = addLeadingZero(minutes);
		var displaySeconds = addLeadingZero(seconds);

		hoursOut.innerHTML = displayHours;
		minsOut.innerHTML = ":" + displayMinutes;
		secsOut.innerHTML = ":" + displaySeconds;
	}

	// CREATE FUNCTION TO START THE CLOCK.
	function startClock() {
		displayTime(); 
		timerInterval = setInterval(displayTime, 1000);
		// if (timerInterval) {
		// 	displayTime(); 
		// 	timerInterval = setInterval(displayTime, 1000);
		// }
	}

	// CREATE FUNCTION TO STOP THE CLOCK
	function stopClock() {
		clearInterval(timerInterval);
		//timerInterval = null;
	}

	// SET EVENT LISTENERS
	startBtn.onclick = startClock;
	stopBtn.onclick = stopClock;
}


	

