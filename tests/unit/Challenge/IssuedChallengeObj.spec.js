import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import IssuedChallengeObj from '../../../src/components/Challenge/IssuedChallengeObj';
import '@testing-library/jest-dom'
import * as challengeFunc from "../../../src/routes/challenges";
let getLeaderboardMock = jest.spyOn(challengeFunc, "getChallengeLeaderboard").mockImplementation((arg1, arg2)=>{arg2({data:[]})})


describe("Test /Challenge/IssuedChallengeObj.js", () => {

    let input = {}
    it("Test render", () => {
        render(<IssuedChallengeObj index = "0">{{_id:"id", exercise:{exerciseName:"exampleName", convertedAmount:10, amount:10, unit:"m"}, progress:{progress:0, exercise:{exerciseName:"exampleName", convertedAmount:10, amount:10, unit:"m"}}}}</IssuedChallengeObj>)
        expect(getLeaderboardMock).not.toBeCalled
    })

    it("Test show the leaderboard", () => {
        render(<IssuedChallengeObj index = "0">{{_id:"id", exercise:{exerciseName:"exampleName", convertedAmount:10, amount:10, unit:"m"}, progress:{progress:0, exercise:{exerciseName:"exampleName", convertedAmount:10, amount:10, unit:"m"}}}}</IssuedChallengeObj>)
        let element = screen.getByTestId("IssuedChallengeObjToggleStateButton0")
        fireEvent.click(element);
        expect(getLeaderboardMock).toBeCalled;
    })

    it("Test show the leaderboard with information", () => {
        let leaderboard = [{"pictures":"i.png", "username":"user#2224", "progress":4}]
        let getLeaderboardMock = jest.spyOn(challengeFunc, "getChallengeLeaderboard").mockImplementation((arg1, arg2)=>{arg2({data:leaderboard})})


        render(<IssuedChallengeObj index = "0">{{_id:"id", exercise:{exerciseName:"exampleName", convertedAmount:10, amount:10, unit:"m"}, progress:{progress:0, exercise:{exerciseName:"exampleName", convertedAmount:10, amount:10, unit:"m"}}}}</IssuedChallengeObj>)
        let element = screen.getByTestId("IssuedChallengeObjToggleStateButton0")
        fireEvent.click(element);
        expect(getLeaderboardMock).toBeCalled;
    })


    it("Test overcomplete the exercise", () => {
        let leaderboard = [{"pictures":"i.png", "username":"user#2224", "progress":4}]
        let getLeaderboardMock = jest.spyOn(challengeFunc, "getChallengeLeaderboard").mockImplementation((arg1, arg2)=>{arg2({data:leaderboard})})


        render(<IssuedChallengeObj index = "0">{{_id:"id", exercise:{exerciseName:"exampleName", convertedAmount:10, amount:10, unit:"m"}, progress:{progress:400, exercise:{exerciseName:"exampleName", convertedAmount:10, amount:10, unit:"m"}}}}</IssuedChallengeObj>)
        let element = screen.getByTestId("IssuedChallengeObjToggleStateButton0")
        fireEvent.click(element);
        expect(getLeaderboardMock).toBeCalled;
    })
});