import React from "react";
import PhotoDisplay from "./PhotoDisplay";
import BoxLine from "./BoxLine";
import AcceptChallengeButton from "./AcceptChallengeButton";
import DeclineChallengeButton from "./DeclineChallengeButton";
import { getChallengeTitle } from "../../helpers/calculationHelpers";
import ShowDueDate from "./ShowDueDate";

const ReceivedChallengeObj = (props) => {
    let title = getChallengeTitle(props.children.exercise);

    return (
    <div data-testid={"ReceivedChallengeObjComponent"+props.index} id = {"ReceivedChallengedObj"+props.children._id} className = "challengeBox completeChallengeBox">
        <div className="photoDiv">
        <PhotoDisplay index = {props.index} photos={props.children.participants}></PhotoDisplay><BoxLine></BoxLine>
        </div>
        <div className="challengeMiddle">
            <p data-testid={"ReceivedChallengeObjTitle"+props.index} className="challengeText">{title}</p>
            <ShowDueDate index = {props.index} dueDate = {props.children.dueDate} issueDate={props.children.issueDate}/>
        </div>
        <div className = "challengeEnd">
            <AcceptChallengeButton id = {props.children._id} index = {props.index}></AcceptChallengeButton>
            <DeclineChallengeButton id = {props.children._id} index = {props.index}></DeclineChallengeButton>
        </div>
    </div>
    );
}

export default ReceivedChallengeObj;