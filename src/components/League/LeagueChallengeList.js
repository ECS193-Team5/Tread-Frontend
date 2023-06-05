import React, {useState, useEffect} from 'react';
import ChallengeScroll from "../Challenge/ChallengeScroll";
import Bar from "../Shared/Bar";
import { sendChallengeRedirect } from '../../helpers/FormHelpers';
import { getLeagueRole } from "../../routes/league";
import "../../css/League/leagueDescriptionPage.css";
import "../../css/Shared/bar.css";

const LeagueChallengeList = (props) => {
    const challengesBarButtonList =  [{"name": "Send Challenge", "defaultOn":false, "create":true}];
    const [role, setRole] = useState("none");

    useEffect(
        () => {
            getLeagueRole(props.children.id, setRole);
        }, []
    );

    function sendLeagueChallengeRedirect(){
        sendChallengeRedirect("league", props.children.id);
    }

    return(
    <div data-testid="LeagueChallengeListComponent">
        <div className = "selectButtonHeader">
            <h2 className='activeChallengesHeader'>Active Challenges</h2>
            {(role === "owner"||role ===
            "admin") ?<Bar>{{"buttonList":challengesBarButtonList, "updateFunc":sendLeagueChallengeRedirect}}</Bar> : <></>}
        </div>
        <ChallengeScroll type = "issued" ifLeague = {true} leagueID = {props.children.id}></ChallengeScroll>
    </div>

    );
}

export default LeagueChallengeList;