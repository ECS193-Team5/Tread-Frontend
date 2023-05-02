import {useState, useEffect} from "react";

import PhotoDisplay from "./PhotoDisplay";
import BoxLine from "./BoxLine";
import ProgressBar from "../Shared/ProgressBar";
import Line from "../Shared/Line";
import Leaderboard from "../Shared/Leaderboard";
import { flipButton } from "../../Helpers/CssEffects";
import hardCodedInfo from "../../Helpers/SharedHardCodeInfo.json";
import axios from "axios";

import "../../css/Challenge/challengeObj.css";
import "../../css/Shared/button.css";

const backend_url = process.env.REACT_APP_PROD_BACKEND;

const IssuedChallengeObj = (props) => {
    console.log(props);
    let myProgressBaseUnits = props.children.progress.progress;
    let totalBaseUnits = props.children.progress.exercise.convertedAmount;
    let totalRealUnits = props.children.progress.exercise.amount;
    let myProgressRealUnits = Math.round(convertProgress(myProgressBaseUnits, props.children.exercise.unit));
    let percentageDone = myProgressBaseUnits/totalBaseUnits * 100;
    let title = props.children.exercise.exerciseName + " " + props.children.exercise.amount + " " + props.children.exercise.unit
    let dueDate = new Date(props.children.dueDate).toISOString().split("T")[0];
    let challengeID = props.children._id;

    const [leaderboardInfo, setLeaderboardInfo] = useState([]);

    const [showState, setState] = useState(false);

    function toggleState(){
        setState(!showState);
        flipButton(challengeID + "button", showState);
    }

    function convertProgress(progress, goal_unit){
        return progress*hardCodedInfo.conversionKey[goal_unit];
    }

    function getLeaderboard(){
        var config = {
            method : 'post',
            url : backend_url + 'challenges/get_challenge_leaderboard',
            headers: {
            Accept: 'application/json',
            },
            withCredentials: true,
            credentials: 'include',
            data:{
                challengeID: challengeID
            }
        };
        axios(config)
        .then(function(response){
            setLeaderboardInfo(response.data.map(makeLeaderboardObj));
            console.log("Item sends: ", leaderboardInfo);
        })
        .catch(function(error){
            console.log(error);
            if(error.response.status===401){
                window.location.href = "/loginPage";
            }
        });
    }


    useEffect (
        () => {
            if(showState){
                getLeaderboard();
            }
        }, [showState]
    );

    function makeLeaderboardObj(item, index){
        console.log(item, index);
        let entry = {}
        entry["level"] = index + 1;
        entry["photo"] = item["pictures"];
        entry["name"] = item["username"];
        entry["complete"] = item["progress"]/totalBaseUnits * 100;
        entry["score"] = Math.round(convertProgress(item["progress"], props.children.exercise.unit));
        return entry;
    }


    return (
    <div id = {"issuedChallengeObj"+props.children._id} className = "completeChallengeBox">
        <div className = "challengeBox">
        <div className="photoDiv">
        <PhotoDisplay photos = {props.children.participants}></PhotoDisplay><BoxLine></BoxLine>
        </div>
        <div className = "challengeMiddle">
            <div className = "challengeInnerMiddle">
                <p className="challengeText">{title}</p>
                <p className="challengeText">{dueDate}</p>

            </div>
            <div className = "challengeInnerMiddle">
                <ProgressBar>{{"completed":percentageDone}}</ProgressBar>
            </div>
        </div>

        <div className = "challengeEnd">
            <button className = "challengeDropButton" onClick = {toggleState}>
                <img src = "https://i.imgur.com/DiUB6gk.png" id = {challengeID+"button"} alt = "expandButton"/>
            </button>
            {
                (percentageDone < 100) ?
                <p className = "challengeInnerEnd">{myProgressRealUnits}/{totalRealUnits}</p>
                :
                <p className = "challengeInnerEnd">Complete</p>
            }
        </div>

        </div>

        {showState ?
            <div className = "leaderboardSection">
                <Line></Line>
                <Leaderboard>{{"title":"Challenge", "entries": {leaderboardInfo}}}</Leaderboard>
            </div>
            :
            <></>
        }
    </div>
    );
}

export default IssuedChallengeObj;