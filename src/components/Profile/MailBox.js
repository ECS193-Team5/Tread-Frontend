import Line from "../Shared/Line";
import { requestNotifications, deleteAllNotifications } from "../../routes/notifications";
import { setDisplayProperty } from "../../helpers/CssEffects";
import React, {useState, useEffect} from "react";
import MailBoxEntry from "./MailBoxEntry";
import deleteCircleButton from "../../assets/declineButtonX.png";
import "../../css/Profile/mailBox.css";
import "../../css/Shared/button.css";
const MailBox = () =>{
    const [info, setInfo] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        requestNotifications(setInfo);
      }, []);

    useEffect(() => {
        if(count <= 0){
            setDisplayProperty("MailBox", "none");
        }
        else{
            setDisplayProperty("MailBox", "block");
        }
      }, [count]);

        useEffect(() => {
            setCount(info.length);
        }, [info]);

    function decrementCount(){
        setCount(count-1);
    }
    function createMailBoxObj(item, index){
        return <MailBoxEntry index = {index} decrementCount = {decrementCount}>{item}</MailBoxEntry>
    }

    function turnOff(){
        setDisplayProperty("MailBox", "none");
    }

    function deleteAll(){
        deleteAllNotifications(turnOff);
    }

    return(
        <div data-testid="MailBoxComponent" id = "MailBox">
            <div id = "MailBoxHeader">
                <h1>Notifications</h1>
                <button data-testid="MailBoxDeleteAllButton" onClick = {deleteAll} className="mailBoxDeleteButton"><p className="mailBoxDeleteButtonText">Delete All</p><img src = {deleteCircleButton}></img></button>
            </div>


            {info.map(createMailBoxObj)}
            <Line></Line>
        </div>
    )
}

export default MailBox;