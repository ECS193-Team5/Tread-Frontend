import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import PhotoUploadForm from '../../../../src/components/Shared/Form/PhotoUploadForm';
import '@testing-library/jest-dom'
import imageFile from "../../../../src/assets/BronzeTrophy.png";

jest.spyOn(global, 'FileReader').mockImplementation(function () {
    this.readAsDataURL = jest.fn(()=>{this.result  = "foo"});
});
describe("Test /Shared/Form/PhotoUploadForm.js", () => {
    let setPhotoMock = jest.fn();

    afterEach(()=>{
        setPhotoMock.mockClear()
    })

    it("Test render", () => {
        render(<PhotoUploadForm>{{ "default": "", "func": setPhotoMock }}</PhotoUploadForm>)
    })

    it("Test update with image", () => {
        render(<PhotoUploadForm>{{ "default": "", "func": setPhotoMock }}</PhotoUploadForm>)
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
        render(<PhotoUploadForm>{{ "default": "", "func": setPhotoMock }}</PhotoUploadForm>)
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
        render(<PhotoUploadForm>{{ "default": "", "func": setPhotoMock }}</PhotoUploadForm>)
        const element = screen.getByTestId("PhotoUploadFormUploadPhotoInput");
        fireEvent.change(element, {
            target:{
                files:[]
            }} );
        expect(setPhotoMock).not.toBeCalled;
    })

});