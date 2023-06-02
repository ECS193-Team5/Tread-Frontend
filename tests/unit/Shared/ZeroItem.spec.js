import React from 'react';
import { render, screen } from "@testing-library/react";
import ZeroItem from '../../../src/components/Shared/ZeroItem';
import '@testing-library/jest-dom'


describe("Test /Shared/ZeroItem.js", () => {
    it("Test render", () => {
        render(<ZeroItem message = "message"/>)
        expect(screen.getByTestId("ZeroItemMessage")).toHaveTextContent("message")
    })
});