import React from 'react';
import { fireEvent, render, screen } from "@testing-library/react";
import ProfileHeader from '../../../src/components/Profile/ProfileHeader';
import '@testing-library/jest-dom'
import * as userFunc from "../../../src/routes/user";
import * as cssFunc from "../../../src/helpers/CssEffects";

let getUsername = jest.spyOn(userFunc, "getUsername").mockImplementation((func)=>{func("name")});
let getDisplayName = jest.spyOn(userFunc, "getDisplayName").mockImplementation((func)=>{func("user#4444")});
let cssFuncMock = jest.spyOn(cssFunc, "setLocation");
describe("Test /Profile/ProfileHeader.js", () => {
    it("Test render", () => {
        render(<ProfileHeader />)
    })

    it("Test click edit page", () => {
        render(<ProfileHeader />)

        fireEvent.click(screen.getByTestId("ProfileHeaderMoveSettingPageButton"));
        expect(cssFuncMock).toBeCalledWith("./profileSettingsPage");
    })
});