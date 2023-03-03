import React, {useState} from 'react';
import PageSwitch from "../Shared/PageSwitch";
import "../../css/Profile/profileHeader.css";
import "../../css/Shared/header.css";

const ProfileHeader = () => {

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

  function getUsername(){
    // TODO get the display name from the db
    // return ("Generic Display name");
    var config = {
      method : 'post',
      url : backend_url + 'user/get_username',
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


    const [displayName] = useState(getDisplayName());
    const [username] = useState(getUsername());
    const [profilePhoto] = useState(getProfilePhoto());


    return (
        <div id = "ProfileHeader">
            <div>
                <h1>Profile</h1>
                <PageSwitch type = "profile"></PageSwitch>
            </div>
            <div>
                <div>
                    <img src = {profilePhoto} alt = "profile"/>
                </div>
                <div>
                    <h1>{displayName}</h1>
                    <h3>{username}</h3>
                </div>
                <div>
                    <h3>Add code</h3>
                    <img src = "https://i.imgur.com/rpi5EL2.png"/>
                </div>
            </div>

        </div>
    );
}


export default ProfileHeader;