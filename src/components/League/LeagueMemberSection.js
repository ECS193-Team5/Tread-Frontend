import React from "react";
import LeagueMemberScroll from "./LeagueMemberScroll";
import MemberAdd from "./MemberAdd";
import Bar from "../Shared/Bar";

import {useState, useEffect} from "react";
import {getLeagueRole} from "../../routes/league";
import { getUsername } from "../../routes/user";

const LeagueMemberSection = (props) => {
    const [memberState, setMemberState] = useState("Members");
    const [load, setLoad] = useState(false);
    const [role, setRole] = useState("");
    const [username, setUsername] = useState("");
    const [scrollInput, setScrollInput] = useState({});

    let buttonList = [{"name": "Members", "defaultOn":true, "create":false},
    {"name": "Received", "defaultOn":false, "create":false},
    {"name": "Invited", "defaultOn":false, "create":false},
    {"name": "Banned", "defaultOn":false, "create":false},
    {"name": "Add User", "defaultOn":false, "create":true}];

    useEffect(() => {
        if(!load){
            setLoad(load);
            getLeagueRole(props.children.id, setRole);
            getUsername(setUsername);
        }
      }, [load]);

    useEffect(() => {
        if(username.length > 0 && role.length > 0){
            setScrollInput(
            {
                username: username,
                role: role
            }
            );
        }
    }, [username, role]);

    return (
    <div id = "LeagueMemberSection">
        <div className ="selectButtonHeader">
                <h1>Members</h1>
                {role === "owner" || role === "admin" ? <Bar>{{"buttonList":buttonList, "updateFunc":setMemberState}}</Bar> : <></>}
        </div>
        { (memberState === "Members") ? <LeagueMemberScroll type = "Members" leagueID = {props.children.id}>{scrollInput}</LeagueMemberScroll> : <></>}
        { (memberState === "Invited") ? <LeagueMemberScroll type = "Invited" leagueID = {props.children.id}>{scrollInput}</LeagueMemberScroll> : <></>}
        { (memberState === "Received") ? <LeagueMemberScroll type = "Received" leagueID = {props.children.id}>{scrollInput}</LeagueMemberScroll> : <></>}
        { (memberState === "Banned") ? <LeagueMemberScroll type = "Banned" leagueID = {props.children.id}>{scrollInput}</LeagueMemberScroll> : <></>}
        { (memberState === "Add User") ? <MemberAdd leagueID = {props.children.id}></MemberAdd>:<></>}
    </div>
    )
}

export default LeagueMemberSection;