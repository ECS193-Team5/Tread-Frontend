import React, {useState} from 'react';

import FriendScroll from './FriendScroll';
import Bar from '../Shared/Bar';
import UserAddForm from '../Shared/Form/UserAddForm';

import "../../css/Shared/section.css";
import "../../css/Shared/bar.css";


const FriendSection = (props) => {
    const [friendState, setFriendState] = useState("Friends");
    let buttonList = [{"name": "Friends", "defaultOn":true, "create":false},
    {"name": "Sent", "defaultOn":false, "create":false},
    {"name": "Received", "defaultOn":false, "create":false},
    {"name": "Blocked", "defaultOn":false, "create":false},
    {"name": "Add User", "defaultOn":false, "create":true}];

    return (
    <div id = "FriendSection" className='section'>
        <div className ="selectButtonHeader">
            <h1>Friends</h1>
            <Bar>{{"buttonList":buttonList, "updateFunc":setFriendState}}</Bar>
        </div>
        { (friendState === "Friends") ? <FriendScroll type = "friend"></FriendScroll> : <></>}
        { (friendState === "Sent") ? <FriendScroll type = "sent"></FriendScroll> : <></>}
        { (friendState === "Received") ? <FriendScroll type = "received"></FriendScroll> : <></>}
        { (friendState === "Blocked") ? <FriendScroll type = "blocked"></FriendScroll> : <></>}
        { (friendState === "Add User") ? <UserAddForm type = "friend"></UserAddForm> : <></>}
    </div>
    )
}

export default FriendSection;