import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import DisplayNameForm from '../../../../src/components/Shared/Form/DisplayNameForm';
import '@testing-library/jest-dom'

describe("Test /Shared/Form/DisplayNameForm.js", () => {
    let updateDisplayNameMock = jest.fn();

    afterEach(()=>{
        updateDisplayNameMock.mockClear()
    })

    beforeEach(()=>{
    })

    it("Test render", () => {
        render(<DisplayNameForm placeholder = {""} updateDisplayName= {updateDisplayNameMock}/>)
    })

    it("Test placeHolder has value", () => {
        render(<DisplayNameForm placeholder = {"examplePlaceholder"} updateDisplayName= {updateDisplayNameMock}/>)
        const element = screen.getByTestId("DisplayNameFormDisplayNameInput");

        expect(element.placeholder).toBe("examplePlaceholder")
    })

    it("Test enter valid display name", () => {
        render(<DisplayNameForm placeholder = {"examplePlaceholder"} updateDisplayName= {updateDisplayNameMock}/>)
        const element = screen.getByTestId("DisplayNameFormDisplayNameInput");
        fireEvent.change(element, {target:{value:'exampleValidName'}});
        expect(updateDisplayNameMock).toBeCalledWith('exampleValidName');
    })

    it("Test enter too long name", () => {
        render(<DisplayNameForm placeholder = {"examplePlaceholder"} updateDisplayName= {updateDisplayNameMock}/>)
        const element = screen.getByTestId("DisplayNameFormDisplayNameInput");
        fireEvent.change(element, {target:{value:'exampleValidNameThatISTOOLONGVERYLONGYESTOTHELONG'}});
        expect(updateDisplayNameMock).toBeCalledWith('');
        let textErrorElement = screen.getByTestId("DisplayNameFormDisplayError");
        expect(textErrorElement).toHaveTextContent("Cannot sign up, display name must be between 1-32 characters")
    })

    it("Test enter name with invalid char", () => {
        render(<DisplayNameForm placeholder = {"examplePlaceholder"} updateDisplayName= {updateDisplayNameMock}/>)
        const element = screen.getByTestId("DisplayNameFormDisplayNameInput");
        fireEvent.change(element, {target:{value:'Friend!'}});
        expect(updateDisplayNameMock).toBeCalledWith('');
        let textErrorElement = screen.getByTestId("DisplayNameFormDisplayError");
        expect(textErrorElement).toHaveTextContent("Display Name input must only have alphanumeric characters and spaces")
    })

});