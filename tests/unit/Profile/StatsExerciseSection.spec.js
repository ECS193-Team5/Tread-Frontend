import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import StatsExerciseSection from "../../../src/components/Profile/StatsExerciseSection";
import * as statsFunc from "../../../src/routes/statistics";
import { setExerciseName, setExerciseUnit } from '../../testHelpers/profile';
jest.mock('../../../src/components/Profile/StatsDownloadSection', () => ()=> {return (<div></div>)});
jest.mock('react-chartjs-2', () => ({
    Bar: () => null
  }));

let exerciseData = [{"loggedDate":"2011-10-05T14:48:00.000Z", "postedDate":"2011-10-05T14:48:00.000Z", "exercise":{exerciseName:"Baseball", amount:10, "unit":"m", unitType:"distance", convertedAmount:10}},
{"loggedDate":"2011-10-05T14:48:00.000Z", "postedDate":"2011-10-05T14:48:00.000Z", "exercise":{exerciseName:"Baseball", amount:10, "unit":"min", unitType:"time", convertedAmount:10}},
{"loggedDate":"2011-10-05T14:48:00.000Z", "postedDate":"2011-10-05T14:48:00.000Z", "exercise":{exerciseName:"Baseball", amount:10, "unit":"ct", unitType:"count", convertedAmount:10}},
{"loggedDate":"2011-10-05T14:48:00.000Z", "postedDate":"2011-10-05T14:48:00.000Z", "exercise":{exerciseName:"Hockey", amount:10, "unit":"m", unitType:"distance", convertedAmount:10}},
{"loggedDate":"2011-10-05T14:48:00.000Z", "postedDate":"2011-10-05T14:48:00.000Z", "exercise":{exerciseName:"Throwing", amount:10, "unit":"min", unitType:"time", convertedAmount:10}}]
let getPastExercsiesMock = jest.spyOn(statsFunc, "getPastExercises").mockImplementation((func) => {func(exerciseData)});

describe("Test /Profile/StatsDownloadSection.js", () => {
    it("Test render challenge", () => {
        render(<StatsExerciseSection/>)
    })

    it("Test change unit", () => {
        render(<StatsExerciseSection/>)
        setExerciseName("Baseball")
        setExerciseUnit("ct");
        setExerciseUnit("min");
        setExerciseUnit("m");
    })

    it("Test change exercise", () => {
        render(<StatsExerciseSection/>)
        setExerciseName("Hockey")
    })

    it("Test change exercise", () => {
        render(<StatsExerciseSection/>)
        setExerciseName("Throwing")
    })
    it("Test emptylist", () => {
        getPastExercsiesMock.mockImplementation((setExerciseList)=>{setExerciseList([])})
        render(<StatsExerciseSection/>)
    })
});