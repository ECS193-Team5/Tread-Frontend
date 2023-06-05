import React, { useState, useEffect } from 'react';
import PhotoUploadForm from '../Shared/Form/PhotoUploadForm';
import UsernameForm from '../Shared/Form/UsernameForm';
import DisplayNameForm from '../Shared/Form/DisplayNameForm';
import { signUp } from '../../routes/sign_up';
import { setDeviceToken } from "../../helpers/firebaseHelpers";

import '../../css/SignUp/signUpForm.css';
import '../../css/Shared/button.css';
import '../../css/Shared/form.css';
import '../../css/Shared/headerText.css';


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
        setDeviceToken(setToken);
        setLoad(true);
      }
    }, [load]
  );


  const validateInputs = () => {
    setSubmitError("");
    let errorMessage = "";

    if (username === ""){
      errorMessage += "Please select a username. ";
    }
    if (displayName === ""){
      errorMessage += "Please select a display name. ";
    }
    setSubmitError(errorMessage);
    return (errorMessage === "");
  }

  function submitSignUp() {

    if(!validateInputs()){
      return;
    }



    var formData = new FormData();
    formData.append("username", username);
    formData.append("displayName", displayName);
    formData.append("deviceToken", deviceToken);
    formData.append("picture", photo);

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
        <PhotoUploadForm type = "signUp" setPhoto={setPhoto}></PhotoUploadForm>
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