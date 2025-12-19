function applyAboutControls(swiper) {
  const isMobile = window.innerWidth < 768;

  const nextEl = isMobile ? '.about-mob-next' : '.about-desk-next';
  const prevEl = isMobile ? '.about-mob-prev' : '.about-desk-prev';
  const pagEl  = isMobile ? '.about-mob-pagination' : '.about-desk-pagination';

  // Navigation
  swiper.params.navigation.nextEl = nextEl;
  swiper.params.navigation.prevEl = prevEl;
  swiper.navigation.destroy();
  swiper.navigation.init();
  swiper.navigation.update();

  // Pagination
  swiper.params.pagination.el = pagEl;
  swiper.pagination.destroy();
  swiper.pagination.init();
  swiper.pagination.render();
  swiper.pagination.update();
}

const aboutSwiper = new Swiper('.about-swiper', {
  slidesPerView: 1,
  spaceBetween: 0,
  speed: 600,

  // initial (any; will be replaced on init)
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

  breakpoints: {
    768: {},
    1440: {},
  },

  on: {
    init(swiper) {
      applyAboutControls(swiper);
    },
    breakpoint(swiper) {
      applyAboutControls(swiper);
    },
  },
});
