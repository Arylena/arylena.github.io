const obs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach((el) => obs.observe(el));

const nav = document.querySelector('.nav-figma');
let lastScrollY = window.scrollY;
let navHovered = false;

function updateNavScrolledState() {
  if (!nav) return;
  nav.classList.toggle('is-scrolled', window.scrollY > 8);
}

function showNav() {
  if (nav) nav.classList.remove('is-hidden');
}

function hideNav() {
  if (nav) nav.classList.add('is-hidden');
}

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  if (!nav) return;
  updateNavScrolledState();

  if (currentScrollY <= 8) {
    showNav();
    lastScrollY = currentScrollY;
    return;
  }

  if (currentScrollY > lastScrollY + 2 || !navHovered) {
    hideNav();
  }

  lastScrollY = currentScrollY;
}, { passive: true });

document.addEventListener('mousemove', (event) => {
  if (!nav || window.scrollY <= 8) return;
  if (navHovered) return;
  if (event.clientY <= 28) showNav();
  else hideNav();
});

if (nav) {
  nav.addEventListener('mouseenter', () => {
    navHovered = true;
    showNav();
  });

  nav.addEventListener('mouseleave', () => {
    navHovered = false;
    if (window.scrollY > 8) hideNav();
  });
}

updateNavScrolledState();
