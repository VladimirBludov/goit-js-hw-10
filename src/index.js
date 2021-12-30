import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputCountry: document.querySelector('input#search-box'),
  countryList: document.querySelector('.country-list'),
};

refs.inputCountry.addEventListener('input', debounce(onSearchCountry, 300));

function onSearchCountry(e) {
  const nameCountry = e.target.value.trim();

  if (nameCountry === '') {
    refs.countryList.innerHTML = '';
    return;
  }

  fetchCountries(nameCountry)
    .then(countries => {
      if (!countries.length) {
        throw error;
      }

      if (countries.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
      }

      if (countries.length > 1 && countries.length <= 10) {
        refs.countryList.innerHTML = createMarkupList(countries);
      }

      if (countries.length === 1) {
        refs.countryList.innerHTML = createMarkupList(countries);
      }
      console.log(countries);
      // const { name, capital, population, flags, languages } = country[0];
      // console.log(name, capital, population, flags, languages);
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
    });
}

function createMarkupList(countries) {
  return countries
    .map(({ name, capital, population, flags, languages }) => {
      return `
      <li>
        <img class="country-list__img" src="${flags.svg}" alt="Flag of ${name.official}">
        <span class="country-list__name">${name.official}</span>
      </li>
      `;
    })
    .join('');
}
