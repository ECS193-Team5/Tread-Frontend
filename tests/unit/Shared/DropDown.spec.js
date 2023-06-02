import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import DropDown from '../../../src/components/Shared/DropDown';
import '@testing-library/jest-dom'

describe("Test /Shared/Form/DropDown.js", () => {
    let mock1 = jest.fn();
    let mock2 = jest.fn();

    afterEach(()=>{
        mock1.mockClear();
        mock2.mockClear();
    })

    it("Test render", () => {
        render(<DropDown uniqueDeterminer = {"meow"}>{[{ "name": "mock1", "func": mock1 }, { "name":"mock2", "func": mock2 }]}</DropDown>)
    })

    it("Test click mock2", () => {
        render(<DropDown uniqueDeterminer = {"meow"}>{[{ "name": "mock1", "func": mock1 }, { "name":"mock2", "func": mock2 }]}</DropDown>)
        const element = screen.getByTestId("DropDownEntryComponentmeow-0");
        fireEvent.click(element);
        expect(mock1).toHaveBeCalled;
        expect(mock2).not.toHaveBeenCalled;

    })

    it("Test click mock1", () => {
        render(<DropDown uniqueDeterminer = {"meow"}>{[{ "name": "mock1", "func": mock1 }, { "name":"mock2", "func": mock2 }]}</DropDown>)
        const element = screen.getByTestId("DropDownEntryComponentmeow-1");
        fireEvent.click(element);
        expect(mock2).toHaveBeCalled;
        expect(mock1).not.toHaveBeenCalled;})
});