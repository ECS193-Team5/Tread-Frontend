import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import LeagueChallengeList from '../../../src/components/League/LeagueChallengeList';
import * as formHelpers from "../../../src/helpers/FormHelpers";
import * as leagueFunc from "../../../src/routes/league";

let redirectMock = jest.spyOn(formHelpers, "sendChallengeRedirect").mockImplementation((id, roleSet)=>{});
let roleMock = jest.spyOn(leagueFunc, "getLeagueRole").mockImplementation((id, roleSet)=>{roleSet("owner")});
jest.mock('../../../src/components/Challenge/ChallengeScroll', () => () => {
    return (<div></div>)
});

const clickBarButton = (num) => {
    const element = screen.getByTestId("BarButtonComponent"+num);
    fireEvent.click(element);
}

describe("Test /League/LeagueChallengeList.js", () => {
    it("Test render", () => {
        render(<LeagueChallengeList>{{"id":"4"}}</LeagueChallengeList>)
    })

    it("Test click send challenge", () => {
        render(<LeagueChallengeList>{{"id":"4"}}</LeagueChallengeList>)
        clickBarButton(0);
        expect(redirectMock).toBeCalledWith("league", "4")
    })

    it("Test cannot click button due to role", () => {
        roleMock = jest.spyOn(leagueFunc, "getLeagueRole").mockImplementation((id, roleSet)=>{roleSet("participant")});
        render(<LeagueChallengeList>{{"id":"4"}}</LeagueChallengeList>)
        expect(redirectMock).not.toBeCalled
    })
});