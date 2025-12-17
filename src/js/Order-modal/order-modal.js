import Swal from 'sweetalert2';

document.addEventListener('DOMContentLoaded', () => {
  const backdrop = document.querySelector('[data-order-backdrop]');
  const modal = document.querySelector('[data-order-modal]');
  const closeBtn = document.querySelector('.order-modal__close');
  const form = document.getElementById('orderForm');
  const openBtn = document.getElementById('modalAdoptBtn');

  if (!backdrop || !modal || !form) return;

  let currentAnimalId = null;

  /* ========= OPEN ========= */
  function openModal(animalId) {
    currentAnimalId = animalId;
    backdrop.classList.add('is-open');
    document.body.classList.add('modal-open');
  }

  /* ========= CLOSE ========= */
  function closeModal() {
    backdrop.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    form.reset();
    currentAnimalId = null;
  }

  /* ========= OPEN FROM BUTTON ========= */
  openBtn?.addEventListener('click', () => {
    openModal(123); // підставити animalId
  });

  /* ========= CLOSE EVENTS ========= */

  closeBtn.addEventListener('click', closeModal);

  backdrop.addEventListener('click', e => {
    if (e.target === backdrop) {
      closeModal();
    }
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && backdrop.classList.contains('is-open')) {
      closeModal();
    }
  });

  /* ========= SUBMIT ========= */
  form.addEventListener('submit', async e => {
    e.preventDefault();

    const data = {
      name: form.name.value.trim(),
      phone: form.phone.value.trim(),
      comment: form.comment.value.trim(),
      animalId: currentAnimalId,
    };

    try {
      const response = await fetch('/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      // PUSH-ПОВІДОМЛЕННЯ
      Swal.fire({
        icon: 'success',
        title: 'Успіх',
        text: 'Заявку надіслано',
      });

      closeModal();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Помилка',
        text: 'Спробуйте пізніше',
      });
    }
  });

  /* ========= EXPORT (для іншої модалки) ========= */
  window.openOrderModal = openModal;
});

// function showError(input, message) {
//   input.classList.add('is-error');

//   let error = input.parentElement.querySelector('.error-text');
//   if (!error) {
//     error = document.createElement('span');
//     error.className = 'error-text';
//     input.parentElement.appendChild(error);
//   }

//   error.textContent = message;
// }

// function clearError(input) {
//   input.classList.remove('is-error');

//   const error = input.parentElement.querySelector('.error-text');
//   if (error) error.remove();
// }
