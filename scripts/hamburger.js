/* mobile nav */
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');

navToggle.addEventListener('click', () => navList.classList.toggle('open'));

navList.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navList.classList.remove('open'))
);
