import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import UserAddForm from '../../../../src/components/Shared/Form/UserAddForm';
import '@testing-library/jest-dom'
import * as friendFunc from "../../../../src/routes/friend_list";
import * as leagueFunc from "../../../../src/routes/league";

let failfunction = (data, then , err) => {err("bad")};
let successfunction = (data, then , err) => {then("good")};
let sendFriendRequest = jest.spyOn(friendFunc, "sendFriendRequest");
let sendLeagueRequest = jest.spyOn(leagueFunc, "sendLeagueInvite");

const clickSubmit = () => {
    let element = screen.getByTestId("UserAddFormSendButton");
    fireEvent.click(element);
}

const keyDown = (key) => {
    let element = screen.getByTestId("UserAddFormDescriptionUsernameInput");
    fireEvent.keyDown(element, {key: key, code: key});
}


const fillBox = (text) => {
    let element = screen.getByTestId("UserAddFormDescriptionUsernameInput");
    fireEvent.change(element, {target:{value:text}});
}

const expectGoodText = (text) => {
    let element = screen.getByTestId("UserAddFormUserGoodResponse");
    expect(element).toHaveTextContent(text);
}

const expectBadText = (text) => {
    let element = screen.getByTestId("UserAddFormUserBadResponse");
    expect(element).toHaveTextContent(text);
}
describe("Test /Shared/Form/UserAddForm.js", () => {
    let updateUsernameMock = jest.fn();

    afterEach(()=>{
        updateUsernameMock.mockClear()
    })

    it("Test render league", () => {
        render(<UserAddForm leagueID= {"4"} type = "league"/>)
    })

    it("Test render user", () => {
        render(<UserAddForm leagueID= {"4"} type = "friend"/>)
    })

    it("Test send friend request successfully", () => {
        sendFriendRequest.mockImplementation(successfunction);
        render(<UserAddForm leagueID= {"4"} type = "friend"/>)
        fillBox("user#2225");
        clickSubmit()
        expect(sendFriendRequest).toBeCalledWith("user#2225", expect.any(Function), expect.any(Function))
        expectGoodText("good")
        expectBadText("")
    })

    it("Test send friend request incorrectly", () => {
        sendFriendRequest.mockImplementation(failfunction);
        render(<UserAddForm leagueID= {"4"} type = "friend"/>)
        fillBox("user#2225");
        clickSubmit()
        expect(sendFriendRequest).toBeCalledWith("user#2225",  expect.any(Function), expect.any(Function))
        expectGoodText("")
        expectBadText("Sorry, a friend request could not be sent to user#2225")
    })

    it("Test send league request successfully", () => {
        sendLeagueRequest.mockImplementation(successfunction);
        render(<UserAddForm leagueID= {"4"} type = "league"/>)
        fillBox("user#2225");
        clickSubmit()
        expect(sendLeagueRequest).toBeCalledWith({"leagueID": "4", "recipient": "user#2225"}, expect.any(Function), expect.any(Function))
        expectGoodText("good")
        expectBadText("")
    })

    it("Test send league request incorrectly", () => {
        sendLeagueRequest.mockImplementation(failfunction);
        render(<UserAddForm leagueID= {"4"} type = "league"/>)
        fillBox("user#2225");
        clickSubmit()
        expect(sendLeagueRequest).toBeCalledWith({"leagueID": "4", "recipient": "user#2225"},  expect.any(Function), expect.any(Function))
        expectGoodText("")
        expectBadText("Sorry, a league invite could not be sent to user#2225")
    })

    it("Test handle enter", () => {
        sendLeagueRequest.mockImplementation(failfunction);
        render(<UserAddForm leagueID= {"4"} type = "league"/>)
        fillBox("user#2225");
        keyDown("Enter")
        expect(sendLeagueRequest).toBeCalledWith({"leagueID": "4", "recipient": "user#2225"},  expect.any(Function), expect.any(Function))
        expectGoodText("")
        expectBadText("Sorry, a league invite could not be sent to user#2225")
    })

    it("Test handle enter", () => {
        sendLeagueRequest.mockImplementation(failfunction);
        render(<UserAddForm leagueID= {"4"} type = "friend"/>)
        fillBox("user#2225");
        keyDown("e")
        expect(sendLeagueRequest).not.toBeCalled;
        expectGoodText("")
        expectBadText("")
    })
});