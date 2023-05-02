import { useState } from "react";
import Line from "../Shared/Line";
import PhotoUploadForm from "../Shared/Form/PhotoUploadForm";
import axios from 'axios';

import '../../css/Shared/form.css';
import '../../css/Shared/button.css';
import LeagueDescriptionForm from "../Shared/Form/LeagueDescriptionForm";
import LeagueNameForm from "../Shared/Form/LeagueNameForm";
import LeagueTypeForm from "../Shared/Form/LeagueTypeForm";

const backend_url = process.env.REACT_APP_PROD_BACKEND;


const LeagueForm = (props) => {
  const [photo, setPhoto] = useState("");
  const [leagueName, setLeagueName] = useState("");
  const [leagueDescription, setLeagueDescription] = useState("");
  const [leagueType, setLeagueType] = useState("private");

  const [submitError, setSubmitError] = useState("");


  function validateInputs() {
    setSubmitError("");
    let errorMessage = "";

    if (leagueName === "") {
      errorMessage += "Please create a league name.";
    }

    if (leagueDescription === "" || leagueDescription.length > 255) {
      errorMessage += "Please check the league description.";
    }

    setSubmitError(errorMessage);
    return (errorMessage === "");

  }



  function submitLeague() {
    if (!validateInputs()) {
      return;
    }

    let submitPhoto = photo;
    if (photo === "") {
      submitPhoto = "https://i.imgur.com/sXwXq45.png";
    }

    var formData = new FormData();
    formData.append("leagueName", leagueName);
    formData.append("leagueType", leagueType);
    formData.append("leagueDescription", leagueDescription);
    formData.append("leaguePicture", submitPhoto);

    var config = {
      method: 'post',
      url: backend_url + 'league/create_league',
      headers: {
        Accept: 'application/json',
      },
      withCredentials: true,
      credentials: 'include',
      data: formData
    };
    axios(config)
      .then(function (response) {
        window.location.href = "./socialLeaguePage";
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          window.location.href = "/loginPage";
        }
        setSubmitError("Could not create League for unknown reason")
        console.log(error)
      });
  }

  return (
    <div id="LeagueForm" className="Form">
      <h1>Social Hub</h1>
      <h2>Create a League</h2>
      <Line />

      <div className="formObj">
        <h2>League Picture</h2>
        <PhotoUploadForm>{{ "default": "https://i.imgur.com/sXwXq45.png", "func": setPhoto }}</PhotoUploadForm>
      </div>


      <LeagueNameForm updateLeagueName={setLeagueName} />
      <LeagueDescriptionForm updateDescription={setLeagueDescription} />
      <LeagueTypeForm defaultValue = "private" updateLeagueType={setLeagueType} />


      <div className="formObj">
        <button className="submitButton" onClick={submitLeague}><p className="submitButtonText">Submit</p></button>
        <p className="errorBox">{submitError}</p>
      </div>

    </div>
  );
}

export default LeagueForm;