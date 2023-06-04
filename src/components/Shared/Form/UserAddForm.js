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
        else {
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

    return (<div data-testid="UserAddFormComponent">
        <div id="addUserForm">
            <h3>{descriptionText[props.type]["header"]}</h3>
            <p data-testid="UserAddFormDescriptionText" className="greenBaseText">{descriptionText[props.type]["subHeader"]}</p>
            <div id="addUserInput">
                <input data-testid="UserAddFormDescriptionUsernameInput" id="textInput" placeholder="username#0000" type="text" onChange={handleTextChange} onKeyDown={handleEnter}></input>
                <button data-testid="UserAddFormSendButton" id="buttonInput" type="button" onClick={sendRequest}>Send</button>
            </div>
            <div>
                <p data-testid="UserAddFormUserGoodResponse" className='greenBaseText'>{userGoodResponse}</p>
                <p data-testid="UserAddFormUserBadResponse" className='redBaseText'>{userBadResponse}</p>
            </div>
        </div>
    </div>);

};

export default UserAddForm;