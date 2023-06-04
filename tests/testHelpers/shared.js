import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom'

export function clickButton (buttonID) {
    let button = screen.getByTestId(buttonID);
    fireEvent.click(button);
}

export function enterValue(itemID, value) {
    let element = screen.getByTestId(itemID);
    fireEvent.change(element, {target:{value:value}})
}

export function expectText(itemId, text) {
    let element = screen.getByTestId(itemId);
    expect(element.textContent).toBe(text);
}

export function clickSideBarChallenges(){
    clickButton("SideBarChallengesButton")
}

export function clickSideBarSocial(){
    clickButton("SideBarSocialPageButton")
}

export function clickSideBarExerciseHistory(){
    clickButton("SideBarExerciseHistoryButton")
}

export function clickSideBarProfileSettings(){
    clickButton("SideBarProfileSettingsButton")
}

export function clickBarButton(num){
    clickButton("BarButtonComponent"+num)
}