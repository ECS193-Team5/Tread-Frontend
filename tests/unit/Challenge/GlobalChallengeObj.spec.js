import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import GlobalChallengeObj from '../../../src/components/Challenge/GlobalChallengeObj';
import '@testing-library/jest-dom'
import * as globalChallengeFunc from "../../../src/routes/global_challenges";
let getLeaderboardMock = jest.spyOn(globalChallengeFunc, "getGlobalChallengeLeaderboard").mockImplementation((arg1, arg2)=>{arg2({data:[[], {username:"User#2224"}]})})

const DAY_IN_MILLISECONDS = 24*60*60*1000;
const YESTERDAY = new Date(Date.now() - DAY_IN_MILLISECONDS).toISOString();
const TOMORROW = new Date(Date.now() + DAY_IN_MILLISECONDS).toISOString();

describe("Test /Challenge/GlobalChallengeObj.js", () => {
    let input = {}
    it("Test render", () => {
        render(<GlobalChallengeObj index = "0">{{_id:"id","dueDate": TOMORROW, "issueDate":YESTERDAY, exercise:{exerciseName:"exampleName", convertedAmount:10, amount:10, unit:"m"}, progress:{progress:0, exercise:{exerciseName:"exampleName", convertedAmount:10, amount:10, unit:"m"}}}}</GlobalChallengeObj>)
        expect(getLeaderboardMock).not.toBeCalled
    })


    it("Test show the leaderboard", () => {
        render(<GlobalChallengeObj index = "0">{{_id:"id","dueDate": TOMORROW, "issueDate":YESTERDAY, exercise:{exerciseName:"exampleName", convertedAmount:10, amount:10, unit:"m"}, progress:{progress:0, exercise:{exerciseName:"exampleName", convertedAmount:10, amount:10, unit:"m"}}}}</GlobalChallengeObj>)
        let element = screen.getByTestId("GlobalChallengeObjToggleStateButton0")
        fireEvent.click(element);
        expect(getLeaderboardMock).toBeCalled;
    })

    it("Test show the leaderboard with information", () => {
        let leaderboard = [[{"pictures":"i.png", "username":"user#2234", "progress":4}, {"pictures":"i.png", "username":"user#2224", "progress":4}], {username:"user#2224"}]
        let getLeaderboardMock = jest.spyOn(globalChallengeFunc, "getGlobalChallengeLeaderboard").mockImplementation((arg1, arg2)=>{arg2({data:leaderboard})})


        render(<GlobalChallengeObj index = "0">{{_id:"id", exercise:{exerciseName:"exampleName", convertedAmount:10, amount:10, unit:"m"}, progress:{progress:0, exercise:{exerciseName:"exampleName", convertedAmount:10, amount:10, unit:"m"}}}}</GlobalChallengeObj>)
        let element = screen.getByTestId("GlobalChallengeObjToggleStateButton0")
        fireEvent.click(element);
        expect(getLeaderboardMock).toBeCalled;
    })


    it("Test overcomplete the exercise", () => {
        let leaderboard = [[{"pictures":"i.png", "username":"user#2234", "progress":4}, {"pictures":"i.png", "username":"user#2224", "progress":4}], {username:"user#2224"}]
        let getLeaderboardMock = jest.spyOn(globalChallengeFunc, "getGlobalChallengeLeaderboard").mockImplementation((arg1, arg2)=>{arg2({data:leaderboard})})


        render(<GlobalChallengeObj index = "0">{{_id:"id", exercise:{exerciseName:"exampleName", convertedAmount:10, amount:10, unit:"m"}, progress:500}}</GlobalChallengeObj>)
        let element = screen.getByTestId("GlobalChallengeObjToggleStateButton0")
        fireEvent.click(element);
        expect(getLeaderboardMock).toBeCalled;
    })

    it("Test undercomplete the exercise", () => {
        let leaderboard = [[{"pictures":"i.png", "username":"user#2234", "progress":4}, {"pictures":"i.png", "username":"user#2224", "progress":4}], {username:"user#2224"}]
        let getLeaderboardMock = jest.spyOn(globalChallengeFunc, "getGlobalChallengeLeaderboard").mockImplementation((arg1, arg2)=>{arg2({data:leaderboard})})

        render(<GlobalChallengeObj index = "0">{{_id:"id", exercise:{exerciseName:"exampleName", convertedAmount:10, amount:10, unit:"m"}, progress:4}}</GlobalChallengeObj>)
        let element = screen.getByTestId("GlobalChallengeObjToggleStateButton0")
        fireEvent.click(element);
        expect(getLeaderboardMock).toBeCalled;
    })
});