import React from "react";
import SideBar from "../components/Shared/SideBar";
import Header from "../components/Shared/Header";
import AddExerciseBox from "../components/Challenge/AddExerciseBox";
import CurrentChallenge from "../components/Challenge/CurrentChallenge";
import GlobalChallenge from "../components/Challenge/GlobalChallenge";
import "../css/Shared/page.css";

const Challenge = (props) => {

    return (
        <div id="Challenge" className="Body2Part">
            <div className="leftSide2Part">
                <SideBar ></SideBar>
            </div>

            <div className="rightSide2Part">

                <div className="mainInfo">
                    <Header>{{ "title": "Challenge", "type": "challenge", "onButton": props.children.type }}</Header>
                    <AddExerciseBox></AddExerciseBox>
                    {(props.children.type === "current") ? <CurrentChallenge></CurrentChallenge> : <GlobalChallenge></GlobalChallenge>}

                </div>
            </div>
        </div>
    );
}

export default Challenge;