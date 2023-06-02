import React from 'react';
import axios from 'axios';
import '../css/Login/login.css';
import { getToken } from 'firebase/messaging';
import { exportMessaging, requestPermission } from "../firebase";
import { useState, useEffect } from "react";
import  hardCodedInfo  from "../helpers/SharedHardCodeInfo.json";
import { getUsername } from '../routes/user';
import frontPageTreadLogo from "../assets/frontPageTreadLogo.png";
import AppleSigninButton from '../components/Login/AppleSignInButton';
const backend_url = process.env.REACT_APP_PROD_BACKEND
const env_client_id = process.env.REACT_APP_CLIENT_ID
//const APPLE_REDIRECT_URL =
//const env_redirect_url = process.env.REACT_APP_APPLE_REDIRECT_URL

const Login = () => {
  const [deviceToken, setToken] = useState("");
  const [load, setLoad] = useState(false);
  const [loadedToken, setLoadedToken] = useState(false);

  useEffect(() => {
    function moveCurrentChallenge(response){
      window.location.href = "./currentChallengePage";
    }

    if(!load){
      window.addEventListener('resize', handleResize)
      if(window.innerWidth >= 641){
        loadGoogleScriptOnScreenLoad();
      }
      getUsername(moveCurrentChallenge);
      setLoad(true);
    }

  }, [load]);


  useEffect(() => {
    if(loadedToken){
      googleSignIn();
    }
  }, [loadedToken]);

  // needs variable for nonce
  function handleCredentialResponse(token) {

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
      console.log("toke", deviceToken);
      google.accounts.id.initialize({
        client_id: env_client_id,
        callback: handleCredentialResponse,
        nonce: ""
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDivGoogle"),
        { theme: "outline", size: "large" }
      );
      google.accounts.id.prompt();
    }
  }

  function loadGoogleScriptOnScreenLoad(){
    loadScript('https://accounts.google.com/gsi/client')
        .then(() => {
          setDeviceToken();


        })
        .catch(() => {

          console.error('Script loading failed! Handle this error');
        });
  }
  // log out function to log the user out of google and set the profile array to null
  function handleResize(event){
    if(window.innerWidth >= 641){
      loadGoogleScriptOnScreenLoad()
    }
  }
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
    setLoadedToken(true);

  }

  return (
  <div data-testid="LoginComponent" id = "loginPage">
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
      <p data-testid="LoginFrontPageDescription" className='frontPageDescriptionText'>{hardCodedInfo.frontPageDescription}</p>
      <div id="buttonDivGoogle"></div>
      <AppleSigninButton/>
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