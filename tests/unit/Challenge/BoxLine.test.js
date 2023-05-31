import React from 'react';
import { render } from "@testing-library/react";
import BoxLine from '../../../src/components/Challenge/BoxLine';
import '@testing-library/jest-dom'


describe("Test /Challenge/BoxLine.js", () => {
    it("Test render", () => {
        render(<BoxLine/>)
    })
});