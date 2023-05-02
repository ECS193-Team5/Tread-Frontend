import React, {useState, useEffect} from 'react';
import '../../css/Shared/sideBar.css';

const SideBar = () => {

    let challengePages = ["/currentChallengePage",  "/globalChallengePage"];
    let socialPages = ["/socialFriendPage", "/socialLeaguePage"];
    let profileSettingsPages = ["/profileSettingsPage"];
    let profilePages = ["/profileStatsPage", "/profileMedalPage"];
    const [challengeButton] = useState(challengePages.includes(window.location.pathname));
    const [socialButton] = useState(socialPages.includes(window.location.pathname));
    const [settingsButton] = useState(profileSettingsPages.includes(window.location.pathname));
    const [profileButton] = useState(profilePages.includes(window.location.pathname));
    const [location, setLocation] = useState();


    function setButtonOn(buttonId, imageId){
        let button = document.getElementById(buttonId);
        let image = document.getElementById(imageId);
        image.style.filter = "invert(64%) sepia(15%) saturate(2916%) hue-rotate(3deg) brightness(103%) contrast(101%)";
        button.style.backgroundColor = "#000000";
    }

    function setButtonOff(buttonId, imageId){
        let button = document.getElementById(buttonId);
        let image = document.getElementById(imageId);
        image.style.filter = "invert(0)";
        button.style.backgroundColor = "#F9A800";
    }

    useEffect(
        () => {
          if (challengeButton) {
            // send you to the challenge page
            setButtonOn("sideBarButtonChallenges", "challengeImage");
          }else{
            setButtonOff("sideBarButtonChallenges", "challengeImage");
          }
        }, [challengeButton]
      );

      useEffect(
        () => {
          if (socialButton) {
            setButtonOn("sideBarButtonSocial", "socialImage");
          }else{
            setButtonOff("sideBarButtonSocial", "socialImage");
          }
        }, [socialButton]
      );

      useEffect(
        () => {
          if (settingsButton) {
            setButtonOn("sideBarButtonSettings", "settingsImage");
          }else{
            setButtonOff("sideBarButtonSettings", "settingsImage");
          }
        }, [settingsButton]
      );

      useEffect(
        () => {
          if (profileButton) {
            setButtonOn("sideBarButtonProfile", "profileImage");
          }else{
            setButtonOff("sideBarButtonProfile", "profileImage");
          }
        }, [profileButton]
      );

      useEffect(
        () => {
          if (location) {
            window.location.href = location;
          }
        }, [location]
      );

    function moveToFrontPage(){
      window.location.href = "/";
    }

    function clickChallengeButton(){
      if(challengePages.includes(window.location.pathname)){
        return;
      }
      setLocation("/currentChallengePage");
    }

    function clickSocialButton(){
      if(socialPages.includes(window.location.pathname)){
        return;
      }
        setLocation("/socialFriendPage");
    }

    function clickSettingsButton(){
      if(profileSettingsPages.includes(window.location.pathname)){
        return;
      }
      setLocation("/profileSettingsPage");
    }

    function clickProfileButton(){
      if(profilePages.includes(window.location.pathname)){
        return;
      }
      setLocation("/profileStatsPage");
    }

    return (
        <div className = "sideBarClass">
            <button id = "sideBarTreadLogo" ><img id = "treadLogoSideBar" onClick={moveToFrontPage} src = "https://i.imgur.com/5SSwq0U.png" alt = "Tread logo"/></button>
            <div id = "sideBarButtons">
                <div id = "sideBarChallenges" className = "sideBarButtonSet">
                    <button title = "Challenges" className = "sideBarButtonClass" onClick = {clickChallengeButton}  id = "sideBarButtonChallenges">
                        <img className = "sideBarButtonClassInner" id = "challengeImage" src = "https://i.imgur.com/orph0OI.png" alt = "Button for Challenges"/>
                    </button>
                    <p className = "sideBarText">Challenges</p>
                </div>
                <div id = "sideBarSocial" className = "sideBarButtonSet">
                    <button title = "Social Page" className = "sideBarButtonClass" onClick = {clickSocialButton} id = "sideBarButtonSocial">
                        <img className = "sideBarButtonClassInner" id = "socialImage" src = "https://i.imgur.com/GR3dM2t.png" alt = "Button for Social"/>
                    </button>
                    <p className = "sideBarText">Social</p>
                </div>
                <div id = "sideBarProfile" className = "sideBarButtonSet">
                    <button title = "Exercise History" className = "sideBarButtonClass" onClick = {clickProfileButton} id = "sideBarButtonProfile">
                        <img className = "sideBarButtonClassInner" id = "profileImage" src = "https://i.imgur.com/iMx9Um9.png" alt = "Button for Profile"/>
                    </button>
                    <p className = "sideBarText">Exercise History</p>
                </div>
                <div id = "sideBarSettings" className = "sideBarButtonSet">
                    <button title = "Profile Settings" className = "sideBarButtonClass" onClick = {clickSettingsButton} id = "sideBarButtonSettings">
                        <img className = "sideBarButtonClassInner" id = "settingsImage" src = "https://i.imgur.com/4XiFFVT.png" alt = "Button for Settings"/>
                    </button>
                    <p className = "sideBarText">Profile Settings</p>
                </div>

            </div>
        </div>
      );
}

export default SideBar;