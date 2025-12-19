import { getFeedbacks } from '../../api/feedbacks';
import Raty from 'raty-js';

import Swiper from 'swiper';
import 'swiper/css';

const listEl = document.getElementById('stories-list');

if (!listEl) {
  console.error('Element #stories-list not found');
}

/* ---------- Rating (Raty) ---------- */
function initRating() {
  document.querySelectorAll('.rating').forEach(el => {
    if (el.dataset.inited) return;

    const rate = Number(el.dataset.rate) || 0;

    new Raty(el, {
      readOnly: true,
      score: rate,
      half: true,
      starOn: './img/star-filled.svg',
      starOff: './img/star-outline.svg',
      starHalf: './img/star-half.svg',
    }).init();

    el.dataset.inited = 'true';
  });
}

/* ---------- Slide template ---------- */
function escapeHtml(str = '') {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function createSlide({ rate = 0, description = '', author = '' }) {
  const safeText = escapeHtml(description);
  const safeAuthor = escapeHtml(author);

  return `
    <li class="swiper-slide story-card">
      <div class="story-rating rating" data-rate="${rate}" aria-label="Оцінка ${rate} з 5"></div>
      <p class="story-text">${safeText}</p>
      <p class="story-author">${safeAuthor}</p>
    </li>
  `;
}

/* ---------- Swiper ---------- */
let swiperInstance = null;

function initSwiper() {
  if (swiperInstance) return;

  const SwiperCtor = window.Swiper || Swiper;
  if (!SwiperCtor) {
    console.error('Swiper is not available. Add Swiper via <script> or install via npm.');
    return;
  }

  swiperInstance = new SwiperCtor('.success-stories-swiper', {
    slidesPerView: 1,
    spaceBetween: 32,
    speed: 500,
    autoHeight: true,

    pagination: {
      el: '.slider-pagination',
      clickable: true,
      bulletClass: 'dot',
      bulletActiveClass: 'active',
    },

    navigation: {
      nextEl: '.slider-btn--next',
      prevEl: '.slider-btn--prev',
      disabledClass: 'is-disabled',
    },

    breakpoints: {
      768: { slidesPerView: 2, spaceBetween: 40 },
      1440: { slidesPerView: 2, spaceBetween: 80 },
    },
  });
}

/* ---------- Init ---------- */
async function initSuccessStories() {
  try {
    const data = await getFeedbacks({ page: 1, limit: 6 });

    const feedbacks =
      data?.results || data?.feedbacks || data?.data?.results || [];

    if (!Array.isArray(feedbacks) || feedbacks.length === 0) {
      console.error('No feedbacks found');
      return;
    }

    listEl.innerHTML = '';
    feedbacks.forEach(item => {
      listEl.insertAdjacentHTML('beforeend', createSlide(item));
    });

    initRating();
    initSwiper();
  } catch (error) {
    console.error('Failed to load feedbacks:', error);
  }
}

initSuccessStories();
