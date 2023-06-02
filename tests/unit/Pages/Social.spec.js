import React from 'react';
import { render } from "@testing-library/react";
import Social from "../../../src/pages/social";
import '@testing-library/jest-dom'

jest.mock('../../../src/components/Shared/Header', () => ()=> {return (<div></div>)});
jest.mock('../../../src/components/Shared/SideBar', () => ()=> {return (<div></div>)});
jest.mock('../../../src/components/Social/FriendSection', () => ()=> {return (<div></div>)});
jest.mock('../../../src/components/Social/LeagueSection', () => ()=> {return (<div></div>)});
jest.mock('../../../src/components/Social/Rowbox', () => ()=> {return (<div></div>)});

describe("Test /pages/challenge.js", () => {
    it("Test render friend page", () => {
        render(<Social>{{"type":"friend"}}</Social>)
    })

    it("Test render league page", () => {
        render(<Social>{{"type":"league"}}</Social>)
    })

});