import React, {useState, useEffect} from 'react';
import Bar from '../Shared/Bar';
import LeagueScroll from "./LeagueScroll";

import "../../css/Shared/section.css";
import "../../css/Shared/bar.css";
import "../../css/Shared/button.css";

const LeagueSection = () => {
    const [leagueState, setLeagueState] = useState("Leagues");
    let buttonList = [{"name": "Leagues", "defaultOn":true, "create":false},
    {"name": "Admin", "defaultOn":false, "create":false},
    {"name": "Sent", "defaultOn":false, "create":false},
    {"name": "Received", "defaultOn":false, "create":false},
    {"name": "Create League", "defaultOn":false, "create":true}];


    useEffect (
        () => {
            if(leagueState === "Create League"){
                window.location.href = "./addLeaguePage";
            }
        }, [leagueState]
    );

    return (
        <div data-testid="LeagueSectionComponent" className = "leagueSectionComponent">
            <div id="LeagueSection" className="section">
                <div className="selectButtonHeader">
                    <h1 className = "barHeader">Leagues</h1>
                    <Bar>{{ "buttonList": buttonList, "updateFunc": setLeagueState }}</Bar>
                </div>

                <div>

                </div>
                {(leagueState === "Leagues") ? <LeagueScroll type="league"></LeagueScroll> : <></>}
                {(leagueState === "Admin") ? <LeagueScroll type="admin"></LeagueScroll> : <></>}
                {(leagueState === "Sent") ? <LeagueScroll type="sent"></LeagueScroll> : <></>}
                {(leagueState === "Received") ? <LeagueScroll type="invite"></LeagueScroll> : <></>}
            </div>
        </div>
        )
}

export default LeagueSection;