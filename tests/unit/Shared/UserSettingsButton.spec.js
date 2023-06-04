import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import UserSettingsButton from '../../../src/components/Shared/UserSettingsButton';
import '@testing-library/jest-dom';
import * as userFunc from "../../../src/routes/user";
import * as firebaseFunc from "../../../src/helpers/firebaseHelpers";
import * as authFunc from "../../../src/routes/auth";


let logoutMock = jest.spyOn(authFunc, "logout").mockImplementation(()=>{});
let getTokenMock = jest.spyOn(firebaseFunc, "setDeviceToken").mockImplementation((func)=>{func("token")});
let getDisplayNameMock = jest.spyOn(userFunc, "getDisplayName").mockImplementation((func)=>{func("displayName")});
let getUsernameMock = jest.spyOn(userFunc, "getUsername").mockImplementation((func)=>{func("username")});
jest.mock('firebase/messaging', () => () => {});
jest.mock('../../../src/firebase', () => () => {});


describe("Test /Shared/Form/UserSettingsButton.js", () => {
    it("Test UserSettingsButton render", () => {
        render(<UserSettingsButton></UserSettingsButton>)
    })

    it("Test toggle logout section", () => {
        render(<UserSettingsButton></UserSettingsButton>)
        let element = screen.getByTestId("UserSettingsButtonUserDropDown")
        fireEvent.click(element)
    })

    it("Test press logout", () => {
        render(<UserSettingsButton></UserSettingsButton>)
        let element = screen.getByTestId("UserSettingsButtonUserDropDown")
        fireEvent.click(element)
        element = screen.getByTestId("DropDownEntryComponentuserSettingsDropDown-0")
        fireEvent.click(element)
    })
});