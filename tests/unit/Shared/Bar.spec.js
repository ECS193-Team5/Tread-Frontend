import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import Bar from '../../../src/components/Shared/Bar';
import '@testing-library/jest-dom'

describe("Test /Shared/Form/Bar.js", () => {
    let setStateMock = jest.fn();
    let barButtonList = [{"name": "Current", "defaultOn":true, "create":false},
    {"name": "Sent", "defaultOn":false, "create":false},
    {"name": "Received", "defaultOn":false, "create":false},
    {"name": "Send Challenge", "defaultOn":false, "create":true}];

    afterEach(()=>{
        setStateMock.mockClear()
    })

    it("Test render", () => {
        render(<Bar>{{"buttonList":barButtonList, "updateFunc":setStateMock}}</Bar>)
    })

    it("Test click first button", () => {
        render(<Bar>{{"buttonList":barButtonList, "updateFunc":setStateMock}}</Bar>)
        const element = screen.getByTestId("BarButtonComponent0");
        fireEvent.click(element);
        expect(setStateMock).toBeCalledWith("Current")
    })

    it("Test click second button", () => {
        render(<Bar>{{"buttonList":barButtonList, "updateFunc":setStateMock}}</Bar>)
        const element = screen.getByTestId("BarButtonComponent1");
        fireEvent.click(element);
        expect(setStateMock).toBeCalledWith("Sent")
    })
});