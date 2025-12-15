new Swiper('.swiper', {
  slidesPerView: 1,
  spaceBetween: 0,
  speed: 600,

  navigation: {
    nextEl: '.about-arrow-right',
    prevEl: '.about-arrow-left',
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
    breakpoints: {
      375: { slidesPerView: 1 },
      768: { slidesPerView: 1 },
      1440: { slidesPerView: 1 },
    },
  grabCursor: true,
  allowTouchMove: true,
  watchOverflow: true,
});
