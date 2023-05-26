import React, { setDisplayProperty } from "../../helpers/CssEffects";
import { declineChallenge } from "../../routes/challenges";
import '../../css/Shared/button.css';
import declineImage from "../../assets/declineButtonX.png";
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