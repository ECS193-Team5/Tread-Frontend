import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import Challenge from "../../src/pages/challenge";
import '@testing-library/jest-dom'

import * as challengeFunc from "../../src/routes/challenges";
import * as displayFunc from "../../src/helpers/CssEffects";
import * as exerciseFunc from "../../src/routes/exercise_log";
import * as globalChallengeFunc from "../../src/routes/global_challenges";
import * as userFunc from "../../src/routes/user";
import * as firebaseFunc from "../../src/helpers/firebaseHelpers";
import * as authFunc from "../../src/routes/auth";
import * as sharedHelpers from "../testHelpers/shared";
import * as h from "../testHelpers/challenge";

jest.mock('firebase/messaging', () => () => {});
jest.mock('../../src/firebase', () => () => {});

let globalleaderboardData = [[{"pictures":"i.png", "username":"user#2234", "progress":4}, {"pictures":"i.png", "username":"user#2224", "progress":4}], {username:"user#2224"}]
let leaderboardData = [{level:1, complete:80, username:"batman#6380", score:12}, {level:2, complete:80, username:"batman#6380", score:12}, {level:3, complete:80, username:"batman#6380", score:12}, {level:4, complete:80, username:"batman#6380", score:12}]
let challengeObj = {_id:"id", challengeId:"5", exercise:{exerciseName:"exampleName", convertedAmount:10, amount:10, unit:"m"}, progress:{progress:0, exercise:{exerciseName:"exampleName", convertedAmount:10, amount:10, unit:"m"}}}
let getIssuedFriendChallengesMock = jest.spyOn(challengeFunc, "getIssuedFriendChallenges").mockImplementation((func) => {func([challengeObj])})
let getIssuedLeagueChallengesMock = jest.spyOn(challengeFunc, "getIssuedLeagueChallenges").mockImplementation((arg, func) => {func([challengeObj])})
let getSentChallengesMock = jest.spyOn(challengeFunc, "getSentChallenges").mockImplementation((func) => {func([challengeObj])})
let getReceivedChallengesMock = jest.spyOn(challengeFunc, "getReceivedChallenges").mockImplementation((func) => {func([challengeObj])})
let getLeaderboardMock = jest.spyOn(challengeFunc, "getChallengeLeaderboard").mockImplementation((arg1, arg2)=>{arg2({data:leaderboardData})})

let acceptMock = jest.spyOn(challengeFunc, "acceptChallenge").mockImplementation((arg1, arg2)=>{arg2()})
let declineMock = jest.spyOn(challengeFunc, "declineChallenge").mockImplementation((arg1, arg2)=>{arg2()})
let deleteMock = jest.spyOn(challengeFunc, "deleteChallenge").mockImplementation((arg1, arg2)=>{arg2()})

let getGlobalChallengesMock = jest.spyOn(globalChallengeFunc, "getGlobalChallenges").mockImplementation((func) => {func([challengeObj])})
let getGlobalLeaderboardMock = jest.spyOn(globalChallengeFunc, "getGlobalChallengeLeaderboard").mockImplementation((arg1, arg2)=>{arg2({data:globalleaderboardData})})

let setLocationMock = jest.spyOn(displayFunc, "setLocation").mockImplementation();
let setDisplayProperty = jest.spyOn(displayFunc, "setDisplayProperty").mockImplementation();
let flipButtonMock = jest.spyOn(displayFunc, "flipButton").mockImplementation();
let getLocationMock = jest.spyOn(displayFunc, "getLocation").mockImplementation(() => { return "/currentChallengePage"})

let sendExerciseMock = jest.spyOn(exerciseFunc, "addExerciseLog").mockImplementation(() => {})

let mockDateNow = jest.spyOn(Date, "now").mockImplementation(() => {return 1685383200000});

let logoutMock = jest.spyOn(authFunc, "logout").mockImplementation(()=>{});
let getTokenMock = jest.spyOn(firebaseFunc, "setDeviceToken").mockImplementation((func)=>{func("token")});
let getDisplayNameMock = jest.spyOn(userFunc, "getDisplayName").mockImplementation((func)=>{func("displayName")});
let getUsernameMock = jest.spyOn(userFunc, "getUsername").mockImplementation((func)=>{func("username")});


const MAY_28 = new Date(1685260800000);
const MAY_29_MORNING =  new Date(1685347200000);
const MAY_29_ELEVEN_30_AM =  new Date(1685385000000);
const MAY_29_3_12_AFTERNOON=  new Date(1685398320000);
const MAY_29_AFTERNOON =  new Date(1685397600000);
const MAY_30 =  new Date(1685484000000);
const JUN_1 =  new Date(1685620800000);
const JUN_4_2024 = new Date(1717525800000);

