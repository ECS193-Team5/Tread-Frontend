import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import SideBar from '../../../src/components/Shared/SideBar';
import '@testing-library/jest-dom';

import * as redirect from '../../../src/helpers/CssEffects';
jest.spyOn(redirect, "setLocation").mockImplementation(()=>{});
let m = jest.spyOn(redirect, "getLocation").mockImplementation(() => { return "/currentChallengePage"})
describe("Test /Shared/Form/SideBar.js", () => {

    it("Test render", () => {
        render(<SideBar/>)
    })

    it("Test click the profile settings button", () => {
        render(<SideBar/>)
        const profileSettingsButton = screen.getByTestId("SideBarProfileSettingsButton");
        fireEvent.click(profileSettingsButton);
    })

    it("Test click the challenge button", () => {
        render(<SideBar/>)
        m.mockImplementation(()=> {return "/socialFriendPage";});
        const challengeButton = screen.getByTestId("SideBarChallengesButton");
        fireEvent.click(challengeButton);
    })

    it("Test click the social button", () => {
        render(<SideBar/>)
        m.mockImplementation(()=> {return "/currentChallengePage";});
        const socialButton = screen.getByTestId("SideBarSocialPageButton");
        fireEvent.click(socialButton);
    })

    it("Test click the profile button", () => {
        render(<SideBar/>)
        const exerciseButton = screen.getByTestId("SideBarExerciseHistoryButton");
        fireEvent.click(exerciseButton);
    })

    it("Test already on the profile settings", () => {
        m.mockImplementation(()=> {return "/profileSettingsPage";});
        render(<SideBar/>)
        const profileSettingsButton = screen.getByTestId("SideBarProfileSettingsButton");
        fireEvent.click(profileSettingsButton);
    })

    it("Test already on the challenge button", () => {
        m.mockImplementation(()=> {return "/currentChallengePage";});
        render(<SideBar/>)
        const challengeButton = screen.getByTestId("SideBarChallengesButton");
        fireEvent.click(challengeButton);
    })

    it("Test already on the social button", () => {
        m.mockImplementation(()=> {return "/socialFriendPage";});
        render(<SideBar/>)
        const socialButton = screen.getByTestId("SideBarSocialPageButton");
        fireEvent.click(socialButton);
    })

    it("Test already on the exerciseHistory button", () => {
        m.mockImplementation(()=> {return "/profileStatsPage";});
        render(<SideBar/>)
        const exerciseButton = screen.getByTestId("SideBarExerciseHistoryButton");
        fireEvent.click(exerciseButton);
    })
});