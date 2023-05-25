import React, {useEffect} from "react";
const LeagueTypeForm = (props) => {
    function updateLeagueType(event){
        props.updateLeagueType(event.target.value);
    }

    useEffect (
        () => {
            if(props.defaultValue){
                document.getElementById("leagueTypeInput").value = props.defaultValue;
            }
        }, [props.defaultValue]
    );


    return(
        <div className="formObj">
            <h2>League Type</h2>
            <p className="formObjInner">In a private league, the admin will have to invite or accept users before they can join.</p>
            <p className="formObjInner">In a public league, anyone can join.</p>
            <select id = "leagueTypeInput" className = "formSelect" onChange={updateLeagueType}>
                <option value = "private">Private</option>
                <option value = "public">Public</option>
            </select>
        </div>
    );
}

export default LeagueTypeForm;