import React from 'react';
import { render, screen, fireEvent} from "@testing-library/react";
import RowBox from '../../../src/components/Social/RowBox';
import '@testing-library/jest-dom'
import * as leagueFunc from "../../../src/routes/league";
import * as friendFunc from "../../../src/routes/friend_list";

let activityData = {
    level: 1,
    progress: 10,
    exercise:{
        exerciseName:"Baseball",
        unit:"m",
        amount:5
    },
    loggedDate:"4T0",
    username:"user#34"
}

let suggestedFriendData = [["username#4444", 3],["username#4434", 4]]
let suggestedLeagueData = [{"_id":4, "leagueName":"name"},{"_id":5, "leagueName":"name"}]

let successfunction = (then) => {then([])};
let successfunctionRequest = (data, then , err) => {console.log(then); then(data)};
let getRecentFriendsMock = jest.spyOn(friendFunc, "getRecentFriends").mockImplementation(successfunction);
let getSuggestedFriendsMock = jest.spyOn(friendFunc, "getSuggestedFriends").mockImplementation((then) => {then(suggestedFriendData)});
let getRecentLeaguesMock = jest.spyOn(leagueFunc, "getRecentLeagues").mockImplementation(successfunction);
let getSuggestedLeaguesMock = jest.spyOn(leagueFunc, "getSuggestedLeagues").mockImplementation((then) => {then(suggestedLeagueData)});
let sendFriendRequestMock = jest.spyOn(friendFunc, "sendFriendRequest").mockImplementation(successfunctionRequest);
let sendLeagueRequestMock = jest.spyOn(leagueFunc, "sendLeagueRequest").mockImplementation(successfunctionRequest);

describe("Test /Social/RowBoxObj", () => {
    beforeEach(()=>{
        getRecentFriendsMock.mockClear()
        getSuggestedFriendsMock.mockClear()
        getRecentLeaguesMock.mockClear()
        getSuggestedFriendsMock.mockClear()
    })
    it("Test render recent friend", () => {
        successfunction = (then) => {then([activityData, activityData])};
        getRecentFriendsMock.mockImplementation(successfunction);
        render(<RowBox>{{"informationType":"Recent", "socialType":"friend"}}</RowBox>)
        expect(getRecentFriendsMock).toBeCalledTimes(1)
        expect(getSuggestedFriendsMock).toBeCalledTimes(0)
        expect(getRecentLeaguesMock).toBeCalledTimes(0)
        expect(getSuggestedLeaguesMock).toBeCalledTimes(0)
    })

    it("Test render recent league", () => {
        successfunction = (then) => {then([activityData, activityData])};
        getRecentLeaguesMock.mockImplementation(successfunction);
        render(<RowBox>{{"informationType":"Recent", "socialType":"league"}}</RowBox>)
        expect(getRecentFriendsMock).toBeCalledTimes(0)
        expect(getSuggestedFriendsMock).toBeCalledTimes(0)
        expect(getRecentLeaguesMock).toBeCalledTimes(1)
        expect(getSuggestedLeaguesMock).toBeCalledTimes(0)
    })

    it("Test render suggested friend", () => {
        successfunction = (then) => {then(suggestedFriendData)};
        getSuggestedFriendsMock.mockImplementation(successfunction);
        render(<RowBox>{{"informationType":"Suggest", "socialType":"friend"}}</RowBox>)
        expect(getRecentFriendsMock).toBeCalledTimes(0)
        expect(getSuggestedFriendsMock).toBeCalledTimes(1)
        expect(getRecentLeaguesMock).toBeCalledTimes(0)
        expect(getSuggestedLeaguesMock).toBeCalledTimes(0)
    })

    it("Test render suggested league", () => {
        successfunction = (then) => {then(suggestedLeagueData)};
        getSuggestedLeaguesMock.mockImplementation(successfunction);
        render(<RowBox>{{"informationType":"Suggest", "socialType":"league"}}</RowBox>)
        expect(getRecentFriendsMock).toBeCalledTimes(0)
        expect(getSuggestedFriendsMock).toBeCalledTimes(0)
        expect(getRecentLeaguesMock).toBeCalledTimes(0)
        expect(getSuggestedLeaguesMock).toBeCalledTimes(1)
    })

    it("Test send league request", () =>{
        successfunction = (then) => {then(suggestedLeagueData)};
        getSuggestedLeaguesMock.mockImplementation(successfunction);
        render(<RowBox>{{"informationType":"Suggest", "socialType":"league"}}</RowBox>)
        let element = screen.getByTestId("SuggestedLeagueObjRequestJoinLeagueButton1");
        fireEvent.click(element);
    })

    it("Test send friend request", () =>{
        successfunction = (then) => {then(suggestedFriendData)};
        getSuggestedFriendsMock.mockImplementation(successfunction);
        render(<RowBox>{{"informationType":"Suggest", "socialType":"friend"}}</RowBox>)
        let element = screen.getByTestId("SuggestedFriendObjSendFriendRequestButton1");
        fireEvent.click(element);
    })
});