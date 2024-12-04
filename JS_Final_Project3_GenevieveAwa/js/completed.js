document.addEventListener("DOMContentLoaded", () => {
  // Variables
  var urlParams = new URLSearchParams(window.location.search);
  var level = parseInt(urlParams.get("level")) || 1; // Default to level 1
  var hero = heroes[level]; // Get hero data for the current level using the heroes objects
  var levelNumberElement = document.querySelector(".level-number");
  var heroNameElement = document.querySelector(".superhero-name");
  var completedPuzzleElement = document.querySelector(".completed-jigsaw-puzzle");
  var heroDetailsElement = document.querySelector("#short-description");
  var readMoreLink = document.querySelector("#read-more-link");
  var modal = document.querySelector("#modal");
  var modalHeroName = document.querySelector("#modal-hero-name");
  var modalFullDescription = document.querySelector("#modal-full-description");
  var closeModal = document.querySelector("#close-modal");
  var backgroundMusic = new Audio("./sounds/background-music.mp3");
  var soundIcon = document.getElementById("sound-icon");
  var muteIcon = document.getElementById("mute-icon");
  var infoIcon = document.getElementById("info-icon");
  var infoBox = document.getElementById("info-box");
  var settingsIcon = document.getElementById("settings-icon");
  var settingsModal = document.getElementById("settings-modal");
  var overlay = document.getElementById("overlay");
  var darkModeToggle = document.getElementById("dark-mode-toggle");
  var closeSettings = document.getElementById("close-settings");
  var homeIcon = document.getElementById("home-icon");


  if (!hero) {
    alert("No data available for this level!");
    window.location.href = "./index.html"; // Redirect to the home page if hero data is missing (this also happens after last level)
    return;
  }


  // Update the level number
  if (levelNumberElement) {
    levelNumberElement.textContent = level;
  }


  // Update the hero name
  if (heroNameElement) {
    heroNameElement.textContent = hero.name;
  }


  // Update the hero image
  if (completedPuzzleElement) {
    completedPuzzleElement.innerHTML = `<img src="${hero.image}" alt="${hero.name}" style="width: 300px; height: 380px;">`;
  }


  // Short description
  var shortDescription = hero.description.slice(0, 100); // Show first 100 characters
  heroDetailsElement.textContent = shortDescription;

  // Set up Read More modal
  readMoreLink.addEventListener("click", (e) => {
    e.preventDefault();
    modalHeroName.textContent = hero.name;
    modalFullDescription.textContent = hero.description;
    modal.style.display = "block"; // Show the modal with the full hero description
  });


  // Close modal
  closeModal.addEventListener("click", () => {
    modal.style.display = "none"; // Hide the modal when the close button is clicked
  });


  // Close modal when clicking outside the modal content
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none"; // Hide the modal when clicking outside of it
    }
  });


  // Quit and Next button functionality
  document.querySelector(".quit-btn a").href = "./index.html"; // Quit button redirects to the home page
  document.querySelector(".next-btn a").addEventListener("click", () => {
    var nextLevel = level + 1; // Increment the level for the next hero
    window.location.href = `./play.html?level=${nextLevel}`; // Redirect to the next level's page
  });


  // Sound Control
  backgroundMusic.loop = true; // Ensure the background music loops

  soundIcon.addEventListener("click", () => {
    backgroundMusic.play(); // Play music
    soundIcon.style.display = "none"; 
    muteIcon.style.display = "block"; 
  });


  muteIcon.addEventListener("click", () => {
    backgroundMusic.pause(); // Pause music
    muteIcon.style.display = "none"; 
    soundIcon.style.display = "block"; 
  });


  // Info Icon
  if (!infoBox) {
    // Create the info box dynamically if it doesn't already exist
    infoBox = document.createElement("div");
    infoBox.id = "info-box";
    infoBox.textContent = "Try and guess the superhero's name from the unfinished puzzle.";
    document.body.appendChild(infoBox);
  }


  // Position the info box relative to the info icon
  var positionInfoBox = () => {
    var iconRect = infoIcon.getBoundingClientRect();
    infoBox.style.top = `${iconRect.bottom + 25}px`; // Position below the icon
    infoBox.style.left = `${iconRect.left + iconRect.width / 2}px`; // Center align
    infoBox.style.transform = "translateX(-50%)"; // Adjust position to be centered
  };


  infoIcon.addEventListener("click", () => {
    if (infoBox.style.display === "none" || infoBox.style.display === "") {
      positionInfoBox(); // Calculate and set the position of the info box
      infoBox.style.display = "block"; 
    } else {
      infoBox.style.display = "none"; 
    }
  });


  document.addEventListener("click", (e) => {
    if (e.target !== infoIcon && e.target !== infoBox) {
      infoBox.style.display = "none"; // Hide the info box if clicking outside of it
    }
  });


  // Settings Icon
  settingsIcon.addEventListener("click", () => {
    settingsModal.style.display = "block"; 
    overlay.style.display = "block"; 
  });


  closeSettings.addEventListener("click", () => {
    settingsModal.style.display = "none"; 
    overlay.style.display = "none"; 
  });


  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode"); // Toggle dark mode class on the body
    darkModeToggle.textContent = document.body.classList.contains("dark-mode")
      ? "Toggle Light Mode" // Update button text for light mode
      : "Toggle Dark Mode"; // Update button text for dark mode
  });


  overlay.addEventListener("click", () => {
    settingsModal.style.display = "none"; 
    overlay.style.display = "none"; 
  });


  // Home Icon
  homeIcon.addEventListener("click", () => {
    window.location.href = "./index.html"; 
  });
});

