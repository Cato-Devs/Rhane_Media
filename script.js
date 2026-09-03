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

// ===== Contact form — sends to rhanemediake@gmail.com via Formspree =====
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!name || !email) {
    formNote.textContent = 'Please fill in your name and email.';
    formNote.style.color = '#ff0a6c';
    return;
  }

  formNote.textContent = 'Sending...';
  formNote.style.color = '#e034ea';

  fetch('https://formspree.io/f/meaqkwbq', {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
    body: new FormData(contactForm)
  })
    .then(response => {
      if (response.ok) {
        formNote.textContent = `Thanks, ${name.split(' ')[0]} — your response has been received.`;
        formNote.style.color = '#e034ea';
        contactForm.reset();
      } else {
        formNote.textContent = 'Something went wrong — please try again or email us directly.';
        formNote.style.color = '#ff0a6c';
      }
    })
    .catch(() => {
      formNote.textContent = 'Something went wrong — please try again or email us directly.';
      formNote.style.color = '#ff0a6c';
    });
});

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();
