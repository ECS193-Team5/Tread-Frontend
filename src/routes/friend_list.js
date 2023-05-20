import { redirectLogout } from "../helpers/CssEffects";
import axios from 'axios';
const backend_url = process.env.REACT_APP_PROD_BACKEND;

export function getFriendList(thenFunc) {
    var config = {
        method: 'post',
        url: backend_url + 'friend_list/friend_list',
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

export function getBlockedList(thenFunc) {
    var config = {
        method: 'post',
        url: backend_url + 'friend_list/blocked_list',
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