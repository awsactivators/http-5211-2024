//######## LAB 2-2 LOGIN ########
//1. LINK THIS JS FILE TO THE HTML FILE
//alert("hey 2.2");//COMMENT OUT ONCE CONNECTED TO YOUR HTML PAGE

//====VARIABLES===============
//2. CREATE NECESSARY VARIABLES
		var userName = "dart"; // Correct user name
		var password = "vader" // Correct password
		userNameEntered = prompt("What is your username?");// user name input
		console.log("This is your username: ", userNameEntered);
		passwordEntered = prompt("Enter your password:");// password input
		console.log("This is your password: ", passwordEntered);

		if (userNameEntered === userName && password === passwordEntered) {
			alert("Welcome back " + userNameEntered + "!");
		} else {
			alert("Invalid username/password");
		}

		console.log("Login Fail");



//====LOGIC===================
//3. CREATE POPUP BOX FOR USERNAME

//4. OUTPUT PROVIDED USERNAME TO JS CONSOLE

//5. CREATE POPUP BOX FOR PASSWORD

//6. OUTPUT PROVIDED PASSWORD TO JS CONSOLE

//7. CHECK IF PROVIDED USERNAME AND PROVIDED PASSWORD MATCH THE STORED USERNAME/PASSWORD

//8. IF THEY MATCH, POPUP SUCCESS MESSAGE AND OUTPUT TO CONSOLE



//9. IF THEY DON'T MATCH, POPUP INVALID MESSAGE & OUTPUT TO CONSOLE