const bouton = document.querySelector('.bouton-menu');
const menu = document.getElementById('menu');
const liens = document.querySelectorAll('.menu a');
const sections = document.querySelectorAll('main section[id]');

bouton.addEventListener('click', () => {
  const ouvert = menu.classList.toggle('ouvert');
  bouton.setAttribute('aria-expanded', ouvert);
});

liens.forEach((lien) => {
  lien.addEventListener('click', () => {
    menu.classList.remove('ouvert');
    bouton.setAttribute('aria-expanded', 'false');
  });
});

const suivi = new IntersectionObserver((entrees) => {
  entrees.forEach((entree) => {
    if (entree.isIntersecting) {
      liens.forEach((lien) => {
        lien.classList.toggle('actif', lien.getAttribute('href') === '#' + entree.target.id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

const apparition = new IntersectionObserver((entrees) => {
  entrees.forEach((entree) => {
    if (entree.isIntersecting) {
      entree.target.classList.add('visible');
      apparition.unobserve(entree.target);
    }
  });
}, { threshold: 0.1 });

sections.forEach((section) => {
  suivi.observe(section);
  section.classList.add('cache');
  apparition.observe(section);
});

document.getElementById('annee').textContent = new Date().getFullYear();
