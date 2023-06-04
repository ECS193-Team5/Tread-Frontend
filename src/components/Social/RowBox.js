import React, { useState, useEffect } from 'react';
import ActivityObj from './ActivityObj';
import { setDisplayProperty } from "../../helpers/CssEffects";
import SuggestedFriendObj from './SuggestedFriendObj';
import SuggestedLeagueObj from './SuggestedLeagueObj';
import "../../css/Social/rowBox.css";
import { getSuggestedFriends, getRecentFriends } from '../../routes/friend_list';
import { getSuggestedLeagues, getRecentLeagues } from '../../routes/league';

const RowBox = (props) => {

    const [load, setLoad] = useState(false);
    const [title, setTitle] = useState("");
    const [info, setInfo] = useState([]);

    const callFunc = {
        "friend": { "Suggest": {"get": getSuggestedFriends, "create": createSuggestFriendObj},
                    "Recent": {"get": getRecentFriends, "create": createRecentObj }
                  },
        "league": { "Suggest": {"get":getSuggestedLeagues,"create":createSuggestLeagueObj},
                    "Recent": {"get":getRecentLeagues, "create":createRecentObj }}
    }

    const capital = (word) => {
        return word[0].toUpperCase() + word.substring(1);
    }

    useEffect(
        () => {
            if (props.children.informationType === "Suggest") {
                setTitle("Suggested " + capital(props.children.socialType) + "s");
            }
            else {
                setTitle("Recent " + capital(props.children.socialType) + " Activity");
            }
        }, [props.children.socialType, props.children.informationType]
    );

    useEffect(
      () => {
        if (info.length === 0) {
          setDisplayProperty(props.children.socialType + props.children.informationType + "Box", "none")
        }
        else if(info){
          setDisplayProperty(props.children.socialType + props.children.informationType + "Box", "block")
        }
      }, [info]
    );

    useEffect(
        () => {
            if (!load) {
                callFunc[props.children.socialType][props.children.informationType]["get"](setInfo);
                setLoad(true);
            }
        }, [load]
    );

    const updateObjList = (id) =>{
        let newList = [];
        info.forEach((item) => {
            if(props.children.socialType === "friend" && item[0] !== id){
                newList.push(item);
            }
            if(props.children.socialType === "league" && item._id !== id){
                newList.push(item);
            }
        });
        setInfo(newList);
    }

    function createSuggestFriendObj (input, index) {
        return <SuggestedFriendObj key={index} updateObjList = {updateObjList} index = {index}>{input}</SuggestedFriendObj>
    }
    function createSuggestLeagueObj (input, index) {
        return <SuggestedLeagueObj  key={index} updateObjList = {updateObjList} index = {index}>{input}</SuggestedLeagueObj>
    }
    function createRecentObj (input, index) {
        return <ActivityObj key={index} index = {index}>{input}</ActivityObj>
    }

    function createBoxSection(input, index) {
        if (index === 0) {
            return (
                <div key={index} className="fullRow">
                    {callFunc[props.children.socialType][props.children.informationType]["create"](input, index)}
                </div>
            );
        }
        else {
            return (
                <div key={index} className="fullRow">
                    <div className="topLine"></div>
                    {callFunc[props.children.socialType][props.children.informationType]["create"](input, index)}
                </div>
            );
        }

    }

    return (
        <div data-testid="RowBoxComponent" className="rowBox" id={props.children.socialType + props.children.informationType + "Box"}>
            <h2>{title}</h2>
            <div className="ItemsBox">
                {info.map(createBoxSection)}
            </div>
        </div>);
}

export default RowBox;