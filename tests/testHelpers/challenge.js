import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom'

import * as s from "./shared";

export function setExercise(value){
    s.enterValue("ExerciseNameFormAddChallengeExerciseNameSelect", value)
}

export function setSelfSpecify(value){
    setExercise("Enter Your Own");
    s.enterValue("ExerciseNameFormAddChallengeSelfSpecifyExerciseNameInput", value)
}

export function setAmount(value){
    s.enterValue("ExerciseAmountFormExerciseAmountInput", value)
}

export function setUnit(value){
    s.enterValue("ExerciseAmountFormUnitSelect", value)
}

export function setLoggedDate(value){
    s.enterValue("ExerciseLoggedDateFormDateInput", value)
}

export function showExerciseBox(){
    s.clickButton("AddExerciseBoxToggleShowStateButton");
}

export function submitExercise(){
    s.clickButton("AddExerciseBoxSubmitExerciseButton");
}

export function showDropDownUserSettings(){
    s.clickButton("UserSettingsButtonUserDropDown");
}

export function logout(){
    s.clickButton("UserSettingsButtonUserDropDown");
    s.clickButton("DropDownEntryDropDownTextuserSettingsDropDown-0");
}

export function setCurrentPage(){
    s.clickBarButton(0);
}

export function setSentPage(){
    s.clickBarButton(1);
}

export function setReceivedPage(){
    s.clickBarButton(2);
}

export function setSendChallengePage(){
    s.clickBarButton(3);
}

export function clickCurrentPage(){
    s.clickButton("PageSwitchCurrentButton");
}

export function clickGlobalPage(){
    s.clickButton("PageSwitchGlobalButton");
}

export function showChallengeLeaderboard(){
    s.clickButton("IssuedChallengeObjToggleStateButton0")
}

export function showGlobalChallengeLeaderboard(){
    s.clickButton("GlobalChallengeObjToggleStateButton0")
}

export function clickDeclineChallenge(){
    s.clickButton("DeclineChallengeButtonComponent0")
}

export function clickDeleteChallenge(){
    s.clickButton("DeleteChallengeButtonComponent0")
}

export function clickAcceptChallenge(){
    s.clickButton("AcceptChallengeButtonComponent0")
}

export function enterKeyLoggedDate(key){
    fireEvent.keyDown(screen.getByTestId("ExerciseLoggedDateFormDateInput"), {key:key})
}

export function checkSubmitErr(text){
    s.expectText("AddExerciseBoxErrorBox", text)
}