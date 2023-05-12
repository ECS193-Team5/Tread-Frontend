import { useState, useEffect } from "react";
import PhotoUploadForm from "../Shared/Form/PhotoUploadForm";
import LeagueNameForm from "../Shared/Form/LeagueNameForm";
import LeagueDescriptionForm from "../Shared/Form/LeagueDescriptionForm";
import LeagueTypeForm from "../Shared/Form/LeagueTypeForm";
import Line from "../Shared/Line";
import { createLeaguePictureURL } from "../../helpers/CloudinaryURLHelpers";
import { getLeagueInfo, updateLeagueDescription, updateLeaguePhoto, updateLeagueName, updateLeagueType, deleteLeague } from "../../routes/league";
import "../../css/Shared/coloredText.css";

const LeagueEditForm = (props) => {
    const [load, setLoad] = useState("");
    const [defaultLeagueName, setDefaultLeagueName] = useState("");
    const [defaultLeagueDescription, setDefaultLeagueDescription] = useState("");
    const [defaultLeagueType, setDefaultLeagueType] = useState("");
    const [name, setLeagueName] = useState("");
    const [description, setLeagueDescription] = useState("");
    const [photo, setPhoto] = useState("");
    const [type, setLeagueType] = useState("");
    const [submitError, setSubmitError] = useState("");
    const [deleteError, setDeleteError] = useState("");

    useEffect (
        () => {
            if(!load){
                getLeagueInfo(props.leagueID, setUpPage);
                setLoad(true);
            }
        }, [load]
    );

    function setUpPage(response){
        setDefaultLeagueName(response.data.leagueName);
        setDefaultLeagueDescription(response.data.leagueDescription);
        setDefaultLeagueType(response.data.leagueType);
    }

    const submitUpdatedPhoto = () => {
        if (photo === "") {
            return;
        }

        var formData = new FormData();
        formData.append("leaguePicture", photo);
        formData.append("leagueID", props.leagueID);

        updateLeaguePhoto(formData);
    }

    const submitUpdatedName = () => {
        if (name === "") {
            return;
        }

        updateLeagueName(props.leagueID, name);
    }

    const submitUpdatedDescription = () => {
        if (description === "") {
            return;
        }

        updateLeagueDescription(props.leagueID, description);
    }

    const submitUpdatedType = () => {
        if (type === "") {
            return;
        }

        updateLeagueType(props.leagueID, type);
    }

    function submit(){
        setSubmitError("");
        submitUpdatedPhoto();
        submitUpdatedDescription();
        submitUpdatedName();
        submitUpdatedType();
        setSubmitError("Succesfully updated league information.")
    }

    function moveLeaguePage(){
        setDeleteError("Succesfully deleted league.");
        window.location.href = "./SocialLeaguePage";
    }

    function setLeagueError(){
        setDeleteError("Could not delete league.")
    }

    function onDeleteLeague(){
        deleteLeague(props.leagueID, moveLeaguePage, setLeagueError);
    }

    return (
        <div>
            <div className="formObj">
                <h2>League Picture</h2>
                <PhotoUploadForm>{{ "default": createLeaguePictureURL(props.leagueID), "func": setPhoto }}</PhotoUploadForm>
            </div>

            <LeagueNameForm defaultValue = {defaultLeagueName} updateLeagueName={setLeagueName} />
            <LeagueDescriptionForm defaultValue = {defaultLeagueDescription} updateDescription={setLeagueDescription} />
            <LeagueTypeForm defaultValue={defaultLeagueType} updateLeagueType={setLeagueType} />
            <button className="submitButton" onClick={submit}><p className="submitButtonText">Submit</p></button>
            <p className = "greenBaseText">{submitError}</p>

            <Line></Line>
            <h2>Delete League</h2><p>
            <span className = "greenBaseText">This will </span>
            <span className = "redBaseText">permanently delete</span>
            <span className = "greenBaseText"> your league. You will </span>
            <span className = "redBaseText">lose</span>
            <span className = "greenBaseText"> all the previous challenges, leaderboard, and history. There will be </span>
            <span className = "redBaseText">no</span>
            <span className = "greenBaseText"> recovery</span></p>
            <button className = "deleteButton" onClick = {onDeleteLeague}><p className = "deleteButtonText">Delete</p></button>
            <p className="errorBox">{deleteError}</p>
            <p><br></br></p>
        </div>);
}

export default LeagueEditForm;