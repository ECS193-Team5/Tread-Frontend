import { useState, useEffect } from "react";
import "../../css/Shared/coloredText.css";
import axios from 'axios';
const backend_url = process.env.REACT_APP_PROD_BACKEND;
const ChallengeStats = (props) => {
    const [load, setLoad] = useState(false);
    const [message, setMessage] = useState("");
    const [suggestedExercises, setSuggestedExercises] = useState([]);
    const [exerciseIndex, setExerciseIndex] = useState(0);

    function getToday() {
        let date_ob = new Date()

        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();

        return new Date(year + "-" + month + "-" + date);
    }

    const calculateDueDate = (exercise) => {
        let issueDate = new Date(exercise.issueDate).valueOf();
        let originalDueDate = new Date(exercise.dueDate).valueOf();
        let dueDate = new Date(getToday().getTime() + (originalDueDate - issueDate));
        return dueDate;

    }
    const recommendExercise = () => {
        if (suggestedExercises.length <= 0) {
            props.updateInputs("NA");
            setMessage("We do not currently have enough data to recommend a challenge.");
            return;
        }
        setMessage(suggestedExercises[exerciseIndex].message);
        props.updateInputs(suggestedExercises[exerciseIndex].data);
        setExerciseIndex((exerciseIndex + 1) % suggestedExercises.length);
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

    const createExercises = (exercise) => {
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
        else{
            return;
        }
        return suggestion;
    }


    const loadRecommendations = () => {
        var config = {
            method: 'post',
            url: backend_url + 'stats/get_past_challenges',
            headers: {
                Accept: 'application/json',
            },
            withCredentials: true,
            credentials: 'include'
        };
        axios(config)
            .then(function (response) {
                let results = [];
                for(let i = 0; i<response.data.length; i++){
                    let result = createExercises(response.data[i]);

                    if (result){
                        results.push(result);
                    }

                }
                console.log(results);
                setSuggestedExercises(results);
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    window.location.href = "/loginPage";
                }
            });
    }

    useEffect(
        () => {
            if (!load) {
                setLoad(true);
                loadRecommendations();
            }
        }, [load]
    );

    return (
        <div>
            <button className="submitButton" onClick={recommendExercise}><p className="submitButtonText">Recommend a Challenge</p></button>
            <p className="greenBaseText">{message}</p>
        </div>
    )
}

export default ChallengeStats;