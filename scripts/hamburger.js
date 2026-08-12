/* mobile nav */
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');

function setNav(open) {
  navList.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.textContent = open ? '✕' : '☰';
  document.body.style.overflow = open ? 'hidden' : '';
}

navToggle.addEventListener('click', () => {
  setNav(!navList.classList.contains('open'));
});

// close after picking a link
navList.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => setNav(false))
);

// close when tapping outside the menu
document.addEventListener('click', e => {
  if (!navList.classList.contains('open')) return;
  if (navList.contains(e.target) || navToggle.contains(e.target)) return;
  setNav(false);
});

// close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') setNav(false);
});

// if the viewport is resized past the mobile breakpoint, reset state
window.addEventListener('resize', () => {
  if (window.innerWidth > 760) setNav(false);
});
