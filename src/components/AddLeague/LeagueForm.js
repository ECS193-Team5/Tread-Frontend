import React, { useState } from "react";
import Line from "../Shared/Line";
import PhotoUploadForm from "../Shared/Form/PhotoUploadForm";
import LeagueDescriptionForm from "../Shared/Form/LeagueDescriptionForm";
import LeagueNameForm from "../Shared/Form/LeagueNameForm";
import LeagueTypeForm from "../Shared/Form/LeagueTypeForm";
import { createLeague } from "../../routes/league";
import { setLocation } from "../../helpers/CssEffects";
import '../../css/Shared/form.css';
import '../../css/Shared/button.css';

const LeagueForm = () => {
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

  const moveSocialLeaguePage = () => {
    setLocation("./socialLeaguePage");
  }

  const setError = () => {
    setSubmitError("The league could not be created. Please try again later.");
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

    createLeague(formData, moveSocialLeaguePage, setError);
  }

  return (
    <div data-testid="LeagueFormComponent" id="LeagueForm" className="Form">
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
        <button data-testid="LeagueFormButton" className="submitButton" onClick={submitLeague}><p className="submitButtonText">Submit</p></button>
        <p data-testid="LeagueFormButtonErrorBox" className="errorBox">{submitError}</p>
      </div>

    </div>
  );
}

export default LeagueForm;