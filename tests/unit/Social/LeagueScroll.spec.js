import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import LeagueScroll from '../../../src/components/Social/LeagueScroll';
import '@testing-library/jest-dom'
import * as leagueFunc from "../../../src/routes/league";

let socialObj = {}
let getAllMock = jest.spyOn(leagueFunc, "getAll").mockImplementation((func) => {func([socialObj])})
let getSentMock = jest.spyOn(leagueFunc, "getSent").mockImplementation((func) => {func([socialObj])})
let getInviteMock = jest.spyOn(leagueFunc, "getInvite").mockImplementation((func) => {func([socialObj])})
let getAdminMock = jest.spyOn(leagueFunc, "getAdmin").mockImplementation((func) => {func([socialObj])})
jest.mock('../../../src/components/Social/LeagueObj', () => ()=> {return (<div></div>)});

describe("Test /Social/LeagueScroll.js", () => {

    beforeEach(()=>{
        getAllMock.mockClear();
        getSentMock.mockClear();
        getInviteMock.mockClear();
        getAdminMock.mockClear();
    })

    it("Test render", () => {
        render(<LeagueScroll/>)
    })

    it("Test renderleague scroll", () => {
        render(<LeagueScroll type = "league"/>)
        expect(getAllMock).toBeCalledTimes(1);
        expect(getSentMock).toBeCalledTimes(0);
        expect(getInviteMock).toBeCalledTimes(0);
        expect(getAdminMock).toBeCalledTimes(0);
    })

    it("Test render sent scroll", () => {
        render(<LeagueScroll type = "sent"/>)
        expect(getAllMock).toBeCalledTimes(0);
        expect(getSentMock).toBeCalledTimes(1);
        expect(getInviteMock).toBeCalledTimes(0);
        expect(getAdminMock).toBeCalledTimes(0);
    })

    it("Test render invite scroll", () => {
        render(<LeagueScroll type = "invite"/>)
        expect(getAllMock).toBeCalledTimes(0);
        expect(getSentMock).toBeCalledTimes(0);
        expect(getInviteMock).toBeCalledTimes(1);
        expect(getAdminMock).toBeCalledTimes(0);
    })

    it("Test render admin scroll", () => {
        render(<LeagueScroll type = "admin"/>)
        expect(getAllMock).toBeCalledTimes(0);
        expect(getSentMock).toBeCalledTimes(0);
        expect(getInviteMock).toBeCalledTimes(0);
        expect(getAdminMock).toBeCalledTimes(1);
    })

    it("Test render with no items", () => {
        getAdminMock = jest.spyOn(leagueFunc, "getAdmin").mockImplementation((func) => {func([])})

        render(<LeagueScroll type = "admin"/>)
        expect(getAllMock).toBeCalledTimes(0);
        expect(getSentMock).toBeCalledTimes(0);
        expect(getInviteMock).toBeCalledTimes(0);
        expect(getAdminMock).toBeCalledTimes(1);
    })
});