import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import LeagueObj from '../../../src/components/Social/LeagueObj';
import * as cssFunc from "../../../src/helpers/CssEffects";
import * as leagueFunc from "../../../src/routes/league";

let resultFunc = (id, then) => {then()}
let role = "admin";
let setLeagueRoleFunc = (id, process) => {process(role)}
let getLeagueRoleMock =  jest.spyOn(leagueFunc, "getLeagueRole").mockImplementation(setLeagueRoleFunc)
let leaveLeagueMock =  jest.spyOn(leagueFunc, "leaveLeague").mockImplementation(resultFunc)
let removeSelfFromAdminMock =  jest.spyOn(leagueFunc, "removeSelfFromAdmin").mockImplementation(resultFunc)
let revokeLeagueRequestMock =  jest.spyOn(leagueFunc, "revokeLeagueRequest").mockImplementation(resultFunc)
let declineLeagueInviteMock =  jest.spyOn(leagueFunc, "declineLeagueInvite").mockImplementation(resultFunc)
let acceptLeagueInviteMock =  jest.spyOn(leagueFunc, "acceptLeagueInvite").mockImplementation(resultFunc)
let setDisplayPropertyMock =  jest.spyOn(cssFunc, "setDisplayProperty").mockImplementation(()=>{})
let setLocationMock =  jest.spyOn(cssFunc, "setLocation").mockImplementation(()=>{})


const toggleButton = () =>{
    let button = screen.getByTestId("LeagueObjMoreInfoButton");
    fireEvent.click(button)
}

const hitDropdown = (num) =>{
    let button = screen.getByTestId("DropDownEntryComponentnameLeagueObj-"+num)
    fireEvent.click(button)
}

let leagueInfo = {
    _id:"1",
    leagueName:"name",
    members:["user#2225"],
    activeChallenges: 4
}

