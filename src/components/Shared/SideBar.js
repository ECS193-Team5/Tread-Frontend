import React, {useState, useEffect} from 'react';
import '../../css/Shared/sideBar.css';
import frontPageTreadLogo from "../../assets/sideBarLogoMain.png";
import challengeButtonImage from "../../assets/ChallengeButtonImage.png";
import profileButtonImage from "../../assets/ProfileButton.png";
import socialButtonImage from "../../assets/socialButtonImage.png";
import profileSettingsButtonImage from "../../assets/profileSettingsButtonImage.png";
import { setLocation as setWindowLocation , getLocation} from "../../helpers/CssEffects";

const SideBar = () => {

    let challengePages = ["/currentChallengePage",  "/globalChallengePage"];
    let socialPages = ["/socialFriendPage", "/socialLeaguePage"];
    let profileSettingsPages = ["/profileSettingsPage"];
    let profilePages = ["/profileStatsPage", "/profileMedalPage"];
    const [challengeButton, setChallengeButton] = useState(challengePages.includes(getLocation()));
    const [socialButton, setSocialButton] = useState(socialPages.includes(getLocation()));
    const [settingsButton, setSettingsButton] = useState(profileSettingsPages.includes(getLocation()));
    const [profileButton, setProfileButton] = useState(profilePages.includes(getLocation()));
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
            setButtonOn("sideBarButtonChallenges", "challengeImage");
          } else{
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
            setWindowLocation(location);
          }
        }, [location]
      );


    function clickChallengeButton(){
      if(challengePages.includes(getLocation())){
        return;
      }
      setLocation("/currentChallengePage");
    }

    function clickSocialButton(){
      if(socialPages.includes(getLocation())){
        return;
      }
      setLocation("/socialFriendPage");
    }

    function clickSettingsButton(){
      if(profileSettingsPages.includes(getLocation())){
        return;
      }
      setLocation("/profileSettingsPage");
    }

    function clickProfileButton(){
      if(profilePages.includes(getLocation())){
        return;
      }
      setLocation("/profileStatsPage");
    }

    return (
        <div data-testid="SideBarComponent" className = "sideBarClass">
            <img id = "treadLogoSideBar" src = {frontPageTreadLogo} alt = "Tread logo"/>
            <div id = "sideBarButtons">
                <div id = "sideBarChallenges" className = "sideBarButtonSet">
                    <button data-testid="SideBarChallengesButton" title = "Challenges" className = "sideBarButtonClass" onClick = {clickChallengeButton}  id = "sideBarButtonChallenges">
                        <img className = "sideBarButtonClassInner" id = "challengeImage" src = {challengeButtonImage} alt = "Button for Challenges"/>
                    </button>
                    <p className = "sideBarText">Challenges</p>
                </div>
                <div id = "sideBarSocial" className = "sideBarButtonSet">
                    <button data-testid="SideBarSocialPageButton" title = "Social Page" className = "sideBarButtonClass" onClick = {clickSocialButton} id = "sideBarButtonSocial">
                        <img className = "sideBarButtonClassInner" id = "socialImage" src = {socialButtonImage} alt = "Button for Social"/>
                    </button>
                    <p className = "sideBarText">Social</p>
                </div>
                <div id = "sideBarProfile" className = "sideBarButtonSet">
                    <button data-testid="SideBarExerciseHistoryButton" title = "Exercise History" className = "sideBarButtonClass" onClick = {clickProfileButton} id = "sideBarButtonProfile">
                        <img className = "sideBarButtonClassInner" id = "profileImage" src = {profileButtonImage} alt = "Button for Profile"/>
                    </button>
                    <p className = "sideBarText">Exercise History</p>
                </div>
                <div id = "sideBarSettings" className = "sideBarButtonSet">
                    <button data-testid="SideBarProfileSettingsButton" title = "Profile Settings" className = "sideBarButtonClass" onClick = {clickSettingsButton} id = "sideBarButtonSettings">
                        <img className = "sideBarButtonClassInner" id = "settingsImage" src = {profileSettingsButtonImage} alt = "Button for Settings"/>
                    </button>
                    <p className = "sideBarText">Profile Settings</p>
                </div>

            </div>
        </div>
      );
}

export default SideBar;