import { useState } from 'react';
import axios from "axios";

import "../../css/Challenge/addExercise.css";
import "../../css/Shared/form.css";
import "../../css/Shared/button.css";
import { reloadPage, flipButton } from '../../Helpers/CssEffects';
import ExerciseNameForm from '../Shared/Form/ExerciseNameForm';
import ExerciseAmountForm from '../Shared/Form/ExerciseAmountForm';
import ExerciseLoggedDateForm from "../Shared/Form/ExerciseLoggedDateForm";
const backend_url = process.env.REACT_APP_PROD_BACKEND;

const AddExerciseBox = () => {
    const [exerciseName, setExerciseName] = useState("");
    const [unit, setUnit] = useState("min");
    const [amount, setAmount] = useState(0);
    const [loggedDate, setLoggedDate] = useState("");
    const [submitError, setSubmitError] = useState("");
    const [showState, setShowState] = useState(false);

    const checkValidInputs = () => {
        setSubmitError("");
        let errorMessage = "";

        if (exerciseName === ""){
            errorMessage += "Please give an exercise name.\n";
          }

          if(amount <= 0){
            errorMessage += "Please give an amount over zero.\n";
          }

        if (loggedDate === ""){
            errorMessage += "Please give a date for the exercise.\n";
        }

        setSubmitError(errorMessage);
        return (errorMessage === "");
    }

    function submitExercise() {
        if (!checkValidInputs()){
            return false;
        }

        var config = {
            method: 'post',
            url: backend_url + 'exercise_log/add',
            headers: {
                Accept: 'application/json',
            },
            withCredentials: true,
            credentials: 'include',
            data: {
                loggedDate: loggedDate.valueOf(),
                exerciseName: exerciseName,
                unit: unit,
                amount: amount
            }
        };
        axios(config)
            .then(function (response) {
                console.log("Response here!!!");
                reloadPage();
            })
            .catch(function (error) {
                console.log("Straight to error!");
                console.log(error)
                if (error.response.status === 401) {
                    window.location.href = "/loginPage";
                }
            });
    }

    const toggleShowState = () => {
        setShowState(!showState);
        flipButton("AddExerciseButtonShowState", showState);
    }

    return (
        <div id="AddExerciseBox">
            <div id = "AddExerciseHeader">
                <h2>Log an Exercise</h2>
                <button className="dropDownButton" onClick={toggleShowState}><img className="dropDownButton" id="AddExerciseButtonShowState" src="https://i.imgur.com/msPQZqA.png" alt="Dropdown" /></button>
            </div>
            {showState
                ?
                <div id = "AddExerciseFormBox">
                    <ExerciseNameForm updateExerciseName = {setExerciseName}/>
                    <ExerciseAmountForm updateAmount = {setAmount} updateUnit = {setUnit}/>
                    <ExerciseLoggedDateForm updateLoggedDate = {setLoggedDate}/>

                    <div className="formButton">
                        <button className="submitButton" onClick={submitExercise}><p className="submitButtonText">Submit</p></button>
                    </div>
                    <p className = "errorBox">{submitError}</p>
                </div>
                :
                <></>
            }
        </div>
    )
}

export default AddExerciseBox;