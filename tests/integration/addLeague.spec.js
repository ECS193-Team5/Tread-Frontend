import React from 'react';
import { render, fireEvent, screen } from "@testing-library/react";
import AddLeague from '../../src/pages/addLeague';
import '@testing-library/jest-dom'
import * as addLeague from "../../src/routes/league";
import { setLeagueDescription, setLeagueName, setLeagueType, setPhoto, submitLeague, checkSubmitErr, checkDescriptionErr, checkNameErr, setPhotoBlank } from '../testHelpers/addLeague';

jest.spyOn(global, 'FileReader').mockImplementation(function () {
    this.readAsDataURL = jest.fn(()=>{this.result = "foo"});
});
let createLeagueMock = jest.spyOn(addLeague, "createLeague").mockImplementation((inputData, funcMove, funErr) => {funcMove()});


describe("Test pages/addLeague", () => {
    afterEach(()=>{
        createLeagueMock.mockClear();
    })

    it("Test render", () => {
        render(<AddLeague/>)
    })

    describe("Test succesful submissions", () =>{
        it("Test public league", () => {
            render(<AddLeague/>)
            setPhoto();
            setLeagueName("name");
            setLeagueDescription("description");
            setLeagueType("public");
            submitLeague();
            checkDescriptionErr("")
            checkNameErr("")
            checkSubmitErr("")
        });

        it("Test private league", () => {
            render(<AddLeague/>)
            setPhoto();
            setLeagueName("name");
            setLeagueDescription("description");
            setLeagueType("private");
            submitLeague();
            checkDescriptionErr("")
            checkNameErr("")
            checkSubmitErr("")
        });


        it("Test use default photo", () => {
            render(<AddLeague/>)
            setLeagueName("name");
            setLeagueDescription("description");
            setLeagueType("private");
            submitLeague();
            checkDescriptionErr("")
            checkNameErr("")
            checkSubmitErr("")
        });

        it("Test set blank photo", () => {
            render(<AddLeague/>)
            setPhotoBlank();
            setLeagueName("name");
            setLeagueDescription("description");
            setLeagueType("private");
            submitLeague();
            checkDescriptionErr("")
            checkNameErr("")
            checkSubmitErr("")
        });
    })

    describe("Test failed submissions", () =>{
        it("Test public league", () => {
            createLeagueMock.mockImplementation((item, then, err)=>{err()})
            render(<AddLeague/>)
            submitLeague();
            checkDescriptionErr("")
            checkNameErr("")
            checkSubmitErr("Please create a league name.Please check the league description.")
        });

        it("Test fail request", () => {
            createLeagueMock.mockImplementation((item, then, err)=>{err()})
            render(<AddLeague/>)
            setPhoto();
            setLeagueName("name");
            setLeagueDescription("description");
            setLeagueType("private");
            submitLeague();
            checkDescriptionErr("")
            checkNameErr("")
            checkSubmitErr("The league could not be created. Please try again later.")
        });
    })
});