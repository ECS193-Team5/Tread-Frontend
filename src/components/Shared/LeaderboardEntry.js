import ProgressBar from "./ProgressBar";
import "../../css/Shared/leaderboard.css";
import {createProfilePictureURL} from "../../helpers/CloudinaryURLHelpers";

const LeaderboardEntry = (props) => {
    return (
    <div id = "LeaderboardEntry">
        <div className = "leaderboardEntryImage">
            {(props.children.level === 1) ? <img src = "https://i.imgur.com/m5iDo4X.png" alt = "first place trophy"/>: <></>}
            {(props.children.level === 2) ? <img src = "https://i.imgur.com/QctK692.png" alt = "second place trophy"/>: <></>}
            {(props.children.level === 3) ? <img src = "https://i.imgur.com/QaT2m92.png" alt = "third place trophy"/>: <></>}
            {(props.children.level !== 1 && props.children.level !== 2 && props.children.level !== 3) ? <p>{props.children.level}</p>: <></>}
        </div>
        <div className = "leaderboardRightSide">
            <img className = "leaderboardPhoto firstDiv" src={createProfilePictureURL(props.children.name)} alt = "profile"/>
            <p className="leaderboardText secondDiv">{props.children.name}</p>
            <div className = "thirdDiv">
                <ProgressBar>{{"completed":props.children.complete}}</ProgressBar>
            </div>
            <img className = "leaderboardPhoto fourthDiv" src= "https://i.imgur.com/lfvWyWP.png" alt = "flame"/>
            <p className="leaderboardText fifthDiv">{props.children.score}</p>
        </div>
    </div>
    );
}

export default LeaderboardEntry;