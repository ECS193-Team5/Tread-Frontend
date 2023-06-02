import React from 'react';
import { fireEvent, render , screen} from "@testing-library/react";
import DeleteSection from '../../../src/components/ProfileSettings/DeleteSection';
import '@testing-library/jest-dom'
import * as deleteUser from "../../../src/routes/delete_user";

let deleteMock = jest.spyOn(deleteUser, "deleteUser");


const clickDelete = () =>{
    const element = screen.getByTestId("DeleteSectionDeleteAccountButton")
    fireEvent.click(element);
}

describe("Test /ProfileSettings/DeleteSection.js", () => {
    beforeEach(()=>{
        deleteMock.mockClear()
    })
    it("Test render", () => {
        render(<DeleteSection/>)
    })

    it("Test click delete and succeed", () => {
        window.prompt = jest.fn().mockImplementation(()=>{return "delete account"})
        render(<DeleteSection/>)
        clickDelete()
        expect(deleteMock).toBeCalled;
    })

    it("Test click delete and fail by an empty response", () => {
        window.prompt = jest.fn().mockImplementation(()=>{return ""})
        render(<DeleteSection/>)
        clickDelete()
        expect(deleteMock).not.toBeCalled;
    })

    it("Test click delete and fail by an wrong reponse", () => {
        window.prompt = jest.fn().mockImplementation(()=>{return "deleteaccount"})
        render(<DeleteSection/>)
        clickDelete()
        expect(deleteMock).not.toBeCalled;
    })
});