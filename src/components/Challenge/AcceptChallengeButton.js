import React from "react";
import { setDisplayProperty } from "../../helpers/CssEffects";
import { acceptChallenge } from "../../routes/challenges";
import '../../css/Shared/button.css';
import checkMark from "../../assets/checkMark.png";

const AcceptChallengeButton = (props) => {
    const hideReceivedChallengeObj = () => {
        setDisplayProperty("ReceivedChallengedObj"+props.id, "none");
    }

    function onAccept(){
        acceptChallenge(props.id, hideReceivedChallengeObj);
    }

    return(
        <button data-testid={"AcceptChallengeButtonComponent"+props.index} id = {"AcceptButton"+props.id} className = "circleButton" onClick = {onAccept}>
            <img className = "circleButtonInner" src ={checkMark}/>
        </button>
    );
}

export default AcceptChallengeButton;