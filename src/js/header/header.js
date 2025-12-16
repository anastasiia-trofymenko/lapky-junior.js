'use strict';

import {
  lockScroll,
  unlockScroll,
  smoothScrollTo,
} from '../utils/scroll-lock';

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
  lockScroll();
}

function closeMenu() {
  refs.modalMenu.classList.remove('is-open');
  unlockScroll();
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

document.addEventListener('click', e => {
  const logoLink = e.target.closest('.icon-header-btn');
  if (!logoLink) return;

  refs.modalMenu?.classList.remove('is-open');
  unlockScroll();
});

document.addEventListener('click', e => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;

  const targetId = link.getAttribute('href');
  if (targetId === '#') return;

  const targetEl = document.querySelector(targetId);
  if (!targetEl) return;

  e.preventDefault();

  const headerHeight = refs.header?.offsetHeight || 0;

  smoothScrollTo(targetEl, headerHeight);

  unlockScroll();
});
