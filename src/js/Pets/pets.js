import axios from 'axios';
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const BASE_URL = 'https://paw-hut.b.goit.study/api/';
const CATECORIES_URL = 'categories';
const ANIMALS_URL = 'animals';

const categories = document.querySelector('.categories-list');
const allAnimals = document.querySelector('.animals-list');

async function createCategories() {
  const { data } = await axios(`${BASE_URL}${CATECORIES_URL}`);
  return data;
}

createCategories().then(data => {
  categories.insertAdjacentHTML('afterbegin', createMarkupCategories(data));
});
// .catch(error => {
//   iziToast.error({
//     message:
//       'Sorry, there are no images matching your search query. Please try again!',
//     position: 'topRight',
//     color: 'red',
//   });
// });

function createMarkupCategories(arr) {
  return arr
    .map(
      ({ name }) =>
        `<li class="categories-item"><div class="categories-text">${name}</div></li>`
    )
    .join('');
}
let page = 1;
async function createAnimalsCards() {
  const { data } = await axios(`${BASE_URL}${ANIMALS_URL}`, {
    params: {
      page,
      limit: 8,
    },
  });
  console.log(data);

  return data;
}

createAnimalsCards()
  .then(data => {
    allAnimals.insertAdjacentHTML(
      'beforeend',
      createMarkupAnimals(data.animals)
    );
  })
  .catch(error => {});
//

function createMarkupAnimals(arr) {
  return arr
    .map(
      ({ image, name, species, categories, age, gender, behavior }) =>
        `<li class="animals-item"><img class="animals-img" src="${image}" alt="${species}"/><div class="animals-item-container"><p class="animals-subtitle">${species}</p><h2 class="animals-title">${name}</h2><div class="animals-sublist">${categories
          .map(({ name }) => `<h3 class="animals-categories">${name}</h3>`)
          .join(
            ''
          )}</div><div class="animals-textlist"><p class="animals-subtitle">${age}</p><p class="animals-subtitle">${gender}</p></div></div>
          <p class="animals-text">${behavior}</p>
          <button class="animals-btn">Дізнатись більше</button></li>`
    )
    .join('');
}
