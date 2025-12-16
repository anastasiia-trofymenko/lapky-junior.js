document.addEventListener('DOMContentLoaded', () => {
  const backdrop = document.querySelector('[data-order-backdrop]');
  const modal = document.querySelector('[data-order-modal]');
  const closeBtn = document.querySelector('[data-order-close]');
  const form = document.querySelector('#orderForm');

  // 🔍 ДІАГНОСТИКА
  console.log({
    backdrop,
    modal,
    closeBtn,
    form,
  });

  if (!backdrop || !modal) {
    console.error(' Order modal not found in DOM');
    return;
  }

  function openOrderModal() {
    backdrop.classList.add('is-open');
    document.body.classList.add('modal-open');
  }

  function closeOrderModal() {
    backdrop.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    form?.reset();
  }

  //  НЕ відкриваємо автоматично
  // openOrderModal(); ← ВАЖЛИВО: ЦЕ ВИДАЛИТИ

  //  ВІДКРИТТЯ ДЛЯ ТЕСТУ З КОНСОЛІ
  window.openOrderModal = openOrderModal;

  // Закриття
  closeBtn?.addEventListener('click', closeOrderModal);

  backdrop.addEventListener('click', e => {
    if (e.target === backdrop) closeOrderModal();
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeOrderModal();
  });

  // Сабміт
  form?.addEventListener('submit', e => {
    e.preventDefault();
    alert('submit test');
    closeOrderModal();
  });

  document.addEventListener('click', e => {
    if (e.target.closest('.modalAdoptBtn')) {
      openOrderModal();
    }
  });
});
