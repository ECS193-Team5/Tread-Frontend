import RowBox from "../components/Social/RowBox";
import {useState} from "react";
import Bar from "../components/Shared/Bar";
import "./try.css";
import PhotoDisplay from "../components/Challenge/PhotoDisplay";
import IssuedChallengeObj from "../components/Challenge/IssuedChallengeObj";
const TestDiv = () => {
    const updateFunc = (value) => {
        console.log(value, " clicked")
    }

    let participants = ["NewUser#2224"];
    return (<div>
        <IssuedChallengeObj>{{
    "_id": "644c807f30afaa5d7758243d",
    "participants": [
        "batman#9320",
        "batman#6380",
    ],
    "sentUser": "batman#6380",
    "receivedUser": "63fb66a1971b753d7edf9c48",
    "challengeType": "league",
    "issueDate": "2023-04-28T00:00:00.000Z",
    "dueDate": "2023-04-30T00:00:00.000Z",
    "exercise": {
        "exerciseName": "Beach Volleyball",
        "unit": "ct",
        "amount": 5555,
        "_id": "644c807f30afaa5d7758243e",
        "unitType": "count",
        "convertedAmount": 5555
    },
    "status": "accepted",
    "__v": 0,
    "progress": {
        "_id": "644c807f30afaa5d77582446",
        "username": "NewUser#2224",
        "challengeID": "644c807f30afaa5d7758243d",
        "issueDate": "2023-04-28T00:00:00.000Z",
        "dueDate": "2023-04-30T00:00:00.000Z",
        "exercise": {
            "exerciseName": "Beach Volleyball",
            "unit": "ct",
            "amount": 5555,
            "_id": "644c807f30afaa5d77582447",
            "unitType": "count",
            "convertedAmount": 5555
        },
        "progress": 0,
        "completed": false
    }
}}</IssuedChallengeObj>

    </div>)
}

export default TestDiv;