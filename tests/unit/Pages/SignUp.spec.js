import React from 'react';
import { render } from "@testing-library/react";
import '@testing-library/jest-dom'
import SignUp from '../../../src/pages/signUp';
import * as signFunc from "../../../src/routes/sign_up";
import * as firebaseFunc from "../../../src/helpers/firebaseHelpers";

jest.mock('../../../src/components/SignUp/SignUpSideBar', () => ()=> {return (<div></div>)});
jest.mock('../../../src/components/SignUp/SignUpForm', () => ()=> {return (<div></div>)});
let getProfilePhotoMock = jest.spyOn(signFunc, "getProfilePhoto").mockImplementation((then)=>{then("ex.png")});
let signUpMock = jest.spyOn(signFunc, "signUp").mockImplementation();
let getTokenMock = jest.spyOn(firebaseFunc, "setDeviceToken").mockImplementation((func)=>{func("token")});
jest.mock('firebase/messaging', () => () => {});
jest.mock('../../../src/firebase', () => () => {});

describe("Test /pages/challenge.js", () => {
    it("Test render", () => {
        render(<SignUp/>)
    })
});