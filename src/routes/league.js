import { redirectLogout } from "../helpers/CssEffects";
import axios from 'axios';
const backend_url = process.env.REACT_APP_PROD_BACKEND;

export function createLeague(inputData, thenFunc, errorFunc) {
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
      if(errorFunc){
        errorFunc();
      }
    });
}

export function getLeagueInfo(leagueID, thenFunc) {
  var config = {
    method: 'post',
    url: backend_url + 'league/get_league_name_description_type',
    headers: {
      Accept: 'application/json',
    },
    withCredentials: true,
    credentials: 'include',
    data: {
      leagueID: leagueID
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

export function updateLeaguePhoto(formData) {
  var config = {
    method: 'post',
    url: backend_url + 'league/update_picture',
    headers: {
      Accept: 'application/json',
    },
    withCredentials: true,
    credentials: 'include',
    data: formData
  };
  axios(config)
    .then(function (response) {
    })
    .catch(function (error) {
      redirectLogout(error);
    });
}


export function updateLeagueName(leagueID, leagueName) {
  var config = {
    method: 'post',
    url: backend_url + 'league/update_name',
    headers: {
      Accept: 'application/json',
    },
    withCredentials: true,
    credentials: 'include',
    data: {
      leagueName: leagueName,
      leagueID: leagueID
    }
  };
  axios(config)
    .then(function (response) {
    })
    .catch(function (error) {
      redirectLogout(error);
    });
}

export function updateLeagueDescription(leagueID, leagueDescription) {
  var config = {
    method: 'post',
    url: backend_url + 'league/update_description',
    headers: {
      Accept: 'application/json',
    },
    withCredentials: true,
    credentials: 'include',
    data: {
      leagueDescription: leagueDescription,
      leagueID: leagueID
    }
  };
  axios(config)
    .then(function (response) {
    })
    .catch(function (error) {
      redirectLogout(error);
    });
}

export function updateLeagueType(leagueID, leagueType) {
  var config = {
    method: 'post',
    url: backend_url + 'league/update_type',
    headers: {
      Accept: 'application/json',
    },
    withCredentials: true,
    credentials: 'include',
    data: {
      leagueType: leagueType,
      leagueID: leagueID
    }
  };
  axios(config)
    .then(function (response) {
    })
    .catch(function (error) {
      redirectLogout(error);
    });
}

export function deleteLeague(leagueID, thenFunc, errorFunc) {
  var config = {
    method: 'post',
    url: backend_url + 'league/delete_league',
    headers: {
      Accept: 'application/json',
    },
    withCredentials: true,
    credentials: 'include',
    data: {
      leagueID: leagueID
    }
  };
  axios(config)
    .then(function (response) {
      thenFunc();
    })
    .catch(function (error) {
      if(errorFunc){
        errorFunc();
      }
      redirectLogout(error);
    });

}

export function getLeagueRole(leagueID, thenFunc) {
  var config = {
    method: 'post',
    url: backend_url + 'league/get_role',
    headers: {
      Accept: 'application/json',
    },
    withCredentials: true,
    credentials: 'include',
    data: {
      leagueID: leagueID
    }
  };
  axios(config)
    .then(function (response) {
      thenFunc(response.data);
    })
    .catch(function (error) {
      thenFunc("none");
      redirectLogout(error);
    });
}

export function getNumberActiveChallengesLeague(leagueID, thenFunc) {
  var config = {
    method: 'post',
    url: backend_url + 'league/get_league_active_challenges',
    headers: {
      Accept: 'application/json',
    },
    withCredentials: true,
    credentials: 'include',
    data: {
      leagueID: leagueID
    }
  };
  axios(config)
    .then(function (response) {
      thenFunc(response.data);
    })
    .catch(function (error) {
      redirectLogout(error);
    });
}

export function getMembersLeague(leagueID, thenFunc){
  var config = {
      method : 'post',
      url : backend_url + 'league/get_member_list',
      headers: {
      Accept: 'application/json',
      },
      withCredentials: true,
      credentials: 'include',
      data:{
          leagueID: leagueID
      }
  };
  axios(config)
  .then(function(response){
    console.log("league members", response.data);
      thenFunc(response);
  })
  .catch(function(error){
      redirectLogout(error);
  });
}

/* League Interaction Functions */
export function sendLeagueInvite(data, thenFunc, errorFunc){

  var config = {
      method : 'post',
      url : backend_url + 'league/invite_to_join',
      headers: {
        Accept: 'application/json',
      },
      data : data,
      withCredentials: true,
      credentials: 'include'
    };
    axios(config)
    .then(function(response) {
        thenFunc(response.data);
    })
    .catch(function(error){
      if(errorFunc){
        errorFunc();
      }
      redirectLogout(error);
    });
}


export function getAdminLeagues(thenFunc) {
  var config = {
      method: 'post',
      url: backend_url + 'league/get_admin_leagues',
      headers: {
          Accept: 'application/json',
      },
      withCredentials: true,
      credentials: 'include'
  };
  axios(config)
      .then(function (response) {
        thenFunc(response);
      })
      .catch(function (error) {
          redirectLogout(error);
      });
}

export function getLeaderboardInfo(leagueID, thenFunc){
  var config ={
      method: 'post',
      url : backend_url+'league/get_leaderboard',
      headers: {
          Accept: 'application/json',
      },
      withCredentials: true,
      credentials: 'include',
      data:{
          leagueID: leagueID
      }
    };
    axios(config)
    .then(function(response){
      console.log(response.data);
      thenFunc(response)
    })
    .catch(function(error){
      redirectLogout(error)
    });
}

export function getRequesting(leagueID, thenFunc){
  var config = {
      method : 'post',
      url : backend_url + 'league/get_pending_request_list',
      headers: {
      Accept: 'application/json',
      },
      withCredentials: true,
      credentials: 'include',
      data:{
          leagueID: leagueID
      }
  };
  axios(config)
  .then(function(response){
    thenFunc(response);
  })
  .catch(function(error){
    redirectLogout(error);
  });
}

export function getBanned(leagueID, thenFunc){
  // get list from service
  var config = {
      method : 'post',
      url : backend_url + 'league/get_banned_list',
      headers: {
      Accept: 'application/json',
      },
      withCredentials: true,
      credentials: 'include',
      data:{
          leagueID: leagueID
      }
  };
  axios(config)
  .then(function(response){
    thenFunc(response);
  })
  .catch(function(error){
    redirectLogout(error);
  });
}

export function getInvited(leagueID, thenFunc){
  // get list from service
  var config = {
      method : 'post',
      url : backend_url + 'league/get_sent_invite_list',
      headers: {
      Accept: 'application/json',
      },
      withCredentials: true,
      credentials: 'include',
      data:{
          leagueID: leagueID
      }
  };
  axios(config)
  .then(function(response){
    thenFunc(response);
  })
  .catch(function(error){
    redirectLogout(error);
  });
}

export function kickOutUser(data, thenFunc) {
  var config = {
    method: 'post',
    url: backend_url + 'league/kick_member',
    headers: {
      Accept: 'application/json',
    },
    data: data,
    withCredentials: true,
    credentials: 'include'
  };
  axios(config)
    .then(function (response) {
        thenFunc()
    })
    .catch(function (error) {
    redirectLogout(error);
    });
}

export function banUser(data, thenFunc) {
  var config = {
    method: 'post',
    url: backend_url + 'league/ban_user',
    headers: {
      Accept: 'application/json',
    },
    data:data,
    withCredentials: true,
    credentials: 'include'
  };
  axios(config)
    .then(function (response) {
      thenFunc()
    })
    .catch(function (error) {
      redirectLogout(error)
    });
}

export function removeAdminUser(data, thenFunc) {
  var config = {
    method: 'post',
    url: backend_url + 'league/remove_admin',
    headers: {
      Accept: 'application/json',
    },
    data: data,
    withCredentials: true,
    credentials: 'include'
  };
  axios(config)
    .then(function (response) {
      thenFunc()
    })
    .catch(function (error) {
      redirectLogout(error)
    });
}

export function addAdminUser(data, thenFunc) {
  var config = {
    method: 'post',
    url: backend_url + 'league/add_admin',
    headers: {
      Accept: 'application/json',
    },
    data: data,
    withCredentials: true,
    credentials: 'include'
  };
  axios(config)
    .then(function (response) {
      thenFunc()
    })
    .catch(function (error) {
      redirectLogout(error)
    });
}

export function acceptUser(data, thenFunc) {
  var config = {
    method: 'post',
    url: backend_url + 'league/accept_join_request',
    headers: {
      Accept: 'application/json',
    },
    data:data,
    withCredentials: true,
    credentials: 'include'
  };
  axios(config)
    .then(function (response) {
      thenFunc()
    })
    .catch(function (error) {
      redirectLogout(error)
    });
}

export function declineUser(data, thenFunc) {
  var config = {
    method: 'post',
    url: backend_url + 'league/decline_request',
    headers: {
      Accept: 'application/json',
    },
    data: data,
    withCredentials: true,
    credentials: 'include'
  };
  axios(config)
    .then(function (response) {
      thenFunc()
    })
    .catch(function (error) {
      redirectLogout(error)
    });
}

export function unbanUser(data, thenFunc) {
  var config = {
    method: 'post',
    url: backend_url + 'league/unban_user',
    headers: {
      Accept: 'application/json',
    },
    data:data,
    withCredentials: true,
    credentials: 'include'
  };
  axios(config)
    .then(function (response) {
      thenFunc()
    })
    .catch(function (error) {
      redirectLogout(error)
    });
}

export function revokeUser(data, thenFunc) {
  var config = {
    method: 'post',
    url: backend_url + 'league/undo_invite',
    headers: {
      Accept: 'application/json',
    },
    data: data,
    withCredentials: true,
    credentials: 'include'
  };
  axios(config)
    .then(function (response) {
      thenFunc()
    })
    .catch(function (error) {
      redirectLogout(error)
    });
}

export function  sendLeagueRequest (leagueID, thenFunc, errorFunc)  {

  var config  = {
      method : 'post',
      url: backend_url+'league/user_request_to_join',
      headers: {
          Accept: 'application/json',
      },
      withCredentials: true,
      credentials: 'include',
      data:{
          leagueID: leagueID
      }
  };
  axios(config)
  .then(function(response) {
      thenFunc()
  })
  .catch(function(error){
      redirectLogout(error);
      if(errorFunc){
        errorFunc();
      }
  });
}

export function getAll(thenFunc){
  var config = {
    method : 'post',
    url : backend_url + 'league/get_leagues',
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
      redirectLogout(error)
  });
}

export function getSent(thenFunc){
  // get Sents
  var config = {
    method : 'post',
    url : backend_url + 'league/get_requested_leagues',
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
      redirectLogout(error)
  });
}

export function getAdmin(thenFunc){
  // get Received
  var config = {
    method : 'post',
    url : backend_url + 'league/get_admin_leagues_with_challenge_count',
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
      redirectLogout(error)
  });
}

