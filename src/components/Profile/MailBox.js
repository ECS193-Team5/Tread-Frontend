import Line from "../Shared/Line";
import { requestNotifications } from "../../routes/notifications";
import { setDisplayProperty } from "../../helpers/CssEffects";
import {useState, useEffect} from "react";
import MailBoxEntry from "./MailBoxEntry";
import "../../css/Profile/mailBox.css";
const MailBox = () =>{
    const [load, setLoad] = useState(false);
    const [info, setInfo] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if(!load){
            setLoad(load);
            requestNotifications(setInfo);
        }
      }, [load]);

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
    function createMailBoxObj(item){
        return <MailBoxEntry decrementCount = {decrementCount}>{item}</MailBoxEntry>
    }

    return(
        <div id = "MailBox">
            {info.map(createMailBoxObj)}
            <Line></Line>
        </div>
    )
}

export default MailBox;