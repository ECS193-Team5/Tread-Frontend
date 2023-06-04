import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import MailBox from '../../../src/components/Profile/MailBox';
import '@testing-library/jest-dom'
import * as notificationFunc from "../../../src/routes/notifications";

let notifications = [{"_id":1, message:"This is the first message"}, {"_id":2, message:"This is the second message"}]
let requestMock = jest.spyOn(notificationFunc, "requestNotifications").mockImplementation((func) => {func(notifications)})
let deleteMock = jest.spyOn(notificationFunc, "deleteNotification").mockImplementation((id, func) => {func()})
let deleteAllMock = jest.spyOn(notificationFunc, "deleteAllNotifications").mockImplementation((func) => {func()})

describe("Test /Profile/MailBox.js", () => {

    beforeEach(()=>{
        deleteAllMock.mockClear();
        deleteMock.mockClear();
        requestMock.mockClear();
    })

    it("Test render MailBox", () => {
        render(<MailBox></MailBox>)
        expect(requestMock).toBeCalledTimes(1);
        expect(deleteAllMock).toBeCalledTimes(0);
        expect(deleteMock).toBeCalledTimes(0);
    })

    it("Test render MailBox delete one notification", () => {
        render(<MailBox></MailBox>)
        expect(screen.getByTestId("MailBoxEntryMessage0")).toHaveTextContent("This is the first message")
        let button = screen.getByTestId("MailBoxEntryDeclineButton0");
        fireEvent.click(button);

        expect(requestMock).toBeCalledTimes(1);
        expect(deleteAllMock).toBeCalledTimes(0);
        expect(deleteMock).toBeCalledTimes(1);
    })

    it("Test render MailBox delete all notification", () => {
        render(<MailBox></MailBox>)
        expect(screen.getByTestId("MailBoxEntryMessage0")).toHaveTextContent("This is the first message")
        let button = screen.getByTestId("MailBoxDeleteAllButton");
        fireEvent.click(button);

        expect(requestMock).toBeCalledTimes(1);
        expect(deleteAllMock).toBeCalledTimes(1);
        expect(deleteMock).toBeCalledTimes(0);
    })

});