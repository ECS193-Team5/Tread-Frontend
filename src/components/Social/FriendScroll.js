import React, {useState,useEffect} from 'react';
import FriendObj from './FriendObj';
import ZeroItem from '../Shared/ZeroItem';
import "../../css/Social/scroll.css";
import { getBlockedList, getFriends, getReceived, getSent } from '../../routes/friend_list';

const FriendScroll = (props) => {
    let [scrollType] = useState(props.type);
    let [information, setInformation] = useState([]);
    const [showZero, setShowZero] = useState(false);
    let showMessage = {
        "friend":"You have no friends at this time. If you start logging exercises, you'll start getting recommended leagues on the league page. From there, you can make friends! Alternatively, you know a friend's username, you can send them a request from the \"Add User\" button in the bar above.",
        "sent":"You have no sent requests at this time. If you start logging exercises, you'll start getting recommended leagues on the league page. From there, you can make friends! Alternatively, you know a friend's username, you can send them a request from the \"Add User\" button in the bar above.",
        "received":"You have no received requests at this time.",
        "blocked":"You have not blocked anyone at this time."
    }

    function makeFriendObj(input){
        return (<FriendObj index = {input.username} type = {scrollType}>{input}</FriendObj>);
    }

    const processFriendList = (data) =>{
        setInformation(data)
        setShowZero(data.length === 0);
    }

    useEffect (
        () => {
            if(scrollType === "friend"){
                getFriends(processFriendList);
            }
            else if(scrollType === "sent"){
                getSent(processFriendList);
            }
            else if(scrollType === "received"){
                getReceived(processFriendList);
            }
            else{
                getBlockedList(processFriendList);
            }
        }, [scrollType]
    );

    return(
        <div data-testid="FriendScrollComponent" className = "scroll">
            {information.map(makeFriendObj)}
            {(showZero) ? <ZeroItem message = {showMessage[scrollType]}></ZeroItem> : <></>}
        </div>
    )
}

export default FriendScroll;