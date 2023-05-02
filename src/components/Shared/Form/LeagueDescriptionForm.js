import { useState, useEffect } from "react";
const LeagueDescriptionForm = (props) => {
    const [descriptionError, setDescriptionError] = useState("");

    useEffect (
        () => {
            if(props.defaultValue){
                document.getElementById("leagueDescriptionInput").value = props.defaultValue;
                setDescriptionError("");
            }
        }, [props.defaultValue]
    );


    const updateDescription = (event) => {
        if (event.target.value === "") {
            setDescriptionError("Need to fill in a description");
            props.updateDescription("");
            return;
        }

        if (event.target.value.length > 255){
            setDescriptionError("League description is too long. Please limit to 255 characters.")
            props.updateDescription("");
            return false;
        }

        setDescriptionError("");
        props.updateDescription(event.target.value);
    }

    return (
        <div className="formObj">
            <h2>League Description</h2>
            <input id = "leagueDescriptionInput"  className="formTextInput" onChange={updateDescription} type="text" />
            <p className="errorBox">{descriptionError}</p>
        </div>
    );
}

export default LeagueDescriptionForm;