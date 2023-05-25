import React, { useState } from 'react';
import '../../../css/Shared/addUser.css';
import '../../../css/Shared/coloredText.css';
import { sendFriendRequest } from '../../../routes/friend_list';
import { sendLeagueInvite } from "../../../routes/league";

const UserAddForm = (props) => {
    const [userGoodResponse, setUserGoodResponse] = useState("");
    const [userBadResponse, setUserBadResponse] = useState("");
    const [usernameText, setUsernameText] = useState("");

    const descriptionText = {
        "friend": { "header": "Add Friend", "subHeader": "You can add a friend with their username.", "failureText": "Sorry, a friend request could not be sent to " },
        "league": { "header": "Invite User", "subHeader": "Invite someone to your league with their username.", "failureText": "Sorry, a league invite could not be sent to " }
    }

    const setRequestSucceedsResponse = (response) => {
        setUserGoodResponse(response);
        setUserBadResponse("");
    }

    const setRequestFailsResponse = () => {
        setUserGoodResponse("");
        setUserBadResponse(descriptionText[props.type]["failureText"] + usernameText);
    }

    const sendRequest = () => {
        if (props.type === "friend") {
            sendFriendRequest(usernameText, setRequestSucceedsResponse, setRequestFailsResponse);
        }
        else if (props.type === "league") {
            let data = {
                recipient: usernameText,
                leagueID: props.leagueID
            }
            sendLeagueInvite(data, setRequestSucceedsResponse, setRequestFailsResponse);
        }
    }

    const handleTextChange = (event) => {
        setUsernameText(event.target.value);
        setUserGoodResponse("");
        setUserBadResponse("");
    }

    const handleEnter = (event) => {
        if (event.key === "Enter") {
            sendRequest();
        }
    }

    return (<div >
        <div id="addUserForm">
            <h3>{descriptionText[props.type]["header"]}</h3>
            <p className="greenBaseText">{descriptionText[props.type]["subHeader"]}</p>
            <div id="addUserInput">
                <input id="textInput" placeholder="username#0000" type="text" onChange={handleTextChange} onKeyDown={handleEnter}></input>
                <button id="buttonInput" type="button" onClick={sendRequest}>Send</button>
            </div>
            <div>
                <p className='greenBaseText'>{userGoodResponse}</p>
                <p className='redBaseText'>{userBadResponse}</p>
            </div>
        </div>
    </div>);

};

export default UserAddForm;