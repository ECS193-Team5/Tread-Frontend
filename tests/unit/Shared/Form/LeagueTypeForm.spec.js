import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import LeagueTypeForm from '../../../../src/components/Shared/Form/LeagueTypeForm';
import '@testing-library/jest-dom'

describe("Test /Shared/Form/LeagueTypeForm.js", () => {
    let updateLeagueTypeMock = jest.fn();

    afterEach(()=>{
        updateLeagueTypeMock.mockClear()
    })

    it("Test render", () => {
        render(<LeagueTypeForm updateLeagueType= {updateLeagueTypeMock}/>)
    })

    it("Test update with value private", () => {
        render(<LeagueTypeForm updateLeagueType= {updateLeagueTypeMock}/>)
        const element = screen.getByTestId("LeagueTypeFormUpdateLeagueTypeSelect");
        fireEvent.change(element, {target:{value:'private'}});
        expect(updateLeagueTypeMock).toBeCalledWith("private");
    })

    it("Test update with value public", () => {
        render(<LeagueTypeForm updateLeagueType= {updateLeagueTypeMock}/>)
        const element = screen.getByTestId("LeagueTypeFormUpdateLeagueTypeSelect");
        fireEvent.change(element, {target:{value:'public'}});
        expect(updateLeagueTypeMock).toBeCalledWith("public");
    })

    it("Test default value render", () => {
        render(<LeagueTypeForm defaultValue = {"public"} updateLeagueType= {updateLeagueTypeMock}/>)
    })

});