import React, {useState} from 'react';
import axios from 'axios';
import '../../css/Shared/addUser.css';

const backend_url = process.env.REACT_APP_PROD_BACKEND;

const MemberAdd = (props) => {

    const [userText, setUserText] = useState("");
    const [usernameText, setUsernameText] = useState("");

    async function sendLeagueRequest(){

        var config = {
            method : 'post',
            url : backend_url + 'league/invite_to_join',
            headers: {
              Accept: 'application/json',
            },
            data :
            {
              recipient: usernameText,
              leagueID: props.leagueID
            },
            withCredentials: true,
            credentials: 'include'
          };
          axios(config)
          .then(function(response) {
            console.log("Send invite");
              setUserText(response.data);
          })
          .catch(function(error){
              console.log(error);
              setUserText("Sorry, could not invite that user");
              if(error.response.status===401){
                window.location.href = "/loginPage";
            }
          });
    }

    const handleTextChange = (event) => {
        setUsernameText(event.target.value);
    }

    return (<div >
    <div id = "addFriendInputForm">
        <h3>INVITE USER</h3>
        <p className = "greenBaseText">Invite someone to your league with their username</p>
        <div id = "addFriendInput">
            <input id = "textInput"  placeholder = "username#0000" type = "text" onChange = {handleTextChange}></input>
            <button id = "buttonInput"  type = "button" onClick = {sendLeagueRequest}>Send</button>
        </div>
        <div>
            <p className='greenBaseText'>{userText}</p>
        </div>

        </div>
    </div>);



}

export default MemberAdd;