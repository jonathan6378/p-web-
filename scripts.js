const nav = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const links = [...document.querySelectorAll('.nav-links a')];
const sections = links.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);

const closeMenu = () => { toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('menu-open'); };
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') === 'true'; toggle.setAttribute('aria-expanded', String(!open)); nav.classList.toggle('menu-open', !open); });
links.forEach((link) => link.addEventListener('click', closeMenu));

const updateNav = () => {
  nav.classList.toggle('scrolled', window.scrollY > 16);
  const current = sections.findLast((section) => section.getBoundingClientRect().top <= 130) || sections[0];
  links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${current.id}`));
};
window.addEventListener('scroll', updateNav, { passive: true }); updateNav();

const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelector('#year').textContent = new Date().getFullYear();
const form = document.querySelector('.contact-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = form.querySelector('.form-message');
  if (!form.checkValidity()) { message.textContent = 'Please complete each field with a valid email address.'; form.reportValidity(); return; }
  message.textContent = 'Thanks — the form is ready to be connected to your preferred email service.';
  form.reset();
});
