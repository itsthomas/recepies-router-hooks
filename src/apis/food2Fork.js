import axios from 'axios';

const hackCorPolicy = 'https://cors-anywhere.herokuapp.com/';
const api_url = 'https://www.food2fork.com/api';
const api_key = '5635997ff3e570fa7189f298f5fa1eef';

export default axios.create({
  baseURL: `${hackCorPolicy}${api_url}`,
  params: {
    key: api_key
  }
});
