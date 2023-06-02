import React, {useState as useStateMock} from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import ExerciseDateForm from '../../../../src/components/Shared/Form/ExerciseDateForm';
import '@testing-library/jest-dom'

const TODAY = '2023-05-30T00:00';
const TOMORROW = '2023-05-31T00:00';
const TODAY_ISO ='2023-05-30T07:00:00.000Z';
const TOMORROW_ISO = '2023-05-31T07:00:00.000Z'
describe("Test /Shared/Form/DisplayNameForm.js", () => {
    let setIssueDateMock = jest.fn();
    let setDueDateMock = jest.fn();
    beforeAll(()=>{
        jest.useFakeTimers().setSystemTime(new Date('2023-05-30'));
    })
    afterEach(()=>{
        setIssueDateMock.mockClear()
        setDueDateMock.mockClear()
    })

    it("Test render", () => {
        render(<ExerciseDateForm />)
    })

    it("Test give default issue and start date", () => {
        render(<ExerciseDateForm defaultIssueDate = {TODAY} defaultDueDate =  {TOMORROW} updateIssueDate = {setIssueDateMock} updateDueDate = {setDueDateMock} />)
        const errorElement = screen.getByTestId("ExerciseDateFormDueDateError");
        expect(errorElement).toHaveTextContent("");
    })

    it("Test give issue date that is before the due date", () => {
        render(<ExerciseDateForm defaultIssueDate = {""} defaultDueDate =  {""} updateIssueDate = {setIssueDateMock} updateDueDate = {setDueDateMock} />)
        const startDateElement = screen.getByTestId("ExerciseDateFormIssueDateInput");
        const endDateElement = screen.getByTestId("ExerciseDateFormDueDateInput");
        const errorElement = screen.getByTestId("ExerciseDateFormDueDateError");
        fireEvent.change(startDateElement, {target:{value:TOMORROW}});
        fireEvent.change(endDateElement, {target:{value:TODAY}});
        expect(errorElement).toHaveTextContent("The due date needs to be after the start date.");
    })

    it("Test give due date before issue date", () => {
        render(<ExerciseDateForm defaultIssueDate = {""} defaultDueDate =  {""} updateIssueDate = {setIssueDateMock} updateDueDate = {setDueDateMock} />)
        const startDateElement = screen.getByTestId("ExerciseDateFormIssueDateInput");
        const endDateElement = screen.getByTestId("ExerciseDateFormDueDateInput");
        const errorElement = screen.getByTestId("ExerciseDateFormDueDateError");
        fireEvent.change(startDateElement, {target:{value:TOMORROW}});
        fireEvent.change(startDateElement, {target:{value:""}});
        expect(errorElement).toHaveTextContent("");
    })

    it("Test give due date without giving an issue date", () => {
        render(<ExerciseDateForm defaultIssueDate = {""} defaultDueDate =  {""} updateIssueDate = {setIssueDateMock} updateDueDate = {setDueDateMock} />)
        const startDateElement = screen.getByTestId("ExerciseDateFormIssueDateInput");
        const endDateElement = screen.getByTestId("ExerciseDateFormDueDateInput");
        const errorElement = screen.getByTestId("ExerciseDateFormDueDateError");
        fireEvent.change(endDateElement, {target:{value:TODAY}});
        expect(errorElement).toHaveTextContent("The due date needs to be after the start date.");
    })

    it("Test give a working date set", () => {
        render(<ExerciseDateForm defaultIssueDate = {""} defaultDueDate =  {""} updateIssueDate = {setIssueDateMock} updateDueDate = {setDueDateMock} />)
        const startDateElement = screen.getByTestId("ExerciseDateFormIssueDateInput");
        const endDateElement = screen.getByTestId("ExerciseDateFormDueDateInput");
        const errorElement = screen.getByTestId("ExerciseDateFormDueDateError");
        fireEvent.change(endDateElement, {target:{value:TOMORROW}});
        fireEvent.change(startDateElement, {target:{value:TODAY}});
        expect(errorElement).toHaveTextContent("");
        expect(setDueDateMock.mock.calls[1][0].toISOString()).toBe(TOMORROW_ISO);
        expect(setIssueDateMock.mock.calls[1][0].toISOString()).toBe(TODAY_ISO);
    })

    it("Test prevent enter", () => {
        render(<ExerciseDateForm defaultIssueDate = {""} defaultDueDate =  {""} updateIssueDate = {setIssueDateMock} updateDueDate = {setDueDateMock} />)
        const startDateElement = screen.getByTestId("ExerciseDateFormIssueDateInput");
        const endDateElement = screen.getByTestId("ExerciseDateFormDueDateInput");
        const errorElement = screen.getByTestId("ExerciseDateFormDueDateError");
        fireEvent.keyDown(endDateElement, {key:"e"});
        expect(errorElement).toHaveTextContent("");
    })

});