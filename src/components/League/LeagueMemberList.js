import {useState, useEffect} from 'react';

import MemberEntry from './MemberEntry';
import MemberAdd from './MemberAdd';
import Bar from '../Shared/Bar';

import axios from "axios";

import "../../css/Shared/section.css";
import "../../css/Shared/bar.css";
import { getLeagueInfo } from '../../routes/league';

const backend_url = process.env.REACT_APP_PROD_BACKEND;

const LeagueMemberList = (props) => {
    const [leagueName, setLeagueName] = useState("");
    const [id] = useState(props.children.id);
    const [memberScroll, setMemberScroll] = useState("Members");
    const [memberList, setMemberList] = useState([]);
    const [load, setLoad] = useState(false);
    const [selfType, setSelfType] = useState("");
    let buttonList = [{"name": "Members", "defaultOn":true, "create":false},
    {"name": "Pending", "defaultOn":false, "create":false},
    {"name": "Invited", "defaultOn":false, "create":false},
    {"name": "Banned", "defaultOn":false, "create":false},
    {"name": "Add User", "defaultOn":false, "create":true}];



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
                leagueID: id
            }
        };
        axios(config)
        .then(function(response){
            setMemberList(response.data);
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
                leagueID: id
            }
        };
        axios(config)
        .then(function(response){
            setMemberList(response.data);
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
                leagueID: id
            }
        };
        axios(config)
        .then(function(response){
            setMemberList(response.data);
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
                leagueID: id
            }
        };
        axios(config)
        .then(function(response){
            setMemberList(response.data);
        })
        .catch(function(error){
        });
    }

    function getSelfType(){
        var config = {
            method : 'post',
            url : backend_url + 'league/get_role',
            headers: {
            Accept: 'application/json',
            },
            withCredentials: true,
            credentials: 'include',
            data:{
                leagueID: id
            }
        };
        axios(config)
        .then(function(response){
            setSelfType(response.data);
        })
        .catch(function(error){
        });
    }

    function setName(response){
        setLeagueName(response.data.leagueName)
    }

    useEffect (
        () => {
            if(!load){
                getLeagueInfo(props.children.id, setName)
                getSelfType();
            }
        }, [load]
    );

    useEffect (
        () => {
            if(memberScroll === "Members"){
                getAll();
            }
            else if(memberScroll === "Pending" && (selfType === "admin" || selfType === "owner")){
                getRequesting();
            }
            else if(memberScroll === "Banned" && (selfType === "admin" || selfType === "owner")){
                getBanned();
            }
            else if(memberScroll === "Invited" && (selfType === "admin" || selfType === "owner")){
                getInvited();
            }
        }, [memberScroll]
    );

    function makeMemberEntryObj(input, index){
        if (index === 0){
            return(<div><MemberEntry leagueName = {leagueName} leagueID = {id} scrollType = {memberScroll} selfType = {selfType}>{input}</MemberEntry></div>);
        }
        else {
            return(<div><div className = "memberLine"></div><MemberEntry leagueName = {leagueName} leagueID = {id} scrollType = {memberScroll} selfType = {selfType}>{input}</MemberEntry></div>);
        }
    }


    return(
        <div className = "leagueMemberHeader">
            <div className ="selectButtonHeader">
                <h1>Members</h1>
                {selfType === "owner" || selfType === "admin" ? <Bar>{{"buttonList":buttonList, "updateFunc":setMemberScroll}}</Bar> : <></>}
            </div>

            {
                (memberScroll === "Members") ? <div id = "LeagueMemberList">{memberList.map(makeMemberEntryObj)}</div> : <></>
            }
            {
                (memberScroll === "Pending" && (selfType === "admin" || selfType === "owner")) ? <div id = "LeagueMemberList">{memberList.map(makeMemberEntryObj)}</div> : <></>
            }
            {
                (memberScroll === "Banned" && (selfType === "admin" || selfType === "owner")) ? <div id = "LeagueMemberList">{memberList.map(makeMemberEntryObj)}</div> : <></>
            }
            {
                (memberScroll === "Invited" && (selfType === "admin" || selfType === "owner")) ? <div id = "LeagueMemberList">{memberList.map(makeMemberEntryObj)}</div> : <></>
            }
            {
                (memberScroll === "Add User" && (selfType === "admin" || selfType === "owner")) ? <MemberAdd leagueID = {id}></MemberAdd>:<></>}
        </div>
    )
}

export default LeagueMemberList;