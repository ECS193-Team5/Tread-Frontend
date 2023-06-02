import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import CurrentChallenge from '../../../src/components/Challenge/CurrentChallenge';
import '@testing-library/jest-dom'
import * as displayFunc from "../../../src/helpers/CssEffects";

let setLocationMock = jest.spyOn(displayFunc, "setLocation").mockImplementation();
jest.mock('../../../src/components/Challenge/ChallengeScroll', () => ()=> {return (<div></div>)});

const clickBarButton = (num) => {
    const element = screen.getByTestId("BarButtonComponent"+num);
    fireEvent.click(element);
}

describe("Test /Challenge/CurrentChallenge.js", () => {


    it("Test render", () => {
        render(<CurrentChallenge />)
    })

    it("Test render in ", () => {
        render(<CurrentChallenge />)
        clickBarButton(0);
        expect(setLocationMock).not.toHaveBeenCalled;
    })

    it("Test render in ", () => {
        render(<CurrentChallenge />)
        clickBarButton(1);
        expect(setLocationMock).not.toHaveBeenCalled;
    })

    it("Test render in ", () => {
        render(<CurrentChallenge />)
        clickBarButton(2);
        expect(setLocationMock).not.toHaveBeenCalled;
    })

    it("Test render in ", () => {
        render(<CurrentChallenge />)
        clickBarButton(3);
        expect(setLocationMock).toHaveBeenCalled;
    })
});