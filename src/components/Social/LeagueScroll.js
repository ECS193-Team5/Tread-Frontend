import LeagueObj from './LeagueObj';
import React, {useState,useEffect} from 'react';
import "../../css/Social/scroll.css";
import axios from 'axios';
import ZeroItem from '../Shared/ZeroItem';
const backend_url = process.env.REACT_APP_PROD_BACKEND;

const LeagueScroll = (props) => {
    let [scrollType] = useState(props.type);
    let [information, setInformation] = useState([]);
    let [showZero, setShowZero] = useState(false);
    let zeroItemInfo = {
        "Message":
        {
        "league":"You are not in any leagues at this time. You can create your own league by hitting \"Create League\" in the bar above. If you start logging exercises, you'll get recommended leagues that you can join.",
        "sent":"You have no sent requests at this time. You can create your own league by hitting \"Create League\" in the bar above. If you start logging exercises, you'll get recommended leagues that you can join.",
        "admin":"You are not on the admin team for any leagues. You can create your own league by hitting \"Create League\" in the bar above. If you start logging exercises, you'll get recommended leagues that you can join.",
        "invite":"You have not been invited to any leagues at this time. You can create your own league by hitting \"Create League\" in the bar above. If you start logging exercises, you'll get recommended leagues that you can join."
        }
    }

    function getAll(){
        // get Friends
        // get Friends
        var config = {
          method : 'post',
          url : backend_url + 'league/get_leagues',
          headers: {
            Accept: 'application/json',
          },
          withCredentials: true,
          credentials: 'include'
        };
        axios(config)
        .then(function(response) {
            setInformation(response.data)
            if (response.data.length === 0){
                setShowZero(true);
            }
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
          url : backend_url + 'league/get_requested_leagues',
          headers: {
            Accept: 'application/json',
          },
          withCredentials: true,
          credentials: 'include'
        };
        axios(config)
        .then(function(response) {
            setInformation(response.data)
            if (response.data.length === 0){
                setShowZero(true);
            }
        })
        .catch(function(error){
            if(error.response.status===401){
                window.location.href = "/";
            }
        });     }

    function getAdmin(){
        // get Received
        var config = {
          method : 'post',
          url : backend_url + 'league/get_admin_leagues_with_challenge_count',
          headers: {
            Accept: 'application/json',
          },
          withCredentials: true,
          credentials: 'include'
        };
        axios(config)
        .then(function(response) {
            setInformation(response.data)
            if (response.data.length === 0){
                setShowZero(true);
            }
        })
        .catch(function(error){
            if(error.response.status===401){
                window.location.href = "/";
            }
        });
      }

      function getInvite(){
        var config = {
            method : 'post',
            url : backend_url + 'league/get_invited_leagues',
            headers: {
              Accept: 'application/json',
            },
            withCredentials: true,
            credentials: 'include'
          };
          axios(config)
          .then(function(response) {
              setInformation(response.data)
              if (response.data.length === 0){
                setShowZero(true);
            }
          })
          .catch(function(error){
              if(error.response.status===401){
                window.location.href = "/";
            }
          });
      }

    function makeLeagueObj(input){
        return (<LeagueObj index = {input.leagueName} type = {scrollType}>{input}</LeagueObj>);
    }

    useEffect (
        () => {
            if(scrollType === "league"){
                getAll();
            }
            else if(scrollType === "sent"){
                getSent();
            }
            else if(scrollType === "admin"){
                getAdmin();
            }
            else if(scrollType === "invite"){
                getInvite();
            }
            else if(scrollType === "create"){
                window.location.href = "./addLeaguePage"
            }
        }, [scrollType]
    );

    return(
        <div data-testid="LeagueScrollComponent" className = "scroll">
            {information.map(makeLeagueObj)}
            {(showZero) ? <ZeroItem message = {zeroItemInfo["Message"][scrollType]}></ZeroItem> : <></>}
        </div>
    )
}

export default LeagueScroll;