import React, { useState, useEffect } from 'react';
import PhotoUploadForm from '../Shared/Form/PhotoUploadForm';
import UsernameForm from '../Shared/Form/UsernameForm';
import DisplayNameForm from '../Shared/Form/DisplayNameForm';
import { signUp } from '../../routes/sign_up';

import '../../css/SignUp/signUpForm.css';
import '../../css/Shared/button.css';
import '../../css/Shared/form.css';
import '../../css/Shared/headerText.css';

import { getToken } from 'firebase/messaging';
import { exportMessaging, requestPermission } from "../../firebase";

const SignUpForm = (props) => {
  const [load, setLoad] = useState(false);

  const [deviceToken, setToken] = useState("");

  const [photo, setPhoto] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");

  const [submitError, setSubmitError] = useState("");

  useEffect(
    () => {
      if (!load) {
        setDeviceToken();
        setLoad(true);
      }
    }, [load]
  );

  const determinePhoto = () => {
    if (photo === "") {
      return props.children.profilePhoto;
    }
    else {
      return photo;
    }
  }

  const setDeviceToken = () => {
    try{
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
  }catch(err){
    console.log("An error occured in get token");
  }
  }

  const validateInputs = () => {
    let errorMessage = "";
    if (username === ""){
      errorMessage += "Please select a username.\n";
    }
    if (displayName === ""){
      errorMessage += "Please select a display name.\n";
    }
    setSubmitError(errorMessage);
    return (errorMessage === "");
  }

  function submitSignUp() {

    if(!validateInputs()){
      return;
    }

    let submitPhoto = determinePhoto();

    var formData = new FormData();
    formData.append("username", username);
    formData.append("displayName", displayName);
    formData.append("deviceToken", deviceToken);
    formData.append("picture", submitPhoto);


    signUp(formData);
  }

  return (
    <div data-testid="SignUpFormComponent" id="SignUpForm">
      <div>
        <p id="title">Tread</p>
        <p id="subtitle">Looks like you're new here</p>
      </div>

      <div className="formObj">
        <h1>Profile Picture</h1>
        <PhotoUploadForm>{{ "default": props.children.profilePhoto, "func": setPhoto }}</PhotoUploadForm>
      </div>

      <UsernameForm updateUsername = {setUsername}/>
      <DisplayNameForm placeholder = "" updateDisplayName = {setDisplayName}/>


      <div className="formObj">
        <button data-testid="SignUpFormSignUpButton" className="submitButton" onClick={submitSignUp}><p className="submitButtonText">Sign Up</p></button>
        <p data-testid="SignUpFormSubmitError" className="errorBox">{submitError}</p>
      </div>

    </div>


  );
}

export default SignUpForm;