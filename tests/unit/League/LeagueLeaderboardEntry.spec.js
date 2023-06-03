import React from 'react';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import LeagueLeaderboardEntry from '../../../src/components/League/LeagueLeaderboardEntry';

describe("Test /League/LeagueLeaderboardEntry.js", () => {
    it("Test render level 1", () => {
        let informationList = [["username#2234",4]];
        informationList[0]["level"] = 1;
        render(<LeagueLeaderboardEntry index = {0}>{informationList[0]}</LeagueLeaderboardEntry>)
        expect(screen.getByTestId("LeagueLeaderboardEntryUserName0")).toHaveTextContent('username#2234');
        expect(screen.getByTestId("LeagueLeaderboardEntryProgress0")).toHaveTextContent('4');
    })

    it("Test render level 2", () => {
        let informationList = [["username#2234",4]];
        informationList[0]["level"] = 2;
        render(<LeagueLeaderboardEntry index = {0}>{informationList[0]}</LeagueLeaderboardEntry>)
    })

    it("Test render level 3", () => {
        let informationList = [["username#2234",4]];
        informationList[0]["level"] = 3;
        render(<LeagueLeaderboardEntry index = {0}>{informationList[0]}</LeagueLeaderboardEntry>)
    })

    it("Test render level 4", () => {
        let informationList = [["username#2234",4]];
        informationList[0]["level"] = 4;
        render(<LeagueLeaderboardEntry index = {0}>{informationList[0]}</LeagueLeaderboardEntry>)
    })

});