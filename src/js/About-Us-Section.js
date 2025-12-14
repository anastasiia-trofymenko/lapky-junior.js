import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiper = new Swiper('.image-wrapper', {
  modules: [Navigation, Pagination],
  slidesPerView: 1,
  spaceBetween: 24,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    disabledClass: 'swiper-button-disabled',
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  grabCursor: true,
});