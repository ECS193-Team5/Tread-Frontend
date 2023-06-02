import React from 'react';
import { render } from "@testing-library/react";
import AddLeague from '../../../src/pages/addLeague';
import '@testing-library/jest-dom'

jest.mock('../../../src/components/AddLeague/LeagueForm', () => () => {
    return (<div></div>)
});

jest.mock('../../../src/components/Shared/SideBar', () => () => {
    return (<div></div>)
});

describe("Test /pages/addLeague.js", () => {
    it("Test render", () => {
        render(<AddLeague />)
    })
});