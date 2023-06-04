import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import FriendObj from '../../../src/components/Social/FriendObj';
import * as cssFunc from "../../../src/helpers/CssEffects";
import * as friendFunc from "../../../src/routes/friend_list";

let setDisplayPropertyMock =  jest.spyOn(cssFunc, "setDisplayProperty").mockImplementation(()=>{})
let revokeFriendRequestMock =  jest.spyOn(friendFunc, "revokeFriendRequest").mockImplementation((username, then)=>{then()})
let unBlockUserMock =  jest.spyOn(friendFunc, "unBlockUser").mockImplementation((username, then)=>{then()})
let blockUserMock =  jest.spyOn(friendFunc, "blockUser").mockImplementation((username, then)=>{then()})
let removeFriendMock =  jest.spyOn(friendFunc, "removeFriend").mockImplementation((username, then)=>{then()})
let acceptFriendRequestMock =  jest.spyOn(friendFunc, "acceptFriendRequest").mockImplementation((username, then)=>{then()})
let declineFriendRequestMock =  jest.spyOn(friendFunc, "declineFriendRequest").mockImplementation((username, then)=>{then()})

const toggleButton = () =>{
    let button = screen.getByTestId("FriendObjMoreInfoButton");
    fireEvent.click(button)
}

const hitDropdown = (num) =>{
    let button = screen.getByTestId("DropDownEntryComponentbetty#4000FriendObj-"+num)
    fireEvent.click(button)
}
describe("Test /Social/FriendObj.js", () => {
    beforeEach(()=>{
        revokeFriendRequestMock.mockClear()
        unBlockUserMock.mockClear()
        blockUserMock.mockClear()
        removeFriendMock.mockClear()
        acceptFriendRequestMock.mockClear()
        declineFriendRequestMock.mockClear()
    })

    it("Test render", () => {
        render(<FriendObj index = {""}>{{username:"betty#4000"}}</FriendObj>)
    })

    describe("Test user interactions", () =>{

        beforeEach(()=>{
            revokeFriendRequestMock.mockClear()
            unBlockUserMock.mockClear()
            blockUserMock.mockClear()
            removeFriendMock.mockClear()
            acceptFriendRequestMock.mockClear()
            declineFriendRequestMock.mockClear()
        })

        it("Test unfriend", () => {
            render(<FriendObj index = {""} type="friend">{{username:"betty#4000"}}</FriendObj>)
            toggleButton();
            hitDropdown(0);
            expect(revokeFriendRequestMock).toBeCalledTimes(0)
            expect(unBlockUserMock).toBeCalledTimes(0)
            expect(blockUserMock).toBeCalledTimes(0)
            expect(removeFriendMock).toBeCalledTimes(1)
            expect(acceptFriendRequestMock).toBeCalledTimes(0)
            expect(declineFriendRequestMock).toBeCalledTimes(0)
            expect(removeFriendMock).toBeCalledWith("betty#4000", expect.any(Function))
        })

        it("Test block", () => {
            render(<FriendObj index = {""} type="friend">{{username:"betty#4000"}}</FriendObj>)
            toggleButton();
            hitDropdown(1);
            expect(revokeFriendRequestMock).toBeCalledTimes(0)
            expect(unBlockUserMock).toBeCalledTimes(0)
            expect(blockUserMock).toBeCalledTimes(1)
            expect(removeFriendMock).toBeCalledTimes(0)
            expect(acceptFriendRequestMock).toBeCalledTimes(0)
            expect(declineFriendRequestMock).toBeCalledTimes(0)
            expect(blockUserMock).toBeCalledWith("betty#4000", expect.any(Function))
        })

        it("Test sendChallenge", () => {
            render(<FriendObj index = {""} type="friend">{{username:"betty#4000"}}</FriendObj>)
            toggleButton();
            hitDropdown(2);
            expect(revokeFriendRequestMock).toBeCalledTimes(0)
            expect(unBlockUserMock).toBeCalledTimes(0)
            expect(blockUserMock).toBeCalledTimes(0)
            expect(removeFriendMock).toBeCalledTimes(0)
            expect(acceptFriendRequestMock).toBeCalledTimes(0)
            expect(declineFriendRequestMock).toBeCalledTimes(0)
        })

        it("Test revoke request", () => {
            render(<FriendObj index = {""} type="sent">{{username:"betty#4000"}}</FriendObj>)
            toggleButton();
            hitDropdown(0);
            expect(revokeFriendRequestMock).toBeCalledTimes(1)
            expect(unBlockUserMock).toBeCalledTimes(0)
            expect(blockUserMock).toBeCalledTimes(0)
            expect(removeFriendMock).toBeCalledTimes(0)
            expect(acceptFriendRequestMock).toBeCalledTimes(0)
            expect(declineFriendRequestMock).toBeCalledTimes(0)
            expect(revokeFriendRequestMock).toBeCalledWith("betty#4000", expect.any(Function))
        })

        it("Test accept request", () => {
            render(<FriendObj index = {""} type="received">{{username:"betty#4000"}}</FriendObj>)
            toggleButton();
            hitDropdown(0);
            expect(revokeFriendRequestMock).toBeCalledTimes(0)
            expect(unBlockUserMock).toBeCalledTimes(0)
            expect(blockUserMock).toBeCalledTimes(0)
            expect(removeFriendMock).toBeCalledTimes(0)
            expect(acceptFriendRequestMock).toBeCalledTimes(1)
            expect(declineFriendRequestMock).toBeCalledTimes(0)
            expect(acceptFriendRequestMock).toBeCalledWith("betty#4000", expect.any(Function))
        })

        it("Test decline request", () => {
            render(<FriendObj index = {""} type="received">{{username:"betty#4000"}}</FriendObj>)
            toggleButton();
            hitDropdown(1);
            expect(revokeFriendRequestMock).toBeCalledTimes(0)
            expect(unBlockUserMock).toBeCalledTimes(0)
            expect(blockUserMock).toBeCalledTimes(0)
            expect(removeFriendMock).toBeCalledTimes(0)
            expect(acceptFriendRequestMock).toBeCalledTimes(0)
            expect(declineFriendRequestMock).toBeCalledTimes(1)
            expect(declineFriendRequestMock).toBeCalledWith("betty#4000", expect.any(Function))
        })

        it("Test unblock request", () => {
            render(<FriendObj index = {""} type="blocked">{{username:"betty#4000"}}</FriendObj>)
            toggleButton();
            hitDropdown(0);
            expect(revokeFriendRequestMock).toBeCalledTimes(0)
            expect(unBlockUserMock).toBeCalledTimes(1)
            expect(blockUserMock).toBeCalledTimes(0)
            expect(removeFriendMock).toBeCalledTimes(0)
            expect(acceptFriendRequestMock).toBeCalledTimes(0)
            expect(declineFriendRequestMock).toBeCalledTimes(0)
            expect(unBlockUserMock).toBeCalledWith("betty#4000", expect.any(Function))
        })
    })
});
