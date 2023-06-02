import React from 'react';
import { render } from "@testing-library/react";
import AddChallenge from '../../../src/pages/addChallenge';
import '@testing-library/jest-dom'

describe("Test /pages/addChallenge.js", () => {
    it("Test render", () => {
        render(<AddChallenge />)
    })
});