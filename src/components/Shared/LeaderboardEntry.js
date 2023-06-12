import React from "react";
import ProgressBar from "./ProgressBar";
import "../../css/Shared/leaderboard.css";
import {createProfilePictureURL} from "../../helpers/CloudinaryURLHelpers";
import firstMedal from "../../assets/firstMedal.png";
import secondMedal from "../../assets/secondMedal.png";
import thirdMedal from "../../assets/thirdMedal.png";
import flameImage from "../../assets/flame.png";
const LeaderboardEntry = (props) => {
    return (
    <div data-testid={"LeaderboardEntryComponent"+props.index} id = "LeaderboardEntry">
        <div className = "leaderboardEntryImage">
            {(props.children.level === 1) ? <img src = {firstMedal}/>: <></>}
            {(props.children.level === 2) ? <img src = {secondMedal}/>: <></>}
            {(props.children.level === 3) ? <img src = {thirdMedal}/>: <></>}
            {(props.children.level !== 1 && props.children.level !== 2 && props.children.level !== 3) ? <p data-testid={"LeaderboardEntryLevel"} className = "leaderboardEntryLevel">{props.children.level}</p>: <></>}
        </div>
        <div className = "leaderboardRightSide">
            <img className = "leaderboardPhoto firstDiv" src={createProfilePictureURL(props.children.name)} alt = "profile"/>
            <p data-testid={"LeaderboardEntryUsername"+props.index} className="leaderboardText secondDiv">{props.children.name}</p>
            <div className = "thirdDiv">
                <ProgressBar>{{"completed":props.children.complete}}</ProgressBar>
            </div>
            <img className = "leaderboardPhoto fourthDiv" src= {flameImage} alt = "flame"/>
            <div className = "fifthDiv">
                <p data-testid={"LeaderboardEntryProgress"+props.index} className="leaderboardText">{props.children.score}</p>
            </div>
        </div>
    </div>
    );
}

export default LeaderboardEntry;