import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import MedalsScroll from '../../../src/components/Profile/MedalsScroll';
import '@testing-library/jest-dom'
import * as medalsFunc from "../../../src/routes/medals";

let medalObj = {}
let getEarnedMock = jest.spyOn(medalsFunc, "getEarnedMedals").mockImplementation((func) => {func([medalObj])})
let getInProgressMock = jest.spyOn(medalsFunc, "getInProgressMedals").mockImplementation((func) => {func([medalObj])})
jest.mock('../../../src/components/Profile/MedalObj', () => ()=> {return (<div></div>)});

describe("Test /Profile/MedalsScroll.js", () => {

    beforeEach(()=>{
        getEarnedMock.mockClear();
        getInProgressMock.mockClear();
    })

    it("Test render earned scroll", () => {
        render(<MedalsScroll>{{type:"earned"}}</MedalsScroll>)
        expect(getEarnedMock).toBeCalledTimes(1);
        expect(getInProgressMock).toBeCalledTimes(0);
    })

    it("Test render progress scroll", () => {
        render(<MedalsScroll>{{type:"progress"}}</MedalsScroll>)
        expect(getEarnedMock).toBeCalledTimes(0);
        expect(getInProgressMock).toBeCalledTimes(1);
    })
});