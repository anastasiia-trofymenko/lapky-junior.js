import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function initAboutSwiper() {
  const swiperEl = document.querySelector('.about-swiper');
  if (!swiperEl) return null;

  const mqMobile = window.matchMedia('(max-width: 767.98px)');

  const getControls = () => {
    const isMobile = mqMobile.matches;

    return {
      nextEl: isMobile ? '.about-mob-next' : '.about-desk-next',
      prevEl: isMobile ? '.about-mob-prev' : '.about-desk-prev',
      pagEl: isMobile ? '.about-mob-pagination' : '.about-desk-pagination',
    };
  };

  const aboutSwiper = new Swiper(swiperEl, {
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
      type: 'bullets',
    },

    grabCursor: true,
    allowTouchMove: true,
    watchOverflow: true,

    breakpoints: {
      768: {},
      1440: {},
    },
  });

  function updateControls() {
    if (!aboutSwiper || aboutSwiper.destroyed) return;

    const { nextEl, prevEl, pagEl } = getControls();

    const navSame =
      aboutSwiper.params.navigation?.nextEl === nextEl &&
      aboutSwiper.params.navigation?.prevEl === prevEl;

    const pagSame = aboutSwiper.params.pagination?.el === pagEl;

    if (navSame && pagSame) return;

    // --- Navigation ---
    const nextNode = document.querySelector(nextEl);
    const prevNode = document.querySelector(prevEl);

    if (nextNode && prevNode) {
      aboutSwiper.params.navigation = aboutSwiper.params.navigation || {};
      aboutSwiper.params.navigation.nextEl = nextEl;
      aboutSwiper.params.navigation.prevEl = prevEl;

      aboutSwiper.navigation.destroy();
      aboutSwiper.navigation.init();
      aboutSwiper.navigation.update();
    }

    // --- Pagination ---
    const pagNode = document.querySelector(pagEl);

    if (pagNode) {
      aboutSwiper.params.pagination = aboutSwiper.params.pagination || {};
      aboutSwiper.params.pagination.el = pagEl;

      aboutSwiper.pagination.destroy();
      aboutSwiper.pagination.init();
      aboutSwiper.pagination.render();
      aboutSwiper.pagination.update();
    }

    aboutSwiper.update();
  }

  requestAnimationFrame(updateControls);

  const mqHandler = () => updateControls();
  if (typeof mqMobile.addEventListener === 'function') {
    mqMobile.addEventListener('change', mqHandler);
  } else {
    mqMobile.addListener(mqHandler);
  }

  window.addEventListener('load', updateControls, { once: true });

  aboutSwiper._destroyAbout = () => {
    if (typeof mqMobile.removeEventListener === 'function') {
      mqMobile.removeEventListener('change', mqHandler);
    } else {
      mqMobile.removeListener(mqHandler);
    }
    aboutSwiper.destroy(true, true);
  };

  return aboutSwiper;
}

initAboutSwiper();
