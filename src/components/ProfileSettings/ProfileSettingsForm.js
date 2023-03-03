import React, {useState} from 'react';

import PhotoUpload from '../Shared/PhotoUpload';
import "../../css/Shared/button.css";
import "../../css/Shared/form.css";

const ProfileSettingsForm = () => {
    const [photo, setPhoto] = useState(getProfilePhoto());
    const [displayName, setDisplayName] = useState(getDisplayName());
    const [displayErrorResponse, setDisplayErrorResponse] = useState("");
    const [submitErrorResponse, setSubmitErrorResponse] = useState();

    function getProfilePhoto(){
      //TODO
      var config  = {
          method : 'post',
          url: backend_url+'auth/get_profile_photo',
          headers: {
              Accept: 'application/json',
            },
          withCredentials: true,
          credentials: 'include'
      };
      axios(config)
      .then(function(response) {
          console.log("response received")
          console.log(response.data)
          return response.data;
      })
      .catch(function(error){
          console.log(error)
          console.log("No response")
      });
  }


    function getDisplayName(){
        // TODO get the display name from the db
        // return ("Generic Display name");
        var config = {
          method : 'post',
          url : backend_url + 'user/get_display_name',
          headers: {
            Accept: 'application/json',
          },
          withCredentials: true,
          credentials: 'include',
        };
        axios(config)
        .then(function(response){
          return response.data;
        })
        .catch(function(error){
          console.log(error)
        });
    }

    function uploadPhoto(photo){
        setPhoto(photo);
    }

    function validateDisplay(event){
        let displayNameInput = event.target.value;
        if (displayNameInput.length === 0){
            setDisplayErrorResponse("Cannot sign up, display name needs to be at least one character");
            return false;
        }

        setDisplayErrorResponse("");
        setDisplayName(displayNameInput);
        return true;
    }

    function submitProfileSettings(){
        //verify stuff, if bad inputs or bad response, trigger errors and if succesful, stay on page
        if (displayErrorResponse !== ""){
          setSubmitErrorResponse("Correct Highlighted fields to proceed");
          return false;
        }

        var config = {
          method : 'post',
          url : backend_url + 'user/update_profile_info',
          headers: {
            Accept: 'application/json',
          },
          withCredentials: true,
          credentials: 'include',
          data :
          {
            picture : photo,
            displayName :displayName
          }
        };
      axios(config)
      .then(function(response){
        window.location.href = "./profileSettingsPage";
      })
      .catch(function(error){
        console.log(error)
      });

    }


    return (
    <div className = "Form">
        <div className="formObj">
                <h2 className="formObjInner">Profile Picture</h2>
                <PhotoUpload defaultImage = {photo} func = {uploadPhoto}></PhotoUpload>
            </div>

            <div className="formObj">
                <h2 className="formObjInner">Display Name</h2>
                <p className="formObjInner">This is what others will see</p>
                <input className="formTextInput" type = "text"  onChange = {validateDisplay}/>
                <p className = "errorBox">{displayErrorResponse}</p>
            </div>

            <div className = "formObj">
                <button className="submitButton" onClick = {submitProfileSettings}><p className = "submitButtonText">Submit</p></button>
                <p className = "errorBox">{submitErrorResponse}</p>
            </div>
    </div>
    );
}

export default ProfileSettingsForm;