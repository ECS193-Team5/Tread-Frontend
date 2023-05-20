import {useState,useEffect} from 'react';
import FriendObj from './FriendObj';
import axios from 'axios';
import "../../css/Social/scroll.css";
const backend_url = process.env.REACT_APP_PROD_BACKEND;

const FriendScroll = (props) => {
    let [scrollType] = useState(props.type);
    let [information, setInformation] = useState([]);

    function getFriends(){
        // get Friends
        var config = {
          method : 'post',
          url : backend_url + 'friend_list/get_all_friends_info',
          headers: {
            Accept: 'application/json',
          },
          withCredentials: true,
          credentials: 'include'
        };
        axios(config)
        .then(function(response) {
            setInformation(response.data);

        })
        .catch(function(error){
            if(error.response.status===401){
                window.location.href = "/";
            }
        });
    }

    function getSent(){
        // get Sents
        var config = {
          method : 'post',
          url : backend_url + 'friend_list/sent_request_list',
          headers: {
            Accept: 'application/json',
          },
          withCredentials: true,
          credentials: 'include'
        };
        axios(config)
        .then(function(response) {
            setInformation(response.data);
        })
        .catch(function(error){
            if(error.response.status===401){
                window.location.href = "/";
            }
        });    }

    function getReceived(){
        // get Received
        var config = {
          method : 'post',
          url : backend_url + 'friend_list/received_request_list',
          headers: {
            Accept: 'application/json',
          },
          withCredentials: true,
          credentials: 'include'
        };
        axios(config)
        .then(function(response) {
            setInformation(response.data)
        })
        .catch(function(error){
            if(error.response.status===401){
                window.location.href = "/";
            }
        });
      }

    function getBlocked(){
        // get Blocked
        var config = {
          method : 'post',
          url : backend_url + 'friend_list/blocked_list',
          headers: {
            Accept: 'application/json',
          },
          withCredentials: true,
          credentials: 'include'
        };
        axios(config)
        .then(function(response) {
            setInformation(response.data)
        })
        .catch(function(error){
            if(error.response.status===401){
                window.location.href = "/";
            }
        });        }

    function makeFriendObj(input){
        return (<FriendObj type = {scrollType}>{input}</FriendObj>);
    }

    useEffect (
        () => {
            if(scrollType === "friend"){
                getFriends();
            }
            else if(scrollType === "sent"){
                getSent();
            }
            else if(scrollType === "received"){
                getReceived();
            }
            else if(scrollType === "blocked"){
                getBlocked();
            }
        }, [scrollType]
    );

    return(
        <div className = "scroll">
            {information.map(makeFriendObj)}
        </div>
    )
}

export default FriendScroll;