gsap.registerPlugin(ScrollTrigger);

gsap.set('.hero-title .line span', {yPercent:110, display:'inline-block'});
gsap.set('.hero-sub, .hero-btns, .hero-visual, .eyebrow', {opacity:0, y:24});

const tl = gsap.timeline({delay:.2});
tl.to('.hero-title .line span', {yPercent:0, stagger:.12, duration:1, ease:'expo.out'})
  .to('#hero .hero-sub, #hero .hero-btns, #hero .hero-visual, #hero .eyebrow', {opacity:1,y:0, duration:.9, stagger:.1, ease:'power3.out'}, '-=0.6');

document.querySelectorAll('.reveal').forEach(el=>{
  if(el.closest('#hero')) return;
  gsap.to(el, {opacity:1, y:0, duration:.9, ease:'power3.out',
    scrollTrigger:{trigger:el, start:'top 88%'}});
});

/* stagger bento/pills/cards slightly */
gsap.utils.toArray('.bento').forEach((el,i)=> gsap.to(el,{delay:i*0.05, duration:.9}));
gsap.utils.toArray('.skill-pill').forEach((el,i)=> el.style.transitionDelay = (i*0.03)+'s');

/* custom cursor */
const cur = document.getElementById('cur');
window.addEventListener('mousemove', e=>{
  gsap.to(cur, {x:e.clientX, y:e.clientY, duration:.25, ease:'power3.out'});
});
document.querySelectorAll('a,button,.proj-card,.skill-pill,.bento').forEach(el=>{
  el.addEventListener('mouseenter', ()=>cur.classList.add('big'));
  el.addEventListener('mouseleave', ()=>cur.classList.remove('big'));
});

/* parallax blobs on mouse move */
window.addEventListener('mousemove', e=>{
  const x=(e.clientX/window.innerWidth-0.5), y=(e.clientY/window.innerHeight-0.5);
  gsap.to('.blob1',{x:x*40, y:y*40, duration:1});
  gsap.to('.blob2',{x:-x*50, y:-y*30, duration:1});
  gsap.to('.blob3',{x:x*30, y:-y*40, duration:1});
});
