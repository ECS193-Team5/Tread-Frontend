import React, { useState, useEffect } from "react";

import PhotoDisplay from "./PhotoDisplay";
import BoxLine from "./BoxLine";
import ProgressBar from "../Shared/ProgressBar";
import Line from "../Shared/Line";
import Leaderboard from "../Shared/Leaderboard";
import { getChallengeLeaderboard } from "../../routes/challenges";
import { flipButton } from "../../helpers/CssEffects";
import { getChallengeTitle, calculateProgress } from "../../helpers/calculationHelpers";
import "../../css/Challenge/challengeObj.css";
import "../../css/Shared/button.css";

import challengeDropDownButton from "../../assets/challengeDropdown.png";
import ShowDueDate from "./ShowDueDate";
const IssuedChallengeObj = (props) => {
    const [leaderboardInfo, setLeaderboardInfo] = useState([]);
    const [showState, setState] = useState(false);

    let myProgressBaseUnits = props.children.progress.progress;
    let totalBaseUnits = props.children.progress.exercise.convertedAmount;
    let totalRealUnits = props.children.progress.exercise.amount;
    let myProgressRealUnits = calculateProgress(myProgressBaseUnits, props.children.exercise.unit);
    let percentageDone = myProgressBaseUnits / totalBaseUnits * 100;
    let title = getChallengeTitle(props.children.exercise);
    let challengeID = props.children._id;

    useEffect(
        () => {
            if (showState) {
                getChallengeLeaderboard(props.children._id, parseChallengeLeaderboard);
            }
        }, [showState]
    );

    function makeLeaderboardObj(item, index) {
        let entry = {}
        entry["level"] = index + 1;
        entry["photo"] = item["pictures"];
        entry["name"] = item["username"];
        entry["complete"] = item["progress"] / totalBaseUnits * 100;
        entry["score"] = calculateProgress(item["progress"], props.children.exercise.unit);
        return entry;
    }

    const parseChallengeLeaderboard = (response) => {
        setLeaderboardInfo(response.data.map(makeLeaderboardObj));
    }

    function toggleState() {
        setState(!showState);
        flipButton(challengeID + "button", showState);
    }

    return (
        <div data-testid="IssuedChallengeObjComponent" id={"issuedChallengeObj" + props.children._id} className="completeChallengeBox">
            <div className="challengeBox">
                <div className="photoDiv">
                    <PhotoDisplay photos={props.children.participants}></PhotoDisplay><BoxLine></BoxLine>
                </div>
                <div className="challengeMiddle">
                    <div className="challengeInnerMiddle">
                        <p data-testid="IssuedChallengeObjTitle" className="challengeText">{title}</p>
                        <ShowDueDate dueDate = {props.children.dueDate}/>
                    </div>
                    <div className="challengeInnerMiddle">
                        <ProgressBar>{{ "completed": percentageDone }}</ProgressBar>
                    </div>
                </div>

                <div className="challengeEnd">
                    <button data-testid="IssuedChallengeObjToggleStateButton" className="challengeDropButton" onClick={toggleState}>
                        <img src={challengeDropDownButton} id={challengeID + "button"} alt="expandButton" />
                    </button>
                    {
                        (percentageDone < 100) ?
                            <p data-testid="IssuedChallengeObjPartialProgress" className="challengeInnerEnd">{myProgressRealUnits}/{totalRealUnits}</p>
                            :
                            <p data-testid="IssuedChallengeObjCompleteProgress" className="challengeInnerEnd">{totalRealUnits}/{totalRealUnits}</p>
                    }
                </div>

            </div>

            {showState ?
                <div className="leaderboardSection">
                    <Line></Line>
                    <Leaderboard>{{ "title": "Challenge", "entries": { leaderboardInfo } }}</Leaderboard>
                </div>
                :
                <></>
            }
        </div>
    );
}

export default IssuedChallengeObj;