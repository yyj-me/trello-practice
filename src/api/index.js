import axios from 'axios';
import router from '../router';

const DOMAIN = 'http://localhost:3000';
const UNAUTHORIZED = 401;
const onUnauthorized = () => {
  router.push(`/login?rPath=${encodeURIComponent(location.pathname)}`).catch(() => {});
}

const request = (method, url, data) => {
  return axios({
    method,
    url: DOMAIN + url,
    data,
  }).then(res => res.data)
    .catch(({response}) => {
      const {status} = response;
      if (status === UNAUTHORIZED) onUnauthorized();
      throw response;
    })
};

export const setAuthInHeader = token => {
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
}

export const Board = {
  fetch() {
    return request('get', '/boards');
  },
};

export const Auth = {
  login(email, password) {
    return request('post', '/login', {email, password});
  },
}
