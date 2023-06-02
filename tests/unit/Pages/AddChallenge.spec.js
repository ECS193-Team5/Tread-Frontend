import React from 'react';
import { render } from "@testing-library/react";
import AddChallenge from '../../../src/pages/addChallenge';
import '@testing-library/jest-dom'

jest.mock('../../../src/components/AddChallenge/ChallengeForm', () => () => {
    return (<div></div>)
});

jest.mock('../../../src/components/Shared/SideBar', () => () => {
    return (<div></div>)
});

describe("Test /pages/addChallenge.js", () => {
    it("Test render", () => {
        render(<AddChallenge />)
    })
});