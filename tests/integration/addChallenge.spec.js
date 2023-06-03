import React from 'react';
import { render, fireEvent, screen } from "@testing-library/react";
import AddChallenge from '../../src/pages/addChallenge';
import '@testing-library/jest-dom'
import * as addChallenge from "../../src/routes/challenges";
import * as cssEffects from "../../src/helpers/CssEffects";
import * as statisticsFunc from '../../src/routes/statistics.js';
import * as friendFunc from '../../src/routes/friend_list.js';
import * as leagueFunc from '../../src/routes/league.js';

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

let m = jest.spyOn(statisticsFunc, "getPastChallenges").mockImplementation(fakeFuncMultipleChallenges);
let friendStub = jest.spyOn(friendFunc, "getFriendList").mockImplementation((setFriendInfo) => setFriendInfo(["user1","user2"]));
let leagueStub = jest.spyOn(leagueFunc, "getAdminLeagues").mockImplementation((setLeagueInfo) => setLeagueInfo({data:[{_id:"4", leagueName:"4league"},{_id:"5", username:"5league"}]}));
let submitChallengeMock = jest.spyOn(addChallenge, "addChallenge").mockImplementation((inputData, funcMove, funErr) => {});
let getLocationMock = jest.spyOn(cssEffects, "getHrefLocation").mockImplementation(() => {return "./addChallenge"});
let setLocationMock = jest.spyOn(cssEffects, "setLocation").mockImplementation(() => {});

describe("Test /pages/addChallenge.js", () => {
    it("Test submit with no information", () => {
        render(<AddChallenge />)
        let submitButton = screen.getByTestId("AddChallengeSubmitButton");
        let errorBox = screen.getByTestId("AddChallengeErrorBox")
        fireEvent.click(submitButton)
        expect(errorBox).toHaveTextContent("Please give an exercise name. Please give an amount over zero. Please give a valid issue date. Please give a valid due date.");
    })
});