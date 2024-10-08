// Object variable
var myMovie = {
  movieName: "Prison Break",
  releaseYear: 2005,
  genre: "Serial, Crime, Action",
  bestActor: "Micheal Scofield",
  movieYear: function(newReleaseYear){
    myMovie.releaseYear = newReleaseYear;
      alert(`Updated release year is: ${myMovie.releaseYear}`);
  }
}

// Output the current object to the console
console.log(`Current Object: ${myMovie}`);

//Update first object with user input
var userMovieName = prompt(`Current movie/series name: ${myMovie.movieName}\n\n What is your favorite movie/series name?`);
myMovie.movieName = userMovieName;

//Update second object with user input
var userGenre = prompt(`Current movie/series genre: ${myMovie.genre}\n\n What is the genre of the movie/series?`);
myMovie.genre = userGenre;

//Update third object with user input by calling the method
var userReleaseYear = prompt(`Current movie/series release year ${myMovie.releaseYear}\n\n What is the release year of the movie/series?`);
myMovie.movieYear(userReleaseYear);

// Output the updated object to the console
console.log(`Updated Object: ${myMovie}`);


