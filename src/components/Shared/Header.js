import React from "react";
import PageSwitch from "./PageSwitch";
import UserSettingsButton from "./UserSettingsButton";
import "../../css/Shared/header.css";

const Header = (props) => {
    let title = props.children.title;
    let pageSwitchType = props.children.type;
    let onButton = props.children.onButton;
    let leagueID = props.children.leagueID;

    return (
        <div data-testid="HeaderComponent" id = "Header">
            <h1 data-testid="HeaderComponentTitleText" className = "headerObj" >{title}</h1>
            {
                (pageSwitchType !== "none")
                ?
                <PageSwitch className = "headerObj" type = {pageSwitchType} onButton = {onButton} leagueID = {leagueID}></PageSwitch>
                :
                <></>
            }
            <UserSettingsButton></UserSettingsButton>
        </div>
    )
}

export default Header;