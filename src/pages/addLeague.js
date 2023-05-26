import React from "react";
import SideBar from "../components/Shared/SideBar";
import LeagueForm from "../components/AddLeague/LeagueForm";
import "../css/Shared/page.css";
const AddLeague = () => {
    return (
        <div data-testid="AddLeagueComponent" id="AddLeague" className="Body2Part">
            <div className="leftSide2Part">
                <SideBar></SideBar>
            </div>
            <div className="rightSide2Part">
                <div className="mainInfo">
                    <LeagueForm></LeagueForm>
                </div>
            </div>
        </div>
    );
}

export default AddLeague;