
import "../../css/Profile/mailBox.css";
import { setDisplayProperty } from "../../helpers/CssEffects";
import {deleteNotification} from "../../routes/notifications";

const MailBoxEntry = (props) => {

    const hideReceivedObj = () => {
        setDisplayProperty("MailBoxEntry"+props.children._id, "none");
        props.decrementCount();
    }

    function onDelete(){
        deleteNotification(props.children._id, hideReceivedObj);
    }

    return(
        <div className = "mailBoxEntry" id = {"MailBoxEntry"+props.children._id}>
            <p className="mailBoxEntryText">{props.children.message}</p>
            <button id = {"DeclineButton"+props.id} className = "circleButton" onClick = {onDelete}>
                <img className = "circleButtonInner" src ="https://i.imgur.com/4e8Io40.png"/>
            </button>
        </div>
    )
}

export default MailBoxEntry;