import { redirectLogout } from "../helpers/CssEffects";
import axios from 'axios';
const backend_url = process.env.REACT_APP_PROD_BACKEND;

export function getInProgressMedals(setInformationMap){
    var config = {
        method : 'post',
        url : backend_url + 'medals/get_in_progress',
        headers: {
        Accept: 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
    };
    axios(config)
    .then(function(response){
        setInformationMap(response.data)
    })
    .catch(function(error){
        redirectLogout(error)
    });
}

export function getEarnedMedals(setInformationMap){
    var config = {
        method : 'post',
        url : backend_url + 'medals/get_earned',
        headers: {
        Accept: 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
    };
    axios(config)
    .then(function(response){
        setInformationMap(response.data)
    })
    .catch(function(error){
        redirectLogout(error)
    });
}