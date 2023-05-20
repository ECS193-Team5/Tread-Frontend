import {useState, useEffect} from 'react';
import "../../css/Shared/pageSwitch.css";

const PageSwitch = (props) => {
    const [onButton, setOnButton] = useState(props.onButton);

    useEffect (
        () => {
            let elements = document.getElementsByClassName("switchButton");

            for (let i = 0; i < elements.length; i++ ){
                let element = elements[i];
                if (element.id === onButton){
                    element.classList.add("onButton");
                    element.classList.remove("offButton")
                }
                else{
                    element.classList.add("offButton");
                    element.classList.remove("onButton");
                }
            }

        }, [onButton]
    );

    function moveProfileStats(){
        window.location.href = "./profileStatsPage";
        setOnButton("stats");
    }

    function moveProfileMedals(){
        window.location.href = "./profileMedalPage";
        setOnButton("medals");
    }

    function moveCurrentChallenge(){
        window.location.href = "./currentChallengePage";
        setOnButton("current");
    }

    function moveGlobalChallenge(){
        window.location.href = "./globalChallengePage";
        setOnButton("global");
    }

    function moveSocialFriend(){
        window.location.href = "./socialFriendPage";
        setOnButton("friend");
    }

    function moveSocialLeague(){
        window.location.href = "./socialLeaguePage";
        setOnButton("social");
    }

    function moveLeagueDescription(){
        window.location.href = "./leagueDescriptionPage?=" + props.leagueID;
        setOnButton("description");
    }

    function moveLeagueMember(){
        window.location.href = "./leagueMemberPage?=" + props.leagueID;
        setOnButton("member");
    }

    return(
        <div>
        {  props.type === "challenge" ?
            <div id ="PageSwitch">
                <button id = "current" className = "switchButton" onClick = {moveCurrentChallenge}><p className = "switchButtonText">Current</p></button>
                <button id = "global" className = "switchButton" onClick = {moveGlobalChallenge}><p className = "switchButtonText">Global</p></button>
            </div>
            :
            <></>
        }
        {  props.type === "social" ?
            <div id ="PageSwitch">
                <button id = "friend" className = "switchButton" onClick = {moveSocialFriend}><p className = "switchButtonText">Friend</p></button>
                <button id = "league" className = "switchButton" onClick = {moveSocialLeague}><p className = "switchButtonText">League</p></button>
            </div>
            :
            <></>
        }
        {  props.type === "profile" ?
            <div id ="PageSwitch">
                <button id = "stats" className = "switchButton" onClick = {moveProfileStats}><p className = "switchButtonText">Stats</p></button>
                <button id = "medal" className = "switchButton" onClick = {moveProfileMedals}><p className = "switchButtonText">Medals</p></button>
            </div>
            :
            <></>
        }
        {  props.type === "league" ?
            <div id ="PageSwitch">
                <button id = "description" className = "switchButton" onClick = {moveLeagueDescription}><p className = "switchButtonText">Description</p></button>
                <button id = "member" className = "switchButton" onClick = {moveLeagueMember}><p className = "switchButtonText">Members</p></button>
            </div>
            :
            <></>
        }
        </div>


    )
}

export default PageSwitch;