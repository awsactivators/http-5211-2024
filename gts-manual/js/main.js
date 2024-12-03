import { heroes } from "./heros.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded");
  const urlParams = new URLSearchParams(window.location.search);
  const level = parseInt(urlParams.get("level")) || 1;
  console.log("Current level:", level);

  const hero = heroes[level];
  if (!hero) {
    console.error("Hero data not found for level:", level);
    alert("No data available for this level!");
    window.location.href = "./index.html";
    return;
  }

  const canvas = document.getElementById("my_canvas");
  const context = canvas.getContext("2d");

  // Update level number
  const levelNumberElement = document.querySelector(".level-number");
  if (levelNumberElement) {
    levelNumberElement.textContent = level;
    console.log("Level number updated on page:", level);
  } else {
    console.warn("Level number element not found!");
  }

  const image = new Image();
  image.src = hero.image;
  console.log("Image source:", hero.image);

  const pieceWidth = 60;
  const pieceHeight = 60;
  const rows = 5;
  const cols = 5;
  const pieces = [];
  const missingPieces = [];
  let trials = 3;

  const messageContainer = document.getElementById("message-container");

  image.onload = () => {
    console.log("Image loaded successfully");
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * pieceWidth;
        const y = row * pieceHeight;

        const piece = {
          x: x,
          y: y,
          width: pieceWidth,
          height: pieceHeight,
        };

        pieces.push(piece);
      }
    }

    while (missingPieces.length < 12) {
      const randomIndex = Math.floor(Math.random() * pieces.length);
      if (!missingPieces.includes(randomIndex)) {
        missingPieces.push(randomIndex);
      }
    }

    drawPuzzle();
  };

  const drawPuzzle = () => {
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

        // Border around the piece
      context.strokeStyle = "black"; 
      context.lineWidth = 1;        
      context.strokeRect(piece.x, piece.y, piece.width, piece.height);
      }
    });
  };

  const revealRandomMissingPiece = () => {
    if (missingPieces.length > 0) {
      // Select a random missing piece
      const randomIndex = Math.floor(Math.random() * missingPieces.length);
      const pieceIndex = missingPieces.splice(randomIndex, 1)[0]; // Remove the piece from the missingPieces list
  
      console.log(`Revealing piece at index: ${pieceIndex}`);
      drawPuzzle(); // Redraw the puzzle to include the newly revealed piece
    }
  };

  // Form submission for guessing
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userInput = document.querySelector("input[name='name']").value.trim().toLowerCase();
  
    if (userInput === hero.name.toLowerCase()) {
      updateMessage("Correct! Redirecting...", "green");
      setTimeout(() => navigateToCompletedPage(level), 1000);
    } else {
      trials--;
      if (trials > 0) {
        updateMessage(`Wrong answer! You have ${trials} attempt(s) left.`, "red");
        revealRandomMissingPiece(); // Reveal a piece when the user guesses incorrectly
      } else {
        updateMessage("Game over! Redirecting...", "red");
        setTimeout(() => navigateToCompletedPage(level), 1000);
      }
    }
  });

  const updateMessage = (message, color) => {
    messageContainer.textContent = message;
    messageContainer.style.color = color;
  };

  const navigateToCompletedPage = (level) => {
    window.location.href = `./play-completed.html?level=${level}`;
  };



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

  // Home Icon
  const homeIcon = document.getElementById("home-icon");
  homeIcon.addEventListener("click", () => {
    window.location.href = "./index.html";
  });

  // Like and Dislike Icons
  const likeIcon = document.getElementById("thumbs-up");
  const dislikeIcon = document.getElementById("thumbs-down");

  likeIcon.addEventListener("click", (e) => {
    e.preventDefault();
    likeIcon.classList.toggle("liked");
    dislikeIcon.classList.remove("disliked");
  });

  dislikeIcon.addEventListener("click", (e) => {
    e.preventDefault();
    dislikeIcon.classList.toggle("disliked");
    likeIcon.classList.remove("liked");
  });
});



