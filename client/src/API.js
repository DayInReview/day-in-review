import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('token'));

    if (token) {
      config.headers.common["Authorization"] = `${token}`;
    } else {
      delete API.defaults.headers.common.Authorization;
    }
    return config;
  }, (err) => {
    console.log(err);
  }
);

API.interceptors.response.use(
  (res) => {
    return res;
  }, (err) => {
    if (err.response.status === 401) {
      // Unauthorized -> user must log in again
      localStorage.removeItem('token');
      location.reload();
    } // TODO: Add handling for other error codes here
  }
);

export default API;