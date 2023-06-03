import React, {useState, useEffect} from "react";
import downloadButtonImage from "../../assets/DownloadButton.png";
import { getPastChallenges, getPastExercises } from "../../routes/statistics";
import "../../css/Shared/button.css";

const StatsDownloadSection = (props) => {
    const [ownBlob, setOwnBlob] = useState("");

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
            getPastExercises(calculateBlobExercise);
        }
        else {
            getPastChallenges(calculateBlobChallenge);
        }
    }, [props.type]);

    return (
    <div data-testid="StatsDownloadSectionComponent" className = "downloadButtonDiv">
        <p data-testid="StatsDownloadSectionDownloadButtonText" className = "downloadButtonText">Download {props.type} History</p>
        <a data-testid="StatsDownloadSectionOwnBlob" href={ownBlob} download><img className = "downloadButtonImage" src = {downloadButtonImage}></img></a>
    </div>)
}

export default StatsDownloadSection;