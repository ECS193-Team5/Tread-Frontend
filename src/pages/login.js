import React from 'react';
import axios from 'axios';
import '../css/Login/login.css';
import { getToken } from 'firebase/messaging';
import { exportMessaging, requestPermission } from "../firebase";
import { useState, useEffect } from "react";
import  hardCodedInfo  from "../helpers/SharedHardCodeInfo.json";
import { getUsername } from '../routes/user';
import frontPageTreadLogo from "../assets/frontPageTreadLogo.png";
import downloadImageAppStore from "../assets/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg";
import downloadImageGoogle from "../assets/google-play-badge.jpg"
import AppleLogin from 'react-apple-login';
const backend_url = process.env.REACT_APP_PROD_BACKEND
const env_client_id = process.env.REACT_APP_CLIENT_ID
//const APPLE_REDIRECT_URL =
//const env_redirect_url = process.env.REACT_APP_APPLE_REDIRECT_URL

const Login = () => {
  const [deviceToken, setToken] = useState("");
  const [load, setLoad] = useState(false);

  useEffect(() => {
    function moveCurrentChallenge(response){
      window.location.href = "./currentChallengePage";
    }
    if(!load){
      getUsername(moveCurrentChallenge);
      setLoad(true);
    }
  }, [load]);

  // needs variable for nonce
  function handleCredentialResponse(token) {
    // Check that recieved nonce is correct
    // Send request to backend for nonce reply in result with cnonce:
    // nonce with timestamp so repeat attacks won't work.
    // Figure out CSRF attacks (double cookie sending)
    // Also alot of stuff will have to change for HTTPS.
    console.log(`${token.credential}`);
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

  function loadScript(scriptUrl) {
    const script = document.createElement('script');
    script.src = scriptUrl;
    document.body.appendChild(script);

    return new Promise((res, rej) => {
      script.onload = function () {
        res();
      }
      script.onerror = function () {
        rej();
      }
    });
  }

  function googleSignIn() {
    if (window.google) {
      const google = window.google;
      google.accounts.id.initialize({
        client_id: env_client_id,
        callback: handleCredentialResponse,
        // Need to set a random nonce
        nonce: ""
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }  // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    }
  }

  // google sign in
  loadScript('https://accounts.google.com/gsi/client')
    .then(() => {
      googleSignIn();
      setDeviceToken();
    })
    .catch(() => {
      console.error('Script loading failed! Handle this error');
    });


  // log out function to log the user out of google and set the profile array to null

  const setDeviceToken = () => {
    getToken(exportMessaging, { vapidKey: "BDXZrQCKEnAfnJWh6oIbEYKTuogSmiNl4gKVIDNmOEabzRt2BpAVIV4Znb7OgKzWJAz9eLOKde6YhWLpAdw1EZ0" }).then((currentToken) => {
      if (currentToken) {
        console.log("Setting token here", currentToken);
        setToken(currentToken);
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        requestPermission();
        // ...
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });

  }

  /*{<AppleLogin
  clientId={env_apple_client_id}
  redirectURI={env_redirect_url}
  usePopup={true}
  callback={appleCallback} // Catch the response
  scope="email name"
  responseMode="query"
  render={renderProps => (  //Custom Apple Sign in Button
            <button
              onClick={renderProps.onClick}
              style={{
                    backgroundColor: "white",
                    padding: 10,
                    border: "1px solid black",
                    fontFamily: "none",
                    lineHeight: "25px",
                    fontSize: "25px"
                  }}
                >
                  <i className="fa-brands fa-apple px-2 "></i>
                  Continue with Apple
            </button>
              )}/>} response
   */
  const appleCallback = (response) => {
    console.log(response);
  }
  return (
  <div id = "loginPage">
    <div id = "loginPageWeb">
      <div id = "logoBox">
        <div>
          <img id="treadLogo" src={frontPageTreadLogo} alt="logo" />
        </div>
        <div className='titleBox'>
            <p id = "frontPageTitle">Tread</p>
            <p id = "frontPageSubtitle">Stay Fit with Friends</p>
        </div>
      </div>
      <p className='frontPageDescriptionText'>{hardCodedInfo.frontPageDescription}</p>
      <div id="buttonDiv"></div>

      </div>

      <div id = "loginPageMobile">
        <div id = "frontPageLogoSectionMobile">
          <img id="treadLogo" src={frontPageTreadLogo} alt="logo" />
          <p id = "frontPageTitleMobile">Tread</p>
        </div>

      </div>
  </div>)
}
export default Login;