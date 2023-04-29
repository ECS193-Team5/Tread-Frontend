import {useState, useEffect} from 'react';
import Bar from '../Shared/Bar';
import LeagueScroll from "./LeagueScroll";

import "../../css/Shared/section.css";
import "../../css/Shared/bar.css";
import "../../css/Shared/button.css";

const LeagueSection = () => {
    const [leagueState, setLeagueState] = useState("All");
    let buttonList = [{"name": "All", "defaultOn":true, "create":false},
    {"name": "Admin", "defaultOn":false, "create":false},
    {"name": "Sent", "defaultOn":false, "create":false},
    {"name": "Received", "defaultOn":false, "create":false},
    {"name": "Create", "defaultOn":false, "create":true}];


    useEffect (
        () => {
            if(leagueState === "Create"){
                window.location.href = "./addLeaguePage";
            }
            else{
                console.log( "Set league state to not create", leagueState);
            }
        }, [leagueState]
    );

    return (
        <div id = "LeagueSection" className="section">
            <div className ="selectButtonHeader">
                <h1>Leagues</h1>
                <Bar>{{"buttonList":buttonList, "updateFunc":setLeagueState}}</Bar>
            </div>

        <div>

        </div>
            { (leagueState === "All") ? <LeagueScroll type = "league"></LeagueScroll> : <></>}
            { (leagueState === "Admin") ? <LeagueScroll type = "admin"></LeagueScroll> : <></>}
            { (leagueState === "Sent") ? <LeagueScroll type = "sent"></LeagueScroll> : <></>}
            { (leagueState === "Received") ? <LeagueScroll type = "invite"></LeagueScroll> : <></>}
        </div>
        )
}

export default LeagueSection;