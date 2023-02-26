import '../../css/Shared/sideBar.css'
import React, {useState, useEffect} from 'react';
const SideBar = () => {
    console.log(window.location.pathname);
    const [challengeButton, setChallengeButton] = useState(window.location.pathname === "/currentChallengePage"  || window.location.pathname === "/weeklyChallengePage");
    const [socialButton, setSocialButton] = useState(window.location.pathname === "/socialPage");
    const [settingsButton, setSettingsButton] = useState(window.location.pathname === "/profileSettingsPage");
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
          if (location) {
            window.location.href = location;
          }
        }, [location]
      );

    function moveToFrontPage(){
      window.location.href = "/";
    }

    function clickChallengeButton(){
      if((window.location.pathname === "/currentChallengePage"  || window.location.pathname === "/weeklyChallengePage")){
        return;
      }
      setLocation("/currentChallengePage");
    }

    function clickSocialButton(){
        setLocation("/socialPage");
    }

    function clickSettingsButton(){
        setLocation("/profileSettingsPage");
    }

    return (
        <div className = "sideBarClass">
            <button id = "sideBarTreadLogo" ><img id = "treadLogoSideBar" onClick={moveToFrontPage} src = "https://i.imgur.com/5SSwq0U.png" alt = "Tread logo"/></button>
            <div id = "sideBarButtons">
                <div id = "sideBarChallenges">
                    <button className = "sideBarButtonClass" onClick = {clickChallengeButton}  id = "sideBarButtonChallenges">
                        <img className = "sideBarButtonClassInner" id = "challengeImage" src = "https://i.imgur.com/orph0OI.png" alt = "Button for Challenges"/>
                    </button>
                </div>
                <div id = "sideBarSocial">
                    <button className = "sideBarButtonClass" onClick = {clickSocialButton} id = "sideBarButtonSocial">
                        <img className = "sideBarButtonClassInner" id = "socialImage" src = "https://i.imgur.com/GR3dM2t.png" alt = "Button for Social"/>
                    </button>
                </div>
                <div id = "sideBarSettings">
                    <button className = "sideBarButtonClass" onClick = {clickSettingsButton} id = "sideBarButtonSettings">
                        <img className = "sideBarButtonClassInner" id = "settingsImage" src = "https://i.imgur.com/4XiFFVT.png" alt = "Button for Settings"/>
                    </button>
                </div>
            </div>
        </div>
      );
}

export default SideBar;