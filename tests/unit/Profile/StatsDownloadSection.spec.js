import React from 'react';
import { fireEvent, render , screen} from "@testing-library/react";
import StatsDownloadSection from '../../../src/components/Profile/StatsDownloadSection';
import '@testing-library/jest-dom'
import * as statsFunc from "../../../src/routes/statistics";

const fakeFuncMultipleChallenges = (setExerciseList) => {
    setExerciseList([{
        "completed": true,
        "dueDate": "2023-04-20T00:00:00.000Z",
        "exercise": {
          "exerciseName": "Baseball",
          "unit": "m",
          "amount": 23,
          "unitType": "distance",
          "convertedAmount": 23
        },
        "issueDate": "2023-04-17T00:00:00.000Z",
        "progress": 25
      },
      {
        "completed": false,
        "dueDate": "2023-04-20T00:00:00.000Z",
        "exercise": {
          "exerciseName": "Baseball",
          "unit": "m",
          "amount": 23,
          "unitType": "distance",
          "convertedAmount": 23
        },
        "issueDate": "2023-04-17T00:00:00.000Z",
        "progress": 21
      },
      {
        "completed": false,
        "dueDate": "2023-04-20T00:00:00.000Z",
        "exercise": {
          "exerciseName": "Baseball",
          "unit": "m",
          "amount": 23,
          "unitType": "distance",
          "convertedAmount": 23
        },
        "issueDate": "2023-04-17T00:00:00.000Z",
        "progress": 2
      }
    ])
}

let exerciseData = [{"loggedDate":"4Tw", "postedDate":"4Tw", "exercise":{exerciseName:"baseball", amount:10, "unit":"m"}}]
let getPastChallengesMock = jest.spyOn(statsFunc, "getPastChallenges").mockImplementation(fakeFuncMultipleChallenges);
let getPastExercsiesMock = jest.spyOn(statsFunc, "getPastExercises").mockImplementation((func) => {func(exerciseData)});

const clickDownload = () =>{
    const element = screen.getByTestId("StatsDownloadSectionOwnBlob")
    fireEvent.click(element);
}
global.URL.createObjectURL = jest.fn(()=>{return "url"});
describe("Test /Profile/StatsDownloadSection.js", () => {
    beforeEach(()=>{
    })

    it("Test render challenge", () => {
        render(<StatsDownloadSection type = "Challenge"/>)
    })

    it("Test render exercise", () => {
        render(<StatsDownloadSection type = "Exercise"/>)
    })


});