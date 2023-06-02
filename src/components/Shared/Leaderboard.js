import React from "react";
import LeaderboardEntry from "./LeaderboardEntry";

const Leaderboard = (props) => {
    function makeLeaderboardEntryObj(input, index){
        return (<LeaderboardEntry index = {props.uniqueIndentifier+"-"+index}>{input}</LeaderboardEntry>)
    }
    return(
        <div data-testid="LeaderboardComponent" id = "Leaderboard">
            <h2 data-testid="LeaderboardComponentTitle">{props.children.title}</h2>

            <div>
                {props.children.entries.leaderboardInfo.map(makeLeaderboardEntryObj)}
            </div>
        </div>

    );

}

export default Leaderboard;