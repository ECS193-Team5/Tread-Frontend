import {useState, useEffect} from 'react';

import Bar from '../Shared/Bar';
import ChallengeScroll from './ChallengeScroll';

import "../../css/Shared/section.css";
import "../../css/Shared/bar.css";
import "../../css/Challenge/challengeObj.css";

const CurrentChallenge = () => {
    const [challengeState, setChallengeState] = useState("All");
    let buttonList = [{"name": "All", "defaultOn":true, "create":false},
      {"name": "Sent", "defaultOn":false, "create":false},
      {"name": "Received", "defaultOn":false, "create":false},
      {"name": "Create", "defaultOn":false, "create":true}];

    useEffect(
      () => {
        if (challengeState === "Create") {
          window.location.href = "/addChallengePage";
        }

      }, [challengeState]
    );


    return (
        <div className = "challengeSection">
          <div id = "TopPart" className="selectButtonHeader">
            <h2>Personal</h2>
            <Bar>{{"buttonList":buttonList, "updateFunc":setChallengeState}}</Bar>
          </div>
          <div id = "BottomPart">
          {(challengeState === "All") ? <ChallengeScroll type = "issued" ifLeague = {false} leagueID = {""}></ChallengeScroll> : <></>}
          {(challengeState === "Sent") ? <ChallengeScroll type = "sent" ifLeague = {false} leagueID = {""}></ChallengeScroll> : <></>}
          {(challengeState === "Received") ? <ChallengeScroll type = "received" ifLeague = {false} leagueID = {""}></ChallengeScroll> : <></>}
          </div>
        </div>
      );
}

export default CurrentChallenge;