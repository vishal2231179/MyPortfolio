const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

gsap.registerPlugin(ScrollTrigger);

if (prefersReducedMotion) {
  // respect the user's OS-level motion preference: skip intro/scroll
  // animations entirely instead of just relying on the CSS override
  gsap.set('.hero-title .line span, .hero-sub, .hero-btns, .hero-visual, .eyebrow, .reveal', { opacity: 1, y: 0, yPercent: 0 });
} else {
  gsap.set('.hero-title .line span', { yPercent: 110, display: 'inline-block' });
  gsap.set('.hero-sub, .hero-btns, .hero-visual, .eyebrow', { opacity: 0, y: 24 });

  const tl = gsap.timeline({ delay: .2 });
  tl.to('.hero-title .line span', { yPercent: 0, stagger: .12, duration: 1, ease: 'expo.out' })
    .to('#hero .hero-sub, #hero .hero-btns, #hero .hero-visual, #hero .eyebrow', { opacity: 1, y: 0, duration: .9, stagger: .1, ease: 'power3.out' }, '-=0.6');

  document.querySelectorAll('.reveal').forEach(el => {
    if (el.closest('#hero')) return;
    gsap.to(el, {
      opacity: 1, y: 0, duration: .9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });

  gsap.utils.toArray('.bento').forEach((el, i) => gsap.to(el, { delay: i * 0.05, duration: .9 }));
  gsap.utils.toArray('.skill-pill').forEach((el, i) => el.style.transitionDelay = (i * 0.03) + 's');
}

/* custom cursor + parallax blobs — only on devices with a real mouse,
   and only when the person hasn't asked for reduced motion */
if (hasFinePointer && !prefersReducedMotion) {
  const cur = document.getElementById('cur');
  let rafId = null;
  let lastEvent = null;

  function onMove(e) {
    lastEvent = e;
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      rafId = null;
      const { clientX: x, clientY: y } = lastEvent;
      gsap.to(cur, { x, y, duration: .25, ease: 'power3.out' });

      const nx = (x / window.innerWidth - 0.5);
      const ny = (y / window.innerHeight - 0.5);
      gsap.to('.blob1', { x: nx * 40, y: ny * 40, duration: 1 });
      gsap.to('.blob2', { x: -nx * 50, y: -ny * 30, duration: 1 });
      gsap.to('.blob3', { x: nx * 30, y: -ny * 40, duration: 1 });
    });
  }

  window.addEventListener('mousemove', onMove, { passive: true });

  document.querySelectorAll('a,button,.proj-card,.skill-pill,.bento').forEach(el => {
    el.addEventListener('mouseenter', () => cur.classList.add('big'));
    el.addEventListener('mouseleave', () => cur.classList.remove('big'));
  });
}
