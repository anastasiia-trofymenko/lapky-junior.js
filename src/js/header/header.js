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
