//######## LAB 2-3 EMAIL SIGNUP ########
//alert("hey 2.3");//COMMENT OUT ONCE CONNECTED TO YOUR HTML PAGE
//==== VARIABLES =========
var userConfirm = confirm("Would you like to join our mailing list?");
var successful = "Thank you, our next newsletter will be sent to ";
var notSuccessful = "Thank you, but your email was not valid";
var defaultEmail = "me@example.com"
var notInterested = "Thank you, we will not bother you again"


//==== LOGIC =============
if (userConfirm === true) {
  var email = prompt("Enter your email", defaultEmail);
 
    if (email === null || email === "" || email === defaultEmail) {
      alert(notSuccessful);
    } else {
      alert(successful + email)
    }
}
else {
  alert(notInterested);
  
}