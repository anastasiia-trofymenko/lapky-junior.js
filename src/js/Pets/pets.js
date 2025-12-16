import axios from 'axios';
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const BASE_URL = 'https://paw-hut.b.goit.study/api/';
const CATECORIES_URL = 'categories';
const ANIMALS_URL = 'animals';

const deskMediaQuery = window.matchMedia('(min-width: 1440px)');

const categories = document.querySelector('.categories-list');
const allAnimals = document.querySelector('.animals-list');
const listCategories = document.querySelector('.categories-list');
const moreBtn = document.querySelector('.loadmore-btn');
const activeCategories = document.querySelector('.categories-text');
const loader = document.querySelector('span');

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}
function showmoreBtn() {
  moreBtn.classList.remove('hidden');
}

function hidemoreBtn() {
  moreBtn.classList.add('hidden');
}
hidemoreBtn();

async function createCategories() {
  const { data } = await axios(`${BASE_URL}${CATECORIES_URL}`);
  return data;
}

createCategories().then(data => {
  categories.insertAdjacentHTML('afterbegin', createMarkupCategories(data));
});

function createMarkupCategories(arr) {
  const sortedArr = arr.toSorted((a, b) => b._id.localeCompare(a._id));

  return sortedArr
    .map(
      ({ name, _id }) =>
        `<li class="categories-item"><div class="categories-text" data-id="${_id}" >${name}</div></li>`
    )
    .join('');
}
let page = 1;
let limit = 0;
let categoryId = null;
function handleDeskChange(e) {
  if (e.matches) {
    return (limit = 9);
  } else {
    return (limit = 8);
  }
}
deskMediaQuery.addEventListener('change', handleDeskChange);
handleDeskChange(deskMediaQuery);

async function createAnimalsCards() {
  const { data } = await axios(`${BASE_URL}${ANIMALS_URL}`, {
    params: {
      page,
      limit,
      categoryId,
    },
  });

  return data;
}

createAnimalsCards()
  .then(data => {
    allAnimals.insertAdjacentHTML(
      'beforeend',
      createMarkupAnimals(data.animals)
    );
    showmoreBtn();
  })
  .catch(error =>
    iziToast.error({
      message: 'Упс, щось пішло не так. Спробуйте ще раз!',
      position: 'topRight',
      color: 'red',
    })
  );

function createMarkupAnimals(arr) {
  return arr
    .map(
      ({ image, name, species, categories, age, gender, behavior }) =>
        `<li class="animals-item"><img class="animals-img" src="${image}" alt="${species}"/><div class="animals-item-container"><p class="animals-subtitle">${species}</p><h2 class="animals-title">${name}</h2><div class="animals-sublist">${categories
          .map(({ name }) => `<h3 class="animals-categories">${name}</h3>`)
          .join(
            ''
          )}</div><div class="animals-textlist"><p class="animals-subtitle">${age}</p><p class="animals-subtitle">${gender}</p></div>
          <p class="animals-text">${behavior}</p></div>
          
          <button class="animals-btn">Дізнатись більше</button></li>`
    )
    .join('');
}

moreBtn.addEventListener('click', handleClickMurcup);
async function handleClickMurcup(event) {
  page++;
  hidemoreBtn();
  showLoader();
  try {
    const data = await createAnimalsCards(page);
    if (data && data.animals.length > 0) {
      allAnimals.insertAdjacentHTML(
        'beforeend',
        createMarkupAnimals(data.animals)
      );
      const card = document.querySelector('.animals-item');

      const info = card.getBoundingClientRect();
      const height = info.height;
      window.scrollBy({
        left: 0,
        top: height * 0.6,
        behavior: 'smooth',
      });
      event.target.blur();
      hideLoader();
      showmoreBtn();
    }
    if (allAnimals.children.length >= data.totalItems) {
      moreBtn.disabled = true;
      moreBtn.classList.add('disabled');
      iziToast.info({
        message: 'Всі хвостики вже тут',
        position: 'topRight',
        color: 'green',
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Упс, щось пішло не так. Спробуйте ще раз!',
      position: 'topRight',
      color: 'red',
    });
  }
}

listCategories.addEventListener('click', handleClickCategoriesMurkup);

async function handleClickCategoriesMurkup(event) {
  event.preventDefault();
  hidemoreBtn();
  showLoader();

  page = 1;
  moreBtn.disabled = false;
  moreBtn.classList.remove('disabled');

  if (!(event.target === event.currentTarget)) {
    allAnimals.innerHTML = '';
    activeCategories.classList.remove('active');
    const removeActive = listCategories.querySelectorAll('.active');
    removeActive.forEach(child => {
      child.classList.remove('active');
    });
    event.target.classList.add('active');
    categoryId = event.target.dataset.id;

    try {
      const data = await createAnimalsCards(categoryId);
      allAnimals.insertAdjacentHTML(
        'beforeend',
        createMarkupAnimals(data.animals)
      );
      hideLoader();
      showmoreBtn();
    } catch (error) {
      iziToast.error({
        message: 'Упс, щось пішло не так. Спробуйте ще раз!',
        position: 'topRight',
        color: 'red',
      });
      hideLoader();
      showmoreBtn();
    }
  }
}