export function getInvite(thenFunc){
  var config = {
      method : 'post',
      url : backend_url + 'league/get_invited_leagues',
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
        redirectLogout(error)
    });
}



export function getSuggestedLeagues(thenFunc) {
  var config = {
      method : 'post',
      url : backend_url + 'league/get_recommended',
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


export function getRecentLeagues(thenFunc) {
  var config = {
      method: 'post',
      url: backend_url + 'league/get_recent_activity',
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

export function leaveLeague(id, thenFunc){
  var config = {
      method : 'post',
      url : backend_url + 'league/leave_league',
      headers: {
        Accept: 'application/json',
      },
      withCredentials: true,
      credentials: 'include',
      data:{
          leagueID: id
      }
    };
    axios(config)
    .then(function(response) {
        thenFunc()
    })
    .catch(function(error){
        redirectLogout(error)
    });
}

export function removeSelfFromAdmin(id, thenFunc){
  var config = {
      method : 'post',
      url : backend_url + 'league/user_remove_admin',
      headers: {
        Accept: 'application/json',
      },
      withCredentials: true,
      credentials: 'include',
      data:{
          leagueID: id
      }
    };
    axios(config)
    .then(function(response) {
        thenFunc()
    })
    .catch(function(error){
        redirectLogout(error)
    });
}

export function revokeLeagueRequest(id, thenFunc){
  var config = {
      method : 'post',
      url : backend_url + 'league/user_undo_request',
      headers: {
        Accept: 'application/json',
      },
      withCredentials: true,
      credentials: 'include',
      data:{
          leagueID: id
      }
    };
    axios(config)
    .then(function(response) {
        thenFunc()
    })
    .catch(function(error){
        redirectLogout(error)
    });
}

export function declineLeagueInvite(id, thenFunc){
  var config = {
      method : 'post',
      url : backend_url + 'league/user_decline_invite',
      headers: {
        Accept: 'application/json',
      },
      withCredentials: true,
      credentials: 'include',
      data:{
          leagueID: id
      }
    };
    axios(config)
    .then(function(response) {
        thenFunc()
    })
    .catch(function(error){
        redirectLogout(error)
    });
}

export function acceptLeagueInvite(id, thenFunc){
  var config = {
      method : 'post',
      url : backend_url + 'league/user_accept_invite',
      headers: {
        Accept: 'application/json',
      },
      withCredentials: true,
      credentials: 'include',
      data:{
          leagueID: id
      }
    };
    axios(config)
    .then(function(response) {
        thenFunc()
    })
    .catch(function(error){
        redirectLogout(error)
    });
}