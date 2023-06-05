import "../css/SignUp/signUp.css";
import SignUpSideBar from "../components/SignUp/SignUpSideBar";
import SignUpForm from "../components/SignUp/SignUpForm";
import React  from "react";
const SignUp = () => {
    return (
        <div data-testid="SignUpComponent" id = "SignUp">
            <SignUpSideBar id = "SignUpBar"/>
            <SignUpForm id = "SignUpForm"></SignUpForm>
        </div>
    );
}

export default SignUp;