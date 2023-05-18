import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import ChallengeForm from "../../../src/components/AddChallenge/ChallengeForm";
import Line from '../../../src/components/Shared/Line';

//test block
test("increments counter", () => {
    // render the component on virtual dom
    render(<Line />);

    //select the elements you want to interact with
    const counter = screen.getByTestId("counter");
    const incrementBtn = screen.getByTestId("increment");

    //interact with those elements
    fireEvent.click(incrementBtn);

    //assert the expected result
    expect(counter).toHaveTextContent("1");
});