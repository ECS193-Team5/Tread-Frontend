import {useState, useEffect} from "react";
import axios from 'axios';
import "../../css/Shared/button.css";
const backend_url = process.env.REACT_APP_PROD_BACKEND;

const StatsDownloadSection = (props) => {
    const [ownBlob, setOwnBlob] = useState("");

    const requestExercises = () => {
        var config = {
            method : 'post',
            url : backend_url + 'stats/get_exercise_log',
            headers: {
              Accept: 'application/json',
            },
            withCredentials: true,
            credentials: 'include'
          };
          axios(config)
          .then(function(response){
            calculateBlobExercise(response.data);
          })
          .catch(function(error){
            if(error.response.status===401){
              window.location.href = "/";
          }
          });

    }

    const requestChallenges = () => {
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
            calculateBlobChallenge(response.data);
          })
          .catch(function (error) {
            if (error.response.status === 401) {
              window.location.href = "/";
            }
          });
      }

    const calculateBlobExercise = (data) => {
        let rows = "Date Completed, Date Posted, Exercise, Amount, Unit\n";

        data.forEach((row) =>
        {
            let file = "";
            file += row.loggedDate.split("T")[0]+",";
            file += row.postedDate.split("T")[0]+",";
            file += row.exercise.exerciseName +",";
            file += row.exercise.amount +",";
            file += row.exercise.unit +"\n";
            rows += file;
        });

        createBlob(rows);
    }

    const calculateBlobChallenge = (data) => {

        let rows = "Start Date, End Date, Challenge Exercise, Challenge Amount, Challenge Unit, Progress (%), Completed\n";

        data.forEach((row) =>
        {
            let file = "";
            file += row.issueDate.split("T")[0]+",";
            file += row.dueDate.split("T")[0]+",";
            file += row.exercise.exerciseName +",";
            file += row.exercise.amount +",";
            file += row.exercise.unit +",";
            file += (row.progress/row.exercise.convertedAmount)*100 +"% ,";
            file += row.completed + "\n";
            rows += file;
        });

        createBlob(rows);
    }

    const createBlob = (rows) => {
        const csvFile = new Blob([rows], { type: 'text/csv;charset=utf-16;' });

        let url = URL.createObjectURL(csvFile);
        setOwnBlob(url);
    }

    useEffect(() => {

        if (props.type === "Exercise"){
            requestExercises();
        }
        else if (props.type === "Challenge"){
            requestChallenges();
        }


    }, [props.type]);

    return (
    <div className = "downloadButtonDiv">
        <p className = "downloadButtonText">Download {props.type} History</p>
        <a href={ownBlob} download><img className = "downloadButtonImage" src = "https://i.imgur.com/jdDx2cV.png"></img></a>
    </div>)
}

export default StatsDownloadSection;