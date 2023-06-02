import React from 'react';
import { render } from "@testing-library/react";
import Challenge from '../../../src/pages/challenge';
import '@testing-library/jest-dom'
import * as firebaseAppFunc from 'firebase/app';
import * as firebaseMessagingFunc from "firebase/messaging";
import * as firebaseFunc from '../../../src/firebase';

//
const updateInputsMock = jest.fn();

let m = jest.spyOn(firebaseFunc, "getToken").mockImplementation(()=> console.log("called 1"));
let f = jest.spyOn(firebaseAppFunc, "intializeApp").mockImplementation(()=> console.log("called 2"));
let g = jest.spyOn(firebaseMessagingFunc, "getMessaging").mockImplementation(()=> console.log("called 3"));
let h = jest.spyOn(firebaseMessagingFunc, "onMessage").mockImplementation(()=> console.log("called 4"));

describe("Test /pages/challenge.js", () => {
    it("Test render current", () => {
        render(<Challenge>{{"type":"current"}}</Challenge>)
    })

    it("Test render global", () => {
        render(<Challenge>{{"type":"global"}}</Challenge>)
    })
});