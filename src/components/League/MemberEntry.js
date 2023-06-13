import React, { useState, useEffect } from 'react';
import "../../css/Social/obj.css";
import "../../css/League/leagueDescriptionPage.css";
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
    return props.scrollData.friends.includes(props.children.memberData.username);
  }

  function isBlocked(){
    return props.scrollData.blocked.includes(props.children.memberData.username);
  }

  function isSelf(){
    return props.children.memberData.username === props.scrollData.username;
  }

  function calculateMemberEntries() {
    let scrollType = props.scrollData.scrollType;
    let otherUserType = props.children.memberData.role;
    let selfType = props.scrollData.role;
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
      leagueID: props.scrollData.leagueID,
      leagueName: props.scrollData.leagueName
    }

    kickOutUser(data, hideMemberItem);
  }

  function ban() {
    let data = {recipient: props.children.memberData.username,
              leagueID: props.scrollData.leagueID,
              leagueName: props.scrollData.leagueName
    }
    banUser(data, hideMemberItem);
  }

  function removeAdmin() {
    let data = {
      recipient: props.children.memberData.username,
      leagueID: props.scrollData.leagueID,
      leagueName: props.scrollData.leagueName
    }

    removeAdminUser(data, reloadPage);
  }

  function addAdmin() {
    let data =
    {
      recipient: props.children.memberData.username,
      leagueID: props.scrollData.leagueID,
      leagueName: props.scrollData.leagueName
    }

    addAdminUser(data, reloadPage);
  }

  function accept() {
    let data = {
      recipient: props.children.memberData.username,
      leagueID: props.scrollData.leagueID
    }

    acceptUser(data, reloadPage);
  }

  function decline() {
    let data = {
        recipient: props.children.memberData.username,
        leagueID: props.scrollData.leagueID
    }

    declineUser(data, reloadPage)
  }

  function unban() {
    let data = {
      recipient: props.children.memberData.username,
      leagueID: props.scrollData.leagueID
    };

    unbanUser(data, hideMemberItem);
  }

  function revoke() {
    let data = {
      recipient: props.children.memberData.username,
      leagueID: props.scrollData.leagueID
    }

    revokeUser(data, hideMemberItem);
  }

  function toggleSelectShow() {
    setSelectShow(!selectShow);
  }

  return (
    <div data-testid={"MemberEntryComponent"+props.index} id = {props.children.memberData.username + "MemberEntry"} className="memberEntry displayObj">
      <div className="objSection objSectionLeague">
        <img className="objProfilePhoto objSectionLeague" src={createProfilePictureURL(props.children.memberData.username)} alt="profile" />
      </div>
      <div className="objSection objWritingSection">
        <p data-testid={"FriendObjDisplayName" + props.index} className="objDisplayName">{props.children.memberData.displayName}</p>
        <p data-testid={"FriendObjUsername" + props.index} className="objUsername">{props.children.memberData.username}</p>
      </div>

      <div className="objSection objButtonMemberSection">
        <div>
          {(props.children.memberData.role === "admin" && props.children.memberData.role !== "owner") ?
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

        <div id = {"moreInfoButtonMember"+ props.children.memberData.username}>
          <button data-testid={"MemberEntryMoreInfoButton"+props.children.memberData.username} className="moreInfoButton objButtonMemberMore" onClick={toggleSelectShow}>
            <img src={moreInfoButton} />
          </button>
        </div>
        {(selectShow) ? <div className="objMemberDropDown"><DropDown uniqueDeterminer = {props.children.memberData.username+"MemberEntry"}>{memberDropDownEntries}</DropDown></div> : <></>}
      </div>

    </div>

    )
}

export default MemberEntry;