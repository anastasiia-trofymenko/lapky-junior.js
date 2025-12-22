import { lockScroll, unlockScroll } from '../utils/scroll-lock';
import { createOrder } from '../../api/orders.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const backdrop = document.querySelector('[data-order-backdrop]');
  const modal = document.querySelector('[data-order-modal]');
  const closeBtn = document.querySelector('.order-modal__close');
  const form = document.getElementById('orderForm');
  const petsSection = document.getElementById('pets-list-section');

  if (!backdrop || !modal || !closeBtn || !form || !petsSection) return;

  let currentAnimalId = null;

  function closeModal() {
    backdrop.classList.remove('is-open');
    unlockScroll();
    form.reset();
    currentAnimalId = null;

    removeModalListeners();
  }

  function handleEscKey(e) {
    if (e.key === 'Escape' && backdrop.classList.contains('is-open')) {
      closeModal();
    }
  }

  function handleBackdropClick(e) {
    if (e.target === backdrop) {
      closeModal();
    }
  }

  function addModalListeners() {
    window.addEventListener('keydown', handleEscKey);
    backdrop.addEventListener('click', handleBackdropClick);
  }

  function removeModalListeners() {
    window.removeEventListener('keydown', handleEscKey);
    backdrop.removeEventListener('click', handleBackdropClick);
  }

  function openModal(animalId) {
    currentAnimalId = animalId;
    backdrop.classList.add('is-open');
    lockScroll();

    addModalListeners();
  }

  closeBtn.addEventListener('click', closeModal);

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const name = form.name.value.trim();
    const rawPhone = form.phone.value.trim();
    const phone = rawPhone.replace(/\D/g, '');
    const comment = form.comment.value.trim();

    if (!name || !phone) {
      iziToast.error({ message: 'Заповніть обовʼязкові поля', position: 'topRight' });
      return;
    }

    if (phone.length !== 12) {
      iziToast.error({ message: 'Телефон має формат 380XXXXXXXXX', position: 'topRight' });
      return;
    }

    if (!currentAnimalId) {
      iziToast.error({ message: 'Не обрано тварину', position: 'topRight' });
      return;
    }

    try {
      await createOrder({ name, phone, comment, animalId: currentAnimalId });

      iziToast.success({ message: 'Заявку надіслано', position: 'topRight' });
      closeModal();
    } catch (error) {
      iziToast.error({ message: error.message || 'Помилка сервера', position: 'topRight' });
    }
  });

  window.openOrderModal = openModal;
});
