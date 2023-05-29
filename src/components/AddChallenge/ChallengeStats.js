import React, { useState, useEffect } from "react";
import { getPastChallenges } from "../../routes/statistics";
import { getToday } from "../../helpers/FormHelpers";
import "../../css/Shared/coloredText.css";

const ChallengeStats = (props) => {
    const [load, setLoad] = useState(false);
    const [message, setMessage] = useState("");
    const [suggestedExercises, setSuggestedExercises] = useState([]);
    const [exerciseIndex, setExerciseIndex] = useState(0);

    useEffect(
        () => {
            if (!load) {
                setLoad(true);
                getPastChallenges(createExerciseList);
            }
        }, [load]
    );

    const calculateDueDate = (exercise) => {
        let issueDate = new Date(exercise.issueDate).valueOf();
        let originalDueDate = new Date(exercise.dueDate).valueOf();
        let dueDate = new Date(getToday().getTime() + (originalDueDate - issueDate));
        return dueDate;
    }

    const recreateChallengeData = (exercise, amount) =>{
        let data = {};
        data.exerciseName = exercise.exercise.exerciseName;
        data.amount = amount;
        data.unit = exercise.exercise.unit;
        data.issueDate = getToday();
        data.dueDate = calculateDueDate(exercise);
        return data;
    }

    const createExercise = (exercise) => {
        let progressPercent = exercise.progress/exercise.exercise.convertedAmount;
        let suggestion = {};

        if(progressPercent >= 1){
            suggestion.data = recreateChallengeData(exercise, Math.round(exercise.exercise.amount * 1.1));
            suggestion.message = "This challenge reflects on one you have already completed. See if you can go a little further!";
        }
        else if(progressPercent >= .9){
            suggestion.data = recreateChallengeData(exercise, exercise.exercise.amount)
            suggestion.message = "You were so close last time!";
        }
        else if(Math.round(progressPercent * exercise.exercise.amount)>0){
            suggestion.data = recreateChallengeData(exercise, Math.round(progressPercent * exercise.exercise.amount))
            suggestion.message = "You can do this!";
        }

        return suggestion;
    }

    const createExerciseList = (response) => {
        let results = [];
        for(let i = 0; i<response.length; i++){
            let result = createExercise(response[i]);

            if (Object.keys(result).length > 0){
                results.push(result);
            }

        setSuggestedExercises(results);
        }
    }

    const recommendExercise = () => {
        if (suggestedExercises.length === 0) {
            props.updateInputs("NA");
            setMessage("We do not currently have enough data to recommend a challenge.");
            return;
        }

        setMessage(suggestedExercises[exerciseIndex].message);
        props.updateInputs(suggestedExercises[exerciseIndex].data);
        setExerciseIndex((exerciseIndex + 1) % suggestedExercises.length);
    }

    return (
        <div data-testid="ChallengeStatsComponent">
            <button data-testid="ChallengeStatsButton" className="submitButton" onClick={recommendExercise}><p className="submitButtonText">Recommend a Challenge</p></button>
            <p data-testid="ChallengeStatsMessage" className="greenBaseText">{message}</p>
        </div>
    )
}

export default ChallengeStats;