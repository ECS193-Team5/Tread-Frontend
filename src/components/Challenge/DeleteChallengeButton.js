import '../../css/Shared/button.css';
import { setDisplayProperty } from "../../Helpers/CssEffects";
import { deleteChallenge } from '../../PostRequests/challenges';

const DeleteChallengeButton = (props) => {
    const hideSentObj = () => {
        setDisplayProperty("sentObj"+props.id, "none");
    }

    function onDelete(){
        deleteChallenge(props.id, hideSentObj);
    }

    return(
        <button id = {"DeleteButton"+props.id} className = "circleButton" onClick = {onDelete}>
            <img className = "circleButtonInner" src ="https://i.imgur.com/WgGT2MJ.png"/>
        </button>
    );
}

export default DeleteChallengeButton;