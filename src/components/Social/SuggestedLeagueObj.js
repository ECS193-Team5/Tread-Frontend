import React from "react";
import {createLeaguePictureURL} from "../../helpers/CloudinaryURLHelpers";
import plusButtonImage from "../../assets/plusButtonImage.png";
import { sendLeagueRequest } from "../../routes/league";

const SuggestedLeagueObj = (props) => {
    let leagueID = props.children._id;

    const updateParent = () => {
        props.updateObjList(leagueID);
    }

    const requestJoinLeague = () => {
        console.log(leagueID, updateParent)
        sendLeagueRequest(leagueID, updateParent);
    }

    return(
        <div data-testid={"SuggestedLeagueObjComponent"+props.index} id = {leagueID + "SuggestionObj"} className="ItemsSuggestionObj">
            <div className = "ItemsSuggestionInner">
                <img className = "ItemsProfilePhoto" src = {createLeaguePictureURL(leagueID)} alt = "league"/>
                <p data-testid={"SuggestedLeagueObjLeagueName"+props.index} className = "greenBaseText ItemsObjText">{props.children.leagueName}</p>
            </div>
            <button data-testid={"SuggestedLeagueObjRequestJoinLeagueButton"+props.index} className = "submitCircleButton" onClick = {requestJoinLeague}><img className = "submitCircleButtonIcon" src = {plusButtonImage}/></button>
        </div>
    )
}


export default SuggestedLeagueObj;