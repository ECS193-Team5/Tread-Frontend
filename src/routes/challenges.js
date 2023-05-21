import { redirectLogout } from "../helpers/CssEffects";

import axios from 'axios';
const backend_url = process.env.REACT_APP_PROD_BACKEND;

/*** Add Challenges  ***/
export function addChallenge(inputData, thenFunc, errorFunc) {
    var config = {
        method: 'post',
        url: backend_url + "challenges/add_" + inputData.receiverGroup + "_challenge",
        headers: {
            Accept: 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
        data: inputData.data
    };
    axios(config)
        .then(function (response) {
            thenFunc();
        })
        .catch(function (error) {
            redirectLogout(error);
            errorFunc();
        })
}

/** Interact with Challnege Objects */
export function acceptChallenge(challengeID, thenFunc) {

    var config = {
        method: 'post',
        url: backend_url + 'challenges/accept_friend_challenge',
        headers: {
            Accept: 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
        data: {
            challengeID: challengeID
        }
    };
    axios(config)
        .then(function (response) {
            thenFunc();
        })
        .catch(function (error) {
            redirectLogout(error);
        });

}

export function declineChallenge(challengeID, thenFunc) {
    var config = {
        method: 'post',
        url: backend_url + 'challenges/decline_friend_challenge',
        headers: {
            Accept: 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
        data: {
            challengeID: challengeID
        }
    };
    axios(config)
        .then(function (response) {
            thenFunc();
        })
        .catch(function (error) {
            redirectLogout(error);
        });
}

export function deleteChallenge(challengeID, thenFunc) {
    var config = {
        method: 'post',
        url: backend_url + 'challenges/delete_friend_challenge',
        headers: {
            Accept: 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
        data: {
            challengeID: challengeID
        }
    };
    axios(config)
        .then(function (response) {
            thenFunc();
        })
        .catch(function (error) {
            redirectLogout(error);
        });
}

/** Get Challenges */
export function getIssuedFriendChallenges(thenFunc) {
    var config = {
        method: 'post',
        url: backend_url + 'challenges/accepted_challenges',
        headers: {
            Accept: 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
    };
    axios(config)
        .then(function (response) {
            thenFunc(response.data);
        })
        .catch(function (error) {
            redirectLogout(error);
        });
}

export function getSentChallenges(thenFunc) {
    var config = {
        method: 'post',
        url: backend_url + 'challenges/sent_challenges',
        headers: {
            Accept: 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
    };
    axios(config)
        .then(function (response) {
            thenFunc(response.data);
        })
        .catch(function (error) {
            redirectLogout(error);
        });
}

export function getReceivedChallenges(thenFunc) {
    var config = {
        method: 'post',
        url: backend_url + 'challenges/received_challenges',
        headers: {
            Accept: 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
    };
    axios(config)
        .then(function (response) {
            thenFunc(response.data);
        })
        .catch(function (error) {
            redirectLogout(error);
        });
}

export function getIssuedLeagueChallenges(leagueID, thenFunc) {
    var config = {
        method: 'post',
        url: backend_url + 'challenges/league_challenges',
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

/* Leaderboard */
export function getChallengeLeaderboard(challengeID, thenFunc) {
    var config = {
        method: 'post',
        url: backend_url + 'challenges/get_challenge_leaderboard',
        headers: {
            Accept: 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
        data: {
            challengeID: challengeID
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