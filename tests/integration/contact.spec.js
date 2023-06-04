import React from 'react';
import { render } from "@testing-library/react";
import Contact from "../../src/pages/contact";
import '@testing-library/jest-dom'


describe("Test /pages/contact.js", () => {
    it("Test render", () => {
        render(<Contact/>)
    })
});