describe("Test /Social/LeagueObj.js", () => {
    beforeEach(()=>{
        getLeagueRoleMock.mockClear()
        leaveLeagueMock.mockClear()
        removeSelfFromAdminMock.mockClear()
        revokeLeagueRequestMock.mockClear()
        declineLeagueInviteMock.mockClear()
        acceptLeagueInviteMock.mockClear()
    })

    it("Test render", () => {
        render(<LeagueObj index = {""} type = "league">{leagueInfo}</LeagueObj>)
    })

    it("Test move league page", () => {
        render(<LeagueObj index = {""} type = "league">{leagueInfo}</LeagueObj>)
        let element = screen.getByTestId("LeagueObjComponentMoveLeaguePageButton");
        fireEvent.click(element);
        expect(setLocationMock).lastCalledWith("leagueDescriptionPage?=1")
    })

    it("Test render as owner", () => {
        setLeagueRoleFunc = (id, process) => {process("owner")}
        getLeagueRoleMock =  jest.spyOn(leagueFunc, "getLeagueRole").mockImplementation(setLeagueRoleFunc)

        render(<LeagueObj index = {""} type = "league">{leagueInfo}</LeagueObj>)
    })

    it("Test render as participant", () => {
        setLeagueRoleFunc = (id, process) => {process("participant")}
        getLeagueRoleMock =  jest.spyOn(leagueFunc, "getLeagueRole").mockImplementation(setLeagueRoleFunc)

        render(<LeagueObj index = {""} type = "league">{leagueInfo}</LeagueObj>)
    })

    it("Test render as admin", () => {
        setLeagueRoleFunc = (id, process) => {process("admin")}
        getLeagueRoleMock =  jest.spyOn(leagueFunc, "getLeagueRole").mockImplementation(setLeagueRoleFunc)

        render(<LeagueObj index = {""} type = "league">{leagueInfo}</LeagueObj>)
    })

    it("Test render as owner", () => {
        setLeagueRoleFunc = (id, process) => {process("owner")}
        getLeagueRoleMock =  jest.spyOn(leagueFunc, "getLeagueRole").mockImplementation(setLeagueRoleFunc)

        render(<LeagueObj index = {""} type = "sent">{leagueInfo}</LeagueObj>)
    })

    it("Test render as participant", () => {
        setLeagueRoleFunc = (id, process) => {process("participant")}
        getLeagueRoleMock =  jest.spyOn(leagueFunc, "getLeagueRole").mockImplementation(setLeagueRoleFunc)

        render(<LeagueObj index = {""} type = "sent">{leagueInfo}</LeagueObj>)
    })

    it("Test render as admin", () => {
        setLeagueRoleFunc = (id, process) => {process("admin")}
        getLeagueRoleMock =  jest.spyOn(leagueFunc, "getLeagueRole").mockImplementation(setLeagueRoleFunc)

        render(<LeagueObj index = {""} type = "sent">{leagueInfo}</LeagueObj>)
    })


    describe("Test user interactions", () =>{

        beforeEach(()=>{
            getLeagueRoleMock.mockClear()
            leaveLeagueMock.mockClear()
            removeSelfFromAdminMock.mockClear()
            revokeLeagueRequestMock.mockClear()
            declineLeagueInviteMock.mockClear()
            acceptLeagueInviteMock.mockClear()
        })

        it("Test sendChallenge", () => {
            setLeagueRoleFunc = (id, process) => {process("admin")}
            getLeagueRoleMock =  jest.spyOn(leagueFunc, "getLeagueRole").mockImplementation(setLeagueRoleFunc)

            render(<LeagueObj index = {""} type = "league">{leagueInfo}</LeagueObj>)
            toggleButton();
            hitDropdown(0);
            expect(leaveLeagueMock).toBeCalledTimes(0)
            expect(removeSelfFromAdminMock).toBeCalledTimes(0)
            expect(revokeLeagueRequestMock).toBeCalledTimes(0)
            expect(declineLeagueInviteMock).toBeCalledTimes(0)
            expect(acceptLeagueInviteMock).toBeCalledTimes(0)
        })

        it("Test leave league ", () => {
            setLeagueRoleFunc = (id, process) => {process("admin")}
            getLeagueRoleMock =  jest.spyOn(leagueFunc, "getLeagueRole").mockImplementation(setLeagueRoleFunc)

            render(<LeagueObj index = {""} type = "league">{leagueInfo}</LeagueObj>)
            toggleButton();
            hitDropdown(1);
            expect(leaveLeagueMock).toBeCalledTimes(1)
            expect(removeSelfFromAdminMock).toBeCalledTimes(0)
            expect(revokeLeagueRequestMock).toBeCalledTimes(0)
            expect(declineLeagueInviteMock).toBeCalledTimes(0)
            expect(acceptLeagueInviteMock).toBeCalledTimes(0)
            expect(leaveLeagueMock).toBeCalledWith("1", expect.any(Function))
        })

        it("Test remove self as admin ", () => {
            setLeagueRoleFunc = (id, process) => {process("admin")}
            getLeagueRoleMock =  jest.spyOn(leagueFunc, "getLeagueRole").mockImplementation(setLeagueRoleFunc)

            render(<LeagueObj index = {""} type = "league">{leagueInfo}</LeagueObj>)
            toggleButton();
            hitDropdown(2);
            expect(leaveLeagueMock).toBeCalledTimes(0)
            expect(removeSelfFromAdminMock).toBeCalledTimes(1)
            expect(revokeLeagueRequestMock).toBeCalledTimes(0)
            expect(declineLeagueInviteMock).toBeCalledTimes(0)
            expect(acceptLeagueInviteMock).toBeCalledTimes(0)
            expect(removeSelfFromAdminMock).toBeCalledWith("1", expect.any(Function))
        })

        it("Test revoke sent request", () => {
            setLeagueRoleFunc = (id, process) => {process("none")}
            getLeagueRoleMock =  jest.spyOn(leagueFunc, "getLeagueRole").mockImplementation(setLeagueRoleFunc)

            render(<LeagueObj index = {""} type = "sent">{leagueInfo}</LeagueObj>)
            toggleButton();
            hitDropdown(0);
            expect(leaveLeagueMock).toBeCalledTimes(0)
            expect(removeSelfFromAdminMock).toBeCalledTimes(0)
            expect(revokeLeagueRequestMock).toBeCalledTimes(1)
            expect(declineLeagueInviteMock).toBeCalledTimes(0)
            expect(acceptLeagueInviteMock).toBeCalledTimes(0)
            expect(revokeLeagueRequestMock).toBeCalledWith("1", expect.any(Function))
        })


        it("Test accept league invite", () => {
            setLeagueRoleFunc = (id, process) => {process("none")}
            getLeagueRoleMock =  jest.spyOn(leagueFunc, "getLeagueRole").mockImplementation(setLeagueRoleFunc)

            render(<LeagueObj index = {""} type = "invite">{leagueInfo}</LeagueObj>)
            toggleButton();
            hitDropdown(0);
            expect(leaveLeagueMock).toBeCalledTimes(0)
            expect(removeSelfFromAdminMock).toBeCalledTimes(0)
            expect(revokeLeagueRequestMock).toBeCalledTimes(0)
            expect(declineLeagueInviteMock).toBeCalledTimes(0)
            expect(acceptLeagueInviteMock).toBeCalledTimes(1)
            expect(acceptLeagueInviteMock).toBeCalledWith("1", expect.any(Function))
        })


        it("Test decline league invite", () => {
            setLeagueRoleFunc = (id, process) => {process("none")}
            getLeagueRoleMock =  jest.spyOn(leagueFunc, "getLeagueRole").mockImplementation(setLeagueRoleFunc)

            render(<LeagueObj index = {""} type = "invite">{leagueInfo}</LeagueObj>)
            toggleButton();
            hitDropdown(1);
            expect(leaveLeagueMock).toBeCalledTimes(0)
            expect(removeSelfFromAdminMock).toBeCalledTimes(0)
            expect(revokeLeagueRequestMock).toBeCalledTimes(0)
            expect(declineLeagueInviteMock).toBeCalledTimes(1)
            expect(acceptLeagueInviteMock).toBeCalledTimes(0)
            expect(declineLeagueInviteMock).toBeCalledWith("1", expect.any(Function))
        })
    })
});