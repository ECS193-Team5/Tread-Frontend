import React from "react";
import '../../../css/Shared/photoUploadForm.css';

const PhotoUploadForm = (props) => {

    function getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          document.getElementById("uploadProfilePicture").src = reader.result;
          props.children.func(reader.result);
        };
     }


    function onImageChange (event) {
        let photo = event.target.files[0];

        if(!photo){
            return;
        }
        getBase64(photo);
    }

    return (
        <div data-testid="PhotoUploadFormComponent">
            <div className = "photoShow">
                <img id = "uploadProfilePicture" className = "loadedProfileImage" src = {props.children.default} alt = "profile"></img>
            </div>
            <input data-testid="PhotoUploadFormUploadPhotoInput" className = "uploadPhoto" type = "file" accept = "image/*" onChange = {onImageChange}></input>
        </div>
    );



}


export default PhotoUploadForm;