
import React from "react";
import "../../css/Profile/mailBox.css";
import { setDisplayProperty } from "../../helpers/CssEffects";
import {deleteNotification} from "../../routes/notifications";
import declineX from "../../assets/declineButtonX.png";
const MailBoxEntry = (props) => {
    console.log(props);
    const hideReceivedObj = () => {
        setDisplayProperty("MailBoxEntry"+props.children._id, "none");
        props.decrementCount();
    }

    function onDelete(){
        deleteNotification(props.children._id, hideReceivedObj);
    }

    return(
        <div data-testid={"MailBoxEntryComponent"+props.index} className = "mailBoxEntry" id = {"MailBoxEntry"+props.children._id}>
            <p data-testid={"MailBoxEntryMessage"+props.index} className="mailBoxEntryText">{props.children.message}</p>
            <button data-testid={"MailBoxEntryDeclineButton"+props.index} id = {"DeclineButton"+props.children._id} className = "circleButton" onClick = {onDelete}>
                <img className = "circleButtonInner" src ={declineX}/>
            </button>
        </div>
    )
}

export default MailBoxEntry;