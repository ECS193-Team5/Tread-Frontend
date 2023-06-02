import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import Line from '../../../src/components/Shared/Line';
import '@testing-library/jest-dom';



describe("Test /Shared/Form/Line.js", () => {
    it("Test render", () => {
        render(<Line/>)
    })
});