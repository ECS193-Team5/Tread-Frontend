import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom'

import * as s from "./shared";

export function clickMemberPage(){
    s.clickButton("PageSwitchMemberButton");
}

export function clickDescriptionPage(){
    s.clickButton("PageSwitchDescriptionButton");
}

export function toggleButton (num) {
    let button = screen.getByTestId("MemberEntryMoreInfoButton"+num);
    fireEvent.click(button)
}

export function hitDropdown (username, num) {
    let button = screen.getByTestId("DropDownEntryComponent"+username+ "MemberEntry-"+num)
    fireEvent.click(button)
}