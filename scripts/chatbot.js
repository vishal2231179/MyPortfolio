/* chat bubble */
const chatBubbleBtn = document.getElementById('chatBubbleBtn');
const chatOverlay = document.getElementById('chatOverlay');
const chatPanelContainer = document.getElementById('chatPanelContainer');
const chatCloseBtn = document.getElementById('chatCloseBtn');
let lastFocusedChatEl = null;

function isGameModalOpen() {
  const overlay = document.getElementById('gameModalOverlay');
  return overlay && overlay.classList.contains('open');
}

function openChat() {
  lastFocusedChatEl = document.activeElement;
  chatOverlay.classList.add('open');
  chatPanelContainer.classList.add('open');
  chatBubbleBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  chatCloseBtn.focus();
}

function closeChat() {
  chatOverlay.classList.remove('open');
  chatPanelContainer.classList.remove('open');
  chatBubbleBtn.setAttribute('aria-expanded', 'false');
  if (!isGameModalOpen()) document.body.style.overflow = '';
  if (lastFocusedChatEl) lastFocusedChatEl.focus();
}

chatBubbleBtn.addEventListener('click', openChat);
chatCloseBtn.addEventListener('click', closeChat);
chatOverlay.addEventListener('click', closeChat);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && chatPanelContainer.classList.contains('open')) closeChat();
});
