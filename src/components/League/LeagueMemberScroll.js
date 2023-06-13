
import React, {useState,useEffect} from 'react';
import ZeroItem from '../Shared/ZeroItem';
import MemberEntry from './MemberEntry';
import { getBlockedList, getFriendList } from '../../routes/friend_list';
import { getLeagueInfo, getMembersLeague, getInvited, getBanned, getRequesting } from '../../routes/league';
import { setDisplayProperty } from '../../helpers/CssEffects';
import "../../css/Social/scroll.css";
const LeagueMemberScroll = (props) => {
    let [scrollType] = useState(props.type);
    let [information, setInformation] = useState([]);
    let [showZero, setShowZero] = useState(false);
    const [load, setLoad] = useState(false);
    const [fullyLoaded, setFullyLoaded] = useState(false);
    const [blockedList, setBlockedList] = useState(-1);
    const [friendList, setFriendList] = useState(-1);
    const [leagueName, setLeagueName] = useState(-1);
    let [scrollData, setScrollData] = useState(null);

    let showMessage = {
        "Members":"This league seems to be empty.",
        "Received":"You have no received requests for this league at this time.",
        "Invited":"You have not invited any users at this time. You can invite users from the \"Invite User\" button in the bar above",
        "Banned":"You have no banned users at this time."
    }

    useEffect (
        () => {
            if(!load){
                getBlockedList(setBlockedList);
                getFriendList(setFriendList);
                getLeagueInfo(props.leagueID, processLeagueInfo);
                setLoad(true);
            }
        }, [load]
    );

    useEffect (
        () => {
            if(scrollData){
                setFullyLoaded(true);
            }
        }, [scrollData]
    );

    useEffect (
        () => {
            if(blockedList !== -1 &&  friendList !== -1 && leagueName !== -1 && props.children.username !== undefined){
                setScrollData(
                    {
                        username: props.children.username,
                        blocked: blockedList,
                        friends: friendList,
                        leagueID: props.leagueID,
                        leagueName: leagueName,
                        scrollType: props.type,
                        role: props.children.role
                    }
                )
            }
        }, [blockedList, friendList, leagueName, props.children.username]
    );

    useEffect (
        () => {
            if(scrollType === "Members"){
                getMembersLeague(props.leagueID,processMemberInfo);
            }
            else if(scrollType === "Received"){
                getRequesting(props.leagueID,processMemberInfo);
            }
            else if(scrollType === "Banned"){
                getBanned(props.leagueID,processMemberInfo);
            }
            else {
                getInvited(props.leagueID, processMemberInfo);
            }

        }, [scrollType]
    );

    useEffect (
        () => {
            if(information.length === 0){
                setDisplayProperty("LeagueMemberList", "none");
            }
            else{
                setDisplayProperty("LeagueMemberList", "block");
            }
        }, [information]
    );

    function makeMemberEntryObj(input, index){
        return(<MemberEntry index = {index} scrollData={scrollData}>{{"memberData":input}}</MemberEntry>);
    }

    const processMemberInfo = (response) => {
        setInformation(response.data);
        setShowZero(response.data.length ===0);
    }

    function processLeagueInfo(response){
        setLeagueName(response.data.leagueName);
    }

    return(
            <div data-testid="LeagueMemberScrollComponent" id = "LeagueMemberScrollComponent">
                <div id = "LeagueMemberList" className='scroll'>
                    {(fullyLoaded)? information.map(makeMemberEntryObj) :<></>}
                </div>
                {(showZero) ? <ZeroItem message = {showMessage[scrollType]}></ZeroItem> : <></>}
            </div>
    )
}

export default LeagueMemberScroll;