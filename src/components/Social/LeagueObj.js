import {useState, useEffect} from 'react';
import axios from 'axios';
import DropDown from '../Shared/DropDown';
import {createLeaguePictureURL} from "../../helpers/CloudinaryURLHelpers";
import {setDisplayProperty} from "../../helpers/CssEffects";
import "../../css/Social/obj.css";
import "../../css/Shared/dropDown.css";
import moreInfoButton from "../../assets/moreInfoButton.png";
const backend_url = process.env.REACT_APP_PROD_BACKEND;

const LeagueObj = (props) => {
    const [load, setLoad] = useState(false);
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [role, setRole] = useState("none");
    const [selectShow, setSelectShow] = useState();

    const id = props.children._id;
    let type = props.type;

    useEffect (
        () => {
            if(!load){
                getRole();
                setLoad(true);
            }
        }, [load]
    );

    useEffect (
        () => {
            if(role){
                calculateDropdownOptions();
            }
        }, [role]
    );

    useEffect (
        () => {
            if(dropdownOptions.length === 0){
                setDisplayProperty(props.children._id+"moreInfoButton", "none");
            }
            else{
                setDisplayProperty(props.children._id+"moreInfoButton", "block")
            }
        }, [dropdownOptions]
    );

    function getRole(){
        var config  = {
          method : 'post',
          url: backend_url+'league/get_role',
          headers: {
              Accept: 'application/json',
            },
          withCredentials: true,
          credentials: 'include',
          data : {
            leagueID: props.children._id
          }
        };
        axios(config)
        .then(function(response) {
            setRole(response.data);
        })
        .catch(function(error){
            setRole(
                "none"
            );
            if(error.response.status===401){
                window.location.href = "/";
            }
        });
    }

    function toggleSelectShow(){
        setSelectShow(!selectShow);
    }

    function leave(){
        var config = {
            method : 'post',
            url : backend_url + 'league/leave_league',
            headers: {
              Accept: 'application/json',
            },
            withCredentials: true,
            credentials: 'include',
            data:{
                leagueID: id
            }
          };
          axios(config)
          .then(function(response) {
              setDisplayProperty("LeagueObj"+props.children._id, "none");
          })
          .catch(function(error){
              if(error.response.status===401){
                window.location.href = "/";
            }
          });
    }

    function removeAdmin(){
        var config = {
            method : 'post',
            url : backend_url + 'league/user_remove_admin',
            headers: {
              Accept: 'application/json',
            },
            withCredentials: true,
            credentials: 'include',
            data:{
                leagueID: id
            }
          };
          axios(config)
          .then(function(response) {
              setDisplayProperty("LeagueObj"+props.children._id, "none");
          })
          .catch(function(error){
              if(error.response.status===401){
                window.location.href = "/";
            }
          });
    }

    function revoke(){
        var config = {
            method : 'post',
            url : backend_url + 'league/user_undo_request',
            headers: {
              Accept: 'application/json',
            },
            withCredentials: true,
            credentials: 'include',
            data:{
                leagueID: id
            }
          };
          axios(config)
          .then(function(response) {
              setDisplayProperty("LeagueObj"+props.children._id, "none");
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
            url : backend_url + 'league/user_decline_invite',
            headers: {
              Accept: 'application/json',
            },
            withCredentials: true,
            credentials: 'include',
            data:{
                leagueID: id
            }
          };
          axios(config)
          .then(function(response) {
              setDisplayProperty("LeagueObj"+props.children._id, "none");
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
            url : backend_url + 'league/user_accept_invite',
            headers: {
              Accept: 'application/json',
            },
            withCredentials: true,
            credentials: 'include',
            data:{
                leagueID: id
            }
          };
          axios(config)
          .then(function(response) {
              setDisplayProperty("LeagueObj"+props.children._id, "none");
          })
          .catch(function(error){
              if(error.response.status===401){
                window.location.href = "/";
            }
          });
    }
    function calculateDropdownOptions(){
        let options = [];
        if((role === "admin" || role === "participant")&&(type==="league"||type === "admin")){
            options.push({ "name": "Leave League", "func": leave });
        }
        if(role === "admin" && (type==="league"||type === "admin")){
            options.push({ "name": "Remove Self as Admin", "func": removeAdmin });
        }
        if(type === "sent"){
            options.push({ "name": "Revoke Request", "func": revoke });
        }
        if(type ==="invite"){
            options.push({ "name": "Accept", "func": accept });
            options.push({ "name": "Decline", "func": decline });
        }
        setDropdownOptions(options);
    }
    function moveLeaguePage(){
        window.location.href = "leagueDescriptionPage?=" + props.children._id;
    }
    return(
        <div id = {"LeagueObj"+props.children._id} className = "displayObj">
            <div className = "objSection"  onClick = {moveLeaguePage}>
                <img className = "objProfilePhoto" src = {createLeaguePictureURL(id)} alt = "league"/>
            </div>
            <div className = "objSection objWritingSection objWritingLeagueSection"  onClick = {moveLeaguePage}>
                <p className = "objDisplayName">{props.children.leagueName}</p>
                <p className = "objUsername">{props.children.members.length} Member(s)</p>
                <p className = "objUsername">{props.children.activeChallenges} active challenges</p>
            </div>
            <div className = "objButtonSection objSection">
                <button id = {props.children._id+"moreInfoButton"} className = "moreInfoButton objButtonMore" onClick = {toggleSelectShow}>
                    <img src = {moreInfoButton} alt = "toggle button"/>
                </button>
                {(selectShow) ? <div className='objDropdown'><DropDown>{dropdownOptions}</DropDown></div>: <></>}
            </div>
        </div>
    )

}

export default LeagueObj;