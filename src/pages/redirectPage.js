import React, {useState, useEffect} from "react";
import { setLocation } from "../helpers/CssEffects";
import { sendFriendRequest } from "../routes/friend_list";
import { sendLeagueRequest } from "../routes/league";

const RedirectPage = (props) => {
    const [load, setLoad] = useState(false);
    let type = props.type;

    useEffect (
        () => {
            const followRequest = () => {
                let requestID = processURL();
                if (type === "Friend"){
                    sendFriendRequest(requestID, processSendRequest, redirectChallenge);
                } else{
                    sendLeagueRequest(requestID, processSendRequest, redirectChallenge);
                }
            }

            const processURL = () => {
                let url = window.location.href;
                let id = url.split("request"+type+"?")[1];
                return id;
            }


            if(!load){
                followRequest();
                setLoad(true);
            }
        }, [load, type]
    );

    function processSendRequest () {
        setLocation("/social" +props.type + "Page");
    }

    function redirectChallenge(){
        setLocation("/currentChallengePage");
    }

    return (<div><h1>Request sending...</h1></div>);
}

export default RedirectPage;