'use strict';

import { lockScroll, unlockScroll } from '../utils/scroll-lock';
import { smoothScrollTo } from '../utils/scroll';

const refs = {
  burgerBtn: document.querySelector('.header-burger-btn'),
  modalMenu: document.querySelector('.header-modal-menu'),
  closeBtn: document.querySelector('.header-close-btn'),
  header: document.querySelector('.header'),
};

let isMenuOpen = false;

function openMenu() {
  if (isMenuOpen) return;

  refs.modalMenu.classList.add('is-open');
  lockScroll();
  addModalListeners();
  isMenuOpen = true;
}

function closeMenu() {
  if (!isMenuOpen) return;

  refs.modalMenu.classList.remove('is-open');
  unlockScroll();
  removeModalListeners();
  isMenuOpen = false;
}

function addModalListeners() {
  document.addEventListener('keydown', onEscPress);
  document.addEventListener('click', onModalMenuClick);
}

function removeModalListeners() {
  document.removeEventListener('keydown', onEscPress);
  document.removeEventListener('click', onModalMenuClick);
}

document.addEventListener('click', onAnchorClick);

function onAnchorClick(e) {
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;

  const targetId = anchor.getAttribute('href');
  if (targetId === '#') return;

  const targetEl = document.querySelector(targetId);
  if (!targetEl) return;

  e.preventDefault();

  const headerHeight = refs.header?.offsetHeight || 0;
  smoothScrollTo(targetEl, headerHeight);
}

function onModalMenuClick(e) {
  const isInsideModal = e.target.closest('.header-modal-menu');
  if (!isInsideModal) return;

  const modalLink = e.target.closest('.header-modal-link');
  const modalBtn = e.target.closest('.header-modal-btn');
  const logoLink = e.target.closest('.icon-header-btn');

  if (modalLink || modalBtn || logoLink) {
    closeMenu();
  }
}

function onEscPress(e) {
  if (e.key === 'Escape') {
    closeMenu();
  }
}

refs.burgerBtn?.addEventListener('click', openMenu);
refs.closeBtn?.addEventListener('click', closeMenu);

const desktopQuery = window.matchMedia('(min-width: 1440px)');
desktopQuery.addEventListener('change', e => {
  if (e.matches) closeMenu();
});
