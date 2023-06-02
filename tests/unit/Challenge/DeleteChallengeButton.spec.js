import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import DeleteChallengeButton from '../../../src/components/Challenge/DeleteChallengeButton';
import '@testing-library/jest-dom'
import * as challengeFunc from "../../../src/routes/challenges";
import * as displayFunc from "../../../src/helpers/CssEffects";
let deleteMock = jest.spyOn(challengeFunc, "deleteChallenge").mockImplementation((arg1, arg2)=>{arg2()})
let setDisplayProperty = jest.spyOn(displayFunc, "setDisplayProperty").mockImplementation();

describe("Test /Challenge/DeleteChallengeButton.js", () => {


    it("Test render", () => {
        render(<DeleteChallengeButton id = {"exampleUser#2224"} index = {"1"}/>)
    })

    it("Test today is before the day the challenge starts", () => {
        render(<DeleteChallengeButton id = {"exampleUser#2224"} index = {"1"}/>)
        let element = screen.getByTestId("DeleteChallengeButtonComponent1");
        fireEvent.click(element);
        expect(deleteMock).toBeCalledWith("exampleUser#2224", expect.any(Function))
        expect(setDisplayProperty).toBeCalled;
    })
});