import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import LeagueLeaderboard from '../../../src/components/League/LeagueLeaderboard';
import * as leagueFunc from "../../../src/routes/league";

let leaderboardInfo = {data:[]}
let getLeaderboardInfoMock = jest.spyOn(leagueFunc, "getLeaderboardInfo").mockImplementation((id, func)=>{func(leaderboardInfo)});

describe("Test /League/LeagueLeaderboard.js", () => {
    it("Test render", () => {
        render(<LeagueLeaderboard>{{"id":"4"}}</LeagueLeaderboard>)
    })

    it("Test render with information", () => {
        let leaderboardInfo = {data:[["batman#4444", 1]]}
        let getLeaderboardInfoMock = jest.spyOn(leagueFunc, "getLeaderboardInfo").mockImplementation((id, func)=>{func(leaderboardInfo)});

        render(<LeagueLeaderboard>{{"id":"4"}}</LeagueLeaderboard>)
    })

});