//#### LAB 4 - FUNCTIONS ####
//PART 2:  AN AVERAGE FUNCTION


//################## CREATE YOUR AVERAGE FUNCTION
//This function takes five numbers and returns their average to one decimal place.
function numAverage(num1, num2, num3, num4, num5){
  var sum = num1 + num2 + num3 + num4 + num5;
  return (sum/5).toFixed(1);
}

console.log(numAverage(5, 10, 15, 20, 25));

//################## LOGIC THAT OUTPUTS MESSAGES BASED ON FUNCTION RESULTS
var http5121 = 95;
var http5122 = 90;
var http5126 = 87;
var http5124 = 98;
var http5125 = 89;

var overallAverage = numAverage(http5121, http5122, http5124, http5125, http5126)

if (overallAverage > 70){
  alert("Success! You passed this course");
} else {
  alert("Review required!");
}