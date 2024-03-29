import React, {useState, useEffect} from 'react';

import Bar from '../Shared/Bar';
import ChallengeScroll from './ChallengeScroll';
import { setLocation } from '../../helpers/CssEffects';
import "../../css/Shared/section.css";
import "../../css/Shared/bar.css";
import "../../css/Challenge/challengeObj.css";

const CurrentChallenge = () => {
    const [challengeState, setChallengeState] = useState("Current");
    let challengeBarButtonList = [{"name": "Current", "defaultOn":true, "create":false},
      {"name": "Sent", "defaultOn":false, "create":false},
      {"name": "Received", "defaultOn":false, "create":false},
      {"name": "Send Challenge", "defaultOn":false, "create":true}];

    useEffect(
      () => {
        if (challengeState === "Send Challenge") {
          setLocation("/addChallengePage");
        }

      }, [challengeState]
    );

    return (
        <div data-testid="CurrentChallengeComponent" className = "challengeSection">
          <div className="selectButtonHeader">
            <h1 className = "barHeader">Current</h1>
            <Bar>{{"buttonList":challengeBarButtonList, "updateFunc":setChallengeState}}</Bar>
          </div>
          <div>
          {(challengeState === "Current") ? <ChallengeScroll type = "issued" ifLeague = {false} leagueID = {""}></ChallengeScroll> : <></>}
          {(challengeState === "Sent") ? <ChallengeScroll type = "sent" ifLeague = {false} leagueID = {""}></ChallengeScroll> : <></>}
          {(challengeState === "Received") ? <ChallengeScroll type = "received" ifLeague = {false} leagueID = {""}></ChallengeScroll> : <></>}
          </div>
        </div>
      );
}

export default CurrentChallenge;