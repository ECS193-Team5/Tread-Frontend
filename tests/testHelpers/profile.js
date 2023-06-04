import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom'

import * as s from "./shared";

export function setExerciseUnit(unit){
    s.enterValue("StatsExerciseSectionExerciseUnitSelect", unit)
}

export function setExerciseName(name){
    s.enterValue("StatsExerciseSectionExerciseNameSelect", name)
}