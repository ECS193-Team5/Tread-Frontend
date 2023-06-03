import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import FriendSection from '../../../src/components/Social/FriendSection';
import '@testing-library/jest-dom'
import * as displayFunc from "../../../src/helpers/CssEffects";

let setLocationMock = jest.spyOn(displayFunc, "setLocation").mockImplementation();
jest.mock('../../../src/components/Social/FriendScroll', () => ()=> {return (<div></div>)});
jest.mock('../../../src/components/Shared/Form/UserAddForm', () => ()=> {return (<div></div>)});

const clickBarButton = (num) => {
    const element = screen.getByTestId("BarButtonComponent"+num);
    fireEvent.click(element);
}

describe("Test /Social/FriendSection.js", () => {

    it("Test render", () => {
        render(<FriendSection />)
    })

    it("Test render in ", () => {
        render(<FriendSection />)
        clickBarButton(0);
        expect(setLocationMock).not.toBeCalled;
    })

    it("Test render in ", () => {
        render(<FriendSection />)
        clickBarButton(1);
        expect(setLocationMock).not.toBeCalled;
    })

    it("Test render in ", () => {
        render(<FriendSection />)
        clickBarButton(2);
        expect(setLocationMock).not.toBeCalled;
    })

    it("Test render in ", () => {
        render(<FriendSection />)
        clickBarButton(3);
        expect(setLocationMock).not.toBeCalled;
    })

    it("Test render in ", () => {
        render(<FriendSection />)
        clickBarButton(4);
        expect(setLocationMock).toHaveBeenCalled;
    })
});