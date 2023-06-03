import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import MedalsSection from '../../../src/components/Profile/MedalsSection';
import '@testing-library/jest-dom'
import * as displayFunc from "../../../src/helpers/CssEffects";

jest.mock('../../../src/components/Profile/MedalsScroll', () => ()=> {return (<div></div>)});

const clickBarButton = (num) => {
    const element = screen.getByTestId("BarButtonComponent"+num);
    fireEvent.click(element);
}

describe("Test /Profile/MedalsSection.js", () => {

    it("Test render", () => {
        render(<MedalsSection />)
    })

    it("Test render in ", () => {
        render(<MedalsSection />)
        clickBarButton(0);
    })

    it("Test render in ", () => {
        render(<MedalsSection />)
        clickBarButton(1);
    })

});