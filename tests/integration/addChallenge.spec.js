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
        "progress": 0
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
          "exerciseName": "My Own Exercise",
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
const fakeFuncEmptyList = (setExerciseList) => {
    setExerciseList([]);
}
const successfulSubmitChallenge = (data, then, err) => {
  then();
}
const failSubmitChallenge = (data, then,err) =>{
  err();
}

let m = jest.spyOn(statisticsFunc, "getPastChallenges").mockImplementation(fakeFuncMultipleChallenges);
let friendStub = jest.spyOn(friendFunc, "getFriendList").mockImplementation((setFriendInfo) => setFriendInfo(["friend1#0000","friend#0000"]));
let leagueStub = jest.spyOn(leagueFunc, "getAdminLeagues").mockImplementation((setLeagueInfo) => setLeagueInfo({data:[{_id:"1", leagueName:"1league"},{_id:"2", username:"2league"}]}));
let submitChallengeMock = jest.spyOn(addChallenge, "addChallenge").mockImplementation(successfulSubmitChallenge);
let getLocationMock = jest.spyOn(cssEffects, "getHrefLocation").mockImplementation(() => {return "/addChallengePage"});
let setLocationMock = jest.spyOn(cssEffects, "setLocation").mockImplementation(() => {});

const fillAmount = (unit, amount) => {
  const unitElement = screen.getByTestId("ExerciseAmountFormUnitSelect");
  expect(unitElement.value).toBe(unit)
  const amountElement = screen.getByTestId("ExerciseAmountFormExerciseAmountInput");
  expect(amountElement.placeholder).toBe(amount)
}
describe("Test /pages/addChallenge.js", () => {
    it("Test render", () => {
        render(<AddChallenge />)
    })

    it("Test render with prefilled info", () => {
        getLocationMock.mockImplementation(()=>{return "./addChallengePage?prefill=friend.user1"})
        render(<AddChallenge />)
    })

    it("Test incorrect prefill", () => {
        getLocationMock.mockImplementation(()=>{return "./addChallengePage?prefill=friend"})
        render(<AddChallenge />)
    })

    it("Test submit empty challenge",async () => {
        render(<AddChallenge />)
        let submitButton = screen.getByTestId("ChallengeFormSubmitButton");
        let errorBox = screen.getByTestId("ChallengeFormErrorBox")
        fireEvent.click(submitButton)
        expect(errorBox).toHaveTextContent("Please give an exercise name. Please give an amount over zero. Please give a valid issue date. Please give a valid due date.");
    })

    it("One complete entrance test", () => {
      render(<AddChallenge />)
    })
    describe("Test hitting recommend button", () => {
      it("Test one empty list", () => {
        m.mockImplementation(fakeFuncEmptyList);
        render(<AddChallenge/>)
        fireEvent.click(screen.getByTestId("ChallengeStatsButton"));
        const element = screen.getByTestId("ChallengeStatsMessage");
        expect(element).toHaveTextContent('We do not currently have enough data to recommend a challenge.')
    });

    it("Test multiple challenges of each type, and the cycle back to start", () => {
        m.mockImplementation(fakeFuncMultipleChallenges);
        render(<AddChallenge/>)
        fireEvent.click(screen.getByTestId("ChallengeStatsButton"));
        let element = screen.getByTestId("ChallengeStatsMessage");
        expect(element).toHaveTextContent('This challenge reflects on one you have already completed. See if you can go a little further!')

        fireEvent.click(screen.getByTestId("ChallengeStatsButton"));
        element = screen.getByTestId("ChallengeStatsMessage");
        expect(element).toHaveTextContent('You were so close last time!')

        fireEvent.click(screen.getByTestId("ChallengeStatsButton"));
        element = screen.getByTestId("ChallengeStatsMessage");
        expect(element).toHaveTextContent('You can do this!')

        fireEvent.click(screen.getByTestId("ChallengeStatsButton"));
        element = screen.getByTestId("ChallengeStatsMessage");
        expect(element).toHaveTextContent('This challenge reflects on one you have already completed. See if you can go a little further!')

    });
    })

    describe("Test move from side bar", () => {
      it("Test render", () => {
        render(<AddChallenge/>)
        fillAmount("hr", 10)
    })

    it("Test click the profile settings button", () => {
        render(<AddChallenge/>)
        const profileSettingsButton = screen.getByTestId("SideBarProfileSettingsButton");
        fireEvent.click(profileSettingsButton);
    })

    it("Test click the challenge button", () => {
        render(<AddChallenge/>)
        m.mockImplementation(()=> {return "/socialFriendPage";});
        const challengeButton = screen.getByTestId("SideBarChallengesButton");
        fireEvent.click(challengeButton);
    })

    it("Test click the social button", () => {
        render(<AddChallenge/>)
        m.mockImplementation(()=> {return "/currentChallengePage";});
        const socialButton = screen.getByTestId("SideBarSocialPageButton");
        fireEvent.click(socialButton);
    })

    it("Test click the profile button", () => {
        render(<AddChallenge/>)
        const exerciseButton = screen.getByTestId("SideBarExerciseHistoryButton");
        fireEvent.click(exerciseButton);
    })
    })
});