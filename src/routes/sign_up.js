import axios from 'axios';
import { redirectLogout } from "../helpers/CssEffects";
const backend_url = process.env.REACT_APP_PROD_BACKEND;

export function signUp(formData) {
    var config = {
        method: 'post',
        url: backend_url + 'sign_up/sign_up',
        headers: {
            "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
        credentials: 'include',
        data: formData
    };
    axios(config)
        .then(function () {
            window.location.href = "./currentChallengePage";
        })
        .catch(function (error) {
            redirectLogout(error)
        });
}

export function getProfilePhoto(setPhoto){
    var config  = {
        method : 'post',
        url: backend_url+'sign_up/get_profile_photo',
        headers: {
            Accept: 'application/json',
          },
        withCredentials: true,
        credentials: 'include'
    };
    axios(config)
    .then(function(response) {
        setPhoto(response.data);
    })
    .catch(function(error){
        redirectLogout(error)
    });
}