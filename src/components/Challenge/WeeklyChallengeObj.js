import {useState, useEffect} from "react";

import BoxLine from "./BoxLine";
import ProgressBar from "../Shared/ProgressBar";
import Line from "../Shared/Line";
import Leaderboard from "../Shared/Leaderboard";
import axios from "axios";
import { flipButton } from "../../Helpers/CssEffects";
import "../../css/Challenge/challengeObj.css";

const backend_url = process.env.REACT_APP_PROD_BACKEND;

const WeeklyChallengeObj = (props) => {
    let myProgressBaseUnits = props.children.progress;
    let totalBaseUnits = props.children.exercise.convertedAmount;
    let totalRealUnits = props.children.exercise.amount;
    let dueDate = props.children.dueDate.split("T")[0];
    let percentageDone = myProgressBaseUnits/totalBaseUnits * 100;
    let title = props.children.exercise.exerciseName + " " + props.children.exercise.amount + " " + props.children.exercise.unit
    let challengeID = props.children.challengeID;
    let myProgressRealUnits = Math.round(convertProgress(myProgressBaseUnits, props.children.exercise.unit));
    const [showState, setState] = useState(false);
    const [leaderboardInfo, setLeaderboardInfo] = useState([]);
    const [load, setLoad] = useState(false);


    function toggleState(){
        setState(!showState);
        flipButton(challengeID + "button", showState);
    }

    function selfInTop5(top5, selfData){
        let myUsername = selfData.username;

        for (let i = 0; i < top5.length; i++){
            if (myUsername === top5[i].username){
                return true;
            }
        }
        return false;
    }

    function buildLeaderboard(top5, selfData){
        let top5Info = top5.map(makeLeaderboardObj);
        if(!selfInTop5(top5, selfData)){
            let item = selfData.map(makeLeaderboardObj);
            item[0]["level"] = " - ";
            top5Info.push(item[0]);
        }
        setLeaderboardInfo(top5Info);
    }
    function getLeaderboard(){
        var config = {
            method : 'post',
            url : backend_url + 'global_challenge/get_leaderboard',
            headers: {
            Accept: 'application/json',
            },
            withCredentials: true,
            credentials: 'include',
            data:{
                challengeID: challengeID
            }
        };
        axios(config)
        .then(function(response){
            buildLeaderboard(response.data[0], response.data[1]);

        })
        .catch(function(error){
            console.log(error);
            /*if(error.response.status===401){
                window.location.href = "/loginPage";
            }*/
        });
    }


    function convertProgress(progress, goal_unit){

        let conversionKey = {
            "ct":1,
            "m":1,
            "km":(1/1000),
            "ft": 3.28084,
            "yd": 1.0936133333333,
            "mi": 0.00062137121212119323429,
            "s": 60,
            "min": 1,
            "hr": (1/60)
        }

        return progress*conversionKey[goal_unit];

        return 1;

    }

    function makeLeaderboardObj(item, index){
        let entry = {}
        entry["level"] = index + 1;
        entry["photo"] = item["pictures"];
        entry["name"] = item["username"];
        entry["complete"] = item["progress"]/totalBaseUnits * 100;
        entry["score"] = Math.round(convertProgress(item["progress"], props.children.exercise.unit));
        return entry;
    }

    useEffect (
        () => {
            if(!load){
                getLeaderboard();
                setLoad(true);
            }
        }, [load]
    );

    return (
    <div className = "completeChallengeBox">
        <div className = "challengeBox">
        <div className="photoDiv">
            <div className="weeklyPhotoDiv">
                <img className = "innerWeeklyPhotoDiv" src = "https://i.imgur.com/XkWZOEN.png"/>
                <p className = "innerWeeklyPhotoDiv challengeText">Global</p>
            </div>
            <BoxLine></BoxLine>
        </div>

        <div className = "challengeMiddle">
            <div className = "challengeInnerMiddle">
                <p className="challengeText">{title}</p>
                <p className="challengeText">{dueDate}</p>
            </div>
            <div className = "challengeInnerMiddle">
                <ProgressBar>{{"completed":percentageDone}}</ProgressBar>
            </div>
        </div>

        <div className = "challengeEnd">
            <button className = "challengeDropButton" onClick = {toggleState}>
                <img src = "https://i.imgur.com/DiUB6gk.png" id = {challengeID+"button"}alt = "expandButton"/>
            </button>
            {
                (percentageDone < 100) ?
                <p className = "challengeInnerEnd">{myProgressRealUnits}/{totalRealUnits}</p>
                :
                <p className = "challengeInnerEnd">Complete</p>
            }
        </div>

        </div>


        {showState
        ?
        <div className = "leaderboardSection">
            <Line></Line>
            <Leaderboard>{{"title":"Global Challenge", "entries": {leaderboardInfo}}}</Leaderboard>
        </div>
        :
        <></>
        }

    </div>
    );

}

export default WeeklyChallengeObj;