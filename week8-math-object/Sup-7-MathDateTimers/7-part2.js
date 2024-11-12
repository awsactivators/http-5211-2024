/* SUPPLEMENTAL 7.2 - LUCKY LOTTO 
 CREATE A LOTTO 649 LUCKY NUMBER PICKER*/
window.onload = goLotto;
function goLotto(){
//#1 ========
	var btn_pick = document.getElementById("goBtn");
	var resultsOut = document.getElementById("resultsOut");

//#2 ========
	function getPicks(){
//#3 a ========
		var quickPicks = [];
//#3 b ========
		for(var i = 0; i < 6; i++) {
			var rndmNum = Math.floor(Math.random() * 49) + 1;
			quickPicks.unshift(rndmNum);
		}
		//VVVVVVVV EXTRA CHALLENGE VVVVVVVV
				quickPicks = quickPicks.sort(function(a, b){return a - b});
		//^^^^^^^^ END EXTRA CHALLENGE ^^^^^^^^

//#4 & #5 ========
		resultsOut.innerHTML = quickPicks.join(" | ");

	}//end getPicks

	btn_pick.onclick = getPicks;



//VVVVVVVVVVVVVVVV EXTRA SUPERSTAR CHALLENGE VVVVVVVVVVVVVVVV
	function getUniquePicks(){
	quickPicks = [];
	while(quickPicks.length < 6) {
//BECAUSE WE NEED TO RUN THE LOOP AGAIN IF WE COME UP WITH A DUPLICATE RANDOM NUMBER, WE CAN'T LIMIT OUR LOOP TO 6 TIMES.  THEREFORE, WE SWITCH TO A while LOOP THAT WILL KEEP GENERATING RANDOM NUMBERS UNTIL WE HAVE COMPLETED OUR ARRAY.
		var rndmNum = Math.floor(Math.random() * 49) + 1;

//AFTER GENERATING THE RANDOM NUMBER, WE CHECK IF IT'S IN THE ARRAY ALREADY BY LOOKING AT ITS indexOf.  -1 MEANS IT'S NOT IN THE ARRAY YET.
		if(quickPicks.indexOf(rndmNum) === -1){

//IF IT'S NOT IN THE ARRAY YET, ADD IT TO THE ARRAY.
			quickPicks.unshift(rndmNum);
		}

	}//end while loop

	quickPicks = quickPicks.sort(function(a, b){return a - b});
	resultsOut.innerHTML = quickPicks.join(" | ");
	}

//NOTE: COMMENT OUT LINE 27 SO YOU DON'T HAVE CONFLICTING LISTENERS.
	btn_pick.onclick = getUniquePicks;
//^^^^^^^^^^^^^^^^ END EXTRA SUPERSTAR CHALLENGE ^^^^^^^^^^^^^^^^

}//end onloadf
