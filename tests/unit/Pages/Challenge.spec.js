import React from 'react';
import { render } from "@testing-library/react";
import Challenge from "../../../src/pages/challenge";
import '@testing-library/jest-dom'

jest.mock('../../../src/components/Shared/Header', () => ()=> {return (<div></div>)});
jest.mock('../../../src/components/Shared/SideBar', () => ()=> {return (<div></div>)});
jest.mock('../../../src/components/Challenge/AddExerciseBox', () => ()=> {return (<div></div>)});
jest.mock('../../../src/components/Challenge/CurrentChallenge', () => ()=> {return (<div></div>)});
jest.mock('../../../src/components/Challenge/GlobalChallenge', () => ()=> {return (<div></div>)});

describe("Test /pages/challenge.js", () => {
    it("Test render current", () => {
        render(<Challenge>{{"type":"current"}}</Challenge>)
    })

    it("Test render global", () => {
        render(<Challenge>{{"type":"global"}}</Challenge>)
    })
});