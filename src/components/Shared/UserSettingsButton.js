import React, { useState, useEffect } from 'react';
import DropDown from './DropDown';
import { createProfilePictureURL } from "../../helpers/CloudinaryURLHelpers";
import { flipButton } from '../../helpers/CssEffects';
import { logout } from '../../routes/auth';
import { getUsername, getDisplayName} from "../../routes/user";
import {setDeviceToken} from "../../helpers/firebaseHelpers";
import dropdownImage from "../../assets/dropdown.png";
import "../../css/Shared/userSettingsButton.css";
import "../../css/Shared/form.css";


const UserSettingsButton = () => {
  const [deviceToken, setToken] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [profilePhoto, setPhoto] = useState("");
  const [logoutDisplay, setLogoutDisplay] = useState(false);
  let dropdownFunctions = [{"name":"Logout", "func":callLogout}];

  useEffect(
    () => {
        setDeviceToken(setToken);
        getUsername(processUsername);
        getDisplayName(setDisplayName);
      }
  );

  function toggleLogoutDisplay() {
    setLogoutDisplay(!logoutDisplay);
    flipButton("UserSettingsTriangle", logoutDisplay);
  }

  const processUsername = (data) => {
    setUsername(data);
    setPhoto(createProfilePictureURL(data));
  }

  function callLogout () {
    logout(deviceToken);
  }

  return (
    <div data-testid="UserSettingsButtonComponent" id="UserSettingsButton" >
      <div id="UserSettingsLeft">
        <div>
          <img id="UserSettingButtonProfileImage" src={profilePhoto} alt="Profile" />
        </div>
        <div id="userSettingNaming">
          <p data-testid="UserSettingsButtonDisplayName" id="userSettingDisplayName">{displayName}</p>
          <p data-testid="UserSettingsButtonUsername" id="userSettingUsername">{username}</p>
        </div>
      </div>
      <div id="userSettingButtonSection">
        <button data-testid="UserSettingsButtonUserDropDown" id = "buttonUserDropDown" className="dropDownButton" onClick={toggleLogoutDisplay}><img id="UserSettingsTriangle" src={dropdownImage} alt="Dropdown" /></button>
        {
          logoutDisplay ?
          <div className = "userSettingsDropDown"><DropDown uniqueDeterminer = {"userSettingsDropDown"}>{dropdownFunctions}</DropDown></div>

            : <></>
        }

      </div>
    </div>
  );
}


export default UserSettingsButton;