import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import StatsChallengeSection from "../../../src/components/Profile/StatsChallengeSection";
import * as statsFunc from "../../../src/routes/statistics";

jest.mock('../../../src/components/Profile/StatsDownloadSection', () => ()=> {return (<div></div>)});
jest.mock('react-chartjs-2', () => ({
    Bar: () => null
  }));

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

let getPastChallengesMock = jest.spyOn(statsFunc, "getPastChallenges").mockImplementation(fakeFuncMultipleChallenges);

describe("Test /Profile/StatsDownloadSection.js", () => {
    it("Test render challenge", () => {
        render(<StatsChallengeSection/>)
    })
});