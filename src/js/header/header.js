
const burgerBtn = document.querySelector('.header-burger-btn');
const modalMenu = document.querySelector('.header-modal-menu');
const closeBtn = document.querySelector('.header-close-btn');
const modalLinks = document.querySelectorAll('.header-modal-link');
const modalBtn = document.querySelector('.header-modal-btn');

if (!burgerBtn || !modalMenu || !closeBtn) {
  console.warn('Header modal elements not found');
}

function openMenu() {
  modalMenu.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  modalMenu.classList.remove('is-open');
  document.body.style.overflow = '';
}


burgerBtn.addEventListener('click', openMenu);


closeBtn.addEventListener('click', closeMenu);


modalMenu.addEventListener('click', e => {
  if (e.target === modalMenu) {
    closeMenu();
  }
});


document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modalMenu.classList.contains('is-open')) {
    closeMenu();
  }
});


modalLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

if (modalBtn) {
  modalBtn.addEventListener('click', closeMenu);
}

const desktopQuery = window.matchMedia('(min-width: 1440px)');

desktopQuery.addEventListener('change', e => {
  if (e.matches) {
    closeMenu();
  }
});
