import React from "react";
import {createProfilePictureURL} from "../../helpers/CloudinaryURLHelpers";
import firstMedal from "../../assets/firstMedal.png";
import secondMedal from "../../assets/secondMedal.png";
import thirdMedal from "../../assets/thirdMedal.png";
import "../../css/Shared/leaderboard.css";

const LeagueLeaderboardEntry = (props) => {
    console.log(props);
    return (
    <div data-testid={"LeagueLeaderboardEntryComponent"+props.index} id = "LeaderboardEntry">
        <div className = "leaderboardEntryImage">
            {(props.children.level === 1) ? <img src = {firstMedal}/>: <></>}
            {(props.children.level === 2) ? <img src = {secondMedal}/>: <></>}
            {(props.children.level === 3) ? <img src = {thirdMedal}/>: <></>}
            {(props.children.level !== 1 && props.children.level !== 2 && props.children.level !== 3) ? <p>{props.children[2]}</p>: <></>}
        </div>
        <div className = "leaderboardRightSide">
            <img className = "leaderboardPhoto firstDiv" src={createProfilePictureURL(props.children[0])}/>
            <p data-testid={"LeagueLeaderboardEntryUserName"+props.index} className="leaderboardText secondDiv">{props.children[0]}</p>
            <p data-testid={"LeagueLeaderboardEntryProgress"+props.index} className="leaderboardText fifthDiv">{props.children[1]}</p>
        </div>
    </div>
    );
}

export default LeagueLeaderboardEntry;