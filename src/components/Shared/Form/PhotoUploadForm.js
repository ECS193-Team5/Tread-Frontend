import React, {useState, useEffect} from "react";
import { getProfilePhoto } from "../../../routes/sign_up";

import '../../../css/Shared/photoUploadForm.css';
import { createLeaguePictureURL, createProfilePictureURL } from "../../../helpers/CloudinaryURLHelpers";
import { getUsername } from "../../../routes/user";

const PhotoUploadForm = (props) => {
    const [load, setLoad] = useState(false);
    const [src, setSource] = useState("");

    useEffect(
        () => {
          if (!load) {
            if(props.type === "createLeague"){
                setSource("https://i.imgur.com/sXwXq45.png");
                props.setPhoto("https://i.imgur.com/sXwXq45.png");
            }
            else if(props.type === "editLeague"){
                setSource(createLeaguePictureURL(props.leagueID));
            }
            else if(props.type === "signUp"){
                getProfilePhoto(setSource, props.setPhoto)
            }
            else{
                const setSourceFunc = (username) =>{
                    setSource(createProfilePictureURL(username))
                }
                getUsername(setSourceFunc)
            }
            setLoad(true);
          }
        }, [load]
      );

    function getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setSource(reader.result);
            props.setPhoto(reader.result);
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
                <img id = "uploadProfilePicture" className = "loadedProfileImage" src = {src} alt = "profile"></img>
            </div>
            <input data-testid="PhotoUploadFormUploadPhotoInput" className = "uploadPhoto" type = "file" accept = "image/*" onChange = {onImageChange}></input>
        </div>
    );



}


export default PhotoUploadForm;