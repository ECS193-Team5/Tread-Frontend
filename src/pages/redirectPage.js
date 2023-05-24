import React, {useState, useEffect} from "react";
import axios from "axios";

const backend_url = process.env.REACT_APP_PROD_BACKEND;

const RedirectPage = (props) => {
    const [load, setLoad] = useState(false);
    let type = props.type;

    useEffect (
        () => {
            const followRequest = () => {
                let requestID = processURL();
                if (type === "Friend"){
                    sendFriendRequest(requestID);
                } else if (type === "League"){
                    sendLeagueRequest(requestID);
                }
            }

            const processURL = () => {
                let url = window.location.href;
                let id = url.split("request"+type+"?")[1];
                return id;
            }


            if(!load){
                followRequest();
                setLoad(true);
            }
        }, [load, type]
    );



    async function sendFriendRequest(requestID){
        var config = {
            method : 'post',
            url : backend_url + 'friend_list/send_friend_request',
            headers: {
              Accept: 'application/json',
            },
            data :
            {
              friendName : requestID
            },
            withCredentials: true,
            credentials: 'include'
          };
          axios(config)
          .then(function(response) {
            window.location.href = "/socialFriendPage";
          })
          .catch(function(error){
              if(error.response.status===401){
                window.location.href = "/";
            }
            else{
                window.location.href = "./currentChallengePage";
            }
          });
    }

    const sendLeagueRequest = (requestID) => {

        var config  = {
            method : 'post',
            url: backend_url+'league/user_request_to_join',
            headers: {
                Accept: 'application/json',
            },
            withCredentials: true,
            credentials: 'include',
            data:{
                leagueID: requestID
            }
        };
        axios(config)
        .then(function(response) {
            window.location.href = "./socialLeaguePage";
        })
        .catch(function(error){
            if(error.response.status===401){
                window.location.href = "/";
            }
            else{
                window.location.href = "./currentChallengePage";
            }
        });

    }




    return (<div><h1>Request sending...</h1></div>);

}

export default RedirectPage;