import React from "react";
import BoxLine from "./BoxLine";
import PhotoDisplay from "./PhotoDisplay";
import DeleteChallengeButton from "./DeleteChallengeButton";
import { getChallengeTitle } from "../../helpers/calculationHelpers";
import ShowDueDate from "./ShowDueDate";
const SentChallengeObj = (props) => {
    let title = getChallengeTitle(props.children.exercise);
    let receivedUser = props.children.receivedUser;

    return (
    <div data-testid={"SentChallengeObjComponent"+props.index} id = {"sentObj" + props.children._id} className = "challengeBox completeChallengeBox">
        <div className="photoDiv">
            <PhotoDisplay index = {props.index} photos={props.children.participants}></PhotoDisplay>
            <BoxLine></BoxLine>
        </div>
        <div className="challengeMiddle">
            <div className="challengeInnerMiddle">
                        <p data-testid={"IssuedChallengeObjTitle"+props.index} className="challengeText">{title}</p>
                        <ShowDueDate index = {props.index} dueDate = {props.children.dueDate} issueDate={props.children.issueDate}/>
                    </div><p data-testid={"SentChallengeObjReceivedUser"+props.index} className="challengeText">{receivedUser} hasn't accepted your challenge.</p>
        </div>
        <div className = "challengeEnd">
            <DeleteChallengeButton id = {props.children._id} index = {props.index}></DeleteChallengeButton>
        </div>
    </div>
    );
}

export default SentChallengeObj;