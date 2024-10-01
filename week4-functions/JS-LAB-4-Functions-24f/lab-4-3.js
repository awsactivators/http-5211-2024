//#### LAB 4 - FUNCTIONS ####
//PART 3:  SAFE DOG WALKING CHECK 


//================== CREATE YOUR checkTemp FUNCTION
//This function's job is to determine the current temperature and decide if you can take your dog out for a walk or not.

//It needs to receive a parameter of currentTemp and data type = integer

//It will return a true or false, if false is above 30 or less than -10, it is not appropriate to go for a walk. Data type of boolean.

function checkTemp(currentTemp){
  if (currentTemp > 30 || currentTemp < -10) {
    return false;
  } else {
    return true;
  }
}


//================== LOGIC THAT OUTPUTS MESSAGES BASED ON FUNCTION RESULTS

var userTemp = parseInt(prompt("What is your current temperature?"));

var userInput = checkTemp(userTemp);


if (userInput == false){
  alert("Yikes! This is no weather for dog walking!");
} else {
  alert("You're good, have a nice walk!");
} 

