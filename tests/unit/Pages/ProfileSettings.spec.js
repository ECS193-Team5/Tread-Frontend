import React from 'react';
import { render } from "@testing-library/react";
import ProfileSettings from '../../../src/pages/profileSettings';
import '@testing-library/jest-dom'
import * as userFunc from "../../../src/routes/user";

let getUsername = jest.spyOn(userFunc, "getUsername").mockImplementation((func)=>{func("name")});
let getDisplayName = jest.spyOn(userFunc, "getDisplayName").mockImplementation((func)=>{func("user#4444")});
jest.mock('../../../src/components/Shared/Header', () => () => {
    return (<div></div>)
});

jest.mock('../../../src/components/Shared/SideBar', () => () => {
    return (<div></div>)
});
jest.mock('../../../src/components/ProfileSettings/ProfileSettingsForm', () => () => {
    return (<div></div>)
});
jest.mock('../../../src/components/ProfileSettings/DeleteSection', () => () => {
    return (<div></div>)
});

describe("Test /pages/profileSettings.js", () => {
    it("Test render", () => {
        render(<ProfileSettings />)
    })
});