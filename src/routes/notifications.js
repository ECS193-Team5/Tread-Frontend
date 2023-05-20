import { redirectLogout } from "../helpers/CssEffects";

export function requestNotifications(thenFunc){/*
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
        });*/

        thenFunc([
        {_id:"me", "message":"You have been added to X league"}, {_id:"meow", "message":"You have been sent a friend request"}
        ]);
}

export function deleteNotification(id, thenFunc){/*
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
        });*/

}