import React, {useState} from 'react';
import axios from 'axios';
import '../../css/Shared/addUser.css';
import '../../css/Shared/coloredText.css';

const backend_url = process.env.REACT_APP_PROD_BACKEND;

const FriendAdd = () => {
    const [userResponse, setUserResponse] = useState("");
    const [usernameText, setUsernameText] = useState("");

    async function sendFriendRequest(){

        var config = {
            method : 'post',
            url : backend_url + 'friend_list/send_friend_request',
            headers: {
              Accept: 'application/json',
            },
            data :
            {
              friendName : usernameText
            },
            withCredentials: true,
            credentials: 'include'
          };
          axios(config)
          .then(function(response) {
              setUserResponse("Sent!");
          })
          .catch(function(error){
              console.log(error);
              setUserResponse("Sorry, could not send a friend request to that user");
              if(error.response.status===401){
                window.location.href = "/";
            }
          });
    }

    const handleTextChange = (event) => {
        setUsernameText(event.target.value);
        setUserResponse("");
    }

    return (<div >
        <div id = "addFriendInputForm">
        <h3>ADD FRIEND</h3>
        <p className = "greenBaseText">You can add a friend with their username.</p>
        <div id = "addFriendInput">
            <input id = "textInput"  placeholder = "username#0000" type = "text" onChange = {handleTextChange}></input>
            <button id = "buttonInput"  type = "button" onClick = {sendFriendRequest}>Send</button>
        </div>
        <div>
            <p className='greenBaseText'>{userResponse}</p>
        </div>

        </div>
    </div>);



}

export default FriendAdd;