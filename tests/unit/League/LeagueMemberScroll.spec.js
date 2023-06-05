import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import LeagueMemberScroll from '../../../src/components/League/LeagueMemberScroll';
import '@testing-library/jest-dom'
import * as leagueFunc from "../../../src/routes/league";
import * as friendFunc from "../../../src/routes/friend_list";
jest.mock('../../../src/components/League/MemberEntry', () => () => {
    return (<div></div>)
});

let blockedList = ["user!", "user2", "user2"];
let friendList = ["user3", "user4"]
let leagueInfo = {data:{"leagueName":"name", "_id":"4", "id":4}}
let leagueObj = {data:[{_id:"id", challengeId:"5", exercise:{exerciseName:"exampleName", convertedAmount:10, amount:10, unit:"m"}, progress:{progress:0, exercise:{exerciseName:"exampleName", convertedAmount:10, amount:10, unit:"m"}}}]}
let getBlockedMock = jest.spyOn(friendFunc, "getBlockedList").mockImplementation((func) => {func(blockedList)})
let getFriendMock = jest.spyOn(friendFunc, "getFriendList").mockImplementation((func) => {func(friendList)})
let getLeagueInfoMock = jest.spyOn(leagueFunc, "getLeagueInfo").mockImplementation((leagueID, func) => {func(leagueInfo)})
let getMembersLeagueMock = jest.spyOn(leagueFunc, "getMembersLeague").mockImplementation((leaugeID, func) => {func(leagueObj)})
let getInvitedMock = jest.spyOn(leagueFunc, "getInvited").mockImplementation((leaugeID,func) => {func(leagueObj)})
let getBannedMock = jest.spyOn(leagueFunc, "getBanned").mockImplementation((leagueID, func) => {func(leagueObj)})
let getRequestingMock = jest.spyOn(leagueFunc, "getRequesting").mockImplementation((leagueID, func) => {func(leagueObj)})


