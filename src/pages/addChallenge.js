import React from "react";
import ChallengeForm from "../components/AddChallenge/ChallengeForm";
import SideBar from "../components/Shared/SideBar";
import "../css/Shared/page.css";
const AddChallenge = () => {
    return (
        <div id="AddChallenge" className="Body2Part">
            <div className="leftSide2Part">
                <SideBar></SideBar>
            </div>
            <div className="rightSide2Part">
                <div className="mainInfo">
                    <ChallengeForm></ChallengeForm>
                </div>
            </div>
        </div>
    );
}

export default AddChallenge;