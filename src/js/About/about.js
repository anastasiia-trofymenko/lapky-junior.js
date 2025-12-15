new Swiper('.aboutSwiper', {
  slidesPerView: 1,
  navigation: {
    nextEl: '.about-arrow-right',
    prevEl: '.about-arrow-left',
  },
  pagination: {
    el: '.aboutPagination',
    clickable: true,
  },
});
