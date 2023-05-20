import { redirectLogout } from "../helpers/CssEffects";

import axios from 'axios';
const backend_url = process.env.REACT_APP_PROD_BACKEND;

export function requestNotifications(thenFunc){
    var config = {
        method: 'post',
        url: backend_url + 'notifications/get_notifications',
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

export function deleteNotification(id, thenFunc){
    var config = {
        method: 'post',
        url: backend_url + 'notifications/delete_notification',
        headers: {
            Accept: 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
        data: {notificationID:id}
    };
    axios(config)
        .then(function (response) {
            thenFunc();
        })
        .catch(function (error) {
            redirectLogout(error);
        });

}