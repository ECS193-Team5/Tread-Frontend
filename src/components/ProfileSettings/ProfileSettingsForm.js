import React, {useState} from 'react';
import PhotoUploadForm from '../Shared/Form/PhotoUploadForm';
import DisplayNameForm from '../Shared/Form/DisplayNameForm';
import { updateUserPicture, updateDisplayName } from '../../routes/user';
import "../../css/Shared/button.css";
import "../../css/Shared/form.css";


const ProfileSettingsForm = (props) => {
    const [photo, setPhoto] = useState();
    const [displayName, setDisplayName] = useState(props.children.displayName);
    const [displayErrorResponse, setDisplayErrorResponse] = useState("");
    const [photoResponse, setPhotoResponse] = useState("");

    const submitPhoto = () =>{
      updateUserPicture(photo, setPhotoResponse);
    }

    const submitDisplayName = () =>{
      if (displayName === "") {
        setDisplayErrorResponse("Could not submit this display name");
        return;
      }
      console.log("did I update");
      updateDisplayName(displayName, setDisplayErrorResponse);
    }

    return (
    <div data-testid="ProfileSettingsFormComponent" className = "Form">
        <div className="formObj">
                <h2>Profile Picture</h2>
                <PhotoUploadForm>{{"default":props.children.photo, "func":setPhoto}}</PhotoUploadForm>
                <button data-testid="ProfileSettingsFormPhotoSubmit" className="submitButton" onClick = {submitPhoto}><p className = "submitButtonText">Submit</p></button>
                <p data-testid="ProfileSettingsFormPhotoResponse">{photoResponse}</p>

          </div>
            <div className="formObj">
            <DisplayNameForm placeholder = {props.children.displayName} updateDisplayName = {setDisplayName}/>
            <button data-testid="ProfileSettingsFormDisplayNameSubmit" className="submitButton" onClick = {submitDisplayName}><p className = "submitButtonText">Submit</p></button>
            <p data-testid="ProfileSettingsFormDisplayErrorResponse">{displayErrorResponse}</p>
            </div>
    </div>
    );
}

export default ProfileSettingsForm;