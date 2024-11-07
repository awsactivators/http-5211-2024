/* LAB 7 - SHIPPING FORM */

window.onload = pageLoad;

function pageLoad () {
	var formHandle = document.forms.form_ship;
	var nameInput = document.getElementById("in_Name"); 
	var postalCodeInput = document.getElementById("in_pc"); 
	var thanksMessage = document.getElementById("thanks_msg"); 
	var thanksCustomer = document.getElementById("thanksCustomer"); 
	var thanksSpeed = document.getElementById("thanksSpeed")
	var thanksPC = document.getElementById("thanksPC"); 
	var thanksCost = document.getElementById("thanksCost"); 
	var speedInput = document.getElementById("in_Speed");

		//Order Shipping object (for extra EXTRA challenge, otherwise, ignore it)
	var shipInfo = {
		cid: 0,
		name: "",
		pc: "",
		speed: "",
		cost: 0
	};

	formHandle.onsubmit = processForm;

	function processForm() {
		var nameValue = formHandle.f_Name;
		var postalCode = formHandle.f_pc;


		// Validate Username
		if (nameValue.value === ""){
			nameValue.style.background = "red";
			nameValue.focus();
			return false;
		}

		// Validate Postal Code
		if (postalCode.value === ""){
			postalCode.style.background = "red";
			postalCode.focus();
			return false;
		}

		// Validate Delivery Speed
		if (speedInput.value === "0") {
			speedInput.style.background = "red";
			speedInput.focus();
			return false;
		}

		// Populate the shipInfo object
		shipInfo.cid += 1; 
		shipInfo.name = nameInput.value;
		shipInfo.pc = postalCodeInput.value;
		shipInfo.speed = speedInput.options[speedInput.selectedIndex].text;
		shipInfo.cost = speedInput.value;


		//Using the Option Value

		// thanksCustomer.textContent = nameInput.value; 
		// thanksPC.textContent = postalCodeInput.value; 
		// thanksSpeed.textContent = speedInput.options[speedInput.selectedIndex].text;
		// thanksCost.textContent = speedInput.value;

		// Using the shipInfo object
		thanksCustomer.textContent = shipInfo.name;
		thanksPC.textContent = shipInfo.pc;
		thanksSpeed.textContent = shipInfo.speed;
		thanksCost.textContent = shipInfo.cost;

		formHandle.style.display = "none"; 
		thanksMessage.style.display = "block"; 

		return false;
	}
	
}