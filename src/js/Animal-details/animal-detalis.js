// Modal Elements
const modalBackdrop = document.getElementById('petModalBackdrop');
const modalContainer = document.getElementById('petModalContainer');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalAdoptBtn = document.getElementById('modalAdoptBtn');

// Modal Content Elements
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
  modalImage.src = animal.image;
  modalImage.alt = animal.name;

  // Display first category or species
  const categoryName = animal.species;
  modalSpecies.textContent = categoryName;

  modalName.textContent = animal.name;
  modalAge.textContent = animal.age;
  modalGender.textContent = animal.gender;

  // Use description fields or fallback to behavior
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
}

/**
 * Closes the pet modal
 */
function closePetModal() {
  modalBackdrop.classList.add('hidden');
  document.body.classList.remove('modal-open');
  currentAnimalId = null;
}

/**
 * Opens the adoption form modal
 * This function should open your adoption form modal
 */
function openAdoptionModal() {
  closePetModal();
  // TODO: Implement adoption form modal opening
  console.log('Opening adoption form for animal:', currentAnimalId);
  // Example: openAdoptFormModal(currentAnimalId);
}

// Event Listeners

// Close button click
modalCloseBtn.addEventListener('click', closePetModal);

// Backdrop click (click outside modal)
modalBackdrop.addEventListener('click', event => {
  if (event.target === modalBackdrop) {
    closePetModal();
  }
});

// Prevent closing when clicking inside modal
modalContainer.addEventListener('click', event => {
  event.stopPropagation();
});

// ESC key press
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !modalBackdrop.classList.contains('hidden')) {
    closePetModal();
  }
});

// Adopt button click
modalAdoptBtn.addEventListener('click', openAdoptionModal);

// Export functions for use in main script
export { openPetModal, closePetModal, openAdoptionModal };
