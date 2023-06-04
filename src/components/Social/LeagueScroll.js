import LeagueObj from './LeagueObj';
import React, {useState,useEffect} from 'react';
import ZeroItem from '../Shared/ZeroItem';
import {getAll, getInvite, getSent, getAdmin} from "../../routes/league";
import "../../css/Social/scroll.css";

const LeagueScroll = (props) => {
    let [scrollType] = useState(props.type);
    let [information, setInformation] = useState([]);
    let [showZero, setShowZero] = useState(false);
    let zeroItemInfo = {
        "Message":
        {
        "league":"You are not in any leagues at this time. You can create your own league by hitting \"Create League\" in the bar above. If you start logging exercises, you'll get recommended leagues that you can join.",
        "sent":"You have no sent requests at this time. You can create your own league by hitting \"Create League\" in the bar above. If you start logging exercises, you'll get recommended leagues that you can join.",
        "admin":"You are not on the admin team for any leagues. You can create your own league by hitting \"Create League\" in the bar above. If you start logging exercises, you'll get recommended leagues that you can join.",
        "invite":"You have not been invited to any leagues at this time. You can create your own league by hitting \"Create League\" in the bar above. If you start logging exercises, you'll get recommended leagues that you can join."
        }
    }

    const processLeagueList = (data) =>{
        setInformation(data)
        setShowZero(data.length === 0);
    }

    function makeLeagueObj(input){
        return (<LeagueObj index = {input.leagueName} type = {scrollType}>{input}</LeagueObj>);
    }

    useEffect (
        () => {
            if(scrollType === "league"){
                getAll(processLeagueList);
            }
            else if(scrollType === "sent"){
                getSent(processLeagueList);
            }
            else if(scrollType === "admin"){
                getAdmin(processLeagueList);
            }
            else {
                getInvite(processLeagueList);
            }
        }, [scrollType]
    );

    return(
        <div data-testid="LeagueScrollComponent" className = "scroll">
            {information.map(makeLeagueObj)}
            {(showZero) ? <ZeroItem message = {zeroItemInfo["Message"][scrollType]}></ZeroItem> : <></>}
        </div>
    )
}

export default LeagueScroll;