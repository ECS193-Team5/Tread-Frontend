import React, {useState} from "react";

const ExerciseLoggedDateForm = (props) => {
    const [err, setErr] = useState("");
    const loggedDateChange = (event) => {
        console.log("event", event.target.value)
        if(new Date(event.target.value) > Date.now()){
            setErr("You cannot log an exercise in the future");
            props.updateLoggedDate("");
        }
        else{
            setErr("");
            props.updateLoggedDate(new Date(event.target.value));
        }

    }

    function getToday(){
        let date_ob = new Date()

        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hour = ("0" + (date_ob.getHours() + 1)).slice(-2);
        let sec = ("0" + (date_ob.getSeconds() + 1)).slice(-2);

        return (year + "-" + month + "-" + date +"T"+hour+":"+sec);
    }

    const stopKey = (e) =>{
        e.preventDefault();
    }

    return (
        <div data-testid="ExerciseLoggedDateFormComponent">
            <p className="formObjInner">Date</p>
            <input data-testid="ExerciseLoggedDateFormDateInput" className="formDateInput formObjShort" onKeyDown = {stopKey} id="addExerciseDate" type="datetime-local" onChange={loggedDateChange} max = {getToday()}></input>
            <p data-testid="ExerciseLoggedDateFormDateInputErrorBox" className="errorBox">{err}</p>
        </div>
    )
}

export default ExerciseLoggedDateForm;