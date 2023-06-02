import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import LeagueNameForm from '../../../../src/components/Shared/Form/LeagueNameForm';
import '@testing-library/jest-dom'

describe("Test /Shared/Form/LeagueNameForm.js", () => {
    let updateLeagueNameMock = jest.fn();

    afterEach(()=>{
        updateLeagueNameMock.mockClear()
    })

    beforeEach(()=>{
    })

    it("Test render", () => {
        render(<LeagueNameForm updateLeagueName= {updateLeagueNameMock}/>)
    })

    it("Test enter valid name", () => {
        render(<LeagueNameForm updateLeagueName= {updateLeagueNameMock}/>)
        const element = screen.getByTestId("LeagueNameFormUpdateLeagueNameInput");
        fireEvent.change(element, {target:{value:'exampleValidName'}});
        expect(updateLeagueNameMock).toBeCalledWith('exampleValidName');
    })

    it("Test enter too long name", () => {
        render(<LeagueNameForm  updateLeagueName= {updateLeagueNameMock}/>)
        const element = screen.getByTestId("LeagueNameFormUpdateLeagueNameInput");
        fireEvent.change(element, {target:{value:'exampleValidNameThatISTOOLONGVERYLONGYESTOTHELONGooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo'}});
        expect(updateLeagueNameMock).toBeCalledWith('');
        let textErrorElement = screen.getByTestId("LeagueNameFormNameError");
        expect(textErrorElement).toHaveTextContent("Cannot create league, League Name must be between 1-32 characters")
    })

    it("Test enter too long name", () => {
        render(<LeagueNameForm  updateLeagueName= {updateLeagueNameMock}/>)
        const element = screen.getByTestId("LeagueNameFormUpdateLeagueNameInput");
        fireEvent.change(element, {target:{value:'\t\t'}});
        expect(updateLeagueNameMock).toBeCalledWith('');
        let textErrorElement = screen.getByTestId("LeagueNameFormNameError");
        expect(textErrorElement).toHaveTextContent("Cannot create league, League Name cannot be a string of spaces.")
    })

    it("Test empty description", () => {
        render(<LeagueNameForm  updateLeagueName= {updateLeagueNameMock}/>)
        const element = screen.getByTestId("LeagueNameFormUpdateLeagueNameInput");
        fireEvent.change(element, {target:{value:'f'}});
        fireEvent.change(element, {target:{value:''}});
        expect(updateLeagueNameMock).toBeCalledWith('');
        let textErrorElement = screen.getByTestId("LeagueNameFormNameError");
        expect(textErrorElement).toHaveTextContent("Cannot create league, League Name must be between 1-32 characters")
    })

    it("Test default description", () => {
        render(<LeagueNameForm defaultValue = {"examplePlaceholder"} updateLeagueName= {updateLeagueNameMock}/>)
        expect(updateLeagueNameMock).not.toBeCalled;
        let textErrorElement = screen.getByTestId("LeagueNameFormNameError");
        expect(textErrorElement).toHaveTextContent("")
    })

});