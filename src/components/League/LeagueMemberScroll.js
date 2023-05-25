
import React, {useState,useEffect} from 'react';
import { getBlockedList, getFriendList } from '../../routes/friend_list';
import axios from 'axios';
import ZeroItem from '../Shared/ZeroItem';
import MemberEntry from './MemberEntry';
import { getLeagueInfo } from '../../routes/league';
import { setDisplayProperty } from '../../helpers/CssEffects';
const backend_url = process.env.REACT_APP_PROD_BACKEND;

const LeagueMemberScroll = (props) => {
    let [scrollType] = useState(props.type);
    let [information, setInformation] = useState([]);
    let [showZero, setShowZero] = useState(false);
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
    const [load, setLoad] = useState(false);
    const [blockedList, setBlockedList] = useState([]);
    const [friendList, setFriendList] = useState([]);
    const [leagueName, setLeagueName] = useState("");

    let showMessage = {
        "Members":"This league seems to be empty.",
        "Received":"You have no received requests for this league at this time.",
        "Invited":"You have not invited any users at this time.",
        "Banned":"You have no banned users at this time."
    }

    function getAll(){
        var config = {
            method : 'post',
            url : backend_url + 'league/get_member_list',
            headers: {
            Accept: 'application/json',
            },
            withCredentials: true,
            credentials: 'include',
            data:{
                leagueID: props.leagueID
            }
        };
        axios(config)
        .then(function(response){
            setInformation(response.data);
            setShowZero(response.data.length === 0);
        })
        .catch(function(error){
            if(error.response.status===401){
                window.location.href = "/";
            }
        });

    }

    function getRequesting(){
        var config = {
            method : 'post',
            url : backend_url + 'league/get_pending_request_list',
            headers: {
            Accept: 'application/json',
            },
            withCredentials: true,
            credentials: 'include',
            data:{
                leagueID: props.leagueID
            }
        };
        axios(config)
        .then(function(response){
            setInformation(response.data);

            setShowZero(response.data.length ===0);
        })
        .catch(function(error){
        });
    }

    function getBanned(){
        // get list from service
        var config = {
            method : 'post',
            url : backend_url + 'league/get_banned_list',
            headers: {
            Accept: 'application/json',
            },
            withCredentials: true,
            credentials: 'include',
            data:{
                leagueID: props.leagueID
            }
        };
        axios(config)
        .then(function(response){
            setInformation(response.data);
            setShowZero(response.data.length ===0);
        })
        .catch(function(error){
        });
    }

    function getInvited(){
        // get list from service
        var config = {
            method : 'post',
            url : backend_url + 'league/get_sent_invite_list',
            headers: {
            Accept: 'application/json',
            },
            withCredentials: true,
            credentials: 'include',
            data:{
                leagueID: props.leagueID
            }
        };
        axios(config)
        .then(function(response){
            setInformation(response.data);
            setShowZero(response.data.length ===0);

        })
        .catch(function(error){
        });
    }


    function makeMemberEntryObj(input, index){
        if (index === 0){
            return(<div><MemberEntry index = {index}>{{"memberData":input, "scrollData":scrollData}}</MemberEntry></div>);
        }
        else {
            return(<div><div className = "memberLine"></div><MemberEntry index = {index}>{{"memberData":input, "scrollData":scrollData}}</MemberEntry></div>);
        }
    }

    function processLeagueInfo(response){
        setLeagueName(response.data.leagueName);
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
                getAll();
            }
            else if(scrollType === "Received" && (props.children.role === "admin" || props.children.role === "owner")){
                getRequesting();
            }
            else if(scrollType === "Banned" && (props.children.role === "admin" || props.children.role === "owner")){
                getBanned();
            }
            else if(scrollType === "Invited" && (props.children.role === "admin" || props.children.role === "owner")){
                getInvited();
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

    return(
            <div>
                <div id = "LeagueMemberList">
                    {information.map(makeMemberEntryObj)}
                </div>
                {(showZero) ? <ZeroItem message = {showMessage[scrollType]}></ZeroItem> : <></>}
            </div>

    )
}

export default LeagueMemberScroll;