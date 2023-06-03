import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import LeagueHeader from '../../../src/components/League/LeagueHeader';
import * as leagueFunc from "../../../src/routes/league";
import * as cssEffects from "../../../src/helpers/CssEffects";
let leagueInfo = {data:{"leagueName":"name", "_id":"63fb66a1971b753d7edf9c48", "id":"63fb66a1971b753d7edf9c48", "leagueDescription":"4", "leagueType":"private"}}
let memberList = {data:["user1", "user2"]}
let getLeagueRoleMock = jest.spyOn(leagueFunc, "getLeagueRole").mockImplementation((id, roleSet)=>{roleSet("admin")});
let getLeagueInfoMock = jest.spyOn(leagueFunc, "getLeagueInfo").mockImplementation((id, roleSet)=>{roleSet(leagueInfo)});
let getNumberActiveChallengesMock = jest.spyOn(leagueFunc, "getNumberActiveChallengesLeague").mockImplementation((id, roleSet)=>{roleSet(4)});
let getMembersLeagueMock = jest.spyOn(leagueFunc, "getMembersLeague").mockImplementation((id, roleSet)=>{roleSet(memberList)});
let setLocationMock = jest.spyOn(cssEffects, "setLocation").mockImplementation(() => {});

describe("Test /League/LeagueHeader.js", () => {
    it("Test render", () => {
        render(<LeagueHeader>{{"id":"4"}}</LeagueHeader>)
    })

    it("Test text", () => {
        render(<LeagueHeader>{{"id":"4"}}</LeagueHeader>)
        expect(screen.getByTestId("LeagueHeaderLeagueDescription")).toHaveTextContent("4")
        expect(screen.getByTestId("LeagueHeaderLeagueType")).toHaveTextContent("Private League")
        expect(screen.getByTestId("LeagueHeaderLeagueName")).toHaveTextContent("name")

    })

    it("Test public league", () => {

    leagueInfo = {data:{"leagueName":"name", "_id":"63fb66a1971b753d7edf9c48", "id":"63fb66a1971b753d7edf9c48", "leagueDescription":"4", "leagueType":"public"}}
    getLeagueInfoMock = jest.spyOn(leagueFunc, "getLeagueInfo").mockImplementation((id, roleSet)=>{roleSet(leagueInfo)});

        render(<LeagueHeader>{{"id":"4"}}</LeagueHeader>)
        expect(screen.getByTestId("LeagueHeaderLeagueDescription")).toHaveTextContent("4")
        expect(screen.getByTestId("LeagueHeaderLeagueType")).toHaveTextContent("Public League")
        expect(screen.getByTestId("LeagueHeaderLeagueName")).toHaveTextContent("name")

    })

    it("Test edit button", () => {
        getLeagueRoleMock = jest.spyOn(leagueFunc, "getLeagueRole").mockImplementation((id, roleSet)=>{roleSet("owner")});


        render(<LeagueHeader>{{"id":"4"}}</LeagueHeader>)
        fireEvent.click(screen.getByTestId("LeagueHeaderMoveEditPageButton"));
        expect(setLocationMock).toBeCalledTimes(1);
    })
});