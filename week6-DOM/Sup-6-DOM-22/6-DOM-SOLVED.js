//SUPPLEMENTAL EXERCISE 6 - PART 1
//#1
window.onload = documentReady;
function documentReady(){
	
//#2
	var mainHeading = document.getElementById("firstH1");
	mainHeading.innerHTML = "Professor Sean Doyle - The Magnificent!";
	
//#3
	var firstPara = document.getElementById("par1");
	firstPara.style.background = "chartreuse";
	
//#4
	var secndPara = document.getElementById("par2");
	secndPara.style.display = "none";
	
//#5
	var goBtn = document.getElementById("subBtn");
	goBtn.innerHTML = "Read more";
	
//#6
	goBtn.onclick = showPara2;
	
	function showPara2(){
		secndPara.style.display = "block";
	}
	
//#7
	var firstH2 = document.getElementById("h21");
	firstH2.onmouseover = highliteOn;
	
	function highliteOn(){
		firstH2.style.background = "yellow";
	}
	
	firstH2.onmouseout = highliteOff;
	
		function highliteOff(){
		firstH2.style.background = "white";
	}
}//END documentReady FUNCTION
