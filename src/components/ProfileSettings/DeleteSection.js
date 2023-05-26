import React from "react";
import axios from 'axios';

import '../../css/Shared/headerText.css';
import '../../css/Shared/coloredText.css';
import '../../css/Shared/button.css';

const backend_url = process.env.REACT_APP_PROD_BACKEND;

const DeleteSection = () => {

    function deleteAccount(){
        //TODO: send request to delete user account
        var config = {
          method : 'delete',
          url : backend_url + 'delete_user',
          headers: {
            Accept: 'application/json',
          },
          withCredentials: true,
          credentials: 'include',
        };
        axios(config)
        .then(function(response){
          window.location.href = "./";
        })
        .catch(function(error){
          if(error.response.status===401){
            window.location.href = "/";
        }
        });
    }

    function deleteAccountHandler(){
      const deleteConfirmed = window.prompt('Deleted accounts cannot be recovered. Type "delete account" into the box to confirm you want to delete your account.');
      if(deleteConfirmed === "delete account"){  deleteAccount()};
    }
    return (
        <div data-testid="DeleteSectionComponent" id = "DeleteSection">
            <h2>Delete Account</h2><p>
            <span className = "greenBaseText">This will </span>
            <span className = "redBaseText">permanently delete</span>
            <span className = "greenBaseText"> your account. You will </span>
            <span className = "redBaseText">lose</span>
            <span className = "greenBaseText"> all your friends, leagues, and medals. All your information will be gone with no way to recover it. </span></p>
            <button data-testid="DeleteSectionDeleteAccountButton" className = "deleteButton" onClick = {deleteAccountHandler}><p className = "deleteButtonText">Delete</p></button>

        </div>
    )
}

export default DeleteSection;