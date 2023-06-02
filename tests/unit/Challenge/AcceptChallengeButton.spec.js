import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import AcceptChallengeButton from '../../../src/components/Challenge/AcceptChallengeButton';
import '@testing-library/jest-dom'
import * as challengeFunc from "../../../src/routes/challenges";
import * as displayFunc from "../../../src/helpers/CssEffects";
let acceptMock = jest.spyOn(challengeFunc, "acceptChallenge").mockImplementation((arg1, arg2)=>{arg2()})
let setDisplayProperty = jest.spyOn(displayFunc, "setDisplayProperty").mockImplementation();

describe("Test /Challenge/AcceptChallengeButton.js", () => {


    it("Test render", () => {
        render(<AcceptChallengeButton id = {"exampleUser#2224"} index = {"1"}/>)
    })

    it("Test today is before the day the challenge starts", () => {
        render(<AcceptChallengeButton id = {"exampleUser#2224"} index = {"1"}/>)
        let element = screen.getByTestId("AcceptChallengeButtonComponent1");
        fireEvent.click(element);
        expect(acceptMock).toBeCalledWith("exampleUser#2224", expect.any(Function))
        expect(setDisplayProperty).toBeCalled;
    })
});