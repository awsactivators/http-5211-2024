/* LAB 8-1 - FINAL COUNTDOWN!! */


//create page load listener
window.onload = finalCountDown;

//create page load function
function finalCountDown(){
	//create variables for required HTML elements
	var outputTodayDate = document.getElementById("todayData");
	var outputDueDate = document.getElementById("finalData");
	var daysLeft = document.getElementById("dueData");
	var countMessage = document.getElementById("countMsg");
	var dateVar = new Date();

	//create variables for now date and due date
	var currentDate = dateVar.toDateString();
	var dueDate = new Date("December 13, 2023 18:00:00");

	//console.log(mydate);
	
	//OUTPUT NOW DATE & DUE DATE TO HTML PAGE
	outputTodayDate.innerHTML = currentDate;
	outputDueDate.innerHTML = dueDate.toDateString();
	
	//CONVERT TO UTC AND SUBTRACT TO GET TIME DIFFERENCE
	var utcCurrentDate = dateVar.getTime();
	var utcDueDate = dueDate.getTime();
	var timeDiff = utcDueDate - utcCurrentDate;
	
	
	//CONVERT TIME DIFFERENCE TO WHOLE NUMBER OF DAYS
	var daysTillDueDate = Math.floor(timeDiff/86400000);
	
	//var dueDateDaysToUTC = Math.floor(timeDiff/86400000).getTime();

		
	//LOGIC TO CHECK IF DUE DATE HAS PASSED, AND OUPUT APPROPRIATE MESSAGE TO HTML PAGE
	if(utcDueDate < utcCurrentDate){
		countMessage.innerHTML = "The Pet Project due date has passed!"
	} else {
		daysLeft.innerHTML = daysTillDueDate;
		
	}
}



