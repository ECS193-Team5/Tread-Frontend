import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import PageSwitch from '../../../src/components/Shared/PageSwitch';
import '@testing-library/jest-dom';



describe("Test /Shared/Form/PageSwitch.js", () => {
    it("Test current challenge", () => {
        render(<PageSwitch type = {"challenge"} onButton = {"current"} leagueID = {"NA"}/>)
        const element = screen.getByTestId("PageSwitchGlobalButton");
        fireEvent.click(element);
    })

    it("Test global challenge", () => {
        render(<PageSwitch type = {"challenge"} onButton = {"global"} leagueID = {"NA"}/>)
        const element = screen.getByTestId("PageSwitchCurrentButton");
        fireEvent.click(element);
    })

    it("Test stats profile", () => {
        render(<PageSwitch type = {"profile"} onButton = {"stats"} leagueID = {"NA"}/>)
        const element = screen.getByTestId("PageSwitchMedalButton");
        fireEvent.click(element);
    })

    it("Test medals profile", () => {
        render(<PageSwitch type = {"profile"} onButton = {"medals"} leagueID = {"NA"}/>)
        const element = screen.getByTestId("PageSwitchStatsButton");
        fireEvent.click(element);
    })

    it("Test league social", () => {
        render(<PageSwitch type = {"social"} onButton = {"league"} leagueID = {"NA"}/>)
        const element = screen.getByTestId("PageSwitchFriendButton");
        fireEvent.click(element);
    })

    it("Test friend social", () => {
        render(<PageSwitch type = {"social"} onButton = {"friend"} leagueID = {"NA"}/>)
        const element = screen.getByTestId("PageSwitchLeagueButton");
        fireEvent.click(element);
    })

    it("Test description league", () => {
        render(<PageSwitch type = {"league"} onButton = {"description"} leagueID = {"4"}/>)
        const element = screen.getByTestId("PageSwitchMemberButton");
        fireEvent.click(element);
    })

    it("Test member league", () => {
        render(<PageSwitch type = {"league"} onButton = {"member"} leagueID = {"4"}/>)
        const element = screen.getByTestId("PageSwitchDescriptionButton");
        fireEvent.click(element);
    })
});