import { useState, useEffect } from "react";

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
            let item = selfData.map(makeLeaderboardObj);
            item[0]["level"] = " - ";
            top5Info.push(item[0]);
        }

        setLeaderboardInfo(top5Info);
    }

    function makeLeaderboardObj(item, index) {
        let entry = {}
        entry["level"] = index + 1;
        entry["photo"] = item["pictures"];
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
        <div className="completeChallengeBox">
            <div className="challengeBox">
                <div className="photoDiv">
                    <div className="globalPhotoDiv">
                        <img className="innerGlobalPhotoDiv" src={globalChallengeImage} />
                        <p className="innerGlobalPhotoDiv challengeText">Global</p>
                    </div>
                    <BoxLine></BoxLine>
                </div>

                <div className="challengeMiddle">
                    <div className="challengeInnerMiddle">
                        <p className="challengeText">{title}</p>
                        <p className="challengeText">{dueDate}</p>
                    </div>
                    <div className="challengeInnerMiddle">
                        <ProgressBar>{{ "completed": percentageDone }}</ProgressBar>
                    </div>
                </div>

                <div className="challengeEnd">
                    <button className="challengeDropButton" onClick={toggleState}>
                        <img src={challengeDropDownButton} id={challengeID + "button"} alt="expandButton" />
                    </button>
                    {
                        (percentageDone < 100) ?
                            <p className="challengeInnerEnd">{myProgressRealUnits}/{totalRealUnits}</p>
                            :
                            <p className="challengeInnerEnd">{totalRealUnits}/{totalRealUnits}</p>
                    }
                </div>

            </div>


            {showState
                ?
                <div className="leaderboardSection">
                    <Line></Line>
                    <Leaderboard>{{ "title": "Global Challenge", "entries": { leaderboardInfo } }}</Leaderboard>
                </div>
                :
                <></>
            }

        </div>
    );

}

export default GlobalChallengeObj;