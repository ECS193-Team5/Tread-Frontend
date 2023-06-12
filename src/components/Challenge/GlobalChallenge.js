import React from "react";
import ChallengeScroll from "./ChallengeScroll";

import "../../css/Challenge/challengeObj.css";

const GlobalChallenge = () => {
  return (
    <div data-testid="GlobalChallengeComponent" id="GlobalChallenge" className="challengeSection">
      <div>
        <h1 className="barHeader">Global</h1>
      </div>

      <ChallengeScroll type="global" ifLeague={false} leagueID={""}></ChallengeScroll>
    </div>
  );
}

export default GlobalChallenge;