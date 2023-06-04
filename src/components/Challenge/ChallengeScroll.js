import React, {useState, useEffect} from 'react';

import IssuedChallengeObj from "./IssuedChallengeObj";
import SentChallengeObj from "./SentChallengeObj";
import GlobalChallengeObj from "./GlobalChallengeObj";
import ReceivedChallengeObj from "./ReceivedChallengeObj";
import ZeroItem from '../Shared/ZeroItem';

import { getIssuedFriendChallenges, getIssuedLeagueChallenges, getSentChallenges, getReceivedChallenges } from '../../routes/challenges';
import { getGlobalChallenges } from '../../routes/global_challenges';
import "../../css/Challenge/challenge.css";

const ChallengeScroll = (props) => {
    let [scrollType] = useState(props.type);
    let [ifLeague] = useState(props.ifLeague);
    let [information, setInformation] = useState([]);
    const [showZero, setShowZero] = useState(false);

    function makeIssuedChallengeObj(input, index){
        return (<IssuedChallengeObj key = {input["challengeId"]} index = {index} >{input}</IssuedChallengeObj>);
    }

    function makeSentChallengeObj(input, index){
        return (<SentChallengeObj key = {input["challengeId"]} index = {index}>{input}</SentChallengeObj>);
    }

    function makeReceivedChallengeObj(input, index){
        return (<ReceivedChallengeObj key = {input["challengeId"]} index = {index}>{input}</ReceivedChallengeObj>);
    }

    function makeGlobalChallengeObj(input, index){
        return (<GlobalChallengeObj key = {input["challengeId"]} index = {index}>{input}</GlobalChallengeObj>);
    }

    function reactChallengeList(response){
        setInformation(response)
        setShowZero(response.length === 0);
    }

    useEffect (
        () => {
            if(scrollType === "issued" && ifLeague){
                getIssuedLeagueChallenges(props.leagueID, reactChallengeList);
            }
            else if(scrollType === "issued" && !ifLeague){
                getIssuedFriendChallenges(reactChallengeList);
            }
            else if(scrollType === "sent"){
                getSentChallenges(reactChallengeList);
            }
            else if(scrollType === "received"){
                getReceivedChallenges(reactChallengeList);
            }
            else {
                getGlobalChallenges(reactChallengeList);
            }
        }, [scrollType]
    );

    return (<div data-testid="ChallengeScrollComponent" id = "ChallengeScroll">
        {(scrollType === "issued") ? information.map(makeIssuedChallengeObj) : <></>}
        {(scrollType === "sent") ? information.map(makeSentChallengeObj) : <></>}
        {(scrollType === "received") ? information.map(makeReceivedChallengeObj) : <></>}
        {(scrollType === "global") ? information.map(makeGlobalChallengeObj) : <></>}
        {(showZero) ? <ZeroItem message= {"No "+ scrollType +"  challenges are available at this time. You can create your own challenge by clicking the \"Send Challenge\" in the bar above"}/>:<></>}
    </div>);
}

export default ChallengeScroll;