import { useState, useEffect } from "react";
import PhotoUploadForm from "../Shared/Form/PhotoUploadForm";
import LeagueNameForm from "../Shared/Form/LeagueNameForm";
import LeagueDescriptionForm from "../Shared/Form/LeagueDescriptionForm";
import LeagueTypeForm from "../Shared/Form/LeagueTypeForm";
import Line from "../Shared/Line";
import { createLeaguePictureURL } from "../../Helpers/CloudinaryURLHelpers";
import { getLeagueInfo } from "../../PostRequests/league";
import "../../css/Shared/coloredText.css";

import axios from 'axios';
const backend_url = process.env.REACT_APP_PROD_BACKEND;

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

        var config = {
            method: 'post',
            url: backend_url + 'league/update_picture',
            headers: {
                Accept: 'application/json',
            },
            withCredentials: true,
            credentials: 'include',
            data: formData
        };
        axios(config)
            .then(function (response) {
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    window.location.href = "/loginPage";
                }
                console.log(error)
            });

    }

    const submitUpdatedName = () => {
        if (name === "") {
            return;
        }

        var config = {
            method: 'post',
            url: backend_url + 'league/update_name',
            headers: {
                Accept: 'application/json',
            },
            withCredentials: true,
            credentials: 'include',
            data: {
                leagueName: name,
                leagueID: props.leagueID
            }
        };
        axios(config)
            .then(function (response) {
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    window.location.href = "/loginPage";
                }
                console.log(error)
            });
    }

    const submitUpdatedDescription = () => {
        if (description === "") {
            return;
        }

        var config = {
            method: 'post',
            url: backend_url + 'league/update_description',
            headers: {
                Accept: 'application/json',
            },
            withCredentials: true,
            credentials: 'include',
            data: {
                leagueDescription: description,
                leagueID:props.leagueID
            }
        };
        axios(config)
            .then(function (response) {
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    window.location.href = "/loginPage";
                }
                console.log(error)
            });
    }

    const submitUpdatedType = () => {
        if (type === "") {
            return;
        }

        var config = {
            method: 'post',
            url: backend_url + 'league/update_type',
            headers: {
                Accept: 'application/json',
            },
            withCredentials: true,
            credentials: 'include',
            data: {
                leagueType: type,
                leagueID:props.leagueID
            }
        };
        axios(config)
            .then(function (response) {
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    window.location.href = "/loginPage";
                }
                console.log(error)
            });
    }

    function submit(){
        setSubmitError("");
        submitUpdatedPhoto();
        submitUpdatedDescription();
        submitUpdatedName();
        submitUpdatedType();
        setSubmitError("Succesfully updated league information.")
    }
    function deleteLeague(){
        var config = {
            method : 'post',
            url : backend_url + 'league/delete_league',
            headers: {
              Accept: 'application/json',
            },
            withCredentials: true,
            credentials: 'include',
            data:{
                leagueID: props.leagueID
            }
          };
          axios(config)
          .then(function(response) {
              window.location.href = "./SocialLeaguePage";
          })
          .catch(function(error){
              setDeleteError("Could not delete league.")
              if(error.response.status===401){
                window.location.href = "/loginPage";
            }
          });
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
            <button className = "deleteButton" onClick = {deleteLeague}><p className = "deleteButtonText">Delete</p></button>
            <p className="errorBox">{deleteError}</p>
            <p><br></br></p>
        </div>);
}

export default LeagueEditForm;