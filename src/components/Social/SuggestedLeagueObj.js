import {createLeaguePictureURL} from "../../helpers/CloudinaryURLHelpers";
import { setDisplayProperty } from "../../helpers/CssEffects";
import axios from 'axios';

import plusButtonImage from "../../assets/plusButtonImage.png";
const backend_url = process.env.REACT_APP_PROD_BACKEND
const SuggestedLeagueObj = (props) => {
    let leagueID = props.children._id;

    const requestJoinLeague = () => {
    var config  = {
        method : 'post',
        url: backend_url+'league/user_request_to_join',
        headers: {
            Accept: 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
        data:{
            leagueID: leagueID
        }
    };
    axios(config)
    .then(function(response) {
        props.updateObjList(leagueID);

    })
    .catch(function(error){
        if(error.response.status===401){
            window.location.href = "/";
        }
    });
    }

    return(
        <div id = {leagueID + "SuggestionObj"} className="ItemsSuggestionObj">
            <div className = "ItemsSuggestionInner">
                <img className = "ItemsProfilePhoto" src = {createLeaguePictureURL(leagueID)} alt = "league"/>
                <p className = "greenBaseText ItemsObjText">{props.children.leagueName}</p>
            </div>
            <button className = "submitCircleButton" onClick = {requestJoinLeague}><img className = "submitCircleButtonIcon" src = {plusButtonImage}/></button>
        </div>
    )
}


export default SuggestedLeagueObj;