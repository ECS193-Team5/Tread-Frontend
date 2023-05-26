import React from "react";
import '../../css/Shared/button.css';
import { setDisplayProperty } from "../../helpers/CssEffects";
import { deleteChallenge } from '../../routes/challenges';
import trashCanImage from "../../assets/trashCan.png";

const DeleteChallengeButton = (props) => {
    const hideSentObj = () => {
        setDisplayProperty("sentObj"+props.id, "none");
    }

    function onDelete(){
        deleteChallenge(props.id, hideSentObj);
    }

    return(
        <button data-testid={"DeleteChallengeButtonComponent"+props.index} id = {"DeleteButton"+props.id} className = "circleButton" onClick = {onDelete}>
            <img className = "circleButtonInner" src ={trashCanImage}/>
        </button>
    );
}

export default DeleteChallengeButton;