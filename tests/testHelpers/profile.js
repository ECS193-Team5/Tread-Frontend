import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom'

import * as s from "./shared";

export function setExerciseUnit(unit){
    s.enterValue("StatsExerciseSectionExerciseUnitSelect", unit)
}

export function setExerciseName(name){
    s.enterValue("StatsExerciseSectionExerciseNameSelect", name)
}

export function setEarnedMedals(name){
    s.clickBarButton(0);
}

export function setInProgressMedals(name){
    s.clickBarButton(1);
}

export function clickMedalsPage(){
    s.clickButton("PageSwitchMedalButton");
}

export function clickStatsPage(){
    s.clickButton("PageSwitchStatsButton");
}