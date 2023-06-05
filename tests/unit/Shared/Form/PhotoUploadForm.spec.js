import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import PhotoUploadForm from '../../../../src/components/Shared/Form/PhotoUploadForm';
import '@testing-library/jest-dom'
import imageFile from "../../../../src/assets/BronzeTrophy.png";
import * as userFunc from "../../../../src/routes/user";

jest.spyOn(global, 'FileReader').mockImplementation(function () {
    this.readAsDataURL = jest.fn(()=>{this.result  = "foo"});
});

let userMock = jest.spyOn(userFunc, "getUsername").mockImplementation((then)=> {
    then("ex.png");
})
describe("Test /Shared/Form/PhotoUploadForm.js", () => {
    let setPhotoMock = jest.fn();

    afterEach(()=>{
        setPhotoMock.mockClear()
    })

    it("Test render", () => {
        render(<PhotoUploadForm type = "" setPhoto={setPhotoMock}></PhotoUploadForm>)
    })


    it("Test update with image", () => {
        render(<PhotoUploadForm type = "" setPhoto={setPhotoMock}></PhotoUploadForm>)
        const element = screen.getByTestId("PhotoUploadFormUploadPhotoInput");
        fireEvent.change(element, {
            target:{
                files:[imageFile]
            }} );
        let reader = FileReader.mock.instances[0];
        expect(reader.readAsDataURL).toHaveBeenCalledWith("test-file-stub");
        reader.onload({ target: { result: 'foo' } });
        expect(setPhotoMock).toBeCalled;

    })

    it("Test update with image and error", () => {
        render(<PhotoUploadForm type = "" setPhoto={setPhotoMock}></PhotoUploadForm>)
        const element = screen.getByTestId("PhotoUploadFormUploadPhotoInput");
        fireEvent.change(element, {
            target:{
                files:[imageFile]
            }} );
        let reader = FileReader.mock.instances[0];
        expect(reader.readAsDataURL).toHaveBeenCalledWith("test-file-stub");
        expect(setPhotoMock).toBeCalled;

    })

    it("Test update without image", () => {
        render(<PhotoUploadForm type = "" setPhoto={setPhotoMock}></PhotoUploadForm>)
        const element = screen.getByTestId("PhotoUploadFormUploadPhotoInput");
        fireEvent.change(element, {
            target:{
                files:[]
            }} );
        expect(setPhotoMock).not.toBeCalled;
    })

    it("Test update with create league ", () => {
        render(<PhotoUploadForm type = "createLeague" setPhoto={setPhotoMock}></PhotoUploadForm>)
        expect(setPhotoMock).toBeCalled;
    })

    it("Test update with edit league ", () => {
        render(<PhotoUploadForm type = "editLeague" setPhoto={setPhotoMock} leagueID={"4"}></PhotoUploadForm>)
        expect(setPhotoMock).toBeCalled;
    })

    it("Test update with signUp ", () => {
        render(<PhotoUploadForm type = "signUp" setPhoto={setPhotoMock}></PhotoUploadForm>)
        expect(setPhotoMock).toBeCalled;
    })
});