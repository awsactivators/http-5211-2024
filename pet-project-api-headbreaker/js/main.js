window.onload = function () {
  // DOM Elements
  const messageContainer = document.getElementById("message-container");
  const levelNumberElement = document.getElementById("level-number");

  // Get level from query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const level = parseInt(urlParams.get("level")) || 1; // Default to level 1
  
  // https://github.com/akabab/superhero-api/blob/master/readme.md
  const apiUrl = `https://akabab.github.io/superhero-api/api/id/${level}.json`;

  // Function to fetch hero data
  function fetchHero() {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((heroData) => {
        initializeGame(heroData);
      })
      .catch((error) => {
        console.error("Error fetching hero data:", error);
        displayError("Failed to load hero data. Please try again later.");
      });
  }


  // Function to display an error message
  function displayError(message) {
    messageContainer.innerHTML = message;
    messageContainer.style.color = "red";
  }


  // Function to initialize the game with hero data
  function initializeGame(hero) {
    if (!hero) {
      displayError("No hero data found for this level.");
      return;
    }

    // Update level number
    if (levelNumberElement) levelNumberElement.textContent = level;

    // Load hero image dynamically using Headbreaker Framework
    // https://github.com/flbulgarelli/headbreaker/blob/master/README.md
    const image = new Image();
    image.src = hero.images.md; // Use the medium-sized image
    image.onload = function () {
      const canvas = new headbreaker.Canvas("my_canvas", {
        width: 300,
        height: 358,
        pieceSize: 50,
        borderFill: 25,
        strokeWidth: 2,
        image: image,
      });

      canvas.autogenerate({
        horizontalPiecesCount: 6, 
        verticalPiecesCount: 6,
      });

      // Randomly hide pieces
      const puzzle = canvas.puzzle;
      const totalPieces = puzzle.pieces.length;
      const maxMissingPieces = 35; // Number of missing pieces

      for (let i = 0; i < maxMissingPieces; i++) {
        const randomIndex = Math.floor(Math.random() * totalPieces);
        puzzle.pieces[randomIndex].metadata.hidden = true;
      }

      // Remove hidden pieces
      puzzle.pieces.forEach((piece) => {
        if (piece.metadata.hidden) {
          piece.drag(1000, 1000); // Move piece off the canvas
        }
      });

      canvas.draw();
    };

    // Set up guessing functionality
    setUpGuessing(hero);
  }




  // Function to set up guessing logic
  function setUpGuessing(hero) {
    let trials = 3;
    const form = document.querySelector("form");
    const input = document.querySelector("input[name='name']");

    if (!localStorage.getItem("correctScores")) localStorage.setItem("correctScores", "0");
    if (!localStorage.getItem("failedScores")) localStorage.setItem("failedScores", "0");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const userInput = input.value.trim().toLowerCase();

      if (userInput === hero.name.toLowerCase()) {
        messageContainer.innerHTML = "Correct! Redirecting to the completed page...";
        messageContainer.style.color = "green";
        setTimeout(function () {
          window.location.href = `./play-completed.html?level=${level}`;
        }, 1500);
      } else {
        trials--;
        if (trials > 0) {
          messageContainer.innerHTML = `Wrong hero! You have ${trials} attempts left.`;
          messageContainer.style.color = "red";
        } else {
          messageContainer.innerHTML = "Game over! Redirecting to the completed page...";
          messageContainer.style.color = "red";
          setTimeout(function () {
            window.location.href = `./play-completed.html?level=${level}`;
          }, 1500);
        }
      }
    });

  }

    


  // Sound Control
  const backgroundMusic = new Audio("./sounds/background-music.mp3");
  backgroundMusic.loop = true;

  const soundIcon = document.getElementById("sound-icon");
  const muteIcon = document.getElementById("mute-icon");

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


  // Info Icon
  const infoIcon = document.getElementById("info-icon");
  let infoBox = document.getElementById("info-box");

  if (!infoBox) {
    infoBox = document.createElement("div");
    infoBox.id = "info-box";
    infoBox.textContent = "Try and guess the superhero's name from the unfinished puzzle.";
    document.body.appendChild(infoBox);
  }


  const positionInfoBox = () => {
    const iconRect = infoIcon.getBoundingClientRect();
    infoBox.style.top = `${iconRect.bottom + 10}px`;
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


  // Settings Modal
  const settingsIcon = document.getElementById("settings-icon");
  const settingsModal = document.getElementById("settings-modal");
  const overlay = document.getElementById("overlay");
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const closeSettings = document.getElementById("close-settings");

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

  // Like/Dislike Icons
  const likeIcon = document.getElementById("thumbs-up");
  const dislikeIcon = document.getElementById("thumbs-down");

  likeIcon.addEventListener("click", (e) => {
    e.preventDefault();
    likeIcon.classList.toggle("liked");
    if (likeIcon.classList.contains("liked")) {
      dislikeIcon.classList.remove("disliked");
    }
  });

  dislikeIcon.addEventListener("click", (e) => {
    e.preventDefault();
    dislikeIcon.classList.toggle("disliked");
    if (dislikeIcon.classList.contains("disliked")) {
      likeIcon.classList.remove("liked");
    }
  });

  // Fetch hero data for the current level
  fetchHero();

  // Initialize interactive features
  initializeInteractiveFeatures();
};

