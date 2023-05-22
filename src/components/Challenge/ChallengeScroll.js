import {useState, useEffect} from 'react';

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

    function makeIssuedChallengeObj(input){
        return (<IssuedChallengeObj key = {input["challengeId"]} >{input}</IssuedChallengeObj>);
    }

    function makeSentChallengeObj(input){
        return (<SentChallengeObj key = {input["challengeId"]} >{input}</SentChallengeObj>);
    }

    function makeReceivedChallengeObj(input){
        return (<ReceivedChallengeObj key = {input["challengeId"]} >{input}</ReceivedChallengeObj>);
    }

    function makeGlobalChallengeObj(input){
        return (<GlobalChallengeObj key = {input["challengeId"]}>{input}</GlobalChallengeObj>);
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
            else if(scrollType === "global"){
                getGlobalChallenges(reactChallengeList);
            }
        }, [scrollType]
    );

    return (<div id = "ChallengeScroll">
        {(scrollType === "issued") ? information.map(makeIssuedChallengeObj) : <></>}
        {(scrollType === "sent") ? information.map(makeSentChallengeObj) : <></>}
        {(scrollType === "received") ? information.map(makeReceivedChallengeObj) : <></>}
        {(scrollType === "global") ? information.map(makeGlobalChallengeObj) : <></>}
        {(showZero) ? <ZeroItem message= {"No "+ scrollType +"  challenges are available at this time"}/>:<></>}
    </div>);
}

export default ChallengeScroll;