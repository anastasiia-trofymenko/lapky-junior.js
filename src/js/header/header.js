// 'use strict';

// import { list } from 'postcss';
// import { lockScroll, unlockScroll, smoothScrollTo } from '../utils/scroll-lock';

// const refs = {
//   burgerBtn: document.querySelector('.header-burger-btn'),
//   modalMenu: document.querySelector('.header-modal-menu'),
//   closeBtn: document.querySelector('.header-close-btn'),
//   modalLinks: document.querySelectorAll('.header-modal-link'),
//   modalBtn: document.querySelector('.header-modal-btn'),
//   header: document.querySelector('.header'),
// };

// function openMenu() {
//   refs.modalMenu.classList.add('is-open');
//   lockScroll();
// }

// function closeMenu() {
//   refs.modalMenu.classList.remove('is-open');
//   unlockScroll();
// }

// refs.burgerBtn.addEventListener('click', openMenu);

// refs.closeBtn.addEventListener('click', closeMenu);

// function addModalListeners() {
//   document.addEventListener('keydown', onEscPress);
//   document.addEventListener('click', onAnchorClick);

//   refs.modalLinks.forEach(link => {
//     link.addEventListener('click', closeMenu);
//   });

//   refs.modalBtn.addEventListener('click', closeMenu);
// }

// document.addEventListener('keydown', e => {
//   if (e.key === 'Escape' && refs.modalMenu.classList.contains('is-open')) {
//     closeMenu();
//   }
// });

// function removeModalListener() {
//   document.removeEventListener('keydown', onEscPress);
//   document.removeEventListener('click', onAnchorClick);

//   refs.modalLinks.forEach(link => link.removeEventListener('click', closeMenu));

//   refs.modalBtn.removeEventListener('click', closeMenu);
// }

// const desktopQuery = window.matchMedia('(min-width: 1440px)');

// desktopQuery.addEventListener('change', e => {
//   if (e.matches) {
//     closeMenu();
//   }
// });

// document.addEventListener('click', e => {
//   const logoLink = e.target.closest('.icon-header-btn');
//   if (!logoLink) return;

//   refs.modalMenu?.classList.remove('is-open');
//   unlockScroll();
// });

// document.addEventListener('click', e => {
//   const link = e.target.closest('a[href^="#"]');
//   if (!link) return;

//   const targetId = link.getAttribute('href');
//   if (targetId === '#') return;

//   const targetEl = document.querySelector(targetId);
//   if (!targetEl) return;

//   e.preventDefault();

//   const headerHeight = refs.header?.offsetHeight || 0;

//   smoothScrollTo(targetEl, headerHeight);

//   unlockScroll();
// });

'use strict';

import { lockScroll, unlockScroll, smoothScrollTo } from '../utils/scroll-lock';

const refs = {
  burgerBtn: document.querySelector('.header-burger-btn'),
  modalMenu: document.querySelector('.header-modal-menu'),
  closeBtn: document.querySelector('.header-close-btn'),
  modalLinks: document.querySelectorAll('.header-modal-link'),
  modalBtn: document.querySelector('.header-modal-btn'),
  header: document.querySelector('.header'),
};

/* =========================
   OPEN / CLOSE
========================= */

function openMenu() {
  if (refs.modalMenu.classList.contains('is-open')) return;

  refs.modalMenu.classList.add('is-open');
  lockScroll();
  addModalListeners();
}

function closeMenu() {
  if (!refs.modalMenu.classList.contains('is-open')) return;

  refs.modalMenu.classList.remove('is-open');
  unlockScroll();
  removeModalListeners();
}

/* =========================
   LISTENERS MANAGEMENT
========================= */

function addModalListeners() {
  document.addEventListener('keydown', onEscPress);
  document.addEventListener('click', onModalClick);
}

function removeModalListeners() {
  document.removeEventListener('keydown', onEscPress);
  document.removeEventListener('click', onModalClick);
}

/* =========================
   HANDLERS
========================= */

function onEscPress(e) {
  if (e.key !== 'Escape') return;
  closeMenu();
}

function onModalClick(e) {
  const modalLink = e.target.closest('.header-modal-link');
  const modalBtn = e.target.closest('.header-modal-btn');
  const logoLink = e.target.closest('.icon-header-btn');

  if (modalLink || modalBtn || logoLink) {
    closeMenu();
  }

  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;

  const targetId = anchor.getAttribute('href');
  if (targetId === '#') return;

  const targetEl = document.querySelector(targetId);
  if (!targetEl) return;

  e.preventDefault();

  const headerHeight = refs.header?.offsetHeight || 0;
  smoothScrollTo(targetEl, headerHeight);

  closeMenu();
}

/* =========================
   STATIC LISTENERS
========================= */

refs.burgerBtn?.addEventListener('click', openMenu);
refs.closeBtn?.addEventListener('click', closeMenu);

const desktopQuery = window.matchMedia('(min-width: 1440px)');
desktopQuery.addEventListener('change', e => {
  if (e.matches) closeMenu();
});
