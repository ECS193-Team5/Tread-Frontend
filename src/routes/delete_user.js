import { redirectLogout } from "../helpers/CssEffects";

import axios from 'axios';
const backend_url = process.env.REACT_APP_PROD_BACKEND;

export function deleteUser(){
    var config = {
        method : 'delete',
        url : backend_url + 'delete_user',
        headers: {
          Accept: 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
      };
      axios(config)
      .then(function(response){
        window.location.href = "./";
      })
      .catch(function(error){
        redirectLogout(error);
      });
}