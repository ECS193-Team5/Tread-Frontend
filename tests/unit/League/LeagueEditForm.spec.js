import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import LeagueEditForm from '../../../src/components/League/LeagueEditForm';
import * as cssFunc from "../../../src/helpers/CssEffects";
import * as leagueFunc from "../../../src/routes/league";

let leagueInfo = {data:{"leagueName":"name", "leagueDescription":"description", "leagueType":"public"}}
let getLeagueInfoMock =  jest.spyOn(leagueFunc, "getLeagueInfo").mockImplementation((id, func)=>{func(leagueInfo)})
let updateLeagueDescriptionMock =  jest.spyOn(leagueFunc, "updateLeagueDescription").mockImplementation(()=>{})
let updateLeaguePhotoMock =  jest.spyOn(leagueFunc, "updateLeaguePhoto").mockImplementation(()=>{})
let updateLeagueNameMock =  jest.spyOn(leagueFunc, "updateLeagueName").mockImplementation(()=>{})
let updateLeagueTypeMock =  jest.spyOn(leagueFunc, "updateLeagueType").mockImplementation(()=>{})
let deleteLeagueMock =  jest.spyOn(leagueFunc, "deleteLeague").mockImplementation((id, then, err)=>{then()})
let setLocationMock = jest.spyOn(cssFunc, "setLocation").mockImplementation((id, roleSet)=>{});

jest.spyOn(global, 'FileReader').mockImplementation(function () {
    this.readAsDataURL = jest.fn(()=>{this.result = "foo"});
});


import imageFile from "../../../../src/assets/BronzeTrophy.png";

const deleteLeague = (num) => {
    const element = screen.getByTestId("LeagueEditFormDeleteButton");
    window.prompt = jest.fn().mockImplementation(()=>{return "delete league"})
    fireEvent.click(element);
}

const submitButton = () => {
    const element = screen.getByTestId("LeagueEditFormSubmitButton");
    fireEvent.click(element);
}

describe("Test /League/LeagueEditForm.js", () => {
    beforeEach(()=>{
        setLocationMock.mockClear()
    })
    it("Test render", () => {
        render(<LeagueEditForm>{{"id":"4"}}</LeagueEditForm>)
    })

    it("Test delete league", () => {
        render(<LeagueEditForm>{{"id":"4"}}</LeagueEditForm>)
        deleteLeague();
        expect(setLocationMock).toBeCalledWith("./SocialLeaguePage")
    })

    it("Test delete league", () => {
        render(<LeagueEditForm>{{"id":"4"}}</LeagueEditForm>)
        deleteLeague();
        expect(setLocationMock).toBeCalledWith("./SocialLeaguePage")
        expect(screen.getByTestId("LeagueEditFormDeleteError")).toHaveTextContent("");
    })

    it("Test delete league err", () => {
        deleteLeagueMock =  jest.spyOn(leagueFunc, "deleteLeague").mockImplementation((id, then, err)=>{err()})
        render(<LeagueEditForm>{{"id":"4"}}</LeagueEditForm>)
        deleteLeague();
        expect(setLocationMock).not.toBeCalled();
        expect(screen.getByTestId("LeagueEditFormDeleteError")).toHaveTextContent("Could not delete league. Please refresh the page or try again later.");
    })

    it("Test delete league but change mind", () => {
        deleteLeagueMock =  jest.spyOn(leagueFunc, "deleteLeague").mockImplementation((id, then, err)=>{err()})
        render(<LeagueEditForm>{{"id":"4"}}</LeagueEditForm>)
        const element = screen.getByTestId("LeagueEditFormDeleteButton");
        window.prompt = jest.fn().mockImplementation(()=>{return "no delete league"})
        fireEvent.click(element);
        expect(setLocationMock).not.toBeCalled();
        expect(screen.getByTestId("LeagueEditFormDeleteError")).toHaveTextContent("");
    })


    it("Test update with no info", () => {
        render(<LeagueEditForm>{{"id":"4"}}</LeagueEditForm>)
        submitButton()
    })

    it("Test update with info", () => {
        render(<LeagueEditForm>{{"id":"4"}}</LeagueEditForm>)
        const elementT = screen.getByTestId("LeagueTypeFormUpdateLeagueTypeSelect");
        fireEvent.change(elementT, {target:{value:'private'}});
        const elementD = screen.getByTestId("LeagueDescriptionFormUpdateDescriptionInput");
        fireEvent.change(elementD, {target:{value:'exampleValidName'}});
        const elementN = screen.getByTestId("LeagueNameFormUpdateLeagueNameInput");
        fireEvent.change(elementN, {target:{value:'exampleValidName'}});
        submitButton()
        expect(updateLeagueDescriptionMock).toBeCalled();
        expect(updateLeagueNameMock).toBeCalled();
        expect(updateLeagueTypeMock).toBeCalled();
    })

    it("Test update with info and picture", () => {
        render(<LeagueEditForm>{{"id":"4"}}</LeagueEditForm>)
        const element = screen.getByTestId("PhotoUploadFormUploadPhotoInput");
        fireEvent.change(element, {
            target:{
                files:[imageFile]
            }} );
        let reader = FileReader.mock.instances[0];
        reader.onload({ target: { result: 'foo' } });
        const elementT = screen.getByTestId("LeagueTypeFormUpdateLeagueTypeSelect");
        fireEvent.change(elementT, {target:{value:'private'}});
        const elementD = screen.getByTestId("LeagueDescriptionFormUpdateDescriptionInput");
        fireEvent.change(elementD, {target:{value:'exampleValidName'}});
        const elementN = screen.getByTestId("LeagueNameFormUpdateLeagueNameInput");
        fireEvent.change(elementN, {target:{value:'exampleValidName'}});


        submitButton()
        expect(updateLeagueDescriptionMock).toBeCalled();
        expect(updateLeagueNameMock).toBeCalled();
        expect(updateLeagueTypeMock).toBeCalled();
    })
});