import React, { useState, useEffect } from "react";
import { setDisplayProperty } from "../../../helpers/CssEffects";
import { getFriendList } from "../../../routes/friend_list";
import { getAdminLeagues } from "../../../routes/league";

const ExerciseReceiverForm = (props) => {
    const [receiverGroup, setReceiverGroup] = useState("self");
    const [inviteOptions, setInviteOptions] = useState([]);

    useEffect(
        () => {
            if (receiverGroup === "friend") {
                getFriendList(setInviteOptions);
            }
            else if (receiverGroup === "league") {
                getAdminLeagues(processLeagueInfo)
            }
        }, [receiverGroup]
    );

    useEffect(
        () => {
            if (receiverGroup === "friend" || receiverGroup === "league") {
                setDisplayProperty("secondarySelect", "block");
            }
            else {
                setDisplayProperty("secondarySelect", "none");
            }
        }, [receiverGroup]
    );

    useEffect (
        () => {
            if(props.defaultReceiverGroup){
                setReceiverGroup(props.defaultReceiverGroup);
                props.updateReceiverGroup(props.defaultReceiverGroup);
                document.getElementById("receiverGroupChangeElement").value = props.defaultReceiverGroup;
            }
        }, [props.defaultReceiverGroup]
    );

    useEffect (
        () => {
            if(inviteOptions && props.defaultReceiverGroup === "friend"){
                if (inviteOptions.includes(props.defaultReceiver)){
                    document.getElementById("receiverChangeElement").value = props.defaultReceiver;
                    props.updateReceiver(props.defaultReceiver);
                }
            }
            if(inviteOptions && props.defaultReceiverGroup === "league"){
                for(let i = 0; i< inviteOptions.length; i++){
                    if (inviteOptions[i].split(" - ")[1] === props.defaultReceiver){
                        document.getElementById("receiverChangeElement").value = inviteOptions[i];
                        props.updateReceiver(props.defaultReceiver);
                    }
                }
            }
        }, [props.defaultReceiverGroup, props.defaultReceiver, inviteOptions]
    );

    function processLeagueInfo(response){
        var array_leagues = []
        for (let item of response.data) {
            array_leagues.push(item.leagueName + " - " + item._id);
        }
        setInviteOptions(array_leagues);
    }

    const receiverGroupChange = (event) => {
        setReceiverGroup(event.target.value);
        props.updateReceiverGroup(event.target.value);
    }

    const receiverChange = (event) => {
        props.updateReceiver(event.target.value);
    }

    return (
        <div data-testid="ExerciseReceiverFormComponent">
            <div className="formObj">
                <p className="formObjInner">What kind of challenge?</p>
                <div className="formObjInner">
                    <select data-testid="ExerciseReceiverFormChallengeTypeSelect" className="formSelect" id = "receiverGroupChangeElement" onChange={receiverGroupChange} defaultValue = "self">
                        <option value="self">Self</option>
                        <option value="friend">Friend</option>
                        <option value="league">League</option>
                    </select>
                </div>
            </div>


            <div id = "secondarySelect" className="formObj">
                <p className="formObjInner">Who should receive the challenge?</p>
                <div>
                    <select data-testid="ExerciseReceiverFormReceiverSelect" id = "receiverChangeElement" onChange={receiverChange}  className="formSelect" defaultValue = "none">
                        <option value="none" disabled hidden></option>
                        {inviteOptions.map((name) => { return <option value={name} key = {name}>{name.split("-")[0]}</option>; })}
                    </select>
                </div>
            </div>
        </div>
    );
}
export default ExerciseReceiverForm;
