import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import StatsExerciseSection from "../../../src/components/Profile/StatsExerciseSection";
import * as statsFunc from "../../../src/routes/statistics";

jest.mock('../../../src/components/Profile/StatsDownloadSection', () => ()=> {return (<div></div>)});
jest.mock('react-chartjs-2', () => ({
    Bar: () => null
  }));

let exerciseData = [{"loggedDate":"4Tw", "postedDate":"4Tw", "exercise":{exerciseName:"Baseball", amount:10, "unit":"m"}},
{"loggedDate":"4Tw", "postedDate":"4Tw", "exercise":{exerciseName:"Baseball", amount:10, "unit":"min"}},
{"loggedDate":"4Tw", "postedDate":"4Tw", "exercise":{exerciseName:"Baseball", amount:10, "unit":"ct"}},
{"loggedDate":"4Tw", "postedDate":"4Tw", "exercise":{exerciseName:"Hockey", amount:10, "unit":"m"}}]
let getPastExercsiesMock = jest.spyOn(statsFunc, "getPastExercises").mockImplementation((func) => {func(exerciseData)});

describe("Test /Profile/StatsDownloadSection.js", () => {
    it("Test render challenge", () => {
        render(<StatsExerciseSection/>)
    })

    it("Test change unit", () => {
        render(<StatsExerciseSection/>)
    })
});