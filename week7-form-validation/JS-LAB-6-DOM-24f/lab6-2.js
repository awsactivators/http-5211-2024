//#### LAB 6 - DOM MANIPULATION ####
//PART 2: MYSTERY BOX

//LISTEN FOR load EVENT
window.onload = loadEvent;

//'WRAPPER' FUNCTION FOR DOM LOGIC
function loadEvent() {
	//alert("Test");
	//GET DOM ELEMENTS WE'LL NEED
	var mysteryBox = document.getElementById("mysteryBox");
	var imageClick = document.getElementById("buttonBox");
	


	//====CREATE THE FUNCTIONS WE'LL NEED====
	//FUNCTION TO ASK USER
	function askUser(){
		var message = confirm("Do you want to see something?");
		if (message === true){
			mysteryBox.style.display = "none";
			imageClick.style.display = "block";
		} 
	}
	
	//FUNCTION TO CHANGE buttonBox
	function changeButton() {
		imageClick.style.width = "600px";
		imageClick.style.background = "orange";
	  imageClick.innerHTML = "<h2>SURPRISE!!</h2>";
	}



	//SETUP LISTENERS
	mysteryBox.onmouseover =  askUser;
	imageClick.onclick = changeButton;

}


//END onload FUNCTION