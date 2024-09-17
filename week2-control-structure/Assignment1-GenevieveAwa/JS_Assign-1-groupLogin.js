// Variables

var teamNumber = 5;
var teamNumberPrompt = Number(prompt("Which team number do you belong to (1-6)?", "Numbers only"));
var wrongNameText = "Access denied!";
var wrongNumberText = "Incorrect number, access denied!";
var welcomeMessage = "Welcome ";

// Checking if the team number is correct
if (teamNumberPrompt ===  teamNumber) {
  var firstName = prompt("What is your first name?");

  // Switch case to check the list of member names
  switch(firstName) {
    case "Joycee":
      alert(welcomeMessage + firstName);
      break;

    case "Gabrielle":
      alert(welcomeMessage + firstName);
      break;

    case "Jerad":
      alert(welcomeMessage + firstName);
      break;

    case "Himan":
      alert(welcomeMessage + firstName);
      break;

    default:
      alert(wrongNameText);
      break;
  } 

} else {
  alert(wrongNumberText);
}
