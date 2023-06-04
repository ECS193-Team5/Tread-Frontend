import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import imageFile from "../../../src/assets/BronzeTrophy.png";
import * as s from "./shared";

jest.spyOn(global, 'FileReader').mockImplementation(function () {
    this.readAsDataURL = jest.fn(()=>{this.result = "foo"});
});

export function fillPhoto () {
    const element = screen.getByTestId("PhotoUploadFormUploadPhotoInput");
    fireEvent.change(element, {
        target:{
            files:[imageFile]
        }} );
    let reader = FileReader.mock.instances[0];
    reader.onload({ target: { result: 'foo' } });
}

export function fillDisplayName(text){
    s.enterValue("DisplayNameFormDisplayNameInput", text)
}

export function clickButtonPhoto(){
    let element = screen.getByTestId("ProfileSettingsFormPhotoSubmit");
    fireEvent.click(element)
}
export function clickButtonDisplayName () {
    let element = screen.getByTestId("ProfileSettingsFormDisplayNameSubmit");
    fireEvent.click(element)
}

export function clickDelete  () {
    const element = screen.getByTestId("DeleteSectionDeleteAccountButton")
    fireEvent.click(element);
}