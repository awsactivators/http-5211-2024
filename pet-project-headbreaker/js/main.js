import { heroes } from "./heros.js";

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const level = parseInt(urlParams.get("level")) || 1; // Default to level 1
  const hero = heroes[level]; // Fetch hero data for the level

  if (!hero) {
    alert("No data available for this level!");
    window.location.href = "./index.html"; // Redirect to home if no data
    return;
  }

  // Update the level number
  const levelNumberElement = document.querySelector(".level-number");
  if (levelNumberElement) levelNumberElement.textContent = level;

  // Load hero image dynamically using Headbreaker Framework
  // https://github.com/flbulgarelli/headbreaker/blob/master/README.md
  const image = new Image();
  image.src = hero.image;

  let trials = 3;
  const puzzleSize = { horizontal: 6, vertical: 7 }; 
  const totalPieces = puzzleSize.horizontal * puzzleSize.vertical; 
  const maxMissing = 32; // Initial number of pieces to go missing
  let missingPieces = [];

  // Message container for feedback
  const messageContainer = document.getElementById("message-container");

  image.onload = () => {
    const canvas = new headbreaker.Canvas("my_canvas", {
      width: 300,
      height: 358, 
      pieceSize: 50, // Approx size of each piece (adjust as needed)
      borderFill: 25, // Remove extra spacing around the puzzle
      strokeWidth: 2, // Line thickness for puzzle pieces
      image: image,
    });

    canvas.autogenerate({
      horizontalPiecesCount: puzzleSize.horizontal,
      verticalPiecesCount: puzzleSize.vertical,
    });

    const puzzle = canvas.puzzle;
    

    // Generate list of all piece indices
    const allPieces = Array.from({ length: totalPieces }, (_, i) => i);

    // Randomly select pieces to hide
    while (missingPieces.length < maxMissing && allPieces.length > 0) {
      const randomIndex = Math.floor(Math.random() * allPieces.length);
      const pieceIndex = allPieces.splice(randomIndex, 1)[0];
      missingPieces.push(pieceIndex);

      // Mark the piece as hidden
      puzzle.pieces[pieceIndex].metadata.hidden = true;
    }

    // Remove hidden pieces from the canvas
    puzzle.pieces.forEach((piece) => {
      if (piece.metadata.hidden) {
        piece.drag(1000, 1000); // Move it off-canvas
      }
    });

    canvas.draw();
    // End of hero image dynamically using Headbreaker Framework


    // Customized script
    // ********************************************************//

    // Form submission for guessing
    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const userInput = document.querySelector("input[name='name']").value.trim().toLowerCase();

      if (userInput === hero.name.toLowerCase()) {
        updateMessage("Correct! Redirecting to the completed page...", "green");
        setTimeout(() => navigateToCompletedPage(level), 1500);
      } else {
        trials--;
        if (trials > 0) {
          updateMessage(`Wrong hero! You have ${trials} attempts left.`, "red");
          revealRandomPiece(puzzle);
        } else {
          updateMessage("Game over! Redirecting to the completed page...", "red");
          setTimeout(() => navigateToCompletedPage(level), 1500);
        }
      }
    });
  };


  function revealRandomPiece(puzzle) {
    const hiddenPieces = puzzle.pieces.filter((piece) => piece.metadata.hidden);
    if (hiddenPieces.length > 0) {
      const randomPiece = hiddenPieces[Math.floor(Math.random() * hiddenPieces.length)];
      randomPiece.metadata.hidden = false;
      randomPiece.drag(-randomPiece.x, -randomPiece.y);
      randomPiece.connect();
      canvas.draw();
    }
  }

  function updateMessage(message, color) {
    messageContainer.textContent = message;
    messageContainer.style.color = color;
  }

  function navigateToCompletedPage(level) {
    window.location.href = `./play-completed.html?level=${level}`;
  }



  // ICON FUNCTIONALITY STARTS HERE
  // ********************************************************//

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

  // Create the info box dynamically if it doesn't exist
  if (!infoBox) {
    infoBox = document.createElement("div");
    infoBox.id = "info-box";
    infoBox.textContent = "Try and guess the superhero's name from the unfinished puzzle.";
    document.body.appendChild(infoBox);
  }

  // Position the info box relative to the info icon
  const positionInfoBox = () => {
    const iconRect = infoIcon.getBoundingClientRect();
    infoBox.style.top = `${iconRect.bottom + 25}px`; // Position below the icon
    infoBox.style.left = `${iconRect.left + iconRect.width / 2}px`; // Center align
    infoBox.style.transform = "translateX(-50%)";
  };

  // Toggle the visibility of the info box
  infoIcon.addEventListener("click", () => {
    if (infoBox.style.display === "none" || infoBox.style.display === "") {
      positionInfoBox();
      infoBox.style.display = "block";
    } else {
      infoBox.style.display = "none";
    }
  });

  // Close the info box when clicking outside
  document.addEventListener("click", (e) => {
    if (e.target !== infoIcon && e.target !== infoBox) {
      infoBox.style.display = "none";
    }
  });
  // Settings Icon
  const settingsIcon = document.getElementById("settings-icon");
  const settingsModal = document.getElementById("settings-modal");
  const overlay = document.getElementById("overlay");
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const closeSettings = document.getElementById("close-settings");

  // Show the modal and fade the background
  settingsIcon.addEventListener("click", () => {
    settingsModal.style.display = "block";
    overlay.style.display = "block";
  });

  // Close the modal and restore the background
  closeSettings.addEventListener("click", () => {
    settingsModal.style.display = "none";
    overlay.style.display = "none";
  });

  // Toggle Dark Mode
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    darkModeToggle.textContent = document.body.classList.contains("dark-mode")
      ? "Toggle Light Mode"
      : "Toggle Dark Mode";
  });

  // Close the modal when clicking outside
  overlay.addEventListener("click", () => {
    settingsModal.style.display = "none";
    overlay.style.display = "none";
  });

  // Home Icon
  const homeIcon = document.getElementById("home-icon");
  homeIcon.addEventListener("click", () => {
    window.location.href = "./index.html";
  });

  // Thumbs Up/Down Icons
  const likeIcon = document.getElementById("thumbs-up");
  const dislikeIcon = document.getElementById("thumbs-down");

  // Handle the like icon click
  likeIcon.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the default anchor behavior
    if (!likeIcon.classList.contains("liked")) {
      likeIcon.classList.add("liked");
      dislikeIcon.classList.remove("disliked"); // Remove dislike if already selected
    } else {
      likeIcon.classList.remove("liked"); // Toggle off if clicked again
    }
  });

  // Handle the dislike icon click
  dislikeIcon.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the default anchor behavior
    if (!dislikeIcon.classList.contains("disliked")) {
      dislikeIcon.classList.add("disliked");
      likeIcon.classList.remove("liked"); // Remove like if already selected
    } else {
      dislikeIcon.classList.remove("disliked"); // Toggle off if clicked again
    }
  });
});
