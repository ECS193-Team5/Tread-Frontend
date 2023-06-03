import React, { useState, useEffect } from 'react';
import "../../css/League/member.css";
import { createProfilePictureURL } from "../../helpers/CloudinaryURLHelpers";
import { setDisplayProperty, reloadPage } from '../../helpers/CssEffects';
import DropDown from '../Shared/DropDown';
import adminKey from "../../assets/key.png";
import ownerCrown from "../../assets/Crown.png";
import moreInfoButton from "../../assets/moreInfoButton.png";
import { blockUser, removeFriend, sendFriendRequest, unBlockUser } from '../../routes/friend_list';
import { removeAdminUser, addAdminUser, banUser, unbanUser, acceptUser, declineUser, revokeUser, kickOutUser } from '../../routes/league';


const MemberEntry = (props) => {
  const [load, setLoad] = useState(false);
  const [selectShow, setSelectShow] = useState();
  const [memberDropDownEntries, setMemberDropDownEntries] = useState([]);

  useEffect(
    () => {
      if (!load) {
        calculateMemberEntries();
        setLoad(true);
      }
    }, [load]
  );

  useEffect(
    () => {
      if (memberDropDownEntries.length === 0) {
        setDisplayProperty("moreInfoButtonMember"+ props.children.memberData.username, "none");
      }else{
        setDisplayProperty("moreInfoButtonMember"+ props.children.memberData.username, "flex");
      }
    }, [memberDropDownEntries]
  );

  function isFriend(){
    return props.children.scrollData.friends.includes(props.children.memberData.username);
  }

  function isBlocked(){
    return props.children.scrollData.blocked.includes(props.children.memberData.username);
  }

  function isSelf(){
    return props.children.memberData.username === props.children.scrollData.username;
  }

  function calculateMemberEntries() {
    let scrollType = props.children.scrollData.scrollType;
    let otherUserType = props.children.memberData.role;
    let selfType = props.children.scrollData.role;
    let ifSelfAdmin = selfType === "admin" || selfType === "owner";

    let dropdownOptions = [];

    if(isSelf()){
      return dropdownOptions;
    }

    if (isFriend()) {
      dropdownOptions.push({ "name": "Unfriend", "func": unfriend });
      dropdownOptions.push({ "name": "Block", "func": block });
    }
    else if(!isFriend() && isBlocked()){
      dropdownOptions.push({ "name": "Friend", "func": addFriend });
      dropdownOptions.push({ "name": "Unblock", "func": unblock });
    }
    else{
      dropdownOptions.push({ "name": "Friend", "func": addFriend });
      dropdownOptions.push({ "name": "Block", "func": block });
    }

    if (ifSelfAdmin && scrollType === "Members" && otherUserType !== "owner") {
      dropdownOptions.push({ "name": "Kick Out", "func": kickOut });
      dropdownOptions.push({ "name": "Ban", "func": ban });
    }

    if (ifSelfAdmin && otherUserType === "admin" && scrollType === "Members") {
      dropdownOptions.push({ "name": "Remove Admin", "func": removeAdmin });
    }

    if (ifSelfAdmin && otherUserType === "participant" && scrollType === "Members") {
      dropdownOptions.push({ "name": "Add Admin", "func": addAdmin });
    }

    if (scrollType === "Received" && (ifSelfAdmin)) {
      dropdownOptions.push({ "name": "Accept", "func": accept });
      dropdownOptions.push({ "name": "Decline", "func": decline });
    }

    if (scrollType === "Banned" && (ifSelfAdmin)) {
      dropdownOptions.push({ "name": "Unban", "func": unban });
    }

    if (scrollType === "Invited" && (ifSelfAdmin)) {
      dropdownOptions.push({ "name": "Revoke Invite", "func": revoke });
    }
    setMemberDropDownEntries(dropdownOptions);
  }

  function addFriend() {
    sendFriendRequest(props.children.memberData.username, reloadPage);
  }

  function unfriend() {
    removeFriend(props.children.memberData.username, reloadPage);
  }

  function unblock() {
    unBlockUser(props.children.memberData.username, reloadPage);
  }

  function block() {
    blockUser(props.children.memberData.username, reloadPage)
  }

  const hideMemberItem = () => {
    setDisplayProperty(props.children.memberData.username + "MemberEntry", "none");
  }

  function kickOut() {
    let data = {
      recipient: props.children.memberData.username,
      leagueID: props.children.scrollData.leagueID,
      leagueName: props.children.scrollData.leagueName
    }

    kickOutUser(data, hideMemberItem);
  }

  function ban() {
    let data = {recipient: props.children.memberData.username,
              leagueID: props.children.scrollData.leagueID,
              leagueName: props.children.scrollData.leagueName
    }
    banUser(data, hideMemberItem);
  }

  function removeAdmin() {
    let data = {
      recipient: props.children.memberData.username,
      leagueID: props.children.scrollData.leagueID,
      leagueName: props.children.scrollData.leagueName
    }

    removeAdminUser(data, reloadPage);
  }

  function addAdmin() {
    let data =
    {
      recipient: props.children.memberData.username,
      leagueID: props.children.scrollData.leagueID,
      leagueName: props.children.scrollData.leagueName
    }

    addAdminUser(data, reloadPage);
  }

  function accept() {
    let data = {
      recipient: props.children.memberData.username,
      leagueID: props.children.scrollData.leagueID
    }

    acceptUser(data, reloadPage);
  }

  function decline() {
    let data = {
        recipient: props.children.memberData.username,
        leagueID: props.children.scrollData.leagueID
    }

    declineUser(data, reloadPage)
  }

  function unban() {
    let data = {
      recipient: props.children.memberData.username,
      leagueID: props.children.scrollData.leagueID
    };

    unbanUser(data, hideMemberItem);
  }

  function revoke() {
    let data = {
      recipient: props.children.memberData.username,
      leagueID: props.children.scrollData.leagueID
    }

    revokeUser(data, hideMemberItem);
  }

  function toggleSelectShow() {
    setSelectShow(!selectShow);
  }

  return (
    <div data-testid={"MemberEntryComponent"+props.index} id = {props.children.memberData.username + "MemberEntry"} className="memberEntry">
      <div className="memberEntryLeft">
        <div>
          <img className="memberPicture" src={createProfilePictureURL(props.children.memberData.username)} />
        </div>
        <div className="memberNames">
          <p data-testid={"MemberEntryMemberDisplayName"+props.index} className="memberDisplayName memberEntryText">{props.children.memberData.displayName}</p>
          <p data-testid={"MemberEntryMemberUsername"+props.index} className="memberUsername memberEntryText">{props.children.memberData.username}</p>
        </div>
      </div>
      <div className="memberEntryRight">


        <div>
          {(props.children.memberData.role === "admin" || props.children.memberData.role === "owner") ?
            <img src={adminKey} alt="key" />
            :
            <></>
          }
        </div>
        <div>
          {(props.children.memberData.role === "owner") ?
            <img src={ownerCrown} alt="crown" />
            :
            <></>
          }
        </div>

        <div className="moreInfoDiv" id = {"moreInfoButtonMember"+ props.children.memberData.username}>
          <button data-testid={"MemberEntryMoreInfoButton"+props.index} className="moreInfoButton" onClick={toggleSelectShow}>
            <img src={moreInfoButton} />
          </button>
          {(selectShow) ? <div className="memberSelectOptions"><DropDown uniqueDeterminer = {props.children.memberData.username+"MemberEntry"}>{memberDropDownEntries}</DropDown></div> : <></>}
        </div>
      </div>

    </div>

    )
}

export default MemberEntry;