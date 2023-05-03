import { setDisplayProperty } from "../../Helpers/CssEffects";
import { declineChallenge } from "../../PostRequests/challenges";
import '../../css/Shared/button.css';

const DeclineChallengeButton = (props) => {
    const hideReceivedObj = () => {
        setDisplayProperty("ReceivedChallengedObj"+props.id, "none");
    }

    function onDecline(){
        declineChallenge(props.id, hideReceivedObj);

    }

    return(
        <button id = {"DeclineButton"+props.id} className = "circleButton" onClick = {onDecline}>
            <img className = "circleButtonInner" src ="https://i.imgur.com/4e8Io40.png"/>
        </button>
    );
}

export default DeclineChallengeButton;