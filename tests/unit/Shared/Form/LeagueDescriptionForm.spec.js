import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import LeagueDescriptionForm from '../../../../src/components/Shared/Form/LeagueDescriptionForm';
import '@testing-library/jest-dom'

describe("Test /Shared/Form/LeagueDescriptionForm.js", () => {
    let updateDescriptionMock = jest.fn();

    afterEach(()=>{
        updateDescriptionMock.mockClear()
    })

    it("Test render", () => {
        render(<LeagueDescriptionForm updateDescription= {updateDescriptionMock}/>)
    })

    it("Test enter valid description", () => {
        render(<LeagueDescriptionForm updateDescription= {updateDescriptionMock}/>)
        const element = screen.getByTestId("LeagueDescriptionFormUpdateDescriptionInput");
        fireEvent.change(element, {target:{value:'exampleValidName'}});
        expect(updateDescriptionMock).toBeCalledWith('exampleValidName');
    })

    it("Test enter too long name", () => {
        render(<LeagueDescriptionForm  updateDescription= {updateDescriptionMock}/>)
        const element = screen.getByTestId("LeagueDescriptionFormUpdateDescriptionInput");
        fireEvent.change(element, {target:{value:'exampleValidNameThatISTOOLONGVERYLONGYESTOTHELONGooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo'}});
        expect(updateDescriptionMock).toBeCalledWith('');
        let textErrorElement = screen.getByTestId("LeagueDescriptionFormDescriptionError");
        expect(textErrorElement).toHaveTextContent("League description is too long. Please limit to 255 characters.")
    })


    it("Test empty description", () => {
        render(<LeagueDescriptionForm  updateDescription= {updateDescriptionMock}/>)
        const element = screen.getByTestId("LeagueDescriptionFormUpdateDescriptionInput");
        fireEvent.change(element, {target:{value:'f'}});
        fireEvent.change(element, {target:{value:''}});
        expect(updateDescriptionMock).toBeCalledWith('');
        let textErrorElement = screen.getByTestId("LeagueDescriptionFormDescriptionError");
        expect(textErrorElement).toHaveTextContent("Need to fill in a description.")
    })

    it("Test default description", () => {
        render(<LeagueDescriptionForm defaultValue = {"examplePlaceholder"} updateDescription= {updateDescriptionMock}/>)
        expect(updateDescriptionMock).not.toBeCalled;
        let textErrorElement = screen.getByTestId("LeagueDescriptionFormDescriptionError");
        expect(textErrorElement).toHaveTextContent("")
    })

});