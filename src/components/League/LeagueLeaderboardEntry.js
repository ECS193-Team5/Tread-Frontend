import "../../css/Shared/leaderboard.css";
import {createProfilePictureURL} from "../../helpers/CloudinaryURLHelpers";

const LeagueLeaderboardEntry = (props) => {
    console.log(props);
    return (
    <div id = "LeaderboardEntry">
        <div className = "leaderboardEntryImage">
            {(props.children.level === 1) ? <img src = "https://i.imgur.com/m5iDo4X.png"/>: <></>}
            {(props.children.level === 2) ? <img src = "https://i.imgur.com/QctK692.png"/>: <></>}
            {(props.children.level === 3) ? <img src = "https://i.imgur.com/QaT2m92.png"/>: <></>}
            {(props.children.level !== 1 && props.children.level !== 2 && props.children.level !== 3) ? <p>{props.children[2]}</p>: <></>}
        </div>
        <div className = "leaderboardRightSide">
            <img className = "leaderboardPhoto firstDiv" src={createProfilePictureURL(props.children[0])}/>
            <p className="leaderboardText secondDiv">{props.children[0]}</p>
            <p className="leaderboardText fifthDiv">{props.children[1]}</p>
        </div>
    </div>
    );
}

export default LeagueLeaderboardEntry;