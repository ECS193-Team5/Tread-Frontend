import React from 'react';
import ChallengeScroll from "../Challenge/ChallengeScroll";

const LeagueChallengeList = (props) => {
    return(
    <div>
        <h2>Active Challenges</h2>
        <ChallengeScroll type = "issued" ifLeague = {true} leagueID = {props.children.id}></ChallengeScroll>
    </div>

    );
}

export default LeagueChallengeList;