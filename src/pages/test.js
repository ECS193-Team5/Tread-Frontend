import React from "react";
import {useEffect} from "react";
import PhotoDisplay from "../components/Challenge/PhotoDisplay";
import ShowDueDate from "../components/Challenge/ShowDueDate";
import LeagueMemberScroll from "../components/League/LeagueMemberScroll";
import LeagueMemberSection from "../components/League/LeagueMemberSection";
import UserSettingsButtton from "../components/Shared/UserSettingsButton";
import Header from "../components/Shared/Header";
import ProgressBar from "../components/Shared/ProgressBar";
const TestDiv = () => {
    let leagueName = "name";
    let leagueID = "leagueID";

    let receiver = leagueName + " - " + leagueID;
    let recipient = receiver.split('-')[1].trim();
    console.log(recipient);
    return(
        <div style = {{"width":"500px"}}>
            <ProgressBar>{{ "completed": 0 }}</ProgressBar>
            <ProgressBar>{{ "completed": 10 }}</ProgressBar>
            <ProgressBar>{{ "completed": 110 }}</ProgressBar>

        </div>
    );
}
export default TestDiv;