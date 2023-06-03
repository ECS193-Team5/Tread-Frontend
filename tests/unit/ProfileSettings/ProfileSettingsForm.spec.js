import React from 'react';
import { fireEvent, render , screen} from "@testing-library/react";
import ProfileSettingsForm from '../../../src/components/ProfileSettings/ProfileSettingsForm';
import '@testing-library/jest-dom'
import * as userFunc from "../../../src/routes/user";

let updateUserPictureMock = jest.spyOn(userFunc, "updateUserPicture").mockImplementation(()=>{});
let updateUserDisplayNameMock = jest.spyOn(userFunc, "updateDisplayName").mockImplementation(()=>{});

const clickButtonPhoto = () =>{
    let element = screen.getByTestId("ProfileSettingsFormPhotoSubmit");
    fireEvent.click(element)
}

const clickButtonDisplayName = () =>{
    let element = screen.getByTestId("ProfileSettingsFormDisplayNameSubmit");
    fireEvent.click(element)
}

describe("Test /ProfileSettings/ProfileSettingsForm.js", () => {
    beforeEach(()=>{
        updateUserPictureMock.mockClear()
        updateUserDisplayNameMock.mockClear()
    })

    it("Test render", () => {
        render(<ProfileSettingsForm>{{"displayName":"myname"}}</ProfileSettingsForm>)
    })

    it("Test update photo with none", () => {
        render(<ProfileSettingsForm>{{"displayName":"myname"}}</ProfileSettingsForm>)
        clickButtonPhoto();
        expect(updateUserPictureMock).not.toHaveBeenCalled;
        expect(updateUserDisplayNameMock).not.toHaveBeenCalled;
    })

    it("Test update display name with value", () => {
        render(<ProfileSettingsForm>{{"displayName":"myname"}}</ProfileSettingsForm>)
        clickButtonDisplayName();
        expect(updateUserPictureMock).toBeCalledTimes(0);
        expect(updateUserDisplayNameMock).toBeCalledTimes(1);
    })

    it("Test update display name with no value", () => {
        render(<ProfileSettingsForm>{{"displayName":"myname"}}</ProfileSettingsForm>)
        const element = screen.getByTestId("DisplayNameFormDisplayNameInput");
        fireEvent.change(element, {target:{value:'exampleValidNameThatISTOOLONGVERYLONGYESTOTHELONG'}});
        clickButtonDisplayName();
        expect(updateUserPictureMock).toBeCalledTimes(0);
        expect(updateUserDisplayNameMock).toBeCalledTimes(0);
    })
});