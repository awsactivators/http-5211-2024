// Variables
var firstMovie = "Beauty and the Beast";
var secondMovie = "Blacklist";
var thirdMovie = "Prison Break";
var fourthMovie = "Grey Anatomy";
var fifthMovie = "Blackish";
var sixthMovie = "Suit";
var seventhMovie = "Power";

// Create an array to hold the top 7 movies
var topMovies = [firstMovie, secondMovie, thirdMovie, fourthMovie, fifthMovie, sixthMovie, seventhMovie];

// Prompt the user for input
var userInput = prompt("Which top 7 movie would you like?", "Pick a number: 1-7");

// Convert the input to a number
let movieNumber = parseInt(userInput);

// Re-prompt the user until valid input is received
while (isNaN(movieNumber) || movieNumber < 1 || movieNumber > 7) {
  alert("Please enter a number between 1 and 7!");
  userInput = prompt("Which top 7 movie would you like?", "Pick a number: 1-7");
  movieNumber = parseInt(userInput);
}

// Alert for valid movie selected
alert(`Number ${movieNumber} on the list is ${topMovies[movieNumber - 1]}`);

// Console log all movies with their corresponding numbers
for (var i = 0; i < topMovies.length; i++) {
  console.log(`Movie ${i + 1}: ${topMovies[i]}`);
}
