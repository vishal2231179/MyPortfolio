/* games bubble + modal */
const gameBubbleBtn = document.getElementById('gameBubbleBtn');
const gameMenu = document.getElementById('gameMenu');

function setGameMenu(open) {
  gameMenu.classList.toggle('open', open);
  gameMenu.setAttribute('aria-hidden', String(!open));
  gameBubbleBtn.setAttribute('aria-expanded', String(open));
  if (window.gsap) {
    gsap.fromTo(gameBubbleBtn, { rotate: 0 }, { rotate: open ? 90 : 0, duration: .4, ease: 'back.out(2)' });
  }
}

gameBubbleBtn.addEventListener('click', () => setGameMenu(!gameMenu.classList.contains('open')));

document.addEventListener('click', e => {
  if (!gameMenu.classList.contains('open')) return;
  if (gameMenu.contains(e.target) || gameBubbleBtn.contains(e.target)) return;
  setGameMenu(false);
});

const gameModalOverlay = document.getElementById('gameModalOverlay');
const gameFrame = document.getElementById('gameFrame');
const gameModalClose = document.getElementById('gameModalClose');
let lastFocusedEl = null;

function openGame(key) {
  lastFocusedEl = document.activeElement;
  // each game lives in its own file, e.g. memory-match.html
  gameFrame.src = `${key}.html`;
  gameModalOverlay.classList.add('open');
  setGameMenu(false);
  document.body.style.overflow = 'hidden';
  gameModalClose.focus();
}

function closeGame() {
  gameModalOverlay.classList.remove('open');
  gameFrame.src = '';
  if (!chatPanelOpen()) document.body.style.overflow = '';
  if (lastFocusedEl) lastFocusedEl.focus();
}

// used so closing one modal doesn't accidentally re-enable scroll
// while the other modal (chat) is still open
function chatPanelOpen() {
  const panel = document.getElementById('chatPanelContainer');
  return panel && panel.classList.contains('open');
}

document.querySelectorAll('.game-item').forEach(btn =>
  btn.addEventListener('click', () => openGame(btn.dataset.game))
);
gameModalClose.addEventListener('click', closeGame);
gameModalOverlay.addEventListener('click', e => {
  if (e.target === gameModalOverlay) closeGame();
});

// each mini-game posts this message when its own "Close Game" button is clicked
window.addEventListener('message', e => {
  if (e.data === 'closeGameModal') closeGame();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && gameModalOverlay.classList.contains('open')) closeGame();
});
