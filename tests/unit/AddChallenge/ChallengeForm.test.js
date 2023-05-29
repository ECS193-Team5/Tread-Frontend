import React from 'react';
import { render, fireEvent, screen } from "@testing-library/react";
import ChallengeForm from '../../../src/components/AddChallenge/ChallengeForm';
import '@testing-library/jest-dom';


//test block
test("Hitting the submit button with changing the components gives an error", () => {
    // render the component on virtual dom
    render(<ChallengeForm/>)

    fireEvent.click(screen.getByTestId("ChallengeFormSubmitButton"));

    const element = screen.getByTestId("ChallengeFormErrorBox");
    expect(element).toHaveTextContent('Please give an exercise name. Please give an amount over zero. Please give a valid issue date. Please give a valid due date.')
});