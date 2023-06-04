import "../css/SignUp/signUp.css";
import SignUpSideBar from "../components/SignUp/SignUpSideBar";
import SignUpForm from "../components/SignUp/SignUpForm";
import React, {useState, useEffect} from "react";
import { getProfilePhoto } from "../routes/sign_up";

const SignUp = () => {
    const [profilePhoto,setPhoto] = useState("");
    const [load, setLoad] = useState(false);

    useEffect (
        () => {
            if(!load){
                getProfilePhoto(setPhoto);
                setLoad(true);
            }
        }, [load]
      );

    return (
        <div data-testid="SignUpComponent" id = "SignUp">
            <SignUpSideBar id = "SignUpBar"/>
            <SignUpForm id = "SignUpForm">{{"profilePhoto":profilePhoto}}</SignUpForm>

        </div>
    );
}

export default SignUp;