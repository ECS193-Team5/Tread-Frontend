import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import DropDownEntry from '../../../src/components/Shared/DropDownEntry';
import '@testing-library/jest-dom'

describe("Test /Shared/Form/DropDownEntry.js", () => {
    let mockUpdate = jest.fn();

    afterEach(()=>{
        mockUpdate.mockClear();
    })

    it("Test render", () => {
        render(<DropDownEntry index = {"index"} >{{value:{func:mockUpdate, name:"name"}}}</DropDownEntry>)
    })

    it("Test click mock2", () => {
        render(<DropDownEntry index = {"index"} >{{value:{func:mockUpdate, name:"name"}}}</DropDownEntry>)
        const element = screen.getByTestId("DropDownEntryComponentindex");
        fireEvent.click(element);
        expect(mockUpdate).toHaveBeCalled;

    })

});