import Notiflix from 'notiflix';

const API_ENDPOINT = `https://restcountries.com/v2/name/`;
const SEARCH_OPTIONS = `?fields=name,nativeName,capital,population,flags,languages`;

export default function fetchCountries(name) {
  return fetch(API_ENDPOINT + name + SEARCH_OPTIONS).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
