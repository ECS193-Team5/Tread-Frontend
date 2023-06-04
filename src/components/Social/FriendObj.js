import React, { useState, useEffect } from 'react';
import "../../css/Shared/button.css";
import "../../css/Social/obj.css";
import { createProfilePictureURL } from "../../helpers/CloudinaryURLHelpers";
import DropDown from '../Shared/DropDown';
import { setDisplayProperty } from '../../helpers/CssEffects';
import moreInfoButton from "../../assets/moreInfoButton.png";
import { sendChallengeRedirect } from '../../helpers/FormHelpers';
import { revokeFriendRequest, unBlockUser, blockUser, removeFriend, acceptFriendRequest, declineFriendRequest } from '../../routes/friend_list';


const FriendObj = (props) => {
  const [load, setLoad] = useState(false);
  const [selectShow, setSelectShow] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  let type = props.type;

  useEffect(
    () => {
      if (!load) {
        setLoad(true);
        calculateFriendOptions();
      }
    }, [load]
  );

  function toggleSelectShow() {
    setSelectShow(!selectShow);
  }

  function hideFriendObj(){
    setDisplayProperty("FriendObj" + props.children.username, "none");
  }

  function unfriend() {
    removeFriend(props.children.username, hideFriendObj)
  }

  function block() {
    blockUser(props.children.username, hideFriendObj);
  }

  function revoke() {
    revokeFriendRequest(props.children.username, hideFriendObj);
  }

  function unblock() {
    unBlockUser(props.children.username, hideFriendObj);
  }

  function accept() {
    acceptFriendRequest(props.children.username, hideFriendObj);
  }

  function decline() {
    declineFriendRequest(props.children.username, hideFriendObj)
  }

  function sendFriendChallengeRedirect() {
    sendChallengeRedirect("friend", props.children.username);
  }

  function calculateFriendOptions() {
    let friendOptions = [];
    if (type === "friend") {
      friendOptions.push({ "name": "Unfriend", "func": unfriend });
      friendOptions.push({ "name": "Block", "func": block });
      friendOptions.push({ "name": "Send Challenge", "func": sendFriendChallengeRedirect });
    }
    else if (type === "sent") {
      friendOptions.push({ "name": "Revoke Request", "func": revoke });
      friendOptions.push({ "name": "Block", "func": block });
    }
    else if (type === "received") {
      friendOptions.push({ "name": "Accept", "func": accept });
      friendOptions.push({ "name": "Decline", "func": decline });
      friendOptions.push({ "name": "Block", "func": block });
    }
    else if (type === "blocked") {
      friendOptions.push({ "name": "Unblock", "func": unblock });
    }
    setDropdownOptions(friendOptions);
  }

  return (
    <div data-testid={"FriendObjComponent" + props.index} id={"FriendObj" + props.children.username} className="displayObj">
      <div className="objSection objSectionLeague">
        <img className="objProfilePhoto objSectionLeague" src={createProfilePictureURL(props.children.username)} alt="profile" />
      </div>
      <div className="objSection objWritingSection">
        <p data-testid={"FriendObjDisplayName" + props.index} className="objDisplayName">{props.children.displayName}</p>
        <p data-testid={"FriendObjUsername" + props.index} className="objUsername">{props.children.username}</p>
      </div>
      <div className="objSection objButtonSection">
        <button data-testid={"FriendObjMoreInfoButton" + props.index} className="moreInfoButton objButtonMore" onClick={toggleSelectShow}>
          <img src={moreInfoButton} alt="toggle button" />
        </button>
        {(selectShow) ? <div className='objDropdown'><DropDown uniqueDeterminer={props.children.username + "FriendObj"}>{dropdownOptions}</DropDown></div> : <></>}
      </div>
    </div>
  )

}

export default FriendObj;