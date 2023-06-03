import React from "react";
import SideBar from "../components/Shared/SideBar";
import Header from "../components/Shared/Header";
import Line from "../components/Shared/Line";
import ProfileSettingsForm from "../components/ProfileSettings/ProfileSettingsForm";
import DeleteSection from "../components/ProfileSettings/DeleteSection";
import { useState, useEffect } from "react";
import {getUsername, getDisplayName} from "../routes/user";
import "../css/Shared/page.css";
import {createProfilePictureURL} from "../helpers/CloudinaryURLHelpers";

const ProfileSettings = () => {
  const [load, setLoad] = useState(false);
  const [photo, setPhoto] = useState();
  const [displayName, setDisplayName] = useState("");

  useEffect(
    () => {
      if (!load) {
        getUsername(processUsername);
        getDisplayName(setDisplayName);
        setLoad(true);
      }
    }, [load]
  );

  const processUsername = (data) => {
    setPhoto(createProfilePictureURL(data));
  }

  return (
    <div data-testid="ProfileSettingsComponent" id="ProfileSettings" className="Body2Part">
      <div className="leftSide2Part">
        <SideBar></SideBar>
      </div>
      <div className="rightSide2Part">
        <div className="mainInfo">
          <Header>{{ "title": "Profile Settings", "type": "none", "leagueID":"NA" }}</Header>
          <Line></Line>
          <ProfileSettingsForm>{{ "photo": photo, "displayName": displayName }}</ProfileSettingsForm>
          <Line></Line>
          <DeleteSection></DeleteSection>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;