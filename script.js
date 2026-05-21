const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
toggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', isOpen);
});
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => {
  nav?.classList.remove('open');
  toggle?.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('show');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const glow = document.querySelector('.cursor-glow');
let glowFrame = 0;
let glowX = 0;
let glowY = 0;

const updateGlow = () => {
  glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
  glowFrame = 0;
};

if (glow && window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('pointermove', (e) => {
    glowX = e.clientX;
    glowY = e.clientY;

    if (!glowFrame) {
      glowFrame = window.requestAnimationFrame(updateGlow);
    }
  }, { passive: true });
}

document.querySelector('.contact-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  document.querySelector('.form-msg').textContent = 'Thank you! Your message is ready to be connected with your email/backend.';
  e.target.reset();
});
