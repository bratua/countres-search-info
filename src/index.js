import './css/styles.css';
import fetchCountries from './fetchCountries.js';
import Notiflix from 'notiflix';

const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
  searchField: document.querySelector('#country-search'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searchField.addEventListener(
  'input',
  debounce(searchCountry, DEBOUNCE_DELAY)
);

function searchCountry(e) {
  const countryName = e.target.value;
  fetchCountries(countryName).then(renderCountryList).catch(errorCountry);
}

function renderCountryList(coutriesArray) {
  refs.countryList.innerHTML = '';

  if (coutriesArray.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  }

  const markup = coutriesArray
    .map(({ name, nativeName, capital, population, flags, languages }) => {
      if (coutriesArray.length > 1) {
        return `<li class="country-small">
		  <div class="header-country-small">
        <img src="${flags.svg}" alt="" class="country-flag">
        <h2 class="country-name-small">${name}(${nativeName})</h2>
		  </div>
      </li>`;
      }

      Notiflix.Notify.success('Done!');
      return `<li class="country-big">
      <div class="header-country-big">  
		<img src="${flags.svg}" alt="" class="country-flag">
        <h2 class="country-name-big">${name}(${nativeName})</h2>
		  </div>
        <p class="country-capital"><b>Столица: </b>${capital}</p>
        <p class="country-population"><b>Население: </b>${population}</p>
        <p class="country-languages"><b>Языки: </b>${getLenguages(
          languages
        )}</p>
      </li>`;
    })
    .join('');

  refs.countryList.insertAdjacentHTML('beforeend', markup);
}

function getLenguages(languages) {
  return languages.map(lang => lang.name).join(', ');
}

function errorCountry() {
  Notiflix.Notify.failure('Nothing to search!');
}
