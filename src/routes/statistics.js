import { redirectLogout } from "../helpers/CssEffects";

import axios from 'axios';
const backend_url = process.env.REACT_APP_PROD_BACKEND;

export function getPastChallenges(thenFunc){

    var config = {
        method: 'post',
        url: backend_url + 'stats/get_past_challenges',
        headers: {
            Accept: 'application/json',
        },
        withCredentials: true,
        credentials: 'include'
    };
    axios(config)
        .then(function (response) {
            thenFunc(response.data);
        })
        .catch(function (error) {
            redirectLogout(error);
        });
}

export function getPastExercises (thenFunc) {
    var config = {
        method : 'post',
        url : backend_url + 'stats/get_exercise_log',
        headers: {
          Accept: 'application/json',
        },
        withCredentials: true,
        credentials: 'include'
      };
      axios(config)
      .then(function(response){
        thenFunc(response.data);
      })
      .catch(function(error){
        redirectLogout(error);
      }
      );
}