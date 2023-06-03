import React from 'react';
import { fireEvent, render, screen } from "@testing-library/react";
import MailBoxEntry from '../../../src/components/Profile/MailBoxEntry';
import '@testing-library/jest-dom'
import * as notificationFunc from "../../../src/routes/notifications";
import * as cssFunc from "../../../src/helpers/CssEffects";

let deleteNotification = jest.spyOn(notificationFunc, "deleteNotification").mockImplementation((arg, func)=>{func()});
let cssFuncMock = jest.spyOn(cssFunc, "setDisplayProperty").mockImplementation(()=>{});
let decrementCountMock = jest.fn();

describe("Test /Profile/MailBoxEntry", () => {
    it("Test render", () => {
        render(<MailBoxEntry decrementCount = {decrementCountMock} index = "0" >{{"_id":1, message:"This is the message"}}</MailBoxEntry>)
        expect(screen.getByTestId("MailBoxEntryMessage0")).toHaveTextContent("This is the message")
    })

    it("Test delete", () => {
        render(<MailBoxEntry decrementCount = {decrementCountMock} index = "0" >{{"_id":1, message:"This is the message"}}</MailBoxEntry>)
        expect(screen.getByTestId("MailBoxEntryMessage0")).toHaveTextContent("This is the message")
        let button = screen.getByTestId("MailBoxEntryDeclineButton0");
        fireEvent.click(button);
        expect(decrementCountMock).toBeCalledTimes(1);
        expect(cssFuncMock).toBeCalledWith("MailBoxEntry1", "none");
    })
});