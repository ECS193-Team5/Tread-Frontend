import {useState, useEffect} from 'react';
import axios from 'axios';
import "../../css/Shared/button.css";
import "../../css/Social/obj.css";
import {createProfilePictureURL} from "../../helpers/CloudinaryURLHelpers";
import DropDown from '../Shared/DropDown';
import { setDisplayProperty } from '../../helpers/CssEffects';


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
          console.log(response.data)
          setDisplayProperty("FriendObj"+props.children.username, "none");
      })
      .catch(function(error){
          console.log(error)
          console.log("No response")
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
          console.log(response.data)
          setDisplayProperty("FriendObj"+props.children.username, "none");
      })
      .catch(function(error){
          console.log(error)
          console.log("No response")
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
          console.log(response.data)
      })
      .catch(function(error){
          console.log(error)
          console.log("No response")
          if(error.response.status===401){
            window.location.href = "/";
        }
      });
      console.log("Revoke sent request");
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
          console.log(response.data)
      })
      .catch(function(error){
          console.log(error)
          console.log("No response")
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
          console.log(response.data)
      })
      .catch(function(error){
          console.log(error)
          console.log("No response")
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
          console.log(response.data)
      })
      .catch(function(error){
          console.log(error)
          console.log("No response")
          if(error.response.status===401){
            window.location.href = "/";
        }
      });
    }

    function calculateFriendOptions (){
      let friendOptions = [];
      if(type === "friend"){
        friendOptions.push({ "name": "Unfriend", "func": unfriend });
        friendOptions.push({ "name": "Block", "func": block });
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
      console.log(friendOptions)
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
                    <img src = "https://i.imgur.com/pnzihUp.png" alt = "toggle button"/>
                </button>
                {(selectShow) ?<div className='objDropdown'><DropDown>{dropdownOptions}</DropDown></div> : <></>}
            </div>
        </div>
    )

}

export default FriendObj;