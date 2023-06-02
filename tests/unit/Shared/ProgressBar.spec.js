import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import ProgressBar from '../../../src/components/Shared/ProgressBar';
import '@testing-library/jest-dom';



describe("Test /Shared/Form/ProgressBar.js", () => {
    it("Test ProgressBar with more than complete info", () => {
        render(<ProgressBar>{{completed:120}}</ProgressBar>)
    })

    it("Test progress bar with less than complete info", () => {
        render(<ProgressBar>{{completed:10}}</ProgressBar>)
    })
});