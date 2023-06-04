import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import Leaderboard from '../../../src/components/Shared/Leaderboard';
import '@testing-library/jest-dom';

jest.mock('../../../src/components/Shared/UserSettingsButton', () => () => {
    return (<div></div>)
});

jest.mock('../../../src/components/Shared/PageSwitch', () => () => {
    return (<div></div>)
});

let leaderboardInfo = [{level:1, complete:80, name:"batman#6380"}];

describe("Test /Shared/Form/Leaderboard.js", () => {
    it("Test leaderboard with entries", () => {
        render(<Leaderboard uniqueIdentifier = {"meow"}>{{ "title": "ExampleTitle", "entries":{"leaderboardInfo":[]}  }}</Leaderboard>)
        const element = screen.getByTestId("LeaderboardComponentTitle");
        expect(element).toHaveTextContent("ExampleTitle")
    })


    it("Test leaderboard with no entries", () => {
        render(<Leaderboard uniqueIdentifier = {"meow"}>{{ "title": "ExampleTitle", "entries": {"leaderboardInfo":leaderboardInfo}  }}</Leaderboard>)
        const element = screen.getByTestId("LeaderboardComponentTitle");
        expect(element).toHaveTextContent("ExampleTitle")
    })
});