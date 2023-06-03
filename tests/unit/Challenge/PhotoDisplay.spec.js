import React from 'react';
import { render } from "@testing-library/react";
import PhotoDisplay from '../../../src/components/Challenge/PhotoDisplay';
import '@testing-library/jest-dom'


describe("Test /Challenge/PhotoDisplay.js", () => {
    let photoList;
    it("Test render", () => {
        render(<PhotoDisplay index = "0" photos = {photoList}/>)
    })

    it("Test list length greater than 3", () => {
        let photoList = ["username#2224", "user#4444", "file#4444", "pokemon#4455"];
        render(<PhotoDisplay index = "0" photos = {photoList}/>)
    })

    it("Test list length less than 3", () => {
        let photoList = ["username#2224", "user#4444"];
        render(<PhotoDisplay index = "0" photos = {photoList}/>)
    })
});