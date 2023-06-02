import React, {useState as useStateMock} from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import ExerciseAmountForm from '../../../../src/components/Shared/Form/ExerciseAmountForm';
import '@testing-library/jest-dom'

describe("Test /Shared/Form/DisplayNameForm.js", () => {
    let updateUnitMock = jest.fn();
    let updateAmountMock = jest.fn();


    afterEach(()=>{
        updateUnitMock.mockClear()
        updateAmountMock.mockClear()
    })

    it("Test render", () => {
        render(<ExerciseAmountForm defaultAmount = {0} defaultUnit = {"min"} updateUnit = {updateUnitMock} updateAmount = {updateAmountMock}/>)
    })

    it("Test change in default amount changes element", () => {
        render(<ExerciseAmountForm defaultAmount = {10} defaultUnit = {"min"} updateUnit = {updateUnitMock} updateAmount = {updateAmountMock}/>)
        const amountElement = screen.getByTestId("ExerciseAmountFormExerciseAmountInput");
        expect(amountElement.placeholder).toBe("10")
    })

    it("Test change in default unit changes element", () => {
        render(<ExerciseAmountForm defaultAmount = {10} defaultUnit = {"hr"} updateUnit = {updateUnitMock} updateAmount = {updateAmountMock}/>)
        const unitElement = screen.getByTestId("ExerciseAmountFormUnitSelect");
        expect(unitElement.value).toBe("hr")
    })

    it("Test change amount updates parent", () => {
        render(<ExerciseAmountForm defaultAmount = {10} defaultUnit = {"hr"} updateUnit = {updateUnitMock} updateAmount = {updateAmountMock}/>)
        const unitElement = screen.getByTestId("ExerciseAmountFormUnitSelect");
        fireEvent.change(unitElement, {target:{value:'km'}});
        expect(updateUnitMock).toBeCalledWith("km")
    })


    it("Test change amount updates parent", () => {
        render(<ExerciseAmountForm defaultAmount = {10} defaultUnit = {"hr"} updateUnit = {updateUnitMock} updateAmount = {updateAmountMock}/>)
        const amountElement = screen.getByTestId("ExerciseAmountFormExerciseAmountInput");
        fireEvent.change(amountElement, {target:{value:10}});
        expect(updateAmountMock).toBeCalledWith("10")
    })

    it("Test enter e key", () => {
        render(<ExerciseAmountForm defaultAmount = {10} defaultUnit = {"hr"} updateUnit = {updateUnitMock} updateAmount = {updateAmountMock}/>)
        const amountElement = screen.getByTestId("ExerciseAmountFormExerciseAmountInput");
        fireEvent.keyDown(amountElement, {key:"e"});
        expect(updateAmountMock).not.toHaveBeenCalled()
    })

    it("Test enter e key", () => {
        render(<ExerciseAmountForm defaultAmount = {10} defaultUnit = {"hr"} updateUnit = {updateUnitMock} updateAmount = {updateAmountMock}/>)
        const amountElement = screen.getByTestId("ExerciseAmountFormExerciseAmountInput");
        fireEvent.change(amountElement, {target:{value:-1}});
        expect(updateAmountMock).toBeCalledWith(0)
    })

    it("Test enter e key", () => {
        render(<ExerciseAmountForm defaultAmount = {10} defaultUnit = {"hr"} updateUnit = {updateUnitMock} updateAmount = {updateAmountMock}/>)
        const amountElement = screen.getByTestId("ExerciseAmountFormExerciseAmountInput");
        fireEvent.change(amountElement, {target:{value:1000000}});
        expect(updateAmountMock).toBeCalledWith(0)
    })

    it("Test enter number key", () => {
        render(<ExerciseAmountForm defaultAmount = {10} defaultUnit = {"hr"} updateUnit = {updateUnitMock} updateAmount = {updateAmountMock}/>)
        const amountElement = screen.getByTestId("ExerciseAmountFormExerciseAmountInput");
        fireEvent.keyDown(amountElement, {key:"2"});
    })

    it("Test no default Amount", () => {
        render(<ExerciseAmountForm  updateUnit = {updateUnitMock} updateAmount = {updateAmountMock}/>)
    })
});