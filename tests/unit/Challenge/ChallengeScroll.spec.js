import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import ChallengeScroll from '../../../src/components/Challenge/ChallengeScroll';
import '@testing-library/jest-dom'
import * as challengeFunc from "../../../src/routes/challenges";
import * as globalChallengeFunc from "../../../src/routes/global_challenges";

let challengeObj = {_id:"id", challengeId:"5", exercise:{exerciseName:"exampleName", convertedAmount:10, amount:10, unit:"m"}, progress:{progress:0, exercise:{exerciseName:"exampleName", convertedAmount:10, amount:10, unit:"m"}}}
let getIssuedFriendChallengesMock = jest.spyOn(challengeFunc, "getIssuedFriendChallenges").mockImplementation((func) => {func([challengeObj])})
let getIssuedLeagueChallengesMock = jest.spyOn(challengeFunc, "getIssuedLeagueChallenges").mockImplementation((arg, func) => {func([challengeObj])})

let getSentChallengesMock = jest.spyOn(challengeFunc, "getSentChallenges").mockImplementation((func) => {func([challengeObj])})

let getReceivedChallengesMock = jest.spyOn(challengeFunc, "getReceivedChallenges").mockImplementation((func) => {func([challengeObj])})
let getGlobalChallengesMock = jest.spyOn(globalChallengeFunc, "getGlobalChallenges").mockImplementation((func) => {func([challengeObj])})


describe("Test /Challenge/ChallengeScroll.js", () => {

    beforeEach(()=>{
        getIssuedFriendChallengesMock.mockClear();
        getIssuedLeagueChallengesMock.mockClear();
        getSentChallengesMock.mockClear();
        getReceivedChallengesMock.mockClear();
        getGlobalChallengesMock.mockClear();
    })

    it("Test render", () => {
        render(<ChallengeScroll/>)
    })

    it("Test render issued scroll", () => {
        render(<ChallengeScroll type = "issued" ifLeague ={false}/>)
        expect(getIssuedFriendChallengesMock).toBeCalledTimes(1);
        expect(getIssuedLeagueChallengesMock).toBeCalledTimes(0);
        expect(getSentChallengesMock).toBeCalledTimes(0);
        expect(getGlobalChallengesMock).toBeCalledTimes(0);
        expect(getReceivedChallengesMock).toBeCalledTimes(0);
    })

    it("Test render issued leauge scroll", () => {
        render(<ChallengeScroll type = "issued" ifLeague ={true}/>)
        expect(getIssuedFriendChallengesMock).toBeCalledTimes(0);
        expect(getIssuedLeagueChallengesMock).toBeCalledTimes(1);
        expect(getSentChallengesMock).toBeCalledTimes(0);
        expect(getGlobalChallengesMock).toBeCalledTimes(0);
        expect(getReceivedChallengesMock).toBeCalledTimes(0);
    })

    it("Test render sent scroll", () => {
        render(<ChallengeScroll type = "sent"/>)
        expect(getIssuedFriendChallengesMock).toBeCalledTimes(0);
        expect(getIssuedLeagueChallengesMock).toBeCalledTimes(0);
        expect(getSentChallengesMock).toBeCalledTimes(1);
        expect(getGlobalChallengesMock).toBeCalledTimes(0);
        expect(getReceivedChallengesMock).toBeCalledTimes(0);
    })

    it("Test render received scroll", () => {
        render(<ChallengeScroll type = "received"/>)
        expect(getIssuedFriendChallengesMock).toBeCalledTimes(0);
        expect(getIssuedLeagueChallengesMock).toBeCalledTimes(0);
        expect(getSentChallengesMock).toBeCalledTimes(0);
        expect(getGlobalChallengesMock).toBeCalledTimes(0);
        expect(getReceivedChallengesMock).toBeCalledTimes(1);
    })

    it("Test render global scroll", () => {
        render(<ChallengeScroll type = "global"/>)
        expect(getIssuedFriendChallengesMock).toBeCalledTimes(0);
        expect(getIssuedLeagueChallengesMock).toBeCalledTimes(0);
        expect(getSentChallengesMock).toBeCalledTimes(0);
        expect(getGlobalChallengesMock).toBeCalledTimes(1);
        expect(getReceivedChallengesMock).toBeCalledTimes(0);
    })

    it("Test render with no items", () => {
        getGlobalChallengesMock = jest.spyOn(globalChallengeFunc, "getGlobalChallenges").mockImplementation((func) => {func([])})

        render(<ChallengeScroll type = "global"/>)
        expect(getIssuedFriendChallengesMock).toBeCalledTimes(0);
        expect(getIssuedLeagueChallengesMock).toBeCalledTimes(0);
        expect(getSentChallengesMock).toBeCalledTimes(0);
        expect(getGlobalChallengesMock).toBeCalledTimes(1);
        expect(getReceivedChallengesMock).toBeCalledTimes(0);
    })
});