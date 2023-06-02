import React from "react";
import { setDisplayProperty } from "../../helpers/CssEffects";
import { declineChallenge } from "../../routes/challenges";
import declineImage from "../../assets/declineButtonX.png";
import '../../css/Shared/button.css';

const DeclineChallengeButton = (props) => {
    const hideReceivedObj = () => {
        setDisplayProperty("ReceivedChallengedObj"+props.id, "none");
    }

    function onDecline(){
        declineChallenge(props.id, hideReceivedObj);

    }

    return(
        <button data-testid={"DeclineChallengeButtonComponent"+props.index} id = {"DeclineButton"+props.id} className = "circleButton" onClick = {onDecline}>
            <img className = "circleButtonInner" src ={declineImage}/>
        </button>
    );
}

export default DeclineChallengeButton;