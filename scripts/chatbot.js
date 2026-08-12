/* chat bubble */
const chatBubbleBtn = document.getElementById('chatBubbleBtn');
const chatOverlay = document.getElementById('chatOverlay');
const chatPanelContainer = document.getElementById('chatPanelContainer');
const chatCloseBtn = document.getElementById('chatCloseBtn');

function openChat() {
  chatOverlay.classList.add('open');
  chatPanelContainer.classList.add('open');
}

function closeChat() {
  chatOverlay.classList.remove('open');
  chatPanelContainer.classList.remove('open');
}

chatBubbleBtn.addEventListener('click', openChat);
chatCloseBtn.addEventListener('click', closeChat);
chatOverlay.addEventListener('click', closeChat);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeChat();
});
