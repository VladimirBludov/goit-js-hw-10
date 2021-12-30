const BASE_URL = 'https://restcountries.com/v3.1/name/';

const searchParams = new URLSearchParams({
  fields: ['name', 'capital', 'population', 'flags', 'languages'],
});

export const fetchCountries = function (name) {
  return fetch(`${BASE_URL}${name}?${searchParams}`).then(response => response.json());
};
