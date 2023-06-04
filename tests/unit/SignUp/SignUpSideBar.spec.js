import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import SignUpSideBar from '../../../src/components/SignUp/SignUpSideBar';
import '@testing-library/jest-dom'

describe("Test /SignUp/SignUpSideBar.js", () => {
    it("Test render", () => {
        render(<SignUpSideBar/>)
    })
});