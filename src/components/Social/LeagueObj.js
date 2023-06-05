import React, {useState, useEffect} from 'react';
import DropDown from '../Shared/DropDown';
import {createLeaguePictureURL} from "../../helpers/CloudinaryURLHelpers";
import {setDisplayProperty, setLocation} from "../../helpers/CssEffects";
import { sendChallengeRedirect } from '../../helpers/FormHelpers';
import "../../css/Social/obj.css";
import "../../css/Shared/dropDown.css";
import moreInfoButton from "../../assets/moreInfoButton.png";
import {getLeagueRole, leaveLeague, removeSelfFromAdmin, revokeLeagueRequest, declineLeagueInvite, acceptLeagueInvite} from "../../routes/league";

const LeagueObj = (props) => {
    const [load, setLoad] = useState(false);
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [role, setRole] = useState("none");
    const [selectShow, setSelectShow] = useState();

    const id = props.children._id;
    let type = props.type;

    useEffect (
        () => {
            if(!load){
                getLeagueRole(id, setRole);
                setLoad(true);
            }
        }, [load]
    );

    useEffect (
        () => {
            calculateDropdownOptions();
        }, [role]
    );

    useEffect (
        () => {
            if(dropdownOptions.length === 0){
                setDisplayProperty(props.children._id+"moreInfoButton", "none");
            }
            else{
                setDisplayProperty(props.children._id+"moreInfoButton", "block")
            }
        }, [dropdownOptions]
    );


    function hideLeagueObj(){
        setDisplayProperty("LeagueObj"+props.children._id, "none");
    }

    function leave(){
        leaveLeague(id, hideLeagueObj);
    }

    function removeAdmin(){
        removeSelfFromAdmin(id, hideLeagueObj);
    }

    function revoke(){
        revokeLeagueRequest(id, hideLeagueObj);
    }

    function decline(){
        declineLeagueInvite(id, hideLeagueObj);
    }

    function accept(){
        acceptLeagueInvite(id, hideLeagueObj);
    }

    function toggleSelectShow(){
        setSelectShow(!selectShow);
    }

    function sendLeagueChallengeRedirect(){
        sendChallengeRedirect("league", props.children._id);
    }

    function calculateDropdownOptions(){
        let options = [];
        if((role === "admin" || role === "owner")){
            options.push({"name": "Send Challenge", "func": sendLeagueChallengeRedirect})
        }

        if((role === "admin" || role === "participant")&&(type==="league"||type === "admin")){
            options.push({ "name": "Leave League", "func": leave });
        }

        if(role === "admin" && (type==="league"||type === "admin")){
            options.push({ "name": "Remove Self as Admin", "func": removeAdmin });
        }
        if(type === "sent"){
            options.push({ "name": "Revoke Request", "func": revoke });
        }
        if(type ==="invite"){
            options.push({ "name": "Accept", "func": accept });
            options.push({ "name": "Decline", "func": decline });
        }
        setDropdownOptions(options);
    }

    function moveLeaguePage(){
        setLocation("leagueDescriptionPage?=" + props.children._id);
    }

    return(
        <div data-testid={"LeagueObjComponent"+props.index} id = {"LeagueObj"+props.children._id} className = "displayObj">
            <div data-testid={"LeagueObjComponentMoveLeaguePageButton"+props.index} className = "objSection"  onClick = {moveLeaguePage}>
                <img className = "objProfilePhoto" src = {createLeaguePictureURL(id)} alt = "league"/>
            </div>
            <div className = "objSection objWritingSection objWritingLeagueSection"  onClick = {moveLeaguePage}>
                <p data-testid={"LeagueObjLeagueName"+props.index} className = "objDisplayName">{props.children.leagueName}</p>
                <p data-testid={"LeagueObjMembersCount"+props.index} className = "objUsername">{props.children.members.length} Member(s)</p>
                <p data-testid={"LeagueObjActiveChallengeCount"+props.index} className = "objUsername">{props.children.activeChallenges} active challenges</p>
            </div>
            <div className = "objButtonSection objSection">
                <button data-testid={"LeagueObjMoreInfoButton"+props.index} id = {props.children._id+"moreInfoButton"} className = "moreInfoButton objButtonMore" onClick = {toggleSelectShow}>
                    <img src = {moreInfoButton} alt = "toggle button"/>
                </button>
                {(selectShow) ? <div className='objDropdown'><DropDown uniqueDeterminer = {props.children.leagueName+"LeagueObj"}>{dropdownOptions}</DropDown></div>: <></>}
            </div>
        </div>
    )

}

export default LeagueObj;