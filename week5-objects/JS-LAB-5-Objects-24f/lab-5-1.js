//#### LAB 5 - FUNCTIONS & OBJECTS ####
//PART 1:  I OBJECT!
var meObject = {
  name: "Genevieve",
  studentNo: "N01613636",
  favoriteColors: "Black and Pink",
  birthMonth: "June" 
};

console.log(meObject.name);

alert(`My name is ${meObject.name} and my favorite colours are ${meObject.favoriteColors}`);

meObject.aboutMe = function() {
  alert(`My name is ${meObject.name} and my favorite colours are ${meObject.favoriteColors}`);
}

meObject.aboutMe();
