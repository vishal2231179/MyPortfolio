/* games bubble + modal */
const gameBubbleBtn = document.getElementById('gameBubbleBtn');
const gameMenu = document.getElementById('gameMenu');

gameBubbleBtn.addEventListener('click', () => {
  gameMenu.classList.toggle('open');
  gsap.fromTo(
    gameBubbleBtn,
    { rotate: 0 },
    { rotate: gameMenu.classList.contains('open') ? 90 : 0, duration: .4, ease: 'back.out(2)' }
  );
});

const gameModalOverlay = document.getElementById('gameModalOverlay');
const gameFrame = document.getElementById('gameFrame');
const gameModalClose = document.getElementById('gameModalClose');

function openGame(key) {
  // each game now lives in its own file, e.g. memory-match.html
  gameFrame.src = `${key}.html`;
  gameModalOverlay.classList.add('open');
  gameMenu.classList.remove('open');
}

function closeGame() {
  gameModalOverlay.classList.remove('open');
  gameFrame.src = '';
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
  if (e.key === 'Escape') closeGame();
});
