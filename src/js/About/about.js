function applyAboutControls(swiper) {
  const isMobile = window.innerWidth < 768;

  swiper.params.navigation.nextEl = isMobile ? '.about-mob-next' : '.about-desk-next';
  swiper.params.navigation.prevEl = isMobile ? '.about-mob-prev' : '.about-desk-prev';

  swiper.navigation.destroy();
  swiper.navigation.init();
  swiper.navigation.update();

  swiper.params.pagination.el = isMobile ? '.about-mob-pagination' : '.about-desk-pagination';

  swiper.pagination.destroy();
  swiper.pagination.init();
  swiper.pagination.render();
  swiper.pagination.update();
}

const aboutSwiper = new Swiper('.about-swiper', {
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
