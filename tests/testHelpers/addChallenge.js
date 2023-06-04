import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom'

import * as s from "./shared";

export function clickRecommendChallenge(){
    s.clickButton("ChallengeStatsButton");
}
export function clickSubmitButton(){
    s.clickButton("ChallengeFormSubmitButton");
}

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

export function setIssueDate(value){
    s.enterValue("ExerciseDateFormIssueDateInput", value)
}

export function setDueDate(value){
    s.enterValue("ExerciseDateFormDueDateInput", value)
}

export function setRecevierGroup(value){
    s.enterValue("ExerciseReceiverFormChallengeTypeSelect", value)
}

export function setRecevier(value){
    s.enterValue("ExerciseReceiverFormReceiverSelect", value)
}

export function expectSelfSpecifyErr(value){
    s.expectText("ExerciseNameFormSpecifyError", value)
}

export function expectAmountErr(value){
    s.expectText("ExerciseAmountFormAmountError", value)
}

export function expectDateErr(value){
    s.expectText("ExerciseDateFormDueDateError", value)
}

export function expectSubmitErr(value){
    s.expectText("ChallengeFormErrorBox", value)
}

export function pressExerciseAmount(key){
    fireEvent.keyDown(screen.getByTestId("ExerciseAmountFormExerciseAmountInput"), {key:key})
}

export function pressIssueDate(key){
    fireEvent.keyDown(screen.getByTestId("ExerciseDateFormIssueDateInput"), {key:key})
}