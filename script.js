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

document.querySelector('.contact-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;

  const response = await fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: {
      'Accept': 'application/json'
    }
  });

  if (response.ok) {
    Swal.fire({
      title: 'Message Sent!',
      text: 'We received your message and will contact you soon.',
      icon: 'success',
      confirmButtonText: 'Done',
      draggable: true
    });

    form.reset();

  } else {
    Swal.fire({
      title: 'Oops!',
      text: 'Something went wrong. Please try again.',
      icon: 'error',
      confirmButtonText: 'Try Again'
    });
  }
});
