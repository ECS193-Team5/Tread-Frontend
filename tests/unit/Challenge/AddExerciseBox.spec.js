import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import AddExerciseBox from '../../../src/components/Challenge/AddExerciseBox';
import '@testing-library/jest-dom'
import * as exerciseFunc from "../../../src/routes/exercise_log";
import * as displayFunc from "../../../src/helpers/CssEffects";

let sendExerciseMock = jest.spyOn(exerciseFunc, "addExerciseLog").mockImplementation(() => {})
let flipButtonMock = jest.spyOn(displayFunc, "flipButton").mockImplementation();

const YESTERDAY = '2023-05-29T00:00';

const toggle = () => {
    let element = screen.getByTestId("AddExerciseBoxToggleShowStateButton");
    fireEvent.click(element);
}

const submitButton = () => {
    let element = screen.getByTestId("AddExerciseBoxSubmitExerciseButton");
    fireEvent.click(element);
}

const checkErrorBox = (expectedContent) => {
    let element = screen.getByTestId("AddExerciseBoxErrorBox");
    expect(element).toHaveTextContent(expectedContent)
}

describe("Test /Challenge/AddExerciseBox.js", () => {

    it("Test render", () => {
        render(<AddExerciseBox/>)
    })

    it("Test toggle", () => {
        render(<AddExerciseBox/>)
        toggle();
        expect(flipButtonMock).toBeCalled;
        expect(sendExerciseMock).not.toHaveBeenCalled;
    })


    it("Test submit without any information", () => {
        render(<AddExerciseBox/>)
        toggle();
        submitButton();
        checkErrorBox("Please give an exercise name. Please give an amount over zero. Please give a date for the exercise.")
        expect(flipButtonMock).toBeCalled;
        expect(sendExerciseMock).not.toHaveBeenCalled;
    })

    it("Test valid submit", () => {
        render(<AddExerciseBox/>)
        toggle();
        const sportChange = screen.getByTestId("ExerciseNameFormAddChallengeExerciseNameSelect");
        fireEvent.change(sportChange, {target:{value:"Baseball"}})
        const loggedDatePicker = screen.getByTestId("ExerciseLoggedDateFormDateInput");
        fireEvent.change(loggedDatePicker, {target:{value:YESTERDAY}});
        const unitElement = screen.getByTestId("ExerciseAmountFormUnitSelect");
        fireEvent.change(unitElement, {target:{value:'km'}});
        const amountElement = screen.getByTestId("ExerciseAmountFormExerciseAmountInput");
        fireEvent.change(amountElement, {target:{value:10}});
        submitButton();
        checkErrorBox("")
        expect(flipButtonMock).toBeCalled;
        expect(sendExerciseMock).toHaveBeenCalled;
    })
});