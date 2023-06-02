import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import DeclineChallengeButton from '../../../src/components/Challenge/DeclineChallengeButton';
import '@testing-library/jest-dom'
import * as challengeFunc from "../../../src/routes/challenges";
import * as displayFunc from "../../../src/helpers/CssEffects";
let declineMock = jest.spyOn(challengeFunc, "declineChallenge").mockImplementation((arg1, arg2)=>{arg2()})
let setDisplayProperty = jest.spyOn(displayFunc, "setDisplayProperty").mockImplementation();

describe("Test /Challenge/DeclineChallengeButton.js", () => {


    it("Test render", () => {
        render(<DeclineChallengeButton id = {"exampleUser#2224"} index = {"1"}/>)
    })

    it("Test today is before the day the challenge starts", () => {
        render(<DeclineChallengeButton id = {"exampleUser#2224"} index = {"1"}/>)
        let element = screen.getByTestId("DeclineChallengeButtonComponent1");
        fireEvent.click(element);
        expect(declineMock).toBeCalledWith("exampleUser#2224", expect.any(Function))
        expect(setDisplayProperty).toBeCalled;
    })
});