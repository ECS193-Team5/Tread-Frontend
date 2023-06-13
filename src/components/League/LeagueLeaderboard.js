import LeaderboardEntry from "../Shared/LeaderboardEntry";
import React, { useState, useEffect } from "react";
import { getLeaderboardInfo } from "../../routes/league";
import "../../css/League/leagueDescriptionPage.css";
import "../../css/Shared/leaderboard.css";
import Leaderboard from "../Shared/Leaderboard";
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

  const processLeaderboardInfo = (response) => {
    if(response.data.length === 0){
      return;
    }
    let topScore = response.data[0][1];
    let information_list = [];

    for (let i = 0; i < response.data.length; i++) {
      let obj = [];
      obj["level"] = i + 1;
      obj["name"] = response.data[i][0];
      obj["score"] = response.data[i][1];
      obj["complete"]  = response.data[i][1]/topScore * 100;
      information_list.push(obj);
    }
    setLeaderboardInfo(information_list);
  }

  return (
    <Leaderboard uniqueIdentifier ={props.leagueID}>{{ "title": "League Leaderboard", "entries": { leaderboardInfo } }}</Leaderboard>
  );

}

export default LeagueLeaderboard;