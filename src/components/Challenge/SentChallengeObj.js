import BoxLine from "./BoxLine";
import PhotoDisplay from "./PhotoDisplay";
import DeleteChallengeButton from "./DeleteChallengeButton";
import { getChallengeTitle } from "../../Helpers/calculationHelpers";

const SentChallengeObj = (props) => {
    let title = getChallengeTitle(props.children.exercise);
    let receivedUser = props.children.receivedUser;

    return (
    <div id = {"sentObj" + props.children._id} className = "challengeBox completeChallengeBox">
        <div className="photoDiv">
            <PhotoDisplay photos = {props.children.participants}></PhotoDisplay>
            <BoxLine></BoxLine>
        </div>
        <div className="challengeMiddle">
            <p className="challengeText">{title}</p>
            <p className="challengeText">{receivedUser} hasn't accepted your challenge.</p>
        </div>
        <div className = "challengeEnd">
            <DeleteChallengeButton id = {props.children._id}></DeleteChallengeButton>
        </div>
    </div>
    );
}

export default SentChallengeObj;