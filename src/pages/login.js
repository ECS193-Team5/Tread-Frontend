import React from 'react';
import '../css/Login/login.css';
import { useState, useEffect } from "react";
import hardCodedInfo from "../helpers/SharedHardCodeInfo.json";
import { getUsername } from '../routes/user';
import frontPageTreadLogo from "../assets/frontPageTreadLogo.png";
import AppleSigninButton from '../components/Login/AppleSignInButton';
import { setDeviceToken } from '../helpers/firebaseHelpers';
import { loginGoogle } from '../routes/auth';
import googlePlayStoreBadge from "../assets/googlePlayBadge.png";
import appleAppStoreBadge from "../assets/appleAppStoreBadge.svg";
const env_client_id = process.env.REACT_APP_CLIENT_ID

const Login = () => {
  const [deviceToken, setToken] = useState("");
  const [load, setLoad] = useState(false);
  const [loadedToken, setLoadedToken] = useState(false);

  useEffect(() => {
    function moveCurrentChallenge(response) {
      window.location.href = "./currentChallengePage";
    }

    if (!load) {

      loadGoogleScriptOnScreenLoad();
      getUsername(moveCurrentChallenge);
      setLoad(true);
    }

  }, [load]);


  useEffect(() => {
    if (loadedToken || deviceToken.length > 0) {
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

  function loadGoogleScriptOnScreenLoad() {
    loadScript('https://accounts.google.com/gsi/client')
      .then(() => {
        setDeviceToken(setToken, setLoadedToken);
      })
      .catch(() => {
        console.error('Script loading failed! Handle this error');
      });
  }

  return (
    <div data-testid="LoginComponent" id="loginPage">
      <div id="loginPageWeb">

        <div id="logoBox">
          <div>
            <img id="treadLogo" src={frontPageTreadLogo} alt="logo" />
          </div>
          <div className='titleBox'>
            <p id="frontPageTitle">Tread</p>
            <p id="frontPageSubtitle">Stay Fit with Friends</p>
          </div>
        </div>
        <p data-testid="LoginFrontPageDescription" className='frontPageDescriptionText'>{hardCodedInfo.frontPageDescription}</p>

        <div id="buttonDivGoogle"></div>
        <div id="appleSignInButton"><AppleSigninButton /></div>

        <div id = "buttonGet">
          <p className='frontPageDescriptionText availableText'>Available on Android and iOS</p>
          <a href='https://play.google.com/store/apps/details?id=com.treadmobile&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img id="googlePlayStoreImage" alt='Get it on Google Play' src={googlePlayStoreBadge} /></a>
          <a href='https://apps.apple.com/us/app/tread-mobile/id6448766159'><img id="appleStoreImage" alt='Download on the App Store' src={appleAppStoreBadge} /></a>
        </div>
      </div>
    </div>)
}
export default Login;