'use strict';

import { smoothScrollTo } from '../utils/scroll';

const heroBtn = document.querySelector('[data-scroll="hero"]');
const header = document.querySelector('.header');

function onHeroButtonClick(e) {
  e.preventDefault();

  const targetId = heroBtn.getAttribute('href');
  const targetEl = document.querySelector(targetId);

  if (!targetEl) return;

  const headerHeight = header?.offsetHeight || 0;
  smoothScrollTo(targetEl, headerHeight);
}

heroBtn?.addEventListener('click', onHeroButtonClick);
