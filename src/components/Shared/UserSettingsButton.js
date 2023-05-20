import { useState, useEffect } from 'react';

import axios from 'axios';

import "../../css/Shared/userSettingsButton.css";
import "../../css/Shared/form.css";
import { getToken } from 'firebase/messaging';
import { exportMessaging, requestPermission } from "../../firebase";
import { createProfilePictureURL } from "../../helpers/CloudinaryURLHelpers";
import { flipButton } from '../../helpers/CssEffects';
import DropDown from './DropDown';

const backend_url = process.env.REACT_APP_PROD_BACKEND;

const UserSettingsButton = () => {
  const [deviceToken, setToken] = useState("");
  const [load] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [profilePhoto, setPhoto] = useState("");

  const [logoutDisplay, setLogoutDisplay] = useState(false);
  const [decisionState, setDecisionState] = useState("");

  useEffect(
    () => {
      if (!load) {
        setDeviceToken();
        getUsername();
        getDisplayName();
      }
    }, [load]
  );

  function stopLogoutDisplay() {
    setLogoutDisplay(false);
  }

  function toggleLogoutDisplay() {
    setLogoutDisplay(!logoutDisplay);
    flipButton("UserSettingsTriangle", logoutDisplay);
  }
  function moveProfilePage() {
    window.location.href = "./profileStatsPage"
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

  }

  function getDisplayName() {
    // GET from db
    var config = {
      method: 'post',
      url: backend_url + 'user/get_display_name',
      headers: {
        Accept: 'application/json',
      },
      withCredentials: true,
      credentials: 'include',
    };
    axios(config)
      .then(function (response) {
        setDisplayName(response.data.displayName)
        return response.data.displayName;
      })
      .catch(function (error) {
      });
  }

  function getUsername() {
    var config = {
      method: 'post',
      url: backend_url + 'user/get_username',
      headers: {
        Accept: 'application/json',
      },
      withCredentials: true,
      credentials: 'include',
    };
    axios(config)
      .then(function (response) {
        setUsername(response.data);
        setPhoto(createProfilePictureURL(response.data));
        return response.data;
      })
      .catch(function (error) {
      });
  }



  function movePage(event) {
    setDecisionState(event.target.value);
  }

  function logout() {
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
  let dropdownFunctions = [{"name":"Logout", "func":logout}];
  return (
    <div id="UserSettingsButton" >
      <div id="UserSettingsLeft">
        <div>
          <img id="UserSettingButtonProfileImage" src={profilePhoto} alt="Profile" />
        </div>
        <div id="userSettingNaming">
          <p id="userSettingDisplayName">{displayName}</p>
          <p id="userSettingUsername">{username}</p>
        </div>
      </div>
      <div id="userSettingButtonSection">
        <button id = "buttonUserDropDown" className="dropDownButton" onClick={toggleLogoutDisplay}><img id="UserSettingsTriangle" src="https://i.imgur.com/msPQZqA.png" alt="Dropdown" /></button>
        {
          logoutDisplay ?
          <div className = "userSettingsDropDown"><DropDown>{dropdownFunctions}</DropDown></div>

            : <></>
        }

      </div>

    </div>
  );
}


export default UserSettingsButton;