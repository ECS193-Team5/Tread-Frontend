import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import FriendScroll from '../../../src/components/Social/FriendScroll';
import '@testing-library/jest-dom'
import * as friendFunc from "../../../src/routes/friend_list";

let socialObj = {}
let getFriendsMock = jest.spyOn(friendFunc, "getFriends").mockImplementation((func) => {func([socialObj])})
let getSentMock = jest.spyOn(friendFunc, "getSent").mockImplementation((func) => {func([socialObj])})
let getReceivedMock = jest.spyOn(friendFunc, "getReceived").mockImplementation((func) => {func([socialObj])})
let getBlockedListMock = jest.spyOn(friendFunc, "getBlockedList").mockImplementation((func) => {func([socialObj])})
jest.mock('../../../src/components/Social/FriendObj', () => ()=> {return (<div></div>)});

describe("Test /Social/FriendScroll.js", () => {

    beforeEach(()=>{
        getFriendsMock.mockClear();
        getSentMock.mockClear();
        getReceivedMock.mockClear();
        getBlockedListMock.mockClear();
    })

    it("Test render", () => {
        render(<FriendScroll/>)
    })

    it("Test render friend scroll", () => {
        render(<FriendScroll type = "friend"/>)
        expect(getFriendsMock).toBeCalledTimes(1);
        expect(getSentMock).toBeCalledTimes(0);
        expect(getReceivedMock).toBeCalledTimes(0);
        expect(getBlockedListMock).toBeCalledTimes(0);
    })

    it("Test render sent scroll", () => {
        render(<FriendScroll type = "sent"/>)
        expect(getFriendsMock).toBeCalledTimes(0);
        expect(getSentMock).toBeCalledTimes(1);
        expect(getReceivedMock).toBeCalledTimes(0);
        expect(getBlockedListMock).toBeCalledTimes(0);
    })

    it("Test render received scroll", () => {
        render(<FriendScroll type = "received"/>)
        expect(getFriendsMock).toBeCalledTimes(0);
        expect(getSentMock).toBeCalledTimes(0);
        expect(getReceivedMock).toBeCalledTimes(1);
        expect(getBlockedListMock).toBeCalledTimes(0);
    })

    it("Test render blocked scroll", () => {
        render(<FriendScroll type = "blocked"/>)
        expect(getFriendsMock).toBeCalledTimes(0);
        expect(getSentMock).toBeCalledTimes(0);
        expect(getReceivedMock).toBeCalledTimes(0);
        expect(getBlockedListMock).toBeCalledTimes(1);
    })

    it("Test render with no items", () => {
        getBlockedListMock = jest.spyOn(friendFunc, "getBlockedList").mockImplementation((func) => {func([])})

        render(<FriendScroll type = "global"/>)
        expect(getFriendsMock).toBeCalledTimes(0);
        expect(getSentMock).toBeCalledTimes(0);
        expect(getReceivedMock).toBeCalledTimes(0);
        expect(getBlockedListMock).toBeCalledTimes(1);
    })
});