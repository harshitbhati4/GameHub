import axios from 'axios';

const rawgClient = axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: process.env.REACT_APP_RAWG_API_KEY
  }
});

export default rawgClient;