describe("Test /League/LeagueMemberScroll.js", () => {

    beforeEach(()=>{
        getLeagueInfoMock.mockClear()
        getMembersLeagueMock.mockClear()
        getInvitedMock.mockClear()
        getBannedMock.mockClear()
        getRequestingMock.mockClear()
        getBlockedMock.mockClear()
        getFriendMock.mockClear()
    })

    it("Test render", () => {
        render(<LeagueMemberScroll leaugeID = {4} type = "Members">{{username:"me#2224", role:"admin"}}</LeagueMemberScroll>)
    })


    it("Test render Members", () => {
        render(<LeagueMemberScroll leaugeID = {4} type = "Members">{{username:"me#2224", role:"admin"}}</LeagueMemberScroll>)
        expect(getLeagueInfoMock).toBeCalledTimes(1);
        expect(getMembersLeagueMock).toBeCalledTimes(1);
        expect(getInvitedMock).toBeCalledTimes(0);
        expect(getBannedMock).toBeCalledTimes(0);
        expect(getRequestingMock).toBeCalledTimes(0);
        expect(getBlockedMock).toBeCalledTimes(1);
        expect(getFriendMock).toBeCalledTimes(1);
    })

    it("Test render Received", () => {
        render(<LeagueMemberScroll leaugeID = {4} type = "Received">{{username:"me#2224", role:"admin"}}</LeagueMemberScroll>)
        expect(getLeagueInfoMock).toBeCalledTimes(1);
        expect(getMembersLeagueMock).toBeCalledTimes(0);
        expect(getInvitedMock).toBeCalledTimes(0);
        expect(getBannedMock).toBeCalledTimes(0);
        expect(getRequestingMock).toBeCalledTimes(1);
        expect(getBlockedMock).toBeCalledTimes(1);
        expect(getFriendMock).toBeCalledTimes(1);
    })

    it("Test render Banned", () => {
        render(<LeagueMemberScroll leaugeID = {4} type = "Banned">{{username:"me#2224", role:"admin"}}</LeagueMemberScroll>)
        expect(getLeagueInfoMock).toBeCalledTimes(1);
        expect(getMembersLeagueMock).toBeCalledTimes(0);
        expect(getInvitedMock).toBeCalledTimes(0);
        expect(getBannedMock).toBeCalledTimes(1);
        expect(getRequestingMock).toBeCalledTimes(0);
        expect(getBlockedMock).toBeCalledTimes(1);
        expect(getFriendMock).toBeCalledTimes(1);
    })

    it("Test render Invited", () => {
        render(<LeagueMemberScroll leaugeID = {4} type = "Invited">{{username:"me#2224", role:"admin"}}</LeagueMemberScroll>)
        expect(getLeagueInfoMock).toBeCalledTimes(1);
        expect(getMembersLeagueMock).toBeCalledTimes(0);
        expect(getInvitedMock).toBeCalledTimes(1);
        expect(getBannedMock).toBeCalledTimes(0);
        expect(getRequestingMock).toBeCalledTimes(0);
        expect(getBlockedMock).toBeCalledTimes(1);
        expect(getFriendMock).toBeCalledTimes(1);
    })

    it("Test render Invited with multiple users", () => {
        let leagueObj = {data:[{_id:"id", challengeId:"5", exercise:{exerciseName:"exampleName", convertedAmount:10, amount:10, unit:"m"}, progress:{progress:0, exercise:{exerciseName:"exampleName", convertedAmount:10, amount:10, unit:"m"}}},{_id:"id", challengeId:"5", exercise:{exerciseName:"exampleName", convertedAmount:10, amount:10, unit:"m"}, progress:{progress:0, exercise:{exerciseName:"exampleName", convertedAmount:10, amount:10, unit:"m"}}}]}
        getInvitedMock = jest.spyOn(leagueFunc, "getInvited").mockImplementation((leaugeID,func) => {func(leagueObj)})
        render(<LeagueMemberScroll leaugeID = {4} type = "Invited">{{username:"me#2224", role:"admin"}}</LeagueMemberScroll>)
        expect(getLeagueInfoMock).toBeCalledTimes(1);
        expect(getMembersLeagueMock).toBeCalledTimes(0);
        expect(getInvitedMock).toBeCalledTimes(1);
        expect(getBannedMock).toBeCalledTimes(0);
        expect(getRequestingMock).toBeCalledTimes(0);
        expect(getBlockedMock).toBeCalledTimes(1);
        expect(getFriendMock).toBeCalledTimes(1);
    })


    it("Test render Invited with no users", () => {
        let leagueObj = {data:[]}
        getInvitedMock = jest.spyOn(leagueFunc, "getInvited").mockImplementation((leaugeID,func) => {func(leagueObj)})
        render(<LeagueMemberScroll leaugeID = {4} type = "Invited">{{username:"me#2224", role:"admin"}}</LeagueMemberScroll>)
        expect(getLeagueInfoMock).toBeCalledTimes(1);
        expect(getMembersLeagueMock).toBeCalledTimes(0);
        expect(getInvitedMock).toBeCalledTimes(1);
        expect(getBannedMock).toBeCalledTimes(0);
        expect(getRequestingMock).toBeCalledTimes(0);
        expect(getBlockedMock).toBeCalledTimes(1);
        expect(getFriendMock).toBeCalledTimes(1);
    })


it("Test render Invited with multiple users", () => {
    blockedList = [];
    friendList = []
    leagueInfo = {data:{"leagueName":"", "_id":"4", "id":4}}
    leagueObj = {data:[{_id:"id", challengeId:"5", exercise:{exerciseName:"exampleName", convertedAmount:10, amount:10, unit:"m"}, progress:{progress:0, exercise:{exerciseName:"exampleName", convertedAmount:10, amount:10, unit:"m"}}},{_id:"id", challengeId:"5", exercise:{exerciseName:"exampleName", convertedAmount:10, amount:10, unit:"m"}, progress:{progress:0, exercise:{exerciseName:"exampleName", convertedAmount:10, amount:10, unit:"m"}}}]}
    getInvitedMock = jest.spyOn(leagueFunc, "getInvited").mockImplementation((leaugeID,func) => {func(leagueObj)})
    getBlockedMock = jest.spyOn(friendFunc, "getBlockedList").mockImplementation((func) => {func(blockedList)})
    getFriendMock = jest.spyOn(friendFunc, "getFriendList").mockImplementation((func) => {func(friendList)})
    getLeagueInfoMock = jest.spyOn(leagueFunc, "getLeagueInfo").mockImplementation((leagueID, func) => {func(leagueInfo)})

    render(<LeagueMemberScroll leaugeID = {4} type = "Invited">{{username:"me#2224", role:"admin"}}</LeagueMemberScroll>)
    expect(getLeagueInfoMock).toBeCalledTimes(1);
    expect(getMembersLeagueMock).toBeCalledTimes(0);
    expect(getInvitedMock).toBeCalledTimes(1);
    expect(getBannedMock).toBeCalledTimes(0);
    expect(getRequestingMock).toBeCalledTimes(0);
    expect(getBlockedMock).toBeCalledTimes(1);
    expect(getFriendMock).toBeCalledTimes(1);
})
});