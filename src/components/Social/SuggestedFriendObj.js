import React from "react";
import { createProfilePictureURL } from "../../helpers/CloudinaryURLHelpers";
import plusButtonImage from "../../assets/plusButtonImage.png";
import { sendFriendRequest } from "../../routes/friend_list";

const SuggestedFriendObj = (props) => {
  const updateParent = () => {
    props.updateObjList(props.children[0]);
  }

  async function askFriend() {
    sendFriendRequest(props.children[0], updateParent);
  }

  return (
    <div data-testid={"SuggestedFriendObjComponent" + props.index} id={props.children[0] + "SuggestionObj"} className="ItemsSuggestionObj">
      <div className="ItemsSuggestionInner">
        <img className="ItemsProfilePhoto" src={createProfilePictureURL(props.children[0])} alt="profile" />
        <p data-testid={"SuggestedFriendObjMutualFriendText" + props.index} className="greenBaseText ItemsObjText">{props.children[0]}: {props.children[1]} Mutual Friend(s)</p>
      </div>
      <button data-testid={"SuggestedFriendObjSendFriendRequestButton" + props.index} className="submitCircleButton" onClick={askFriend}><img className="submitCircleButtonIcon" src={plusButtonImage} /></button>
    </div>
  );
}


export default SuggestedFriendObj;