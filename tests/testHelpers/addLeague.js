import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import imageFile from "../../../src/assets/BronzeTrophy.png";
import * as s from "./shared";

export function submitLeague(){
    s.clickButton("LeagueFormButton")
}

export function setPhoto(){
    const element = screen.getByTestId("PhotoUploadFormUploadPhotoInput");
    fireEvent.change(element, {
        target:{
            files:[imageFile]
        }} );
    let reader = FileReader.mock.instances[0];
    reader.onload({ target: { result: 'foo' } });
}

export function setPhotoBlank(){
    const element = screen.getByTestId("PhotoUploadFormUploadPhotoInput");
    fireEvent.change(element, {
        target:{
            files:[]
        }} );
}

export function setLeagueName(value){
    s.enterValue("LeagueNameFormUpdateLeagueNameInput", value)
}

export function setLeagueDescription(value){
    s.enterValue("LeagueDescriptionFormUpdateDescriptionInput", value)
}

export function setLeagueType(type){
    s.enterValue("LeagueTypeFormUpdateLeagueTypeSelect", type)
}

export function checkNameErr(text){
    s.expectText("LeagueNameFormNameError", text)
}

export function checkDescriptionErr(text){
    s.expectText("LeagueDescriptionFormDescriptionError", text)
}

export function checkSubmitErr(text){
    s.expectText("LeagueFormButtonErrorBox", text)
}