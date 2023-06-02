import React from 'react';
import { render } from "@testing-library/react";
import League from "../../../src/pages/league";
import '@testing-library/jest-dom'

jest.mock('../../../src/components/Shared/Header', () => ()=> {return (<div></div>)});
jest.mock('../../../src/components/Shared/SideBar', () => ()=> {return (<div></div>)});
jest.mock('../../../src/components/League/LeagueEditForm', () => ()=> {return (<div></div>)});
jest.mock('../../../src/components/League/LeagueHeader', () => ()=> {return (<div></div>)});
jest.mock('../../../src/components/League/LeagueChallengeList', () => ()=> {return (<div></div>)});
jest.mock('../../../src/components/League/LeagueMemberSection', () => ()=> {return (<div></div>)});
jest.mock('../../../src/components/League/LeagueLeaderboard', () => ()=> {return (<div></div>)});

describe("Test /pages/challenge.js", () => {
    it("Test render description page", () => {
        render(<League>{{"type":"description", "id":"4"}}</League>)
    })

    it("Test render member page", () => {
        render(<League>{{"type":"member", "id":"4"}}</League>)
    })

    it("Test render edit page", () => {
        render(<League>{{"type":"edit", "id":"4"}}</League>)
    })
});