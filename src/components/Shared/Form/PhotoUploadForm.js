import React from "react";
import '../../../css/Shared/photoUploadForm.css';

const PhotoUploadForm = (props) => {

    function getBase64(file) {
        var reader = new FileReader();
        console.log(file);
        reader.readAsDataURL(file);
        reader.onload = function () {
          // Set the viewing image
          document.getElementById("uploadProfilePicture").src = reader.result;

          // send the image up the stream
          props.children.func(reader.result);
        };
        reader.onerror = function (error) {
        };
     }


    function onImageChange (event) {
        let photo = event.target.files[0];
        console.log(photo);
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