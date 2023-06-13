import React from "react";
import {useEffect} from "react";
import PhotoDisplay from "../components/Challenge/PhotoDisplay";
import ShowDueDate from "../components/Challenge/ShowDueDate";
import LeagueMemberScroll from "../components/League/LeagueMemberScroll";
import LeagueMemberSection from "../components/League/LeagueMemberSection";
import UserSettingsButtton from "../components/Shared/UserSettingsButton";
import Header from "../components/Shared/Header";
import ProgressBar from "../components/Shared/ProgressBar";
import SideBar from "../components/Shared/SideBar";
import img from "../../src/assets/key.png";
const TestDiv = () => {
    let leagueName = "name";
    let leagueID = "leagueID";

    let receiver = leagueName + " - " + leagueID;
    let recipient = receiver.split('-')[1].trim();

    return(
        <div id = "container">
            <img className="item" src = {img}/>
            <img className="item" src = {img}/>
            <img className="item" src = {img}/>
            <img className="item" src = {img}/>
        </div>
    );
}
export default TestDiv;