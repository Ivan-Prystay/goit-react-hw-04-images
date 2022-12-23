import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
export const API_KEY = 'key=30588481-828dd19e4086d4e0d5bf36dc4';

export const params = {
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 12,
};
