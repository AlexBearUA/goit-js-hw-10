import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfoCard: document.querySelector('.country-info'),
};

refs.searchBox.addEventListener('input', debounce(onSearc, DEBOUNCE_DELAY));

function onSearc() {
  refs.countryInfoCard.innerHTML = '';
  refs.countryList.innerHTML = '';

  const searchQuery = refs.searchBox.value.trim();
  if (searchQuery === '') {
    return;
  }

  fetchCountries(searchQuery).then(onFetchSuccess).catch(onFetchError);
}

function onFetchSuccess(countries) {
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.', {
      position: 'left-top',
    });
    return;
  }
  if (countries.length === 1) {
    refs.countryInfoCard.innerHTML = createCountryInfoCardMarkup(countries);
    return;
  }
  refs.countryList.innerHTML = createCountriesListMarkup(countries);
}

function createCountriesListMarkup(countries) {
  return countries
    .map(({ flag, name }) => {
      return `<li class="country-list__item">
        <img
          class="country-list__country-flag"
          src="${flag}"
          alt="Прапор країни ${name}"
        />
        <p class="country-list__country-name">${name}</p>
      </li>`;
    })
    .join('');
}

function createCountryInfoCardMarkup(countries) {
  const languages = [];
  const country = countries[0];

  country.languages.forEach(language => {
    languages.push(language.name);
  });

  return `<p class="country-name">
        <img
          class="country-flag"
          src="${country.flag}"
          alt="Прапор країни ${country.name}"
        />${country.name}
      </p>
      <p class="country-info">
        <span class="country-subtitle">Capital:&nbsp</span>${country.capital}
      </p>
      <p class="country-info">
        <span class="country-subtitle">Population:&nbsp</span>${
          country.population
        }
      </p>
      <p class="country-info">
        <span class="country-subtitle">Languages:&nbsp</span> ${languages.join(
          ', '
        )}
      </p>`;
}

function onFetchError(error) {
  error === 404 &&
    Notify.failure('Oops, there is no country with that name', {
      position: 'left-top',
    });
}
