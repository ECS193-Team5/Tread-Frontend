import React from "react";
import axios from "axios";
import {createProfilePictureURL} from "../../helpers/CloudinaryURLHelpers";
import plusButtonImage from "../../assets/plusButtonImage.png";
const backend_url = process.env.REACT_APP_PROD_BACKEND;



const SuggestedFriendObj = (props) => {
    async function sendFriendRequest(){

        var config = {
            method : 'post',
            url : backend_url + 'friend_list/send_friend_request',
            headers: {
              Accept: 'application/json',
            },
            data :
            {
              friendName : props.children[0]
            },
            withCredentials: true,
            credentials: 'include'
          };
          axios(config)
          .then(function(response) {
            props.updateObjList(props.children[0]);
          })
          .catch(function(error){
              if(error.response.status===401){
                window.location.href = "/";
            }
          });
    }

    return (
        <div data-testid={"SuggestedFriendObjComponent"+props.index} id = {props.children[0] + "SuggestionObj"} className="ItemsSuggestionObj">
          <div className = "ItemsSuggestionInner">
            <img className = "ItemsProfilePhoto" src = {createProfilePictureURL(props.children[0])} alt = "profile"/>
            <p data-testid={"SuggestedFriendObjMutualFriendText"+props.index} className = "greenBaseText ItemsObjText">{props.children[0]}: {props.children[1]} Mutual Friend(s)</p>
          </div>
          <button data-testid={"SuggestedFriendObjSendFriendRequestButton"+props.index} className = "submitCircleButton" onClick = {sendFriendRequest}><img className = "submitCircleButtonIcon" src = {plusButtonImage}/></button>
        </div>
    );
}


export default SuggestedFriendObj;