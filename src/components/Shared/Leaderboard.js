import React from "react";
import LeaderboardEntry from "./LeaderboardEntry";

const Leaderboard = (props) => {
    function makeLeaderboardEntryObj(input, index){
        return (<LeaderboardEntry index = {props.uniqueIndentifier+"-"+index}>{input}</LeaderboardEntry>)
    }
    return(
        <div id = "Leaderboard">
            <h2>{props.children.title}</h2>

            <div>
                {props.children.entries.leaderboardInfo.map(makeLeaderboardEntryObj)}
            </div>
        </div>

    );

}

export default Leaderboard;