import React from "react";
import SideBar from "../components/Shared/SideBar";
import Header from "../components/Shared/Header";
import Line from "../components/Shared/Line";
import ProfileSettingsForm from "../components/ProfileSettings/ProfileSettingsForm";
import DeleteSection from "../components/ProfileSettings/DeleteSection";
import { useState, useEffect } from "react";
import axios from 'axios';
import "../css/Shared/page.css";
import {createProfilePictureURL} from "../helpers/CloudinaryURLHelpers";

const backend_url = process.env.REACT_APP_PROD_BACKEND;
const ProfileSettings = () => {
  const [load, setLoad] = useState(false);
  const [photo, setPhoto] = useState();
  const [displayName, setDisplayName] = useState("");

  useEffect(
    () => {
      if (!load) {
        getPhoto();
        getDisplayName();
        setLoad(true);
      }
    }, [load]
  );

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
        setDisplayName(response.data.displayName);
      })
      .catch(function (error) {
      });
  }

  function getPhoto() {
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
        setPhoto(createProfilePictureURL(response.data));
        return response.data;
      })
      .catch(function (error) {
      });
  }



  return (
    <div id="ProfileSettings" className="Body2Part">
      <div className="leftSide2Part">
        <SideBar></SideBar>
      </div>
      <div className="rightSide2Part">
        <div className="mainInfo">
          <Header>{{ "title": "Profile Settings", "type": "none" }}</Header>
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