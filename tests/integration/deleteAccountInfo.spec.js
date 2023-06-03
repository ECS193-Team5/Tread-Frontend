import React from 'react';
import { render } from "@testing-library/react";
import DeleteAccountInfo from "../../src/pages/deleteAccountInfo";
import '@testing-library/jest-dom'


describe("Test /pages/deleteAccountInfo.js", () => {
    it("Test render", () => {
        render(<DeleteAccountInfo/>)
    })
});