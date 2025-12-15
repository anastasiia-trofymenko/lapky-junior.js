'use strict';
const refs = {
  burgerBtn: document.querySelector('.header-burger-btn'),
  modalMenu: document.querySelector('.header-modal-menu'),
  closeBtn: document.querySelector('.header-close-btn'),
  modalLinks: document.querySelectorAll('.header-modal-link'),
  modalBtn: document.querySelector('.header-modal-btn'),
  header: document.querySelector('.header'),
};

function openMenu() {
  refs.modalMenu.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  refs.modalMenu.classList.remove('is-open');
  document.body.style.overflow = '';
}

refs.burgerBtn.addEventListener('click', openMenu);

refs.closeBtn.addEventListener('click', closeMenu);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && refs.modalMenu.classList.contains('is-open')) {
    closeMenu();
  }
});

refs.modalLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

refs.modalBtn.addEventListener('click', closeMenu);

const desktopQuery = window.matchMedia('(min-width: 1440px)');

desktopQuery.addEventListener('change', e => {
  if (e.matches) {
    closeMenu();
  }
});


refs.header.addEventListener('click', e => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;

  const targetId = link.getAttribute('href');
  const targetEl = document.querySelector(targetId);
  if (!targetEl) return;

  e.preventDefault();

  const headerHeight = refs.header.offsetHeight;
  const targetPosition =
    targetEl.getBoundingClientRect().top + window.scrollY - headerHeight;

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth',
  });
});
