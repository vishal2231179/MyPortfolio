const games = [
  { name: "Memory Match", url: "memory-match.html" },
  { name: "Sliding Puzzle", url: "sliding-puzzle.html" },
  { name: "Tic-Tac-Toe", url: "tic-tac-toe.html" },
  { name: "Trivia Quiz", url: "trivia-quiz.html" },
  { name: "Typing Test", url: "typing-test.html" },
];

// DOM elements
const bubbleContainer = document.querySelector(".bubble-container");
const mainBubble = document.getElementById("mainBubble");
const gameButtonsContainer = document.getElementById("gameButtons");
let isOpen = false;
let isDragging = false;
let startX, startY, initialLeft, initialTop;

// Create game buttons with perfect circular layout
function createGameButtons() {
  gameButtonsContainer.innerHTML = "";

  // Responsive radius calculation
  const radius = Math.min(
    Math.max(window.innerWidth, window.innerHeight) * 0.35,
    100
  );

  games.forEach((game, index) => {
    const angle = (index * 2 * Math.PI) / games.length - Math.PI / 2; // Start from top
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    const button = document.createElement("div");
    button.className = "game-button";
    button.textContent = game.name;
    button.style.transform = `translate(calc(0% + ${x}px), calc(0% + ${y}px))`;

    // Universal click/touch handler for game buttons
    const handleGameSelect = (e) => {
      e.stopPropagation();
      e.preventDefault();
      window.location.href = game.url;
    };

    button.addEventListener("click", handleGameSelect);
    button.addEventListener("touchend", handleGameSelect);

    gameButtonsContainer.appendChild(button);
  });
}

// Toggle game buttons
function toggleGameButtons() {
  if (isDragging) return;

  if (isOpen) {
    hideGameButtons();
  } else {
    showGameButtons();
  }
}

function showGameButtons() {
  isOpen = true;
  gameButtonsContainer.style.width = "200%";
  gameButtonsContainer.style.height = "200%";

  document.querySelectorAll(".game-button").forEach((btn, i) => {
    setTimeout(() => {
      btn.style.opacity = "1";
      btn.style.transform = btn.style.transform.replace(")", ") scale(1)");
      btn.style.pointerEvents = "auto"; // Enable clicking/touching
    }, i * 50);
  });
}

function hideGameButtons() {
  document.querySelectorAll(".game-button").forEach((btn) => {
    btn.style.opacity = "0";
    btn.style.transform = btn.style.transform.replace(")", ") scale(0.5)");
    btn.style.pointerEvents = "none"; // Disable clicking/touching
  });

  setTimeout(() => {
    gameButtonsContainer.style.width = "0";
    gameButtonsContainer.style.height = "0";
    isOpen = false;
  }, 300);
}

// Universal interaction handlers
function handleInteractionStart(e) {
  e.preventDefault();
  isDragging = false;

  const clientX = e.clientX || (e.touches && e.touches[0].clientX);
  const clientY = e.clientY || (e.touches && e.touches[0].clientY);

  if (!clientX || !clientY) return;

  initialLeft = bubbleContainer.offsetLeft;
  initialTop = bubbleContainer.offsetTop;
  startX = clientX;
  startY = clientY;

  document.body.style.userSelect = "none";
}

function handleInteractionMove(e) {
  if (!startX) return;

  const clientX = e.clientX || (e.touches && e.touches[0].clientX);
  const clientY = e.clientY || (e.touches && e.touches[0].clientY);

  if (!clientX || !clientY) return;

  // Different thresholds for touch vs mouse
  const threshold = e.touches ? 10 : 5;

  if (
    !isDragging &&
    (Math.abs(clientX - startX) > threshold ||
      Math.abs(clientY - startY) > threshold)
  ) {
    isDragging = true;
    hideGameButtons();
  }

  if (isDragging) {
    bubbleContainer.style.left = `${initialLeft + clientX - startX}px`;
    bubbleContainer.style.top = `${initialTop + clientY - startY}px`;
  }
}

function handleInteractionEnd(e) {
  if (!startX) return;

  if (isDragging) {
    hideGameButtons();
  } else {
    // Only toggle if it was a quick tap/click
    toggleGameButtons();
  }

  startX = null;
  document.body.style.userSelect = "";
}

// Event listeners for all devices
mainBubble.addEventListener("mousedown", handleInteractionStart);
mainBubble.addEventListener("touchstart", handleInteractionStart, {
  passive: false,
});

document.addEventListener("mousemove", handleInteractionMove);
document.addEventListener("touchmove", handleInteractionMove, {
  passive: false,
});

document.addEventListener("mouseup", handleInteractionEnd);
document.addEventListener("touchend", handleInteractionEnd);

// Close when clicking/touching outside
document.addEventListener("click", (e) => {
  if (!bubbleContainer.contains(e.target)) {
    hideGameButtons();
  }
});

document.addEventListener(
  "touchstart",
  (e) => {
    if (!bubbleContainer.contains(e.target)) {
      hideGameButtons();
    }
  },
  { passive: true }
);

// Handle window resize
function handleResize() {
  if (isOpen) {
    createGameButtons();
  }
}

// Initialize
function init() {
  createGameButtons();
  mainBubble.style.cursor = "grab";
  mainBubble.style.touchAction = "none";
  window.addEventListener("resize", handleResize);
  // Ensure buttons are not clickable on initialization
  document.querySelectorAll(".game-button").forEach((btn) => {
    btn.style.pointerEvents = "none";
  });
}

init();
