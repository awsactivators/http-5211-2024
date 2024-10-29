/* SUPPLEMENTAL 8:  FORM HANDLING */
//#1 ========
window.onload = pageLoaded;
function pageLoaded(){
var msgOut = document.getElementById("confirmMsg");

//#2 ========
var formHandle = document.forms.f_quote;
formHandle.onsubmit = processForm;

function processForm(){
//#3 -- !!!!! LOOK FURTHER DOWN THE PAGE FOR #3 !!!!!
//#4 ========
	var name_f = formHandle.f_name;
	var phone_f = formHandle.f_phone;
	var time_f = formHandle.f_daytime;

//#5 ========
	var name_span = document.getElementById("msg_name");
	var phone_span = document.getElementById("msg_phone");
	var time_span = document.getElementById("msg_time");
//#6 -- !!!!! LOOK FURTHER DOWN THE PAGE FOR #6 !!!!!

//#7 ========
//VALIDATE NAME INPUT
	if (name_f.value === ""){
		name_f.style.background = "red";
		name_f.focus();//PUT CURSOR IN THE NAME BOX
		return false;//PREVENT FORM FROM SUBMITTING
	} else {
		name_f.style.background = "white";
	}

//#8 ========
//VALIDATE PHONE INPUT
	var phoneRegEx = /^\d{3}(\s|-)?\d{3}(\s|-)?\d{4}$/;
//ABOVE MEANS 3 DIGITS; FOLLOWED BY 0 OR 1 SPACE OR DASH; FOLLOWED BY 3 DIGITS; FOLLOWED BY 0 OR 1 SPACE OR DASH; FOLLOWED BY 4 DIGITS. ALL WITH NOTHING ELSE BEFORE OR AFTER THAT COMBINATION OF CHARACTERS.
	if (phoneRegEx.test(phone_f.value)){//TEST IF INPUT MATCHES OUR REGULAR EXPRESSION.
		phone_f.style.background = "white";
	} else {
		phone_f.value = "";//EMPTY FIELD OF INVALID INPUT
		phone_f.style.background = "red";
		phone_f.focus();//PUT CURSOR IN THE PHONE BOX
		return false;//PREVENT FORM FROM SUBMITTING
	}

//#6 ========
	name_span.innerHTML = name_f.value;
	phone_span.innerHTML = phone_f.value;

//==== EXTRA CHALLENGE ==============
	var timeMsg;//CREATE MESSAGE VARIABLE
	if (time_f.checked === true){//WAS THE BOX CHECKED?
		timeMsg = "after";
	} else {
		timeMsg = "during";
	}

	//CREATE FULL MESSAGE
	time_span.innerHTML = timeMsg + " business hours";
//==== END EXTRA CHALLENGE ==========

//#3 ========
	formHandle.style.display = "none";
	msgOut.style.display = "block";
	return false;
}//======== END processForm ========
}//end onload