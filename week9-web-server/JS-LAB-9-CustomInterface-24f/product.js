//LAB 9-DATA STORAGE: PRODUCT PAGE

window.onload = function() {
  // Retrieve stored values
  var storedName = localStorage.getItem("userName");
  var storedColor = localStorage.getItem("userColor");

  if (storedName && storedColor) {
      // Change welcome text to stored name
      document.getElementById("MesgBox").innerText = `Welcome, ${storedName}!`;

      // change BG colour to stored colour
      document.body.style.background = storedColor;
  }
};





