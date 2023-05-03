import { redirectLogout } from "../Helpers/CssEffects";
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
            redirectLogout(error);
            errorFunc();
        });
}

export function getLeagueInfo(leagueID, thenFunc){
  function getLeagueInfo(){
    var config  = {
      method : 'post',
      url: backend_url+'league/get_league_name_description_type',
      headers: {
          Accept: 'application/json',
        },
      withCredentials: true,
      credentials: 'include',
      data : {
        leagueID: leagueID
      }
    };
    axios(config)
    .then(function(response) {
      thenFunc(response);
    })
    .catch(function(error){
      redirectLogout(error);
    });
}
}