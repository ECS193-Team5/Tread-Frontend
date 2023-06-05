import React from "react";
import "../../css/Profile/medalObj.css";
import goldTrophy from "../../assets/GoldTrophy.png";
import silverTrophy from "../../assets/SilverTrophy.png";
import bronzeTrophy from "../../assets/BronzeTrophy.png";
import { calculateProgress } from "../../helpers/calculationHelpers";

const min = (a, b) => {
    if (a < b){
        return a;
    }
    return b;
}
const MedalObj = (props) => {

    let convertedProgress = min(calculateProgress(props.children.progress, props.children.exercise.unit), props.children.exercise.amount);

    return(
        <div data-testid="MedalObjComponent" id = "MedalObj">
            <div className = "medalLeft">
                <div>
                    {props.children.level === 3 ? <img  className = "medalsItem" src = {goldTrophy}></img> : <></>}
                    {props.children.level === 2 ? <img  className = "medalsItem" src = {silverTrophy}></img> : <></>}
                    {props.children.level === 1 ? <img  className = "medalsItem" src = {bronzeTrophy}></img> : <></>}
                </div>
                <div>
                    <p data-testid="MedalObjMedalsText" className = "medalsItem medalsText">{props.children.exercise.exerciseName + " " + props.children.exercise.amount + " " + props.children.exercise.unit}</p>
                </div>
            </div>

            <div className = "medalRight">
                <p data-testid="MedalObjMedalProgress" className = "medalsItem medalsText">Progress : {convertedProgress}/{props.children.exercise.amount} {props.children.exercise.unit}</p>

            </div>
        </div>
    )
}

export default MedalObj;