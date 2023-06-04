import axios from 'axios';
const backend_url = process.env.REACT_APP_PROD_BACKEND;

export function loginAppleSignIn (response, deviceToken, rawNonce) {
    let fullname = {};
    if (response.user) {
      fullname = {
        givenName: response.user.firstName,
        familyName: response.user.lastName
      }
    }

    var config = {
      method: 'post',
      url: backend_url + 'auth/login/apple',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Authorization: response.authorization.id_token,
        Accept: 'application/json',
      },
      data:
      {
        deviceToken: deviceToken,
        fullname: fullname,
        nonce: rawNonce
      }
    };
    let hasUsername = false;
    axios(config)
      .then(function (response) {
        hasUsername = response.data.hasUsername;
        if (!hasUsername) {
          window.location.href = "./signUpPage";
        }
        else {
          window.location.href = "./currentChallengePage";
        }
      })
      .catch(function (error) {
      });
  }

  export function loginGoogle(deviceToken, token){
  var config = {
    method: 'post',
    url: backend_url + 'auth/login/google',
    withCredentials: true,
    credentials: 'include',
    headers: {
      Authorization: `${token.credential}`,
      Accept: 'application/json',
    },
    data:
    {
      deviceToken: deviceToken
    }
  };

  let hasUsername = false;
  axios(config)
    .then(function (response) {
      hasUsername = response.data.hasUsername;
      if (!hasUsername) {
        window.location.href = "./signUpPage";
      }
      else {
        window.location.href = "./currentChallengePage";
      }
    })
    .catch(function (error) {
    });

  }
  export function logout(deviceToken) {
    var config = {
      method: 'post',
      url: backend_url + 'auth/logout',
      headers: {
        Accept: 'application/json',
      },
      withCredentials: true,
      credentials: 'include',
      data: {
        deviceToken: deviceToken
      }
    };
    axios(config)
      .then(function (response) {
        window.location.href = "./";

      })
      .catch(function (error) {
      });
  }