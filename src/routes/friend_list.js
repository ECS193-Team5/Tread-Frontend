import { redirectLogout } from "../helpers/CssEffects";
import axios from 'axios';
const backend_url = process.env.REACT_APP_PROD_BACKEND;

/* Friend Interactions */
export function sendFriendRequest(friendName, thenFunc, errorFunc){
    var config = {
        method : 'post',
        url : backend_url + 'friend_list/send_friend_request',
        headers: {
          Accept: 'application/json',
        },
        data :
        {
          friendName : friendName
        },
        withCredentials: true,
        credentials: 'include'
      };
      axios(config)
      .then(function(response) {
          thenFunc(response.data);
      })
      .catch(function(error){
        if(errorFunc){
            errorFunc(error)
        }

        redirectLogout(error);
      });
}
/* Get Friend Lists */
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
            console.log(response.data);
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

export function removeFriend(friendName, thenFunc, errorFunc) {
    var config = {
      method: 'post',
      url: backend_url + 'friend_list/remove_friend',
      headers: {
        Accept: 'application/json',
      },
      data:
      {
        friendName: friendName
      },
      withCredentials: true,
      credentials: 'include'
    };
    axios(config)
    .then(function(response) {
        thenFunc(response.data);
    })
    .catch(function(error){
      if(errorFunc){
          errorFunc(error)
      }

      redirectLogout(error);
    });
  }

export  function unBlockUser(friendName, thenFunc, errorFunc) {
    var config = {
      method: 'post',
      url: backend_url + 'friend_list/unblock_user',
      headers: {
        Accept: 'application/json',
      },
      data:
      {
        friendName: friendName
      },
      withCredentials: true,
      credentials: 'include'
    };
    axios(config)
    .then(function(response) {
        thenFunc(response.data);
    })
    .catch(function(error){
      if(errorFunc){
          errorFunc(error)
      }
      redirectLogout(error);
    });
  }

export function blockUser(friendName, thenFunc, errorFunc){
    var config = {
        method: 'post',
        url: backend_url + 'friend_list/block_user',
        headers: {
          Accept: 'application/json',
        },
        data:
        {
          friendName: friendName
        },
        withCredentials: true,
        credentials: 'include'
      };

      axios(config)
      .then(function(response) {
          thenFunc(response.data);
      })
      .catch(function(error){
        if(errorFunc){
            errorFunc(error)
        }
        redirectLogout(error);
      });
}
