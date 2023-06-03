import LeagueLeaderboardEntry from "./LeagueLeaderboardEntry";
import React, { useState, useEffect } from "react";
import { setDisplayProperty } from "../../helpers/CssEffects";
import { getLeaderboardInfo } from "../../routes/league";
import "../../css/League/leagueDescriptionPage.css";

const LeagueLeaderboard = (props) => {
  let leagueID = props.children.id;
  const [leaderboardInfo, setLeaderboardInfo] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(
    () => {
      if (!load) {
        getLeaderboardInfo(leagueID, processLeaderboardInfo);
        setLoad(true);
      }
    }, [load]
  );

  useEffect(
    () => {
      if (leaderboardInfo.length === 0) {
        setDisplayProperty("LeagueLeaderboard", "none")
      }
      else if (leaderboardInfo) {
        setDisplayProperty("LeagueLeaderboard", "block")
      }
    }, [leaderboardInfo]
  );


  const processLeaderboardInfo = (response) => {
    let information_list = response.data;

    for (let i = 0; i < information_list.length; i++) {
      information_list[i]["level"] = i + 1;
    }
    setLeaderboardInfo(information_list);
  }

  function makeLeaderboardEntryObj(input, index) {
    return (<LeagueLeaderboardEntry index={index}>{input}</LeagueLeaderboardEntry>)
  }

  return (
    <div data-testid="LeagueLeaderboardComponent" id="LeagueLeaderboard">
      <h2>League Leaderboard</h2>

      <div id="LeagueLeaderboardExterior">
        <div id="LeagueLeaderboardList">
          {leaderboardInfo.map(makeLeaderboardEntryObj)}
        </div>
      </div>
    </div>

  );

}

export default LeagueLeaderboard;