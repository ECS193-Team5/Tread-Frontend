import PhotoDisplay from "./PhotoDisplay";
import BoxLine from "./BoxLine";
import AcceptChallengeButton from "./AcceptChallengeButton";
import DeclineChallengeButton from "./DeclineChallengeButton";
import { getChallengeTitle } from "../../Helpers/calculationHelpers";

const ReceivedChallengeObj = (props) => {
    let title = getChallengeTitle(props.children.exercise);
    let dueDate = new Date(props.children.dueDate).toISOString().split("T")[0];

    return (
    <div id = {"ReceivedChallengedObj"+props.children._id} className = "challengeBox completeChallengeBox">
        <div className="photoDiv">
            <PhotoDisplay photos = {props.children.participants}></PhotoDisplay>
            <BoxLine></BoxLine>
        </div>
        <div className="challengeMiddle">
            <p className="challengeText">{title}</p>
            <p className="challengeText">{dueDate}</p>
        </div>
        <div className = "challengeEnd">
            <AcceptChallengeButton id = {props.children._id}></AcceptChallengeButton>
            <DeclineChallengeButton id = {props.children._id}></DeclineChallengeButton>
        </div>
    </div>
    );
}

export default ReceivedChallengeObj;