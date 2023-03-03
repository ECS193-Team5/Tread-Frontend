import {useState, useEffect} from 'react';
import "../../css/Shared/userSettingsButton.css"

const UserSettingsButton = () => {

    const [displayName] = useState(getDisplayName());
    const [username] = useState(getUsername());
    const [logoutDisplay, setLogoutDisplay] = useState(false);
    const [decisionState, setDecisionState] = useState("");

    function logout(){
      var config  = {
        method : 'post',
        url: backend_url+'auth/logout',
        headers: {
            Accept: 'application/json',
          },
        withCredentials: true,
        credentials: 'include'
      };
      axios(config)
      .then(function(response) {
          console.log("response received")
          console.log(response.data)
          return response.data;
      })
      .catch(function(error){
          console.log(error)
          console.log("No response")
      });
    }

    function stopLogoutDisplay(){
        setLogoutDisplay(false);
    }

    function toggleLogoutDisplay(){
        setLogoutDisplay(!logoutDisplay);
    }
    function moveProfilePage(){
        window.location.href = "./profileStatsPage"
    }

    function getDisplayName(){
      // TODO get the display name from the db
      // return ("Generic Display name");
      var config = {
        method : 'post',
        url : backend_url + 'user/get_display_name',
        headers: {
          Accept: 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
      };
      axios(config)
      .then(function(response){
        return response.data;
      })
      .catch(function(error){
        console.log(error)
      });
    }

    function getUsername(){
      // TODO get the display name from the db
      // return ("Generic Display name");
      var config = {
        method : 'post',
        url : backend_url + 'user/get_username',
        headers: {
          Accept: 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
      };
      axios(config)
      .then(function(response){
        return response.data;
      })
      .catch(function(error){
        console.log(error)
      });
    }
  
    function movePage(event){
        setDecisionState(event.target.value);
    }

    useEffect(
        () => {
          if (decisionState === "Profile") {
            moveProfilePage();
            stopLogoutDisplay();
          }
          else if (decisionState === "Logout"){
            logout();
            stopLogoutDisplay();
          }
        }, [ decisionState]
      );
    return (
        <div id = "UserSettingsButton" >
            <button id = "UserSettingsLeft" onClick={moveProfilePage}>
                <div>
                    <img id = "UserSettingButtonProfileImage" src = "https://i.imgur.com/7vaxEiJ.png"/>
                </div>
                <div id = "userSettingNaming">
                    <p id ="userSettingDisplayName">{displayName}</p>
                    <p id ="userSettingUsername">{username}</p>
                </div>
            </button>
            <div id = "userSettingButtonSection">
                <button className = "dropDownButton" onClick = {toggleLogoutDisplay}><img src = "https://i.imgur.com/B5Dnylx.png"/></button>
                {
                    logoutDisplay ?
                    <select id = "LogoutSelect" onChange={movePage}>
                        <option value = ""></option>
                        <option value = "Profile">Profile</option>
                        <option value = "Logout">Logout</option>
                    </select>
                    : <></>
                }

            </div>
        </div>
    );
}


export default UserSettingsButton;