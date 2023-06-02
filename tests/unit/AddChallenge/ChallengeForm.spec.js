import React from 'react';
import { fireEvent, render, screen } from "@testing-library/react";
import ChallengeForm from '../../../src/components/AddChallenge/ChallengeForm';
import '@testing-library/jest-dom'
import * as addChallenge from "../../../src/routes/challenges";
import * as cssEffects from "../../../src/helpers/CssEffects";
import * as statisticsFunc from '../../../src/routes/statistics.js';
import * as friendFunc from '../../../src/routes/friend_list.js';
import * as leagueFunc from '../../../src/routes/league.js';

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

describe("Test components/AddChallenge/ChallengeForm.js", () => {

    beforeEach(()=>{
        getLocationMock.mockImplementation(()=>{return "./addChallengePage"})
    })
    it("Test render", () => {
        render(<ChallengeForm/>)
    })

    it("Test render with prefill information", () => {
        getLocationMock.mockImplementation(()=>{return "./addChallengePage?prefill=friend.user1"})
        render(<ChallengeForm/>)
    })

    it("Test render with prefill information incorrectly", () => {
        getLocationMock.mockImplementation(()=>{return "./addChallengePage?prefill=friend"})
        render(<ChallengeForm/>)
    })

    it("Test submit with no information", () => {
        render(<ChallengeForm/>)
        let submitButton = screen.getByTestId("ChallengeFormSubmitButton");
        let errorBox = screen.getByTestId("ChallengeFormErrorBox")
        fireEvent.click(submitButton)
        expect(errorBox).toHaveTextContent("Please give an exercise name. Please give an amount over zero. Please give a valid issue date. Please give a valid due date.");
        expect(submitChallengeMock).not.toHaveBeenCalled;
    })

    it("Test submit with incorrect receiver", () => {
        render(<ChallengeForm/>)
        const recevierGroupSelect = screen.getByTestId("ExerciseReceiverFormChallengeTypeSelect")
        fireEvent.change(recevierGroupSelect, {target:{value:"friend"}})
        let submitButton = screen.getByTestId("ChallengeFormSubmitButton");
        let errorBox = screen.getByTestId("ChallengeFormErrorBox")
        fireEvent.click(submitButton)
        expect(errorBox).toHaveTextContent("Please give an exercise name. Please give an amount over zero. Please give a valid issue date. Please give a valid due date. Please select a recipient for your challenge.");
        expect(submitChallengeMock).not.toHaveBeenCalled;
    })

    it("Test update inputs with ChallengeStatsButton", () => {
        render(<ChallengeForm/>)
        fireEvent.click(screen.getByTestId("ChallengeStatsButton"));
        let submitButton = screen.getByTestId("ChallengeFormSubmitButton");
        let errorBox = screen.getByTestId("ChallengeFormErrorBox")
        fireEvent.click(submitButton)
        expect(errorBox).toHaveTextContent("");
        expect(submitChallengeMock).toHaveBeenCalled;
    });

    it("Test update inputs with empty ChallengeStatsButton", () => {
        m.mockImplementation((setExerciseList)=>{setExerciseList([])})
        render(<ChallengeForm/>)
        fireEvent.click(screen.getByTestId("ChallengeStatsButton"));
        let submitButton = screen.getByTestId("ChallengeFormSubmitButton");
        let errorBox = screen.getByTestId("ChallengeFormErrorBox")
        fireEvent.click(submitButton)
        expect(errorBox).toHaveTextContent("Please give an exercise name. Please give an amount over zero. Please give a valid issue date. Please give a valid due date.");
        expect(submitChallengeMock).not.toHaveBeenCalled;
    });

    it("Test league receiver", () => {
        m.mockImplementation(fakeFuncMultipleChallenges)
        render(<ChallengeForm/>)
        fireEvent.click(screen.getByTestId("ChallengeStatsButton"));
        const recevierGroupSelect = screen.getByTestId("ExerciseReceiverFormChallengeTypeSelect")
        fireEvent.change(recevierGroupSelect, {target:{value:"league"}})
        const recevierSelect = screen.getByTestId("ExerciseReceiverFormReceiverSelect")
        fireEvent.change(recevierSelect, {target:{value:"4league - 4"}})
        let submitButton = screen.getByTestId("ChallengeFormSubmitButton");
        let errorBox = screen.getByTestId("ChallengeFormErrorBox");
        fireEvent.click(submitButton)
        expect(errorBox).toHaveTextContent("");
        expect(submitChallengeMock).toHaveBeenCalled;
    });

    it("Test leauge submit info", () => {
        submitChallengeMock.mockImplementation((data, then, err)=>{err()})
        render(<ChallengeForm/>)
        fireEvent.click(screen.getByTestId("ChallengeStatsButton"));
        let submitButton = screen.getByTestId("ChallengeFormSubmitButton");
        let errorBox = screen.getByTestId("ChallengeFormErrorBox");
        fireEvent.click(submitButton)
        expect(errorBox).toHaveTextContent("The challenge could not be issued. Please try again later.");
        expect(submitChallengeMock).toHaveBeenCalled;
    });

    it("Test leauge move page", () => {
        submitChallengeMock.mockImplementation((data, then, err)=>{then()})
        render(<ChallengeForm/>)
        fireEvent.click(screen.getByTestId("ChallengeStatsButton"));
        let submitButton = screen.getByTestId("ChallengeFormSubmitButton");
        let errorBox = screen.getByTestId("ChallengeFormErrorBox");
        fireEvent.click(submitButton)
        expect(errorBox).toHaveTextContent("");
        expect(submitChallengeMock).toHaveBeenCalled;
        expect(setLocationMock).toHaveBeenCalled;
    });
});