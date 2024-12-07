window.onload = function () {
  // DOM Elements
  const messageContainer = document.getElementById("message-container");
  const levelNumberElement = document.querySelector(".level-number");
  const heroNameElement = document.querySelector(".superhero-name");
  const puzzleWrapperElement = document.querySelector(".completed-jigsaw-puzzle");
  const heroDetailsElement = document.getElementById("short-description");
  const readMoreLink = document.getElementById("read-more-link");
  const modal = document.getElementById("modal");
  const modalHeroName = document.getElementById("modal-hero-name");
  const modalFullDescription = document.getElementById("modal-full-description");
  const closeModal = document.getElementById("close-modal");
  const quitButton = document.querySelector(".quit-btn a");
  const nextButton = document.querySelector(".next-btn a");

  // Get level from query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const level = parseInt(urlParams.get("level")) || 1; // Default to level 1
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
        displayHeroDetails(heroData);
      })
      .catch((error) => {
        console.error("Error fetching hero data:", error);
        displayError("Failed to load hero data. Please try again later.");
      });
  }

  // Function to display an error message
  function displayError(message) {
    if (messageContainer) {
      messageContainer.innerHTML = message;
      messageContainer.style.color = "red";
    }
  }

  // Function to display hero details
  function displayHeroDetails(hero) {
    if (!hero) {
      displayError("No hero data found for this level.");
      return;
    }

    // Update level number
    if (levelNumberElement) levelNumberElement.textContent = level;

    // Update hero name
    if (heroNameElement) heroNameElement.textContent = hero.name;

    // Update hero image
    if (puzzleWrapperElement) {
      puzzleWrapperElement.innerHTML = `<img src="${hero.images.md}" alt="${hero.name}" style="width: 100%; height: auto;">`;
    }

    // Update hero short description
    if (heroDetailsElement) {
      // Limit summary to two lines using CSS class
      const shortDescription = `
        <strong>Full Name:</strong> ${hero.biography.fullName || "N/A"}<br>
        <strong>First Appearance:</strong> ${hero.biography.firstAppearance || "Unknown"}
      `;
      heroDetailsElement.innerHTML = shortDescription;
      heroDetailsElement.classList.add("two-lines");

      // Show full content in modal
      if (readMoreLink) {
        readMoreLink.addEventListener("click", function (e) {
          e.preventDefault();
          if (modalHeroName) modalHeroName.textContent = hero.name;

          if (modalFullDescription) {
            modalFullDescription.innerHTML = `
              <p><strong>Full Name:</strong> ${hero.biography.fullName || "N/A"}</p>
              <p><strong>Aliases:</strong> ${hero.biography.aliases.join(", ") || "N/A"}</p>
              <p><strong>Publisher:</strong> ${hero.biography.publisher || "N/A"}</p>
              <p><strong>Place of Birth:</strong> ${hero.biography.placeOfBirth || "N/A"}</p>
              <p><strong>First Appearance:</strong> ${hero.biography.firstAppearance || "Unknown"}</p>
              <p><strong>Alignment:</strong> ${hero.biography.alignment || "N/A"}</p>
              <h3>Power Stats:</h3>
              <ul>
                <li><strong>Intelligence:</strong> ${hero.powerstats.intelligence || "N/A"}</li>
                <li><strong>Strength:</strong> ${hero.powerstats.strength || "N/A"}</li>
                <li><strong>Speed:</strong> ${hero.powerstats.speed || "N/A"}</li>
                <li><strong>Durability:</strong> ${hero.powerstats.durability || "N/A"}</li>
                <li><strong>Power:</strong> ${hero.powerstats.power || "N/A"}</li>
                <li><strong>Combat:</strong> ${hero.powerstats.combat || "N/A"}</li>
              </ul>
              <h3>Appearance:</h3>
              <ul>
                <li><strong>Height:</strong> ${hero.appearance.height[1] || "N/A"}</li>
                <li><strong>Weight:</strong> ${hero.appearance.weight[1] || "N/A"}</li>
                <li><strong>Eye Color:</strong> ${hero.appearance.eyeColor || "N/A"}</li>
                <li><strong>Hair Color:</strong> ${hero.appearance.hairColor || "N/A"}</li>
              </ul>
            `;
          }

          if (modal) modal.style.display = "block";
        });
      }
    }

    // Close modal
    if (closeModal) {
      closeModal.addEventListener("click", function () {
        if (modal) modal.style.display = "none";
      });
    }

    // Close modal when clicking outside
    window.addEventListener("click", function (e) {
      if (e.target === modal && modal) {
        modal.style.display = "none";
      }
    });

    // Set up navigation buttons
    if (quitButton) quitButton.href = "./index.html";
    if (nextButton) {
      nextButton.addEventListener("click", function () {
        const nextLevel = level + 1;
        window.location.href = `./play.html?level=${nextLevel}`;
      });
    }
  }

  // Interactive Features: Sound, Info, Settings, and Like/Dislike
  function initializeInteractiveFeatures() {
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
      infoBox.textContent = "Hero information is displayed after you solve the puzzle.";
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
  }

  // Fetch hero data for the current level
  fetchHero();

  // Initialize interactive features
  initializeInteractiveFeatures();
};

