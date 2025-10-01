// DOM elements
const chatBubble = document.getElementById("chatBubble");
const chatPanelContainer = document.getElementById("chatPanelContainer");
const chatOverlay = document.getElementById("chatOverlay");
const closeBtn = document.getElementById("closeBtn");

// Toggle chat function
function toggleChat() {
  const isActive = chatPanelContainer.classList.contains("active");

  // Toggle classes
  chatPanelContainer.classList.toggle("active");
  chatOverlay.classList.toggle("active");

  // Toggle body scroll
  document.body.style.overflow = isActive ? "" : "hidden";
}

// Event listeners
chatBubble.addEventListener("click", toggleChat);
closeBtn.addEventListener("click", function (e) {
  e.stopPropagation(); // Critical fix
  toggleChat();
});
chatOverlay.addEventListener("click", toggleChat);

// Close on Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && chatPanelContainer.classList.contains("active")) {
    toggleChat();
  }
});
