import React from "react";
import ChallengeScroll from "./ChallengeScroll";

import "../../css/Challenge/challengeObj.css";

const GlobalChallenge = () => {
  return (
    <div id="GlobalChallenge" className="challengeSection">
      <div>
        <h2>Global Challenges</h2>
      </div>

      <ChallengeScroll type="global" ifLeague={false} leagueID={""}></ChallengeScroll>
    </div>
  );
}

export default GlobalChallenge;