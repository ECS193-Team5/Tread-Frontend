import React, {useState, useEffect} from 'react';

import PhotoUploadForm from '../Shared/Form/PhotoUploadForm';

import axios from 'axios';

import "../../css/Shared/button.css";
import "../../css/Shared/form.css";
import DisplayNameForm from '../Shared/Form/DisplayNameForm';

const backend_url = process.env.REACT_APP_PROD_BACKEND;

const ProfileSettingsForm = (props) => {
    const [photo, setPhoto] = useState(props.children.photo);
    const [displayName, setDisplayName] = useState(props.children.displayName);
    const [displayErrorResponse, setDisplayErrorResponse] = useState("");

    function submitPhoto(){
      var formData = new FormData();
      formData.append("picture", photo);
      var config = {
        method : 'post',
        url : backend_url + 'user/update_picture',
        headers: {
          Accept: 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
        data : formData
      };
    axios(config)
    .then(function(response){
      console.log("succesfully uploaded photo");
    })
    .catch(function(error){
      console.log(error)
      if(error.response.status===401){
        window.location.href = "/";
    }
    });
    }
    function submitDisplayName(){
        if (displayErrorResponse !== ""){
          return;
        }
        var config = {
          method : 'post',
          url : backend_url + 'user/update_display_name',
          headers: {
            Accept: 'application/json',
          },
          withCredentials: true,
          credentials: 'include',
          data :
          {
            displayName :displayName
          }
        };
      axios(config)
      .then(function(response){
        setDisplayErrorResponse("succesfully updated display name");
      })
      .catch(function(error){
        console.log(error)
        if(error.response.status===401){
          window.location.href = "/";
      }
      });
    }

    function stopSubmit(event){
      event.preventDefault();
    }

    return (
    <div className = "Form">
        <div className="formObj">
                <h2>Profile Picture</h2>
                <PhotoUploadForm>{{"default":props.children.photo, "func":setPhoto}}</PhotoUploadForm>
                <button className="submitButton" onClick = {submitPhoto}><p className = "submitButtonText">Submit</p></button>

          </div>
            <div className="formObj">
            <DisplayNameForm placeholder = {props.children.displayName} updateDisplayName = {setDisplayName}/>
            <button className="submitButton" onClick = {submitDisplayName}><p className = "submitButtonText">Submit</p></button>
            </div>
    </div>
    );
}

export default ProfileSettingsForm;