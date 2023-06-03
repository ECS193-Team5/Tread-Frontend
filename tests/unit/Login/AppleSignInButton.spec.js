import React from 'react';
import { fireEvent, render , screen} from "@testing-library/react";
import AppleSignInButton from '../../../src/components/Login/AppleSignInButton';
import '@testing-library/jest-dom';
jest.mock('../../../src/firebase', () => ()=> {return ({getToken:jest.fn()})});

describe("Test /Login/AppleSignInButton.js", () => {
    it("Test render", () => {
        render(<AppleSignInButton/>)
    })
});