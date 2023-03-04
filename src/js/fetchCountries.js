const BASE_URL = 'https://restcountries.com/v2';
const FILTER_FIELDS = 'fields=name,capital,population,flag,languages';

const fetchCountries = searchQuery => {
  return fetch(`${BASE_URL}/name/${searchQuery}?${FILTER_FIELDS}`).then(
    response =>
      response.ok ? response.json() : Promise.reject(response.status)
  );
};

export { fetchCountries };
