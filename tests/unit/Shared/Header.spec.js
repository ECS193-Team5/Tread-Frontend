import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import Header from '../../../src/components/Shared/Header';
import '@testing-library/jest-dom';

jest.mock('../../../src/components/Shared/UserSettingsButton', () => () => {
    return (<div></div>)
});

jest.mock('../../../src/components/Shared/PageSwitch', () => () => {
    return (<div></div>)
});


describe("Test /Shared/Form/Header.js", () => {
    it("Test render with no pageSwitch", () => {
        render(<Header>{{title:"HeaderTitle", type:"none", onButton:"Member", leagueID: "4"}}</Header>)
        const element = screen.getByTestId("HeaderComponentTitleText");
        expect(element).toHaveTextContent("HeaderTitle")
    })

    it("Test render with pageSwitch", () => {
        render(<Header>{{title:"HeaderTitle", type:"league", onButton:"Member", leagueID: "4"}}</Header>)
        const element = screen.getByTestId("HeaderComponentTitleText");
        expect(element).toHaveTextContent("HeaderTitle")
    })
});