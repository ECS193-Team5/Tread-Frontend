import React from 'react';
import '../css/Login/login.css';
import { useState, useEffect } from "react";
import  hardCodedInfo  from "../helpers/SharedHardCodeInfo.json";
import { getUsername } from '../routes/user';
import frontPageTreadLogo from "../assets/frontPageTreadLogo.png";
import AppleSigninButton from '../components/Login/AppleSignInButton';
import { setDeviceToken } from '../helpers/firebaseHelpers';
import { loginGoogle } from '../routes/auth';
const env_client_id = process.env.REACT_APP_CLIENT_ID

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
    if(loadedToken || deviceToken.length>0){
      googleSignIn();
    }
  }, [loadedToken, deviceToken]);

  // needs variable for nonce
  function handleCredentialResponse(token) {
    loginGoogle(deviceToken, token);
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
          setDeviceToken(setToken, setLoadedToken);
        })
        .catch(() => {
          console.error('Script loading failed! Handle this error');
        });
  }

  function handleResize(event){
    if(window.innerWidth >= 641){
      loadGoogleScriptOnScreenLoad()
    }
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
        <p>Rebekah syas buttons goes here!</p>
      </div>
  </div>)
}
export default Login;