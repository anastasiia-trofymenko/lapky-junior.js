import { lockScroll, unlockScroll } from '../utils/scroll-lock.js';

// Modal Elements
const modalBackdrop = document.getElementById('petModalBackdrop');
const modalContainer = document.getElementById('petModalContainer');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalAdoptBtns = document.querySelectorAll('[data-modal-adopt]');

// Modal Content Elements
const modalImageWrapper = document.getElementById('modalImageWrapper');
const modalImage = document.getElementById('modalImage');
const modalSpecies = document.getElementById('modalSpecies');
const modalName = document.getElementById('modalName');
const modalAge = document.getElementById('modalAge');
const modalGender = document.getElementById('modalGender');
const modalDescription = document.getElementById('modalDescription');
const modalHealth = document.getElementById('modalHealth');
const modalBehavior = document.getElementById('modalBehavior');

// Store current animal data
let currentAnimalId = null;

function handleBackdropClick(event) {
  if (event.target === modalBackdrop) {
    closePetModal();
  }
}

function handleModalClick(event) {
  event.stopPropagation();
}

function handleEscapeKey(event) {
  if (event.key === 'Escape' && !modalBackdrop.classList.contains('hidden')) {
    closePetModal();
  }
}

function handleAdoptClick() {
  closePetModal();
  openOrderModal(currentAnimalId);
}

/**
 * Opens the modal with animal data
 * @param {string} animalId - The ID of the animal to display
 * @param {Map} animalsStore - The Map containing all animal objects
 */
function openPetModal(animalId, animalsStore) {
  const animal = animalsStore.get(animalId);

  if (!animal) {
    console.error('Animal not found:', animalId);
    return;
  }

  // Store current animal ID
  currentAnimalId = animalId;

  // Populate modal with animal data
  /* ===== IMAGE RENDER ===== */
  modalImageWrapper.replaceChildren();

  const imageMarkup = [animal]
    .map(
      ({ image, name }) => `
        <img
          class="modal-image"
          src="${image}"
          alt="${name}"
          loading="lazy"
        />
      `
    )
    .join('');

  modalImageWrapper.insertAdjacentHTML('afterbegin', imageMarkup);

  /* ===== TEXT CONTENT ===== */
  modalSpecies.textContent = animal.species;
  modalName.textContent = animal.name;
  modalAge.textContent = animal.age;
  modalGender.textContent = animal.gender;
  modalDescription.textContent = animal.description || 'Інформація відсутня';
  modalHealth.textContent =
    animal.healthStatus || "Інформація про здоров'я відсутня";
  modalBehavior.textContent =
    animal.behavior || 'Інформація про поведінку відсутня';

  // Show modal
  modalBackdrop.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // Set focus to close button for accessibility
  modalCloseBtn.focus();
  lockScroll();

  // Add event listeners when modal opens
  modalCloseBtn.addEventListener('click', closePetModal);
  modalBackdrop.addEventListener('click', handleBackdropClick);
  modalContainer.addEventListener('click', handleModalClick);
  document.addEventListener('keydown', handleEscapeKey);
  modalAdoptBtns.forEach(button => {
    button.addEventListener('click', handleAdoptClick);
  });
}

// Closes the pet modal
function closePetModal() {
  modalBackdrop.classList.add('hidden');
  document.body.classList.remove('modal-open');

  // Remove event listeners when modal closes
  modalCloseBtn.removeEventListener('click', closePetModal);
  modalBackdrop.removeEventListener('click', handleBackdropClick);
  modalContainer.removeEventListener('click', handleModalClick);
  document.removeEventListener('keydown', handleEscapeKey);

  modalAdoptBtns.forEach(button => {
    button.removeEventListener('click', handleAdoptClick);
  });

  unlockScroll();
}

export { openPetModal };
