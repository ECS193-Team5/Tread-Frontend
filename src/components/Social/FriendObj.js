import React, {useState, useEffect} from 'react';
import axios from 'axios';
import "../../css/Shared/button.css";
import "../../css/Social/obj.css";
import {createProfilePictureURL} from "../../helpers/CloudinaryURLHelpers";
import DropDown from '../Shared/DropDown';
import { setDisplayProperty } from '../../helpers/CssEffects';
import moreInfoButton from "../../assets/moreInfoButton.png";
import { sendChallengeRedirect } from '../../helpers/FormHelpers';

const backend_url = process.env.REACT_APP_PROD_BACKEND;

const FriendObj = (props) => {
  const [load, setLoad] = useState(false);
    const [selectShow, setSelectShow] = useState(false);
    const [dropdownOptions,setDropdownOptions] = useState([]);
    let type = props.type;
    useEffect (
      () => {
          if(!load){
            setLoad(true);
            calculateFriendOptions();
          }

      }, [load]
  );

    function toggleSelectShow(){
        setSelectShow(!selectShow);
    }

    function unfriend(){
      var config = {
        method : 'post',
        url : backend_url + 'friend_list/remove_friend',
        headers: {
          Accept: 'application/json',
        },
        data :
        {
          friendName : props.children.username
        },
        withCredentials: true,
        credentials: 'include'
      };
      axios(config)
      .then(function(response) {
          setDisplayProperty("FriendObj"+props.children.username, "none");
      })
      .catch(function(error){
          if(error.response.status===401){
            setDisplayProperty("FriendObj"+props.children.username, "none");
            window.location.href = "/";
        }
      });
    }

    function block(){
      var config = {
        method : 'post',
        url : backend_url + 'friend_list/block_user',
        headers: {
          Accept: 'application/json',
        },
        data :
        {
          friendName : props.children.username
        },
        withCredentials: true,
        credentials: 'include'
      };
      axios(config)
      .then(function(response) {
          setDisplayProperty("FriendObj"+props.children.username, "none");
      })
      .catch(function(error){
          if(error.response.status===401){
            setDisplayProperty("FriendObj"+props.children.username, "none");
            window.location.href = "/";
        }
      });
    }

    function revoke(){
      var config = {
        method : 'post',
        url : backend_url + 'friend_list/remove_sent_request',
        headers: {
          Accept: 'application/json',
        },
        data :
        {
          friendName : props.children.username
        },
        withCredentials: true,
        credentials: 'include'
      };
      axios(config)
      .then(function(response) {
        setDisplayProperty("FriendObj"+props.children.username, "none");
      })
      .catch(function(error){
          if(error.response.status===401){
            window.location.href = "/";
        }
      });
    }

    function unblock(){
      var config = {
        method : 'post',
        url : backend_url + 'friend_list/unblock_user',
        headers: {
          Accept: 'application/json',
        },
        data :
        {
          friendName : props.children.username
        },
        withCredentials: true,
        credentials: 'include'
      };
      axios(config)
      .then(function(response) {
        setDisplayProperty("FriendObj"+props.children.username, "none");
      })
      .catch(function(error){
          if(error.response.status===401){
            window.location.href = "/";
        }
      });
    }

    function accept(){
      var config = {
        method : 'post',
        url : backend_url + 'friend_list/accept_received_request',
        headers: {
          Accept: 'application/json',
        },
        data :
        {
          friendName : props.children.username
        },
        withCredentials: true,
        credentials: 'include'
      };
      axios(config)
      .then(function(response) {
        setDisplayProperty("FriendObj"+props.children.username, "none");
      })
      .catch(function(error){
          if(error.response.status===401){
            window.location.href = "/";
        }
      });
    }

    function decline(){
      var config = {
        method : 'post',
        url : backend_url + 'friend_list/remove_received_request',
        headers: {
          Accept: 'application/json',
        },
        data :
        {
          friendName : props.children.username
        },
        withCredentials: true,
        credentials: 'include'
      };
      axios(config)
      .then(function(response) {
          setDisplayProperty("FriendObj"+props.children.username, "none");
      })
      .catch(function(error){
          if(error.response.status===401){
            window.location.href = "/";
        }
      });
    }

    function sendFriendChallengeRedirect(){
      sendChallengeRedirect("friend", props.children.username);
    }
    function calculateFriendOptions (){
      let friendOptions = [];
      if(type === "friend"){
        friendOptions.push({ "name": "Unfriend", "func": unfriend });
        friendOptions.push({ "name": "Block", "func": block });
        friendOptions.push({ "name": "Send Challenge", "func": sendFriendChallengeRedirect });
      }
      else if(type === "sent"){
        friendOptions.push({ "name": "Revoke Request", "func": revoke });
        friendOptions.push({ "name": "Block", "func": block });
      }
      else if(type === "received"){
        friendOptions.push({ "name": "Accept", "func": accept });
        friendOptions.push({ "name": "Decline", "func": decline });
        friendOptions.push({ "name": "Block", "func": block });
      }
      else if(type === "blocked"){
        friendOptions.push({ "name": "Unblock", "func": unblock });
      }
      setDropdownOptions(friendOptions);
    }
    return(
        <div id = {"FriendObj"+props.children.username} className = "displayObj">
            <div className = "objSection objSectionLeague">
                <img className = "objProfilePhoto objSectionLeague" src = {createProfilePictureURL(props.children.username)} alt = "profile"/>
            </div>
            <div className = "objSection objWritingSection">
                <p className = "objDisplayName">{props.children.displayName}</p>
                <p className = "objUsername">{props.children.username}</p>
            </div>
            <div className = "objSection objButtonSection">
                <button className = "moreInfoButton objButtonMore" onClick = {toggleSelectShow}>
                    <img src = {moreInfoButton} alt = "toggle button"/>
                </button>
                {(selectShow) ?<div className='objDropdown'><DropDown uniqueDeterminer = {props.children.username+"FriendObj"}>{dropdownOptions}</DropDown></div> : <></>}
            </div>
        </div>
    )

}

export default FriendObj;