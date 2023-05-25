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
      errorFunc();
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
      errorFunc();
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
      console.log(error);
      errorFunc();
      redirectLogout(error);
    });
}