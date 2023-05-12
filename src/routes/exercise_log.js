import { redirectLogout } from "../helpers/CssEffects";
import { reloadPage } from "../helpers/CssEffects";

import axios from 'axios';
const backend_url = process.env.REACT_APP_PROD_BACKEND;

export function addExerciseLog(inputData){
    var config = {
        method: 'post',
        url: backend_url + 'exercise_log/add',
        headers: {
            Accept: 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
        data: inputData
    };
    axios(config)
        .then(function (response) {
            reloadPage();
        })
        .catch(function (error) {
            redirectLogout(error);
        });
}