import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import LeagueMemberSection from '../../../src/components/League/LeagueMemberSection';
import * as leagueFunc from "../../../src/routes/league";
import * as userFunc from "../../../src/routes/user";

let getLeagueRoleMock = jest.spyOn(leagueFunc, "getLeagueRole").mockImplementation((id, roleSet)=>{roleSet("admin")});
let getUsernameMock = jest.spyOn(userFunc, "getUsername").mockImplementation();
jest.mock('../../../src/components/League/LeagueMemberScroll', () => ()=> {return (<div></div>)});
jest.mock('../../../src/components/Shared/Form/UserAddForm', () => ()=> {return (<div></div>)});

const clickBarButton = (num) => {
    const element = screen.getByTestId("BarButtonComponent"+num);
    fireEvent.click(element);
}

describe("Test /League/LeagueMemberSection.js", () => {


    it("Test render", () => {
        render(<LeagueMemberSection>{{"id":"4"}}</LeagueMemberSection>)
    })

    it("Test render in 0", () => {
        render(<LeagueMemberSection>{{"id":"4"}}</LeagueMemberSection>)
        clickBarButton(0);
    })

    it("Test render in ", () => {
        render(<LeagueMemberSection>{{"id":"4"}}</LeagueMemberSection>)
        clickBarButton(1);
    })

    it("Test render in ", () => {
        render(<LeagueMemberSection>{{"id":"4"}}</LeagueMemberSection>)
        clickBarButton(2);
    })

    it("Test render in ", () => {
        render(<LeagueMemberSection>{{"id":"4"}}</LeagueMemberSection>)
        clickBarButton(3);
    })

    it("Test render in ", () => {
        render(<LeagueMemberSection>{{"id":"4"}}</LeagueMemberSection>)
        clickBarButton(4);
    })

    it("Test render without admin priveledges ", () => {
        getLeagueRoleMock = jest.spyOn(leagueFunc, "getLeagueRole").mockImplementation((id, roleSet)=>{roleSet("participant")});
        render(<LeagueMemberSection>{{"id":"4"}}</LeagueMemberSection>)

    })

    it("Test render get role and username ", () => {
        getLeagueRoleMock = jest.spyOn(leagueFunc, "getLeagueRole").mockImplementation((id, roleSet)=>{roleSet("participant")});
        getUsernameMock = jest.spyOn(userFunc, "getUsername").mockImplementation((set)=>{set("username")});

        render(<LeagueMemberSection>{{"id":"4"}}</LeagueMemberSection>)

    })
});