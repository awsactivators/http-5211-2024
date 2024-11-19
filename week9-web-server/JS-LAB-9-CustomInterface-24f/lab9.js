//LAB 9-DATA STORAGE: HOME PAGE
//window.onload
window.onload = function() {
	
//#####============== DO THIS PART FIRST! ===============		
    //get the form and set submit listener
	var formHandle = document.forms.infoForm;
    // console.log(formHandle);
    formHandle.onsubmit = processForm;
	
    //onsubmit Function
	function processForm(){

        // Get values from form
        var userName = document.getElementById("inName").value;
        var userColor = document.getElementById("inColour").value;

        // Console log the form values
        console.log(`Name: ${userName}, Color: ${userColor}`);

        // Store values
        localStorage.setItem("userName", userName);
        localStorage.setItem("userColor", userColor);

        // Update welcome message and background immediately
        document.getElementById("newMsgBox").innerText = `Welcome, ${userName}!`;
        document.body.style.background = userColor;
        
    }

    // Check for stored values
    var storedName = localStorage.getItem("userName");
    var storedColor = localStorage.getItem("userColor");

    if (storedName && storedColor) {
        // Change welcome text to stored name
        document.getElementById("newMsgBox").innerText = `Welcome, ${storedName}!`;

        // change BG colour to stored colour
        document.body.style.background = storedColor;
    }

    //set the delete listener
    var deleteBtn = document.getElementById("btnDel");
    deleteBtn.onclick = deleteCookie;

    // Delete button to remove stored values
    function deleteCookie(){
        localStorage.removeItem("userName");
        localStorage.removeItem("userColor");
        location.reload(); 
    }

        
}





