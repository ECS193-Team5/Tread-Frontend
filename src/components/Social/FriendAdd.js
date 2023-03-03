import React, {useState, useEffect} from 'react';
import '../../css/Social/addFriend.css'
import axios from 'axios';
const backend_url = process.env.REACT_APP_BACKEND 

const FriendAdd = () => {

    const [userText, setUserText] = useState("");
    const [usernameText, setUsernameText] = useState("");

    async function sendFriendRequest(){
        var data = JSON.stringify({
            "friendName": usernameText
        });

        var config = {
            method: 'post',
            url: backend_url+'/friend_list/send_friend_request',
            headers: {
              'Content-Type': 'application/json'
            },
            data : data
        };


        axios(config)
        .then(async function (response) {
            if (response.status === 200){
                setUserText("Request succesfully sent");
            }
            else {
                setUserText("Request denied: "+ response.data);
            }
        })
        .catch(function (error) {
          console.log(error);
        });

    }

    const handleTextChange = (event) => {
        setUsernameText(event.target.value);
    }

    return (<div >
        <div id = "addFriendInputForm">
        <div>
            <input id = "textInput"  placeholder = "username#0000" type = "text" onChange = {handleTextChange}></input>
            <p>{userText}</p>
        </div>
        <button id = "buttonInput"  type = "button" onClick = {sendFriendRequest}>Send</button>
        </div>
    </div>);



}

export default FriendAdd;