import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import BarButton from '../../../src/components/Shared/BarButton';
import '@testing-library/jest-dom'

describe("Test /Shared/Form/BarButton.js", () => {
    let updateMock = jest.fn();
    let barButtonInfo = {"name": "Current", "defaultOn":true, "create":false};

    afterEach(()=>{
        updateMock.mockClear()
    })

    it("Test render", () => {
        render(<BarButton index = {0} name = {barButtonInfo.name} func = {updateMock} classes = {"BarButton OnButton NoCreate"}/>)
    })

    it("Test click", () => {
        render(<BarButton index = {0} name = {barButtonInfo.name} func = {updateMock} classes = {"BarButton OnButton NoCreate"}/>)
        const element = screen.getByTestId("BarButtonComponent0");
        fireEvent.click(element);
        expect(updateMock).toBeCalledWith("Current")
    })
});