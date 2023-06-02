import React from 'react';
import { fireEvent, render, screen, act } from "@testing-library/react";
import LeagueForm from '../../../src/components/AddLeague/LeagueForm';
import '@testing-library/jest-dom'
import * as addLeague from "../../../src/routes/league";
import * as cssEffects from "../../../src/helpers/CssEffects";
import imageFile from "../../../../src/assets/BronzeTrophy.png";

let createLeagueMock = jest.spyOn(addLeague, "createLeague").mockImplementation((inputData, funcMove, funErr) => {});
let setLocationMock = jest.spyOn(cssEffects, "setLocation").mockImplementation(() => {});

jest.spyOn(global, 'FileReader').mockImplementation(function () {
    this.readAsDataURL = jest.fn(()=>{});
});

const setLeagueDescription = () => {
    const element = screen.getByTestId("LeagueDescriptionFormUpdateDescriptionInput");
    fireEvent.change(element, {target:{value:'exampleValidName'}});
}

const setLeagueName = () =>{
    const element = screen.getByTestId("LeagueNameFormUpdateLeagueNameInput");
        fireEvent.change(element, {target:{value:'exampleValidName'}});
}

const submitPhoto = () => {
    const element = screen.getByTestId("PhotoUploadFormUploadPhotoInput");
        fireEvent.change(element, {
            target:{
                files:[imageFile]
            }} );
}

const submitLeague = () => {
    const element = screen.getByTestId("LeagueFormButton");
    fireEvent.click(element);
}

describe("Test components/AddLeague/LeagueForm.js", () => {

    afterEach(()=>{
        setLocationMock.mockClear();
        createLeagueMock.mockClear();
    })
    it("Test render", () => {
        render(<LeagueForm/>)
    })

    it("Test create league", () => {
        render(<LeagueForm/>)
        setLeagueDescription();
        setLeagueName();
        submitLeague();
        let element = screen.getByTestId("LeagueFormButtonErrorBox");
        expect(element).toHaveTextContent("");
        expect(createLeagueMock).toHaveBeenCalled;
    })

    it("Test render fail to submit league", () => {
        render(<LeagueForm/>)
        submitLeague();
        let element = screen.getByTestId("LeagueFormButtonErrorBox");
        expect(element).toHaveTextContent("Please create a league name.Please check the league description.");
        expect(createLeagueMock).toHaveBeenCalled;
    })

    it("Test render fail to submit league", () => {
        render(<LeagueForm/>)
        submitLeague();
        let element = screen.getByTestId("LeagueFormButtonErrorBox");
        expect(element).toHaveTextContent("Please create a league name.Please check the league description.");
        expect(createLeagueMock).toHaveBeenCalled;
    })

    it("Test create league success response", () => {
        createLeagueMock.mockImplementation((arg1, then, err)=> {then()})
        render(<LeagueForm/>)
        setLeagueDescription();
        setLeagueName();
        submitLeague();
        let element = screen.getByTestId("LeagueFormButtonErrorBox");
        expect(element).toHaveTextContent("");
        expect(createLeagueMock).toHaveBeenCalled;
        expect(setLocationMock).toHaveBeenCalled;
    })

    it("Test create league failure response", () => {
        createLeagueMock.mockImplementation((arg1, then, err)=> {err()})
        render(<LeagueForm/>)
        setLeagueDescription();
        setLeagueName();
        submitLeague();
        let element = screen.getByTestId("LeagueFormButtonErrorBox");
        expect(element).toHaveTextContent("The league could not be created. Please try again later.");
        expect(createLeagueMock).toHaveBeenCalled;
    })

});