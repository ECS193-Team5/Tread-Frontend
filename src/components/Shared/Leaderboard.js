import React, {useEffect} from "react";
import LeaderboardEntry from "./LeaderboardEntry";
import { setDisplayProperty } from "../../helpers/CssEffects";

const Leaderboard = (props) => {
    function makeLeaderboardEntryObj(input, index){
        return (<LeaderboardEntry index = {props.uniqueIndentifier+"-"+index}>{input}</LeaderboardEntry>)
    }


  useEffect(
    () => {
      if (props.children.entries.leaderboardInfo.length === 0 && props.children.title === "League Leaderboard") {
        setDisplayProperty("Leaderboard", "none")
      }
      else if (props.children.title === "League Leaderboard") {
        setDisplayProperty("Leaderboard", "block")
      }
    }, [props.children.entries.leaderboardInfo]
  );
    return(
        <div data-testid="LeaderboardComponent" id = "Leaderboard">
            <h2 data-testid="LeaderboardComponentTitle">{props.children.title}</h2>
            <div id="LeaderboardEntryListComponent">
                {props.children.entries.leaderboardInfo.map(makeLeaderboardEntryObj)}
            </div>
        </div>

    );

}

export default Leaderboard;