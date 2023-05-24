import React, {useState, useEffect} from 'react';

import Bar from '../Shared/Bar';
import ChallengeScroll from './ChallengeScroll';

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
          window.location.href = "/addChallengePage";
        }

      }, [challengeState]
    );


    return (
        <div className = "challengeSection">
          <div className="selectButtonHeader">
            <h2>Personal</h2>
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