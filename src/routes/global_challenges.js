import { redirectLogout } from "../Helpers/CssEffects";

import axios from 'axios';
const backend_url = process.env.REACT_APP_PROD_BACKEND;

export function getGlobalChallenges(thenFunc){
    var config = {
        method : 'post',
        url : backend_url + 'global_challenge/get_challenges',
        headers: {
        Accept: 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
    };
    axios(config)
    .then(function(response){
        thenFunc(response.data);
    })
    .catch(function(error){
        redirectLogout(error);
    });
}

export function getGlobalChallengeLeaderboard(challengeID, thenFunc){
    var config = {
        method: 'post',
        url: backend_url + 'global_challenge/get_leaderboard',
        headers: {
            Accept: 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
        data: {
            challengeID: challengeID
        }
    };
    axios(config)
        .then(function (response) {
            thenFunc(response);

        })
        .catch(function (error) {
            redirectLogout(error);
        });
}