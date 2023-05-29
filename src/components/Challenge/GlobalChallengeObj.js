import React, { useState, useEffect } from "react";

import BoxLine from "./BoxLine";
import ProgressBar from "../Shared/ProgressBar";
import Line from "../Shared/Line";
import Leaderboard from "../Shared/Leaderboard";
import { flipButton } from "../../helpers/CssEffects";
import { getChallengeTitle, calculateProgress } from "../../helpers/calculationHelpers";
import { getGlobalChallengeLeaderboard } from "../../routes/global_challenges";
import globalChallengeImage from "../../assets/globalChallenge.png";
import "../../css/Challenge/challengeObj.css";
import challengeDropDownButton from "../../assets/challengeDropdown.png";
import ShowDueDate from "./ShowDueDate";

const GlobalChallengeObj = (props) => {
    const [showState, setState] = useState(false);
    const [leaderboardInfo, setLeaderboardInfo] = useState([]);
    const [load, setLoad] = useState(false);

    let myProgressBaseUnits = props.children.progress;
    let totalBaseUnits = props.children.exercise.convertedAmount;
    let totalRealUnits = props.children.exercise.amount;
    let dueDate = props.children.dueDate.split("T")[0];
    let percentageDone = myProgressBaseUnits / totalBaseUnits * 100;
    let title = getChallengeTitle(props.children.exercise)
    let challengeID = props.children.challengeID;
    let myProgressRealUnits = calculateProgress(myProgressBaseUnits, props.children.exercise.unit);

    useEffect(
        () => {
            if (!load) {
                getGlobalChallengeLeaderboard(challengeID, buildLeaderboard);
                setLoad(true);
            }
        }, [load]
    );

    function selfInTop5(top5, selfData) {
        let myUsername = selfData.username;

        for (let i = 0; i < top5.length; i++) {
            if (myUsername === top5[i].username) {
                return true;
            }
        }
        return false;
    }

    function buildLeaderboard(response) {
        let top5 = response.data[0];
        let selfData = response.data[1];

        let top5Info = top5.map(makeLeaderboardObj);

        if (!selfInTop5(top5, selfData)) {
            let item = makeLeaderboardObj(selfData, 6);
            item["level"] = " - ";
            top5Info.push(item);
        }

        setLeaderboardInfo(top5Info);
    }

    function makeLeaderboardObj(item, index) {
        let entry = {}
        entry["level"] = index + 1;
        entry["name"] = item["username"];
        entry["complete"] = item["progress"] / totalBaseUnits * 100;
        entry["score"] = calculateProgress(item["progress"], props.children.exercise.unit);
        return entry;
    }

    function toggleState() {
        setState(!showState);
        flipButton(challengeID + "button", showState);
    }

    return (
        <div data-testid={"GlobalChallengeObjComponent"+props.index} className="completeChallengeBox">
            <div className="challengeBox">
                <div className="photoDiv">
                    <div className="globalPhotoDiv">
                        <img className="innerGlobalPhotoDiv" src={globalChallengeImage} />
                        <p data-testid={"GlobalChallengeObjGlobal"+props.index} className="innerGlobalPhotoDiv challengeText">Global</p>
                    </div>
                    <BoxLine></BoxLine>
                </div>

                <div className="challengeMiddle">
                    <div className="challengeInnerMiddle">
                        <p data-testid={"GlobalChallengeObjTitle"+props.index} className="challengeText">{title}</p>
                        <ShowDueDate index = {props.index} dueDate = {props.children.dueDate} issueDate={props.children.issueDate}/>
                    </div>
                    <div className="challengeInnerMiddle">
                        <ProgressBar>{{ "completed": percentageDone }}</ProgressBar>
                    </div>
                </div>

                <div className="challengeEnd">
                    <button data-testid={"GlobalChallengeObjToggleStateButton"+props.index} className="challengeDropButton" onClick={toggleState}>
                        <img src={challengeDropDownButton} id={challengeID + "button"} alt="expandButton" />
                    </button>
                    {
                        (percentageDone < 100) ?
                            <p data-testid={"GlobalChallengeObjPartialProgress"+props.index} className="challengeInnerEnd">{myProgressRealUnits}/{totalRealUnits}</p>
                            :
                            <p data-testid={"GlobalChallengeFinishedProgress"+props.index} className="challengeInnerEnd">{totalRealUnits}/{totalRealUnits}</p>
                    }
                </div>

            </div>


            {showState
                ?
                <div className="leaderboardSection">
                    <Line></Line>
                    <Leaderboard uniqueIdentifier = {props.index}>{{ "title": "Global Challenge", "entries": { leaderboardInfo } }}</Leaderboard>
                </div>
                :
                <></>
            }

        </div>
    );

}

export default GlobalChallengeObj;