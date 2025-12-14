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

  grabCursor: true,
  allowTouchMove: true,
  watchOverflow: true,
})