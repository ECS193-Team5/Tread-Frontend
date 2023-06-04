import React from 'react';
import { fireEvent, render , screen} from "@testing-library/react";
import ProfileSettings from '../../src/pages/profileSettings';
import {clickButtonPhoto, clickButtonDisplayName, clickDelete, fillDisplayName, fillPhoto} from "../testHelpers/profileSettings";
import '@testing-library/jest-dom'
import * as deleteUser from "../../src/routes/delete_user";
import * as userFunc from "../../src/routes/user";
import * as firebaseFunc from "../../src/helpers/firebaseHelpers";
import * as authFunc from "../../src/routes/auth";
import * as displayFunc from "../../src/helpers/CssEffects";
import * as sharedHelpers from "../testHelpers/shared";
jest.mock('firebase/messaging', () => () => {});
jest.mock('../../src/firebase', () => () => {});
jest.spyOn(global, 'FileReader').mockImplementation(function () {
    this.readAsDataURL = jest.fn(()=>{this.result = "foo"});
});
let logoutMock = jest.spyOn(authFunc, "logout").mockImplementation(()=>{});
let getTokenMock = jest.spyOn(firebaseFunc, "setDeviceToken").mockImplementation((func)=>{func("token")});
let getDisplayNameMock = jest.spyOn(userFunc, "getDisplayName").mockImplementation((func)=>{func("displayName")});
let getUsernameMock = jest.spyOn(userFunc, "getUsername").mockImplementation((func)=>{func("username")});

let getLocationMock = jest.spyOn(displayFunc, "getLocation").mockImplementation(() => { return "/profileSettingsPage"})
let updateUserPictureMock = jest.spyOn(userFunc, "updateUserPicture").mockImplementation(()=>{});
let updateUserDisplayNameMock = jest.spyOn(userFunc, "updateDisplayName").mockImplementation(()=>{});
let deleteMock = jest.spyOn(deleteUser, "deleteUser").mockImplementation(()=>{});

describe("Test /pages/profileSettings", () => {
    beforeEach(()=>{
        deleteMock.mockClear()
        updateUserDisplayNameMock.mockClear()
        updateUserPictureMock.mockClear()
    })

    it("Test render", () => {
        render(<ProfileSettings/>)
    })

    describe("Test delete user", () =>{
    it("Test click delete and succeed", () => {
        window.prompt = jest.fn().mockImplementation(()=>{return "delete account"})
        render(<ProfileSettings/>)
        clickDelete()
        expect(deleteMock).toBeCalled;
    })

    it("Test click delete and fail by an empty response", () => {
        window.prompt = jest.fn().mockImplementation(()=>{return ""})
        render(<ProfileSettings/>)
        clickDelete()
        expect(deleteMock).not.toBeCalled;
    })

    it("Test click delete and fail by an wrong reponse", () => {
        window.prompt = jest.fn().mockImplementation(()=>{return "deleteaccount"})
        render(<ProfileSettings/>)
        clickDelete()
        expect(deleteMock).not.toBeCalled;
    })
})

    describe("Test move from side bar", () => {

        it("Test click the profile settings button", () => {
            render(<ProfileSettings/>)
            sharedHelpers.clickSideBarProfileSettings();
        })

        it("Test click the challenge button", () => {
            render(<ProfileSettings/>)
            sharedHelpers.clickSideBarChallenges();
        })

        it("Test click the social button", () => {
            render(<ProfileSettings/>)
            sharedHelpers.clickSideBarSocial();
        })

        it("Test click the profile button", () => {
            render(<ProfileSettings/>)
            sharedHelpers.clickSideBarExerciseHistory();
        })
    })

    describe("Test change profile settings", () => {
        beforeEach(()=>{
            deleteMock.mockClear()
            updateUserDisplayNameMock.mockClear()
            updateUserPictureMock.mockClear()
        })

        it("Test update photo with none", () => {
            render(<ProfileSettings/>)
            fillPhoto();
            clickButtonPhoto();
            expect(updateUserPictureMock).not.toHaveBeenCalled;
            expect(updateUserDisplayNameMock).not.toHaveBeenCalled;
        })

        it("Test update display name with value", () => {
            render(<ProfileSettings/>)
            fillDisplayName("example")
            clickButtonDisplayName();
            expect(updateUserPictureMock).toBeCalledTimes(0);
            expect(updateUserDisplayNameMock).toBeCalledTimes(1);
            expect(updateUserDisplayNameMock).toBeCalledWith("example", expect.any(Function));
        })

        it("Test update display name with no value", () => {
            render(<ProfileSettings/>)
            fillDisplayName("ThisISWAYTOOLONGVERYFULLTEXTTHATHOUSLNOTFITINTOTHELINE")
            clickButtonDisplayName();
            expect(updateUserPictureMock).toBeCalledTimes(0);
            expect(updateUserDisplayNameMock).toBeCalledTimes(0);
        })

        it("Test update display name with invalid", () => {
            render(<ProfileSettings/>)
            fillDisplayName("!")
            clickButtonDisplayName();
            expect(updateUserPictureMock).toBeCalledTimes(0);
            expect(updateUserDisplayNameMock).toBeCalledTimes(0);
        })
    })
});