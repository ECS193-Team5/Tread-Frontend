import { setDisplayProperty } from "../../Helpers/CssEffects";
import { acceptChallenge } from "../../PostRequests/challenges";
import '../../css/Shared/button.css';

const AcceptChallengeButton = (props) => {
    const hideReceivedChallengeObj = () => {
        setDisplayProperty("ReceivedChallengedObj"+props.id, "none");
    }

    function onAccept(){
        acceptChallenge(props.id, hideReceivedChallengeObj);
    }

    return(
        <button id = {"AcceptButton"+props.id} className = "circleButton" onClick = {onAccept}>
            <img className = "circleButtonInner" src ="https://i.imgur.com/w1FwIdu.png"/>
        </button>
    );
}

export default AcceptChallengeButton;