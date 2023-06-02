import React from 'react';
import { render } from "@testing-library/react";
import AddLeague from '../../../src/pages/addLeague';
import '@testing-library/jest-dom'

describe("Test /pages/addLeague.js", () => {
    it("Test render", () => {
        render(<AddLeague />)
    })
});