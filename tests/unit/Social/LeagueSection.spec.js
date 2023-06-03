import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import LeagueSection from '../../../src/components/Social/LeagueSection';
import '@testing-library/jest-dom'
import * as displayFunc from "../../../src/helpers/CssEffects";

let setLocationMock = jest.spyOn(displayFunc, "setLocation").mockImplementation();
jest.mock('../../../src/components/Social/LeagueScroll', () => ()=> {return (<div></div>)});
jest.mock('../../../src/components/Shared/Form/UserAddForm', () => ()=> {return (<div></div>)});

const clickBarButton = (num) => {
    const element = screen.getByTestId("BarButtonComponent"+num);
    fireEvent.click(element);
}

describe("Test /Social/LeagueSection.js", () => {

    it("Test render", () => {
        render(<LeagueSection />)
    })

    it("Test render in ", () => {
        render(<LeagueSection />)
        clickBarButton(0);
        expect(setLocationMock).not.toBeCalled;
    })

    it("Test render in ", () => {
        render(<LeagueSection />)
        clickBarButton(1);
        expect(setLocationMock).not.toBeCalled;
    })

    it("Test render in ", () => {
        render(<LeagueSection />)
        clickBarButton(2);
        expect(setLocationMock).not.toBeCalled;
    })

    it("Test render in ", () => {
        render(<LeagueSection />)
        clickBarButton(3);
        expect(setLocationMock).not.toBeCalled;
    })

    it("Test render in ", () => {
        render(<LeagueSection />)
        clickBarButton(4);
        expect(setLocationMock).toHaveBeenCalled;
    })
});