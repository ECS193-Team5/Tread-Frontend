import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import { render, fireEvent, screen } from "@testing-library/react";
import Line from '../../../src/components/Shared/Line';
import ChallengeForm from '../../../src/components/AddChallenge/ChallengeForm';

//test block
test("increments counter", () => {
    // render the component on virtual dom
    render(<ChallengeForm />);




});