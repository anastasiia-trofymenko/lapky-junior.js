import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

function applyAboutControls(swiper) {
  const isMobile = window.matchMedia('(max-width: 767.98px)').matches;

  const nextEl = isMobile ? '.about-mob-next' : '.about-desk-next';
  const prevEl = isMobile ? '.about-mob-prev' : '.about-desk-prev';
  const pagEl  = isMobile ? '.about-mob-pagination' : '.about-desk-pagination';

  if (
    swiper.params.navigation?.nextEl === nextEl &&
    swiper.params.navigation?.prevEl === prevEl &&
    swiper.params.pagination?.el === pagEl
  ) {
    return;
  }

  swiper.params.navigation = swiper.params.navigation || {};
  swiper.params.navigation.nextEl = nextEl;
  swiper.params.navigation.prevEl = prevEl;

  swiper.navigation.destroy();

  if (document.querySelector(nextEl) && document.querySelector(prevEl)) {
    swiper.navigation.init();
    swiper.navigation.update();
  }

  swiper.params.pagination = swiper.params.pagination || {};
  swiper.params.pagination.el = pagEl;

  swiper.pagination.destroy();

  if (document.querySelector(pagEl)) {
    swiper.pagination.init();
    swiper.pagination.render();
    swiper.pagination.update();
  }
}

const aboutSwiper = new Swiper('.about-swiper', {
  modules: [Navigation, Pagination],

  slidesPerView: 1,
  spaceBetween: 0,
  speed: 600,

  navigation: {
    nextEl: '.about-mob-next',
    prevEl: '.about-mob-prev',
  },

  pagination: {
    el: '.about-mob-pagination',
    clickable: true,
  },

  grabCursor: true,
  allowTouchMove: true,
  watchOverflow: true,

  breakpoints: { 768: {}, 1440: {} },

  on: {
    init(swiper) { applyAboutControls(swiper); },
    breakpoint(swiper) { applyAboutControls(swiper); },
  },
});
