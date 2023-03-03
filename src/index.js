import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 3000;

const searchBox = document.querySelector('#search-box');

searchBox.addEventListener('input', debounce(onSearc, DEBOUNCE_DELAY));

function onSearc() {
  const searchQuery = searchBox.value.trim();
  fetchCountries(searchQuery);
  console.log(searchQuery);
}
