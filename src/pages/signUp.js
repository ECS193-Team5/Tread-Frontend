import "../css/SignUp/signUp.css";

import SignUpSideBar from "../components/SignUp/SignUpSideBar";
import SignUpForm from "../components/SignUp/SignUpForm";
import React, {useState, useEffect} from "react";
import axios from "axios";

// const backend_url = process.env.REACT_APP_PROD_BACKEND
const backend_url = process.env.REACT_APP_PROD_BACKEND
const SignUp = () => {
    const [profilePhoto,setPhoto] = useState("");
    const [load, setLoad] = useState(false);

    useEffect (
        () => {
            if(!load){
                getProfilePhoto();
                setLoad(true);
            }
        }, [load]
      );

    function getProfilePhoto(){
        var config  = {
            method : 'post',
            url: backend_url+'sign_up/get_profile_photo',
            headers: {
                Accept: 'application/json',
              },
            withCredentials: true,
            credentials: 'include'
        };
        axios(config)
        .then(function(response) {
            setPhoto(response.data);
        })
        .catch(function(error){
            if(error.response.status===400){
                window.location.href = "/";
            }
        });
    }

    return (
        <div data-testid="SignUpComponent" id = "SignUp">
            <SignUpSideBar id = "SignUpBar"/>
            <SignUpForm id = "SignUpForm">{{"profilePhoto":profilePhoto}}</SignUpForm>

        </div>
    );
}

export default SignUp;