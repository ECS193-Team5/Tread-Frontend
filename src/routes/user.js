import axios from 'axios';
const backend_url = process.env.REACT_APP_PROD_BACKEND;

export function getUsername(thenFunc) {
    var config = {
      method: 'post',
      url: backend_url + 'user/get_username',
      headers: {
        Accept: 'application/json',
      },
      withCredentials: true,
      credentials: 'include',
    };
    axios(config)
      .then(function (response) {
        thenFunc();
      })
      .catch(function (error) {

      });
  }