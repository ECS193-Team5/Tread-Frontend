import React, { useState, useEffect } from "react";

const LeagueNameForm = (props) => {
    const [nameError, setNameError] = useState("");

    useEffect (
      () => {
            document.getElementById("leagueNameInput").value = props.defaultValue;
            setNameError("");
      }, [props.defaultValue]
  );

    const updateLeagueName = (event) => {
        let leagueName = event.target.value;
        if (leagueName.length === 0 || leagueName.length > 32){
          setNameError("Cannot create league, League Name must be between 1-32 characters");
          props.updateLeagueName("");
          return false
        }

        setNameError("");
        props.updateLeagueName(leagueName);
      }

    return (
        <div data-testid="LeagueNameFormComponent" className="formObj">
            <h2>League Name</h2>
            <input data-testid="LeagueNameFormUpdateLeagueNameInput" id = "leagueNameInput" className="formTextInput  wordFormTextInput" type="text" onChange={updateLeagueName} />
            <p data-testid="LeagueNameFormNameError" className="errorBox">{nameError}</p>
        </div>
    );

}

export default LeagueNameForm;