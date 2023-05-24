import React from "react";
import BoxLine from "./BoxLine";
import PhotoDisplay from "./PhotoDisplay";
import DeleteChallengeButton from "./DeleteChallengeButton";
import { getChallengeTitle } from "../../helpers/calculationHelpers";

const SentChallengeObj = (props) => {
    let title = getChallengeTitle(props.children.exercise);
    let receivedUser = props.children.receivedUser;

    return (
    <div data-testid="SentChallengeObjComponent" id = {"sentObj" + props.children._id} className = "challengeBox completeChallengeBox">
        <div className="photoDiv">
            <PhotoDisplay photos = {props.children.participants}></PhotoDisplay>
            <BoxLine></BoxLine>
        </div>
        <div className="challengeMiddle">
            <p data-testid="SentChallengeObjTitle" className="challengeText">{title}</p>
            <p data-testid="SentChallengeObjReceivedUser" className="challengeText">{receivedUser} hasn't accepted your challenge.</p>
        </div>
        <div className = "challengeEnd">
            <DeleteChallengeButton id = {props.children._id}></DeleteChallengeButton>
        </div>
    </div>
    );
}

export default SentChallengeObj;