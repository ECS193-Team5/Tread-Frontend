import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import LeaderboardEntry from '../../../src/components/Shared/LeaderboardEntry';
import '@testing-library/jest-dom';

let LeaderboardEntryInfo = {level:1, complete:80, name:"batman#6380", score:12};

describe("Test /Shared/Form/LeaderboardEntry.js", () => {
    it("Test render", () => {
        render(<LeaderboardEntry index = {0}>{LeaderboardEntryInfo}</LeaderboardEntry>)
        const username = screen.getByTestId("LeaderboardEntryUsername0");
        expect(username).toHaveTextContent("batman#6380")
        const score = screen.getByTestId("LeaderboardEntryProgress0");
        expect(score).toHaveTextContent("12")
    })

    it("Test LeaderboardEntry level 1", () => {
        LeaderboardEntryInfo["level"] = 1;
        render(<LeaderboardEntry uniqueIdentifier = {"meow"}>{LeaderboardEntryInfo }</LeaderboardEntry>)
    })

    it("Test LeaderboardEntry level 2", () => {
        LeaderboardEntryInfo["level"] = 2;
        render(<LeaderboardEntry uniqueIdentifier = {"meow"}>{LeaderboardEntryInfo }</LeaderboardEntry>)
    })

    it("Test LeaderboardEntry level 3", () => {
        LeaderboardEntryInfo["level"] = 3;
        render(<LeaderboardEntry uniqueIdentifier = {"meow"}>{LeaderboardEntryInfo }</LeaderboardEntry>)
    })

    it("Test LeaderboardEntry level 4", () => {
        LeaderboardEntryInfo["level"] = 4;
        render(<LeaderboardEntry uniqueIdentifier = {"meow"}>{LeaderboardEntryInfo }</LeaderboardEntry>)
        const element = screen.getByTestId("LeaderboardEntryLevel");
        expect(element).toHaveTextContent("4")
    })
});