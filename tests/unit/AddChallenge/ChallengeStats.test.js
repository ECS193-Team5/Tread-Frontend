import React from 'react';
import { render, fireEvent, screen } from "@testing-library/react";
import ChallengeStats from '../../../src/components/AddChallenge/ChallengeStats';
import '@testing-library/jest-dom'
import * as statisticsFunc from '../../../src/routes/statistics.js';

const updateInputsMock = jest.fn();

const fakeFuncEmptyList = (setExerciseList) => {
    setExerciseList([]);
}

const fakeFuncOneEmptyChallenge = (setExerciseList) => {
    setExerciseList([{
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
        "progress": 0
      }])
}

const fakeFuncOneFailedChallenge = (setExerciseList) => {
    setExerciseList([{
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
      }])
}

const fakeFuncOneSlightlyFailedChallenge = (setExerciseList) => {
    setExerciseList([{
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
      }])
}

const fakeFuncOneCompletedChallenge = (setExerciseList) => {
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
      }])
}

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

let m = jest.spyOn(statisticsFunc, "getPastChallenges");

let expectedAmountValuesOnCall = [2, 23, 25, 25, 23, 2, 25];

const getToday = () => {
    const MILLISECONDS_IN_DAY = 24*60*60*1000
    let date =  Date.now();
    date = Math.floor(date/MILLISECONDS_IN_DAY) * MILLISECONDS_IN_DAY;
    date =  new Date(date);
    return date.toISOString();
}

const getDistanceFromToday = () => {
    // Three days in the future
    let today = Date.parse(getToday());
    today  = today + 3 * 24 * 60 * 60 * 1000;
    return new Date(today).toISOString();
}
const checkCalledSuggestionObj = (mockedFunc, callNumber) => {
    expect(mockedFunc.mock.calls[callNumber][0]).toHaveProperty("exerciseName", "Baseball");
    expect(mockedFunc.mock.calls[callNumber][0]).toHaveProperty("amount", expectedAmountValuesOnCall[callNumber-2]);
    expect(mockedFunc.mock.calls[callNumber][0]).toHaveProperty("unit", "m");
    expect(mockedFunc.mock.calls[callNumber][0]["issueDate"].toISOString()).toEqual(getToday());
    expect(mockedFunc.mock.calls[callNumber][0]["dueDate"].toISOString()).toEqual(getDistanceFromToday());
}

describe("Test /AddChallenge/ChallengeStats.js", () => {

    afterEach(()=>{
        m.mockClear();
    })


    it("Test render", () => {
        render(<ChallengeStats updateInputs = {updateInputsMock}/>)
    })

    it("Test one empty list", () => {
        m.mockImplementation(fakeFuncEmptyList);
        render(<ChallengeStats updateInputs = {updateInputsMock}/>)
        fireEvent.click(screen.getByTestId("ChallengeStatsButton"));
        const element = screen.getByTestId("ChallengeStatsMessage");
        expect(element).toHaveTextContent('We do not currently have enough data to recommend a challenge.')
        expect(updateInputsMock).toHaveBeenCalledWith("NA");
    });

    it("Test one challenge with 0 progress", () => {
        m.mockImplementation(fakeFuncOneEmptyChallenge);
        render(<ChallengeStats updateInputs = {updateInputsMock}/>)
        fireEvent.click(screen.getByTestId("ChallengeStatsButton"));
        const element = screen.getByTestId("ChallengeStatsMessage");
        expect(element).toHaveTextContent('We do not currently have enough data to recommend a challenge.')
        expect(updateInputsMock).toHaveBeenCalledWith("NA");
    })

    it("Test one challenge with some, but poor, progress", () => {
        m.mockImplementation(fakeFuncOneFailedChallenge);
        render(<ChallengeStats updateInputs = {updateInputsMock}/>)
        fireEvent.click(screen.getByTestId("ChallengeStatsButton"));
        const element = screen.getByTestId("ChallengeStatsMessage");
        expect(element).toHaveTextContent('You can do this!')
        checkCalledSuggestionObj(updateInputsMock, 2);
    })

    it("Test one slightly failed challenge", () => {
        m.mockImplementation(fakeFuncOneSlightlyFailedChallenge);
        render(<ChallengeStats updateInputs = {updateInputsMock}/>)
        fireEvent.click(screen.getByTestId("ChallengeStatsButton"));
        const element = screen.getByTestId("ChallengeStatsMessage");
        expect(element).toHaveTextContent('You were so close last time!')
        checkCalledSuggestionObj(updateInputsMock, 3);
    })

    it("Test one completed challenges", () => {
        m.mockImplementation(fakeFuncOneCompletedChallenge);
        render(<ChallengeStats updateInputs = {updateInputsMock}/>)
        fireEvent.click(screen.getByTestId("ChallengeStatsButton"));
        const element = screen.getByTestId("ChallengeStatsMessage");
        expect(element).toHaveTextContent('This challenge reflects on one you have already completed. See if you can go a little further!')
        checkCalledSuggestionObj(updateInputsMock, 4);
    })


    it("Test multiple challenges of each type, and the cycle back to start", () => {
        m.mockImplementation(fakeFuncMultipleChallenges);
        render(<ChallengeStats updateInputs = {updateInputsMock}/>)
        fireEvent.click(screen.getByTestId("ChallengeStatsButton"));
        let element = screen.getByTestId("ChallengeStatsMessage");
        expect(element).toHaveTextContent('This challenge reflects on one you have already completed. See if you can go a little further!')
        checkCalledSuggestionObj(updateInputsMock, 5);
        fireEvent.click(screen.getByTestId("ChallengeStatsButton"));
        element = screen.getByTestId("ChallengeStatsMessage");
        expect(element).toHaveTextContent('You were so close last time!')
        checkCalledSuggestionObj(updateInputsMock, 6);
        fireEvent.click(screen.getByTestId("ChallengeStatsButton"));
        element = screen.getByTestId("ChallengeStatsMessage");
        expect(element).toHaveTextContent('You can do this!')
        checkCalledSuggestionObj(updateInputsMock, 7);
        fireEvent.click(screen.getByTestId("ChallengeStatsButton"));
        element = screen.getByTestId("ChallengeStatsMessage");
        expect(element).toHaveTextContent('This challenge reflects on one you have already completed. See if you can go a little further!')
        checkCalledSuggestionObj(updateInputsMock, 8);
    });
});