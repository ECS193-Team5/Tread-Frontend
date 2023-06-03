
import React, {useState,useEffect} from 'react';
import ZeroItem from '../Shared/ZeroItem';
import MemberEntry from './MemberEntry';
import { getBlockedList, getFriendList } from '../../routes/friend_list';
import { getLeagueInfo, getMembersLeague, getInvited, getBanned, getRequesting } from '../../routes/league';
import { setDisplayProperty } from '../../helpers/CssEffects';

const LeagueMemberScroll = (props) => {
    let [scrollType] = useState(props.type);
    let [information, setInformation] = useState([]);
    let [showZero, setShowZero] = useState(false);
    const [load, setLoad] = useState(false);
    const [blockedList, setBlockedList] = useState([]);
    const [friendList, setFriendList] = useState([]);
    const [leagueName, setLeagueName] = useState("");
    let [scrollData, setScrollData] = useState(
        {
            username: props.children.username,
            blocked: [],
            friends: [],
            leagueID: props.leagueID,
            leagueName: "",
            scrollType: props.type,
            role: props.children.role
        }
    );

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
            if(blockedList ||  friendList || leagueName){
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
        }, [blockedList, friendList, leagueName]
    );

    useEffect (
        () => {
            if(scrollType === "Members"){
                getMembersLeague(processMemberInfo);
            }
            else if(scrollType === "Received" && (props.children.role === "admin" || props.children.role === "owner")){
                getRequesting(processMemberInfo);
            }
            else if(scrollType === "Banned" && (props.children.role === "admin" || props.children.role === "owner")){
                getBanned(processMemberInfo);
            }
            else if(scrollType === "Invited" && (props.children.role === "admin" || props.children.role === "owner")){
                getInvited(processMemberInfo);
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
        if (index === 0){
            return(<div><MemberEntry index = {index}>{{"memberData":input, "scrollData":scrollData}}</MemberEntry></div>);
        }
        else {
            return(<div><div className = "memberLine"></div><MemberEntry index = {index}>{{"memberData":input, "scrollData":scrollData}}</MemberEntry></div>);
        }
    }

    const processMemberInfo = (response) => {
        setInformation(response.data);
        setShowZero(response.data.length ===0);
    }

    function processLeagueInfo(response){
        setLeagueName(response.data.leagueName);
    }

    return(
            <div data-testid="LeagueMemberScrollComponent">
                <div id = "LeagueMemberList">
                    {information.map(makeMemberEntryObj)}
                </div>
                {(showZero) ? <ZeroItem message = {showMessage[scrollType]}></ZeroItem> : <></>}
            </div>
    )
}

export default LeagueMemberScroll;