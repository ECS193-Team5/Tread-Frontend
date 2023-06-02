import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import GlobalChallenge from '../../../src/components/Challenge/GlobalChallenge';
import '@testing-library/jest-dom'


jest.mock('../../../src/components/Challenge/ChallengeScroll', () => ()=> {return (<div></div>)});

describe("Test /Challenge/GlobalChallenge.js", () => {
    it("Test render", () => {
        render(<GlobalChallenge />)
    })
});