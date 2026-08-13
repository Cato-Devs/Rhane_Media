// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Mobile: tap "Services" to expand its submenu instead of navigating away
const dropdownParent = document.querySelector('.has-dropdown');
const dropdownLink = dropdownParent.querySelector('a');

dropdownLink.addEventListener('click', (e) => {
  if (window.innerWidth <= 760) {
    e.preventDefault();
    dropdownParent.classList.toggle('is-open');
  }
});

// Close mobile menu after choosing a link
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 760 && link !== dropdownLink) {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// ===== Sticky header shadow on scroll =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 10 ? '0 8px 24px rgba(0,0,0,0.35)' : 'none';
}, { passive: true });

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

// ===== Aperture blades: subtle response to cursor on hero =====
const apertureBlades = document.getElementById('apertureBlades');
const heroVisual = document.querySelector('.hero__visual');
if (apertureBlades && heroVisual && window.matchMedia('(hover: hover)').matches) {
  heroVisual.addEventListener('mousemove', (e) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    apertureBlades.style.transform = `rotate(${x * 18}deg)`;
  });
  heroVisual.addEventListener('mouseleave', () => {
    apertureBlades.style.transform = '';
  });
}

// ===== Contact form (frontend only — no backend wired up yet) =====
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!name || !email) {
    formNote.textContent = 'Please fill in your name and email.';
    formNote.style.color = '#e2a63b';
    return;
  }

  // No backend connected yet — this just confirms the form works.
  // Wire this up to your email service, form endpoint, or CRM later.
  formNote.textContent = `Thanks, ${name.split(' ')[0]} — your response has been received.`;
  formNote.style.color = '#1f9b91';
  contactForm.reset();
});

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();
