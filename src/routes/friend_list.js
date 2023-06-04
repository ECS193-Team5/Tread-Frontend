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

export function revokeFriendRequest(username, thenFunc) {
  var config = {
    method: 'post',
    url: backend_url + 'friend_list/remove_sent_request',
    headers: {
      Accept: 'application/json',
    },
    data:
    {
      friendName: username
    },
    withCredentials: true,
    credentials: 'include'
  };
  axios(config)
    .then(function (response) {
      thenFunc();
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

  export function acceptFriendRequest(username, thenFunc){
    var config = {
      method: 'post',
      url: backend_url + 'friend_list/accept_received_request',
      headers: {
        Accept: 'application/json',
      },
      data:
      {
        friendName: username
      },
      withCredentials: true,
      credentials: 'include'
    };
    axios(config)
    .then(function (response) {
      thenFunc();
    })
    .catch(function (error) {
      redirectLogout(error);
    });
  }

  export function declineFriendRequest(username, thenFunc){
    var config = {
      method: 'post',
      url: backend_url + 'friend_list/removed_received_request',
      headers: {
        Accept: 'application/json',
      },
      data:
      {
        friendName: username
      },
      withCredentials: true,
      credentials: 'include'
    };
    axios(config)
    .then(function (response) {
      thenFunc();
    })
    .catch(function (error) {
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

export function getFriends(thenFunc){
  // get Friends
  var config = {
    method : 'post',
    url : backend_url + 'friend_list/get_all_friends_info',
    headers: {
      Accept: 'application/json',
    },
    withCredentials: true,
    credentials: 'include'
  };
  axios(config)
  .then(function(response) {
      thenFunc(response.data);
  })
  .catch(function(error){
      redirectLogout(error)
  });
}

export function getSent(thenFunc){
  // get Sents
  var config = {
    method : 'post',
    url : backend_url + 'friend_list/sent_request_list',
    headers: {
      Accept: 'application/json',
    },
    withCredentials: true,
    credentials: 'include'
  };
  axios(config)
  .then(function(response) {
      thenFunc(response.data);
  })
  .catch(function(error){
      redirectLogout(error);
  });    }

export function getReceived(thenFunc){
  // get Received
  var config = {
    method : 'post',
    url : backend_url + 'friend_list/received_request_list',
    headers: {
      Accept: 'application/json',
    },
    withCredentials: true,
    credentials: 'include'
  };
  axios(config)
  .then(function(response) {
      thenFunc(response.data)
  })
  .catch(function(error){
      redirectLogout(error);
  });
}
export function getSuggestedFriends(thenFunc) {
  var config = {
      method : 'post',
      url : backend_url + 'friend_list/get_recommended',
      headers: {
      Accept: 'application/json',
      },
      withCredentials: true,
      credentials: 'include',
  };
  axios(config)
  .then(function (response) {
      thenFunc(response.data)
  })
  .catch(function (error) {
      redirectLogout(error)
  });
}


export function getRecentFriends(thenFunc) {
  var config = {
      method: 'post',
      url: backend_url + 'friend_list/get_recent_activity',
      headers: {
          Accept: 'application/json',
      },
      withCredentials: true,
      credentials: 'include',
  };
  axios(config)
      .then(function (response) {
          thenFunc(response.data)
      })
      .catch(function (error) {
          redirectLogout(error)
      });
}