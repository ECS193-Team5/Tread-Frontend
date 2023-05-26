import React from "react";
import "../../css/SignUp/signUpSideBar.css";
import sideBarExcerciseImage from "../../assets/SideBarExerciseImage.png";
import sideBarLogoImage from "../../assets/sideBarLogoImage.png"
const SignUpSideBar = () => {
    return (
        <div data-testid="SignUpSideBarComponent" id = "SignUpSideBar">
            <img id = "SideBarLogo" src = {sideBarLogoImage} alt = "tread logo"/>
            <img id = "SideBarImage" src = {sideBarExcerciseImage} alt = "tread logo"/>
        </div>
    );
}

export default SignUpSideBar;