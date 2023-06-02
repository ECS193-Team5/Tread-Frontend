import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import UsernameForm from '../../../../src/components/Shared/Form/UsernameForm';
import '@testing-library/jest-dom'

describe("Test /Shared/Form/UsernameForm.js", () => {
    let updateUsernameMock = jest.fn();

    afterEach(()=>{
        updateUsernameMock.mockClear()
    })

    beforeEach(()=>{
    })

    it("Test render", () => {
        render(<UsernameForm updateUsername= {updateUsernameMock}/>)
    })

    it("Test enter valid username", () => {
        render(<UsernameForm placeholder = {"examplePlaceholder"} updateUsername= {updateUsernameMock}/>)
        const element = screen.getByTestId("UsernameFormUsernameInput");
        fireEvent.change(element, {target:{value:'exampleValidName'}});
        expect(updateUsernameMock).toBeCalledWith('exampleValidName');
    })

    it("Test enter too long name", () => {
        render(<UsernameForm placeholder = {"examplePlaceholder"} updateUsername= {updateUsernameMock}/>)
        const element = screen.getByTestId("UsernameFormUsernameInput");
        fireEvent.change(element, {target:{value:'exampleValidNameThatISTOOLONGVERYLONGYESTOTHELONG'}});
        expect(updateUsernameMock).toBeCalledWith('');
        let textErrorElement = screen.getByTestId("UsernameFormUsernameError");
        expect(textErrorElement).toHaveTextContent("Cannot sign up, username needs to be between 1-32 characters")
    })

    it("Test enter name with invalid char", () => {
        render(<UsernameForm placeholder = {"examplePlaceholder"} updateUsername= {updateUsernameMock}/>)
        const element = screen.getByTestId("UsernameFormUsernameInput");
        fireEvent.change(element, {target:{value:'Friend!'}});
        expect(updateUsernameMock).toBeCalledWith('');
        let textErrorElement = screen.getByTestId("UsernameFormUsernameError");
        expect(textErrorElement).toHaveTextContent("Cannot sign up, username should be alphanumeric")
    })

});