import { heroes } from "./heros.js";

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const level = parseInt(urlParams.get("level")) || 1; // Default to level 1
  const hero = heroes[level]; // Get hero data for the current level

  if (!hero) {
    alert("No data available for this level!");
    window.location.href = "./index.html";
    return;
  }

  // Update the level number
  const levelNumberElement = document.querySelector(".level-number");
  if (levelNumberElement) levelNumberElement.textContent = level;

  // Update the hero name
  const heroNameElement = document.querySelector(".superhero-name");
  if (heroNameElement) heroNameElement.textContent = hero.name;

  // Update the hero image
  const completedPuzzleElement = document.querySelector(".completed-jigsaw-puzzle");
  if (completedPuzzleElement) {
    completedPuzzleElement.innerHTML = `<img src="${hero.image}" alt="${hero.name}" style="width: 100%; height: auto;">`;
  }

  // Update the hero short description and enable "Read More"
  const heroDetailsElement = document.querySelector("#short-description");
  const readMoreLink = document.querySelector("#read-more-link");
  const modal = document.querySelector("#modal");
  const modalHeroName = document.querySelector("#modal-hero-name");
  const modalFullDescription = document.querySelector("#modal-full-description");
  const closeModal = document.querySelector("#close-modal");

  // Short description
  const shortDescription = hero.description.slice(0, 100); // Show first 100 characters
  heroDetailsElement.textContent = shortDescription;

  // Set up "Read More" modal
  readMoreLink.addEventListener("click", (e) => {
    e.preventDefault();
    modalHeroName.textContent = hero.name;
    modalFullDescription.textContent = hero.description;
    modal.style.display = "block";
  });

  // Close modal
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close modal when clicking outside the modal content
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Quit and Next button functionality
  document.querySelector(".quit-btn a").href = "./index.html";
  document.querySelector(".next-btn a").addEventListener("click", () => {
    const nextLevel = level + 1;
    window.location.href = `./play.html?level=${nextLevel}`;
  });


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

});
