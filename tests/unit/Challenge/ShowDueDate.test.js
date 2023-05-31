import React from 'react';
import { render, screen } from "@testing-library/react";
import ShowDueDate from '../../../src/components/Challenge/ShowDueDate';
import '@testing-library/jest-dom'

let mockDateNow;
const MAY_28 = new Date(1685260800000);
const MAY_29_MORNING =  new Date(1685347200000);
const MAY_29_ELEVEN_30_AM =  new Date(1685385000000);
const MAY_29_3_12_AFTERNOON=  new Date(1685398320000);
const MAY_29_AFTERNOON =  new Date(1685397600000);
const MAY_30 =  new Date(1685484000000);
const JUN_1 =  new Date(1685620800000);
const JUN_4_2024 = new Date(1717525800000);

describe("Test /Challenge/BoxLine.js", () => {

    afterAll(()=>{
        mockDateNow.mockClear();
    })

    beforeEach(()=>{
        // Sets the date.now to 5/29/2023 at 11 AM
        mockDateNow = jest.spyOn(Date, "now").mockImplementation(() => {return 1685383200000});
    })

    it("Test render", () => {
        render(<ShowDueDate index = {0} issueDate={MAY_28} dueDate = {MAY_30}/>)
    })

    it("Test today is before the day the challenge starts", () => {
        render(<ShowDueDate index = {0} issueDate={MAY_30} dueDate = {JUN_1}/>)
        const element = screen.getByTestId("ShowDueDateComponent0startDateString");
        expect(element).toHaveTextContent('Starting on May 30, 2023');
    })

    it("Test today is the day the challenge starts, has not started yet, and its due date is in the AM", () => {
        mockDateNow.mockImplementation(() => {return 1685345400000});
        render(<ShowDueDate index = {0} issueDate={MAY_29_MORNING} dueDate = {MAY_29_AFTERNOON}/>)
        const element = screen.getByTestId("ShowDueDateComponent0startDateString");
        expect(element).toHaveTextContent('Starting at 1:00 AM');
    })

    it("Test today is the day the challenge starts, has not started yet, and its minutes are double digits", () => {
        render(<ShowDueDate index = {0} issueDate={MAY_29_3_12_AFTERNOON} dueDate = {JUN_1}/>)
        const element = screen.getByTestId("ShowDueDateComponent0startDateString");
        expect(element).toHaveTextContent('Starting at 3:12 PM');
    })

    it("Test today is the day the challenge starts, has not started yet, and has single minute digits", () => {
        render(<ShowDueDate index = {0} issueDate={MAY_29_AFTERNOON} dueDate = {JUN_1}/>)
        const element = screen.getByTestId("ShowDueDateComponent0startDateString");
        expect(element).toHaveTextContent('Starting at 3:00 PM');
    })

    it("The challenge is ongoing, and is due in more than 1 year", () => {
        render(<ShowDueDate index = {0} issueDate={MAY_29_MORNING} dueDate = {JUN_4_2024}/>)
        const element = screen.getByTestId("ShowDueDateComponent0timeLeft");
        expect(element).toHaveTextContent('1Y');
    })

    it("The challenge is ongoing, and is due in more than 1 day", () => {
        render(<ShowDueDate index = {0} issueDate={MAY_29_MORNING} dueDate = {JUN_1}/>)
        const element = screen.getByTestId("ShowDueDateComponent0timeLeft");
        expect(element).toHaveTextContent('2d');
    })

    it("The challenge is ongoing, and is due less than a day", () => {
        render(<ShowDueDate index = {0} issueDate={MAY_29_MORNING} dueDate = {MAY_29_AFTERNOON}/>)
        const element = screen.getByTestId("ShowDueDateComponent0timeLeft");
        expect(element).toHaveTextContent('4h');
    })

    it("The challenge is ongoing, and is due less than an hour", () => {
        render(<ShowDueDate index = {0} issueDate={MAY_29_MORNING} dueDate = {MAY_29_ELEVEN_30_AM}/>)
        const element = screen.getByTestId("ShowDueDateComponent0timeLeft");
        expect(element).toHaveTextContent('30m');
    })

    it("Test set interval is called", () => {
        jest.useFakeTimers();
        mockDateNow = jest.spyOn(Date, "now").mockImplementation(() => {return 1685383200000});
        render(<ShowDueDate index = {0} issueDate={MAY_29_MORNING} dueDate = {MAY_29_ELEVEN_30_AM}/>)
        let element = screen.getByTestId("ShowDueDateComponent0timeLeft");
        //expect(element).toHaveTextContent('30m');
        mockDateNow = jest.spyOn(Date, "now").mockImplementation(() => {return 1685383200000 + 2*60*1000});
        jest.advanceTimersByTime(2*60*1000);
        element = screen.getByTestId("ShowDueDateComponent0timeLeft");
        //expect(element).toHaveTextContent('29m');
    })
});