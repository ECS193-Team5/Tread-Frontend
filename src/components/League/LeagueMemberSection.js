import React from "react";
import LeagueMemberScroll from "./LeagueMemberScroll";
import UserAddForm from "../Shared/Form/UserAddForm";
import Bar from "../Shared/Bar";

import {useState, useEffect} from "react";
import {getLeagueRole} from "../../routes/league";
import { getUsername } from "../../routes/user";

const LeagueMemberSection = (props) => {
    const [memberState, setMemberState] = useState("Members");
    const [role, setRole] = useState("");
    const [username, setUsername] = useState("");
    const [scrollInput, setScrollInput] = useState({});

    let buttonList = [{"name": "Members", "defaultOn":true, "create":false},
    {"name": "Received", "defaultOn":false, "create":false},
    {"name": "Invited", "defaultOn":false, "create":false},
    {"name": "Banned", "defaultOn":false, "create":false},
    {"name": "Invite User", "defaultOn":false, "create":true}];

    useEffect(() => {
        getLeagueRole(props.children.id, setRole);
        getUsername(setUsername);
      }, []);

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
    <div data-testid="LeagueMemberSectionComponent" id = "LeagueMemberSection">
        <div className ="selectButtonHeader">
                <h1 className="barHeader">Members</h1>
                {role === "owner" || role === "admin" ? <Bar>{{"buttonList":buttonList, "updateFunc":setMemberState}}</Bar> : <></>}
        </div>
        { (memberState === "Members") ? <LeagueMemberScroll type = "Members" leagueID = {props.children.id}>{scrollInput}</LeagueMemberScroll> : <></>}
        { (memberState === "Invited") ? <LeagueMemberScroll type = "Invited" leagueID = {props.children.id}>{scrollInput}</LeagueMemberScroll> : <></>}
        { (memberState === "Received") ? <LeagueMemberScroll type = "Received" leagueID = {props.children.id}>{scrollInput}</LeagueMemberScroll> : <></>}
        { (memberState === "Banned") ? <LeagueMemberScroll type = "Banned" leagueID = {props.children.id}>{scrollInput}</LeagueMemberScroll> : <></>}
        { (memberState === "Invite User") ? <UserAddForm leagueID = {props.children.id} type = "league"></UserAddForm>:<></>}
    </div>
    )
}

export default LeagueMemberSection;