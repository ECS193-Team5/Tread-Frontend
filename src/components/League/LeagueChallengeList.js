import React from 'react';
import ChallengeScroll from "../Challenge/ChallengeScroll";
import Bar from "../Shared/Bar";
import { sendChallengeRedirect } from '../../helpers/FormHelpers';
import "../../css/League/leagueDescriptionPage.css";
import "../../css/Shared/bar.css";
const LeagueChallengeList = (props) => {
    const challengesBarButtonList =  [{"name": "Send Challenge", "defaultOn":false, "create":true}];
    function sendLeagueChallengeRedirect(){
        sendChallengeRedirect("league", props.children.id);
    }

    return(
    <div>
        <div className = "selectButtonHeader">
            <h2 className='activeChallengesHeader'>Active Challenges</h2>
            <Bar>{{"buttonList":challengesBarButtonList, "updateFunc":sendLeagueChallengeRedirect}}</Bar>
        </div>
        <ChallengeScroll type = "issued" ifLeague = {true} leagueID = {props.children.id}></ChallengeScroll>
    </div>

    );
}

export default LeagueChallengeList;