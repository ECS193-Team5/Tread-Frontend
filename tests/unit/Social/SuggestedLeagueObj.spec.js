import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import SuggestedLeagueObj from '../../../src/components/Social/SuggestedLeagueObj';
import '@testing-library/jest-dom'
import * as leagueFunc from "../../../src/routes/league";

let successfunction = (data, then , err) => {then()};
let sendLeagueRequestMock = jest.spyOn(leagueFunc, "sendLeagueRequest").mockImplementation(successfunction);
let updateParentMock = jest.fn();

describe("Test /Social/SuggestedLeagueObj.js", () => {

    beforeEach(()=>{
        sendLeagueRequestMock.mockClear();
        updateParentMock.mockClear();
    })

    it("Test render", () => {
        render(<SuggestedLeagueObj updateObjList = {updateParentMock} index = "4">{{"_id":4, "leagueName":"name"}}</SuggestedLeagueObj>)
        let element = screen.getByTestId("SuggestedLeagueObjLeagueName4");
        expect(element).toHaveTextContent("name")
        expect(updateParentMock).toBeCalledTimes(0);
    })

    it("Test succesful send", () => {
        render(<SuggestedLeagueObj updateObjList = {updateParentMock} index = "4">{{"_id":4, "leagueName":"name"}}</SuggestedLeagueObj>)
        let element = screen.getByTestId("SuggestedLeagueObjRequestJoinLeagueButton4");
        fireEvent.click(element);
        expect(updateParentMock).toBeCalledTimes(1);
    })

});