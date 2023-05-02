import { redirectLogout } from "../Helpers/postRequestHelpers";
import axios from 'axios';
const backend_url = process.env.REACT_APP_PROD_BACKEND;


export function createLeague(inputData, thenFunc, errorFunc){
    var config = {
        method: 'post',
        url: backend_url + 'league/create_league',
        headers: {
          Accept: 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
        data: inputData
      };
      axios(config)
        .then(function (response) {
            thenFunc();
        })
        .catch(function (error) {
          redirectLogout();
          errorFunc();
        });
}