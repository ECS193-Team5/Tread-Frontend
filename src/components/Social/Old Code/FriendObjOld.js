import '../../css/Social/friendObj.css';
import React, {useState} from 'react';
import axios from 'axios';

const backend_url = process.env.REACT_APP_BACKEND 


const FriendObj = (props) => {
    const [ifAcceptButton, setAcceptButton] = useState(true);
    async function acceptFriendRequest(){
        setAcceptButton(false);

        var data = JSON.stringify({
            "username" : "RebekahGrace#4219",
            "friendName": props.children.displayName
        });

        var config = {
            method: 'post',
            url: backend_url+'/friend_list//accept_received_request',
            headers: {
              'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
        .then(async function (response) {
        })
        .catch(function (error) {
            console.log(error.status);
        });
    }

    return (
        <div className = "friendObjClass">
            <div className = "imgPortion">
                <div className = "imgClass"><img id = "profileImage" src = "https://i.imgur.com/XY9rcVx.png"/></div>
            </div>
            <div className = "namingPortion">
                <div id = "displayNameFriend">{props.children.displayName}</div>
                {props.children.received&&ifAcceptButton ? <button onClick = {acceptFriendRequest} className="acceptButton">Accept</button>: <></>}
            </div>
            <div className = "morePortion">
                <img id = "moreImage" src= "https://i.imgur.com/pnzihUp.png" alt = "three dots"></img>
            </div>


        </div>
    );
}


export default FriendObj;