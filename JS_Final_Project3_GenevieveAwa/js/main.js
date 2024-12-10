document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded");

  /* I used a framework concept for puzzle to work on my project, here is the github repo link
     https://github.com/flbulgarelli/headbreaker
  */

  // Variables
  // General Variables
  var urlParams = new URLSearchParams(window.location.search);
  var level = parseInt(urlParams.get("level")) || 1; // Get the current level from the URL or default to 1
  var hero = heroes[level]; // Fetch hero data based on the current level
  var canvas = document.getElementById("my_canvas");
  var context = canvas.getContext("2d");
  var levelNumberElement = document.querySelector(".level-number");
  var image = new Image();
  var pieceWidth = 60;
  var pieceHeight = 60;
  var rows = 5;
  var cols = 5;
  var pieces = []; // Holds all puzzle pieces
  var missingPieces = []; // Tracks the indices of missing pieces
  var trials = 3; // Number of attempts allowed for the user
  var messageContainer = document.getElementById("message-container");

  // Sound Control
  var backgroundMusic = new Audio("./sounds/background-music.mp3");
  backgroundMusic.loop = true;

  var soundIcon = document.getElementById("sound-icon");
  var muteIcon = document.getElementById("mute-icon");

  // Info Box
  var infoIcon = document.getElementById("info-icon");
  var infoBox = document.getElementById("info-box");

  // Settings Modal
  var settingsIcon = document.getElementById("settings-icon");
  var settingsModal = document.getElementById("settings-modal");
  var overlay = document.getElementById("overlay");
  var darkModeToggle = document.getElementById("dark-mode-toggle");
  var closeSettings = document.getElementById("close-settings");

  // Home Icon
  var homeIcon = document.getElementById("home-icon");

  // Like and Dislike Icons
  var likeIcon = document.getElementById("thumbs-up");
  var dislikeIcon = document.getElementById("thumbs-down");
  var images = {
    likeDefault: "./images/thumbs-up.png",
    likeActive: "./images/thumbs-up-clicked.png",
    dislikeDefault: "./images/thumbs-down.png",
    dislikeActive: "./images/thumbs-down-clicked.png",
  };

  
  console.log("Current level:", level);

  if (!hero) {
    console.log("Hero data not found for level:", level);
    canvas.innerHTML = "Hero data not found for level: " + level;
    window.location.href = "./index.html"; // Redirect to the home page if no hero data is available (this also happens after last level 10)
    return;
  }


  // Update the level number on the page
  if (levelNumberElement) {
    levelNumberElement.textContent = level;
    console.log("Level number updated on page:", level);
  } else {
    //console.log("Level number element not found!");
    levelNumberElement.innerHTML = "Level number not found!";
  }


  // Load the hero image
  image.src = hero.image;
  console.log("Image source:", hero.image);

  // Load the image and generate puzzle pieces
  image.onload = () => {
    console.log("Image loaded successfully");

    // Create puzzle pieces with specified dimensions
    for (var row = 0; row < rows; row++) {
      for (var col = 0; col < cols; col++) {
        var x = col * pieceWidth;
        var y = row * pieceHeight;

        pieces.push({ x: x, y: y, width: pieceWidth, height: pieceHeight });
      }
    }


    // Randomly mark 12 pieces as missing
    while (missingPieces.length < 12) {
      var randomIndex = Math.floor(Math.random() * pieces.length);
      if (!missingPieces.includes(randomIndex)) {
        missingPieces.push(randomIndex);
      }
    }

    drawPuzzle();
  };


  // Function to draw the puzzle
  var drawPuzzle = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((piece, index) => {
      if (!missingPieces.includes(index)) {
        context.drawImage(
          image,
          piece.x,
          piece.y,
          piece.width,
          piece.height,
          piece.x,
          piece.y,
          piece.width,
          piece.height
        );

        // Add a border around each puzzle piece
        context.strokeStyle = "black";
        context.lineWidth = 1;
        context.strokeRect(piece.x, piece.y, piece.width, piece.height);
      }
    });
  };


  // Reveal a random missing piece after an incorrect guess
  var revealRandomMissingPiece = () => {
    if (missingPieces.length > 0) {
      var randomIndex = Math.floor(Math.random() * missingPieces.length);
      var pieceIndex = missingPieces.splice(randomIndex, 1)[0]; // Remove the revealed piece from the missing list

      console.log(`Revealing piece at index: ${pieceIndex}`);
      drawPuzzle(); // Redraw the puzzle to include the revealed piece
    }
  };


  // Form submission for guessing the superhero name
  var form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    var userInput = document.querySelector("input[name='name']").value.trim().toLowerCase();

    if (userInput === hero.name.toLowerCase()) {
      updateMessage("Correct! Redirecting...", "green");
      setTimeout(() => navigateToCompletedPage(level), 1000);
    } else {
      trials--;
      if (trials > 0) {
        updateMessage(`Wrong answer! You have ${trials} attempt(s) left.`, "red");
        revealRandomMissingPiece();
      } else {
        updateMessage("Game over! Redirecting...", "red");
        setTimeout(() => navigateToCompletedPage(level), 1000);
      }
    }
  });


  // Update the feedback message displayed to the user
  var updateMessage = (message, color) => {
    messageContainer.textContent = message;
    messageContainer.style.color = color;
  };


  // Navigate to the completed page with the current level
  var navigateToCompletedPage = (level) => {
    window.location.href = `./play-completed.html?level=${level}`;
  };


  // Sound Control
  soundIcon.addEventListener("click", () => {
    backgroundMusic.play();
    soundIcon.style.display = "none";
    muteIcon.style.display = "block";
  });


  muteIcon.addEventListener("click", () => {
    backgroundMusic.pause();
    muteIcon.style.display = "none";
    soundIcon.style.display = "block";
  });


  // Info Box functionality
  if (!infoBox) {
    infoBox = document.createElement("div");
    infoBox.id = "info-box";
    infoBox.textContent = "Try and guess the superhero's name from the unfinished puzzle.";
    document.body.appendChild(infoBox);
  }


  var positionInfoBox = () => {
    var iconRect = infoIcon.getBoundingClientRect();
    infoBox.style.top = `${iconRect.bottom + 25}px`;
    infoBox.style.left = `${iconRect.left + iconRect.width / 2}px`;
    infoBox.style.transform = "translateX(-50%)";
  };


  infoIcon.addEventListener("click", () => {
    if (infoBox.style.display === "none" || infoBox.style.display === "") {
      positionInfoBox();
      infoBox.style.display = "block";
    } else {
      infoBox.style.display = "none";
    }
  });


  document.addEventListener("click", (e) => {
    if (e.target !== infoIcon && e.target !== infoBox) {
      infoBox.style.display = "none";
    }
  });


  // Settings Modal functionality
  settingsIcon.addEventListener("click", () => {
    settingsModal.style.display = "block";
    overlay.style.display = "block";
  });


  closeSettings.addEventListener("click", () => {
    settingsModal.style.display = "none";
    overlay.style.display = "none";
  });


  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    darkModeToggle.textContent = document.body.classList.contains("dark-mode")
      ? "Toggle Light Mode"
      : "Toggle Dark Mode";
  });


  overlay.addEventListener("click", () => {
    settingsModal.style.display = "none";
    overlay.style.display = "none";
  });


  // Home Icon functionality
  homeIcon.addEventListener("click", () => {
    window.location.href = "./index.html";
  });


  // Like and Dislike Icon functionality
  likeIcon.addEventListener("click", (e) => {
    e.preventDefault();

    var likeImg = likeIcon.querySelector("img");
    var dislikeImg = dislikeIcon.querySelector("img");

    if (likeImg.src.includes("thumbs-up")) {
      likeImg.src = images.likeActive;
      dislikeImg.src = images.dislikeDefault;
    } else {
      likeImg.src = images.likeDefault;
    }
  });


  dislikeIcon.addEventListener("click", (e) => {
    e.preventDefault();

    var likeImg = likeIcon.querySelector("img");
    var dislikeImg = dislikeIcon.querySelector("img");

    if (dislikeImg.src.includes("thumbs-down")) {
      dislikeImg.src = images.dislikeActive;
      likeImg.src = images.likeDefault;
    } else {
      dislikeImg.src = images.dislikeDefault;
    }
  });
  
});

