import React from 'react';
import { render } from "@testing-library/react";
import '@testing-library/jest-dom'
import RedirectPage from '../../src/pages/redirectPage';
import * as friendFunc from "../../src/routes/friend_list";
import * as leagueFunc from "../../src/routes/league";
import * as cssFunc from "../../src/helpers/CssEffects";

let failfunction = (data, then , err) => {err()};
let successfunction = (data, then , err) => {then()};
let sendFriendRequest = jest.spyOn(friendFunc, "sendFriendRequest").mockImplementation(successfunction);
let sendLeagueRequest = jest.spyOn(leagueFunc, "sendLeagueRequest").mockImplementation(successfunction);
let setLocationMock = jest.spyOn(cssFunc, "setLocation");
describe("Test /pages/redirectPage.js", () => {
    it("Test render league", () => {
        render(<RedirectPage type = "League"/>)
        expect(sendLeagueRequest).toBeCalledWith(undefined, expect.any(Function), expect.any(Function));
        expect(setLocationMock).toBeCalledWith("/socialLeaguePage");
    })

    it("Test render friend", () => {
        render(<RedirectPage type = "Friend"/>)
        expect(sendFriendRequest).toBeCalledWith(undefined, expect.any(Function), expect.any(Function));
        expect(setLocationMock).toBeCalledWith("/socialFriendPage");
    })

    it("Test render league", () => {
        sendLeagueRequest.mockImplementation(failfunction)
        render(<RedirectPage type = "League"/>)
        expect(sendLeagueRequest).toBeCalledWith(undefined, expect.any(Function), expect.any(Function));
        expect(setLocationMock).toBeCalledWith("/currentChallengePage");
    })

    it("Test render griend", () => {
        sendFriendRequest.mockImplementation(failfunction);
        render(<RedirectPage type = "Friend"/>)
        expect(sendFriendRequest).toBeCalledWith(undefined, expect.any(Function), expect.any(Function));
        expect(setLocationMock).toBeCalledWith("/currentChallengePage");
    })
});