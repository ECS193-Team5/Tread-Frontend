import React, { useState } from 'react';

import SideBar from '../components/Shared/SideBar';
import Header from "../components/Shared/Header";
import LeagueEditForm from '../components/League/LeagueEditForm';
import LeagueHeader from "../components/League/LeagueHeader";
import LeagueChallengeList from "../components/League/LeagueChallengeList";
import LeagueMemberSection from "../components/League/LeagueMemberSection";
import LeagueLeaderboard from '../components/League/LeagueLeaderboard';

import "../css/Shared/page.css";
import { getHrefLocation } from '../helpers/CssEffects';

const League = (props) => {

    function getLeagueName() {
        let href = getHrefLocation();
        let locationQuery = href.indexOf("=");
        let substring = href.substring(locationQuery + 1);
        return substring;
    }

    const [leagueName] = useState(getLeagueName());

    return (
        <div data-testid="LeagueComponent" id="League" className='Body2Part'>
            <div className="leftSide2Part">
                <SideBar></SideBar>
            </div>
            <div className="rightSide2Part">
                <div className="mainInfo">
                    <Header>{{ "title": "Social Hub", "type": "league", "leagueID": leagueName, "onButton": props.children.type }}</Header>
                    {
                        props.children.type === "edit" ?
                        <LeagueEditForm leagueID = {leagueName}></LeagueEditForm>
                        :
                        <div>
                        <LeagueHeader>{{ "id": leagueName }}</LeagueHeader>
                        {
                            (props.children.type === "description") ?
                                <LeagueChallengeList>{{ "id": leagueName }}</LeagueChallengeList>

                                :
                                <LeagueMemberSection>{{ "id": leagueName }}</LeagueMemberSection>
                        }
                        {
                            (props.children.type === "description") ?
                                <LeagueLeaderboard>{{ "id": leagueName }}</LeagueLeaderboard>

                                :
                                <></>
                        }
                        </div>
                    }
                </div>
            </div>

        </div>
    );
}

export default League;