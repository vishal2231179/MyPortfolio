// Game Variables
let canvas, ctx;
let gameRunning = false;
let gamePaused = false;
let score = 0;
let animationId;
let player = {
  x: 0,
  y: 0,
  width: 50,
  height: 50,
  speed: 5,
};
let items = [];
let keys = {};

// Image Assets
const skillIcons = {
  HTML: new Image(),
  CSS: new Image(),
  JS: new Image(),
  Figma: new Image(),
  Python: new Image(),
  "UX Research": new Image(),
  Wireframing: new Image(),
  Prototyping: new Image(),
  "User Persona": new Image(),
  Collaboration: new Image(),
};
const bugIcon = new Image();
const playerIcon = new Image();

// Initialize Game
function initGame() {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  // Set canvas dimensions
  canvas.width = canvas.offsetWidth;
  canvas.height = Math.min(400, window.innerHeight * 0.6);

  // Player initial position
  player.x = canvas.width / 2 - player.width / 2;
  player.y = canvas.height - player.height - 10;

  // Load images
  skillIcons["HTML"].src = "html.png";
  skillIcons["CSS"].src = "css.png";
  skillIcons["JS"].src = "js.png";
  skillIcons["Figma"].src = "figma.png";
  skillIcons["Python"].src = "python.png";
  skillIcons["UX Research"].src = "uxResearch.png";
  skillIcons["Wireframing"].src = "wireframing.png";
  skillIcons["Prototyping"].src = "prototyping.png";
  skillIcons["User Persona"].src = "userPersona.png";
  skillIcons["Collaboration"].src = "collaboration.png";
  bugIcon.src = "web.png";
  playerIcon.src = "Profile.jpg";

  // Event Listeners
  window.addEventListener("keydown", keyDown);
  window.addEventListener("keyup", keyUp);

  // Mobile Controls
  document
    .getElementById("mobileLeftBtn")
    .addEventListener("touchstart", () => (keys["ArrowLeft"] = true));
  document
    .getElementById("mobileLeftBtn")
    .addEventListener("touchend", () => (keys["ArrowLeft"] = false));
  document
    .getElementById("mobileRightBtn")
    .addEventListener("touchstart", () => (keys["ArrowRight"] = true));
  document
    .getElementById("mobileRightBtn")
    .addEventListener("touchend", () => (keys["ArrowRight"] = false));

  // Start Game
  resetGame();
  gameLoop();
}

// Game Loop
function gameLoop() {
  if (gamePaused) {
    drawPaused();
    animationId = requestAnimationFrame(gameLoop);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move Player
  if (keys["ArrowLeft"] && player.x > 0) player.x -= player.speed;
  if (keys["ArrowRight"] && player.x < canvas.width - player.width)
    player.x += player.speed;

  // Draw Player
  ctx.drawImage(playerIcon, player.x, player.y, player.width, player.height);

  // Generate Items
  if (Math.random() < 0.02) {
    createItem();
  }

  // Update and Draw Items
  updateItems();

  // Draw Score
  document.getElementById("scoreDisplay").textContent = `Score: ${score}`;

  animationId = requestAnimationFrame(gameLoop);
}

function createItem() {
  const isSkill = Math.random() > 0.3;
  const skillTypes = Object.keys(skillIcons);
  const randomSkill = skillTypes[Math.floor(Math.random() * skillTypes.length)];

  items.push({
    x: Math.random() * (canvas.width - 40),
    y: -40,
    width: 40,
    height: 40,
    type: isSkill ? "skill" : "bug",
    skillType: randomSkill,
    speed: 2 + Math.random() * 3,
  });
}

function updateItems() {
  for (let i = items.length - 1; i >= 0; i--) {
    const item = items[i];
    item.y += item.speed;

    // Draw item
    if (item.type === "skill") {
      ctx.drawImage(
        skillIcons[item.skillType],
        item.x,
        item.y,
        item.width,
        item.height
      );
    } else {
      ctx.drawImage(bugIcon, item.x, item.y, item.width, item.height);
    }

    // Check collision
    if (isColliding(player, item)) {
      if (item.type === "skill") {
        score += 10;
      } else {
        score -= 5;
      }
      items.splice(i, 1);
      continue;
    }

    // Remove if out of screen
    if (item.y > canvas.height) {
      items.splice(i, 1);
    }
  }
}

function isColliding(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function drawPaused() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.font = "30px Josefin Sans";
  ctx.textAlign = "center";
  ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2);
  ctx.textAlign = "left";
}

function keyDown(e) {
  keys[e.key] = true;
}

function keyUp(e) {
  keys[e.key] = false;
}

function resetGame() {
  score = 0;
  items = [];
  gameRunning = true;
  gamePaused = false;
  document.getElementById("scoreDisplay").textContent = `Score: ${score}`;
  document.getElementById("pauseBtn").textContent = "⏸";
}

function togglePause() {
  gamePaused = !gamePaused;
  document.getElementById("pauseBtn").textContent = gamePaused ? "▶" : "⏸";
}

function closeGame() {
  cancelAnimationFrame(animationId);
  document.getElementById("gameModal").style.display = "none";
  gameRunning = false;
}

function startGame() {
  document.getElementById("gameModal").style.display = "flex";
  if (!gameRunning) {
    initGame();
  }
}

// Event Listeners
document.getElementById("pauseBtn").addEventListener("click", togglePause);
document.getElementById("closeB").addEventListener("click", closeGame);
document.getElementById("restartBtn").addEventListener("click", resetGame);
document.getElementById("gameTrigger").addEventListener("click", startGame);

// Handle window resize
window.addEventListener("resize", function () {
  if (gameRunning) {
    canvas.width = canvas.offsetWidth;
    canvas.height = Math.min(400, window.innerHeight * 0.6);
    player.x = canvas.width / 2 - player.width / 2;
    player.y = canvas.height - player.height - 10;
  }
});
