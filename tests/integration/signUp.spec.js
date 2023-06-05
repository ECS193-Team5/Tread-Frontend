import React from 'react';
import { fireEvent, render, screen, act } from "@testing-library/react";
import SignUp from '../../src/pages/signUp';
import '@testing-library/jest-dom'
import * as signFunc from "../../src/routes/sign_up";
import imageFile from "../../src/assets/BronzeTrophy.png";
import * as firebaseFunc from "../../src/helpers/firebaseHelpers";
import * as sharedHelpers from "../testHelpers/shared";

let getProfilePhotoMock = jest.spyOn(signFunc, "getProfilePhoto").mockImplementation((then)=>{then("ex.png")});
let signUpMock = jest.spyOn(signFunc, "signUp").mockImplementation(()=>{});
let getTokenMock = jest.spyOn(firebaseFunc, "setDeviceToken").mockImplementation((func)=>{func("token")});
jest.mock('firebase/messaging', () => () => {});
jest.mock('../../src/firebase', () => () => {});
jest.spyOn(global, 'FileReader').mockImplementation(function () {
    this.readAsDataURL = jest.fn(()=>{this.result = "foo"});
});

const submitSignUp = () =>{
    sharedHelpers.clickButton("SignUpFormSignUpButton")
}

const checkSignUpErr = (text) => {
    sharedHelpers.expectText("SignUpFormSubmitError", text)
}

const checkUsernameErr = (text) => {
    sharedHelpers.expectText("UsernameFormUsernameError", text)
}

const fillUsername = (text) => {
    sharedHelpers.enterValue("UsernameFormUsernameInput",text);
}

const fillDisplayName = () =>{
    sharedHelpers.enterValue("DisplayNameFormDisplayNameInput","display");
}

describe("Test components/SignUp/SignUp.js", () => {

    afterEach(()=>{
        signUpMock.mockClear();
    })

    it("Test render", () => {
        render(<SignUp/>)
    })

    it("Test submit no inputs", () => {
        render(<SignUp/>)
        submitSignUp();
        checkSignUpErr("Please select a username. Please select a display name. ")
    })

    it("Test submit with inputs", () => {
        render(<SignUp/>)
        fillUsername("user");
        fillDisplayName();
        submitSignUp();
        checkSignUpErr("")
        checkUsernameErr("");
    })

    it("Test submit with inputs including photo", () => {
        render(<SignUp/>)

        const element = screen.getByTestId("PhotoUploadFormUploadPhotoInput");
        fireEvent.change(element, {
            target:{
                files:[imageFile]
            }} );
        let reader = FileReader.mock.instances[0];
        reader.onload({ target: { result: 'foo' } });
        fillUsername("user");
        fillDisplayName();
        submitSignUp();
        checkSignUpErr("")
        checkUsernameErr("");
    })

    it("Test invalid username because of length", () => {
        render(<SignUp/>)

        const element = screen.getByTestId("PhotoUploadFormUploadPhotoInput");
        fireEvent.change(element, {
            target:{
                files:[imageFile]
            }} );
        let reader = FileReader.mock.instances[0];
        reader.onload({ target: { result: 'foo' } });
        fillUsername("valid");
        fillUsername("");
        fillDisplayName();
        submitSignUp();
        checkSignUpErr("Please select a username. ")
        checkUsernameErr("Cannot sign up, username needs to be between 1-32 characters");
    })

    it("Test invalid username because of invalid char", () => {
        render(<SignUp/>)

        const element = screen.getByTestId("PhotoUploadFormUploadPhotoInput");
        fireEvent.change(element, {
            target:{
                files:[imageFile]
            }} );
        let reader = FileReader.mock.instances[0];
        reader.onload({ target: { result: 'foo' } });
        fillUsername("invalid userame");
        fillDisplayName();
        submitSignUp();
        checkSignUpErr("Please select a username. ")
        checkUsernameErr("Cannot sign up, username should be alphanumeric");
    })
});