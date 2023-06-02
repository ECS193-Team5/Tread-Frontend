import React, {useState as useStateMock} from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import ExerciseLoggedDateForm from '../../../../src/components/Shared/Form/ExerciseLoggedDateForm';
import '@testing-library/jest-dom'

const YESTERDAY = '2023-05-29T00:00';
const TOMORROW = '2023-05-31T00:00';
const YESTERDAY_ISO = '2023-05-29T07:00:00.000Z'

describe("Test /Shared/Form/DisplayNameForm.js", () => {
    let setLoggedDateMock = jest.fn();

    beforeAll(()=>{
        jest.useFakeTimers().setSystemTime(new Date('2023-05-30'));
    })
    afterEach(()=>{
        setLoggedDateMock.mockClear()
    })

    it("Test render", () => {
        render(<ExerciseLoggedDateForm />)
    })

    it("Test give a valid logged date", () => {
        render(<ExerciseLoggedDateForm updateLoggedDate={setLoggedDateMock}/>)
        const loggedDatePicker = screen.getByTestId("ExerciseLoggedDateFormDateInput");
        fireEvent.change(loggedDatePicker, {target:{value:YESTERDAY}});
        expect(setLoggedDateMock.mock.calls[0][0].toISOString()).toBe(YESTERDAY_ISO);

    })

    it("Test give a invalid logged date", () => {
        render(<ExerciseLoggedDateForm updateLoggedDate={setLoggedDateMock}/>)
        const loggedDatePicker = screen.getByTestId("ExerciseLoggedDateFormDateInput");
        fireEvent.change(loggedDatePicker, {target:{value:TOMORROW}});
        expect(setLoggedDateMock).not.toBeCalled;
    })

    it("Test prevent enter", () => {
        render(<ExerciseLoggedDateForm updateLoggedDate={setLoggedDateMock}/>)
        const loggedDatePicker = screen.getByTestId("ExerciseLoggedDateFormDateInput");
        fireEvent.keyDown(loggedDatePicker, {key:"e"});
    })
});