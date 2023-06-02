import React from 'react';
import { render } from "@testing-library/react";
import Privacy from "../../../src/pages/privacy";
import '@testing-library/jest-dom'


describe("Test /pages/privacy.js", () => {
    it("Test render", () => {
        render(<Privacy/>)
    })
});