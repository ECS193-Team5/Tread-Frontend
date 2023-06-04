import React from 'react';
import { fireEvent, render, screen, act } from "@testing-library/react";
import SignUpForm from '../../../src/components/SignUp/SignUpForm';
import '@testing-library/jest-dom'
import * as signFunc from "../../../src/routes/sign_up";
import * as cssEffects from "../../../src/helpers/CssEffects";
import imageFile from "../../../../src/assets/BronzeTrophy.png";
import * as firebaseFunc from "../../../src/helpers/firebaseHelpers";
import * as sharedHelpers from "../../testHelpers/shared";

let signUpMock = jest.spyOn(signFunc, "signUp").mockImplementation();
let getTokenMock = jest.spyOn(firebaseFunc, "setDeviceToken").mockImplementation((func)=>{func("token")});
jest.mock('firebase/messaging', () => () => {});
jest.mock('../../../src/firebase', () => () => {});
jest.spyOn(global, 'FileReader').mockImplementation(function () {
    this.readAsDataURL = jest.fn(()=>{this.result = "foo"});
});

const submitSignUp = () =>{
    sharedHelpers.clickButton("SignUpFormSignUpButton")
}

const checkSignUpErr = (text) => {
    sharedHelpers.expectText("SignUpFormSubmitError", text)
}

const fillUsername = () => {
    sharedHelpers.enterValue("UsernameFormUsernameInput","user");
}

const fillDisplayName = () =>{
    sharedHelpers.enterValue("DisplayNameFormDisplayNameInput","display");
}
describe("Test components/SignUp/SignUpForm.js", () => {

    afterEach(()=>{
        signUpMock.mockClear();
    })

    it("Test render", () => {
        render(<SignUpForm>{{profilePhoto:"ex.png"}}</SignUpForm>)
    })

    it("Test submit no inputs", () => {
        render(<SignUpForm>{{profilePhoto:"ex.png"}}</SignUpForm>)
        submitSignUp();
        checkSignUpErr("Please select a username. Please select a display name. ")
    })

    it("Test submit with inputs", () => {
        render(<SignUpForm>{{profilePhoto:"ex.png"}}</SignUpForm>)
        fillUsername();
        fillDisplayName();
        submitSignUp();
        checkSignUpErr("")
    })

    it("Test submit with inputs including photo", () => {
        render(<SignUpForm>{{profilePhoto:"ex.png"}}</SignUpForm>)

        const element = screen.getByTestId("PhotoUploadFormUploadPhotoInput");
        fireEvent.change(element, {
            target:{
                files:[imageFile]
            }} );
        let reader = FileReader.mock.instances[0];
        reader.onload({ target: { result: 'foo' } });
        fillUsername();
        fillDisplayName();
        submitSignUp();
        checkSignUpErr("")
    })
});