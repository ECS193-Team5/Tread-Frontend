import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import SuggestedFriendObj from '../../../src/components/Social/SuggestedFriendObj';
import '@testing-library/jest-dom'
import * as friendFunc from "../../../src/routes/friend_list";

let successfunction = (data, then , err) => {then()};
let sendFriendRequestMock = jest.spyOn(friendFunc, "sendFriendRequest").mockImplementation(successfunction);
let updateParentMock = jest.fn();

describe("Test /Social/SuggestedFriendObj.js", () => {

    beforeEach(()=>{
        sendFriendRequestMock.mockClear();
        updateParentMock.mockClear();
    })

    it("Test render", () => {
        render(<SuggestedFriendObj updateObjList = {updateParentMock} index = "4">{["username#4444", 3]}</SuggestedFriendObj>)
        let element = screen.getByTestId("SuggestedFriendObjMutualFriendText4");
        expect(element).toHaveTextContent("username#4444: 3 Mutual Friend(s)")
        expect(updateParentMock).toBeCalledTimes(0);
    })

    it("Test succesful send", () => {
        render(<SuggestedFriendObj updateObjList = {updateParentMock} index = "4">{["username#4444", 3]}</SuggestedFriendObj>)
        let element = screen.getByTestId("SuggestedFriendObjSendFriendRequestButton4");
        fireEvent.click(element);
        expect(updateParentMock).toBeCalledTimes(1);
    })

});