describe("Test /pages/challenge.js", () => {
    beforeEach(() => {
        getIssuedFriendChallengesMock.mockClear()
        getIssuedLeagueChallengesMock.mockClear()
        getSentChallengesMock.mockClear()
        getReceivedChallengesMock.mockClear()
        getLeaderboardMock.mockClear()
        acceptMock.mockClear()
        declineMock.mockClear()
        deleteMock.mockClear()
        getGlobalChallengesMock.mockClear()
        getGlobalLeaderboardMock.mockClear()
        setLocationMock.mockClear()
        setDisplayProperty.mockClear()
        flipButtonMock.mockClear()
        getLocationMock.mockClear()
        sendExerciseMock.mockClear()
        mockDateNow.mockClear()
        logoutMock.mockClear()
        getTokenMock.mockClear()
        getDisplayNameMock.mockClear()
        getUsernameMock.mockClear()
    })

    it("Test render current", () => {
        render(<Challenge>{{"type":"current"}}</Challenge>)
    })

    it("Test render global", () => {
        render(<Challenge>{{"type":"global"}}</Challenge>)
    })

    describe("Test challenge interactions", () =>{
        it("Test accept challenge", () => {
            render(<Challenge>{{"type":"current"}}</Challenge>)
            h.setReceivedPage();
            h.clickAcceptChallenge();
        });

        it("Test decline challenge", () => {
            render(<Challenge>{{"type":"current"}}</Challenge>)
            h.setReceivedPage();
            h.clickDeclineChallenge();
        });

        it("Test accept challenge", () => {
            render(<Challenge>{{"type":"current"}}</Challenge>)
            h.setSentPage();
            h.clickDeleteChallenge();
        });
    })

    describe("Test challenge bar selections", () =>{
        it("Test go to send challenge", () => {
            render(<Challenge>{{"type":"current"}}</Challenge>)
            h.setSendChallengePage();
            expect(setLocationMock).toBeCalledWith("/addChallengePage")
        });

        it("Test go to issued challenge", () => {
            render(<Challenge>{{"type":"current"}}</Challenge>)
            h.setReceivedPage();
            h.setCurrentPage();
        });

        it("Test issued challenge page, but there are no items", () => {
            getIssuedFriendChallengesMock = jest.spyOn(challengeFunc, "getIssuedFriendChallenges").mockImplementation((func) => {func([])})
            render(<Challenge>{{"type":"current"}}</Challenge>)
            h.setCurrentPage();
            getIssuedFriendChallengesMock = jest.spyOn(challengeFunc, "getIssuedFriendChallenges").mockImplementation((func) => {func([challengeObj])})

        });
    })

    describe("Test move from top header", () => {
        it("Test click to current page", () => {
            render(<Challenge>{{"type":"current"}}</Challenge>)
            h.clickCurrentPage();
        })

        it("Test click to global page", () => {
            render(<Challenge>{{"type":"current"}}</Challenge>)
            h.clickGlobalPage();
        })
    })

    describe("Test adding Exercise", () => {
        it("Test add sucessful exercise", () => {
            render(<Challenge>{{"type":"current"}}</Challenge>)
            h.showExerciseBox();
            h.setAmount(10);
            h.setUnit("min");
            h.setExercise("Baseball");
            h.setLoggedDate(new Date(Date.now()- 24*60*60*1000).toISOString().substring(0,16));
            h.submitExercise();
            expect(sendExerciseMock).toBeCalledTimes(1);
        })

        it("Test key down on amount", () => {
            render(<Challenge>{{"type":"current"}}</Challenge>)
            h.showExerciseBox();
            h.setAmount(10);
            h.enterKeyLoggedDate("e");
            h.enterKeyLoggedDate("1")
            h.setUnit("min");
            h.setExercise("Baseball");
            h.setLoggedDate(new Date(Date.now()- 24*60*60*1000).toISOString().substring(0,16));
            h.submitExercise();
            expect(sendExerciseMock).toBeCalledTimes(1);
        })

        it("Test submit exercise with no data", () => {
            render(<Challenge>{{"type":"current"}}</Challenge>)
            h.showExerciseBox();
            h.submitExercise();
            expect(sendExerciseMock).toBeCalledTimes(0);
            h.checkSubmitErr("Please give an exercise name. Please give an amount over zero. Please give a date for the exercise. ")
        })
    })

    describe("Look at challenge objects", () => {
        it("Show challnege leaderboard", () => {
            render(<Challenge>{{"type":"current"}}</Challenge>)
            h.showChallengeLeaderboard();
        })

        it("Show challnege leaderboard", () => {
            render(<Challenge>{{"type":"global"}}</Challenge>)
            h.showGlobalChallengeLeaderboard();
        })

        it("Show challnege when user is not in leader leaderboard", () => {
            globalleaderboardData = [[{"pictures":"i.png", "username":"User#2224", "progress":4}, {"pictures":"i.png", "username":"User#2224", "progress":4}], {username:"user#2224", progress:10}]
            getGlobalLeaderboardMock.mockImplementation((arg1, arg2)=>{arg2({data:globalleaderboardData})})
            render(<Challenge>{{"type":"global"}}</Challenge>)
            h.showGlobalChallengeLeaderboard();
        })

    })

    describe("Test user settings button", () => {
        it("Test show user settings options", () => {
            render(<Challenge>{{"type":"current"}}</Challenge>)
            h.showDropDownUserSettings();
            expect(logoutMock).toBeCalledTimes(0);
        })

        it("Test logout", () => {
            render(<Challenge>{{"type":"current"}}</Challenge>)
            h.logout();
            expect(logoutMock).toBeCalledTimes(1);
        })
    })

    describe("Test move from side bar", () => {

        it("Test click the profile settings button", () => {
            render(<Challenge>{{"type":"current"}}</Challenge>)
            sharedHelpers.clickSideBarProfileSettings();
        })

        it("Test click the challenge button", () => {
            render(<Challenge>{{"type":"current"}}</Challenge>)
            sharedHelpers.clickSideBarChallenges();
        })

        it("Test click the social button", () => {
            render(<Challenge>{{"type":"current"}}</Challenge>)
            sharedHelpers.clickSideBarSocial();
        })

        it("Test click the profile button", () => {
            render(<Challenge>{{"type":"current"}}</Challenge>)
            sharedHelpers.clickSideBarExerciseHistory();
        })
        })

});