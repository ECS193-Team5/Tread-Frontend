import React, {useState as useStateMock} from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import ExerciseNameForm from '../../../../src/components/Shared/Form/ExerciseNameForm';
import '@testing-library/jest-dom'

const TODAY = '2023-05-30T00:00';
const TOMORROW = '2023-05-31T00:00';
const TODAY_ISO ='2023-05-30T07:00:00.000Z';
const TOMORROW_ISO = '2023-05-31T07:00:00.000Z';

describe("Test /Shared/Form/DisplayNameForm.js", () => {
    let updateExerciseNameMock = jest.fn();

    beforeAll(()=>{
    })
    afterEach(()=>{
        updateExerciseNameMock.mockClear()
    })

    it("Test render", () => {
        render(<ExerciseNameForm />)
    })

    it("Test select default exercise", () => {
        render(<ExerciseNameForm defaultExerciseName = {"Baseball"} updateExerciseName = {updateExerciseNameMock} />)
        expect(screen.getByDisplayValue("")).toBeInTheDocument();
    })

    it("Test select default exercise as own value", () => {
        render(<ExerciseNameForm defaultExerciseName = {"not a real exercise"} updateExerciseName = {updateExerciseNameMock} />)
        expect(screen.getByDisplayValue("not a real exercise")).toBeInTheDocument();
    })

    it("Test select an existing exercise", () => {
        render(<ExerciseNameForm defaultExerciseName = {"not a real exercise"} updateExerciseName = {updateExerciseNameMock} />)
        const selfSpecify = screen.getByTestId("ExerciseNameFormAddChallengeSelfSpecifyExerciseNameInput");
        const sportChange = screen.getByTestId("ExerciseNameFormAddChallengeExerciseNameSelect");

        fireEvent.change(sportChange, {target:{value:"Baseball"}})
        expect(updateExerciseNameMock).toBeCalledWith("Baseball");
    })

    it("Test select your own exercise", () => {
        render(<ExerciseNameForm defaultExerciseName = {"not a real exercise"} updateExerciseName = {updateExerciseNameMock} />)
        const selfSpecify = screen.getByTestId("ExerciseNameFormAddChallengeSelfSpecifyExerciseNameInput");
        const sportChange = screen.getByTestId("ExerciseNameFormAddChallengeExerciseNameSelect");

        fireEvent.change(sportChange, {target:{value:"Enter Your Own"}})
        fireEvent.change(selfSpecify, {target:{value:"my exercise"}})
        expect(updateExerciseNameMock).toBeCalledWith("my exercise");
    })


    it("Test select own exercise, but give it the same name as an establish exercise", () => {
        render(<ExerciseNameForm defaultExerciseName = {"not a real exercise"} updateExerciseName = {updateExerciseNameMock} />)

        const selfSpecify = screen.getByTestId("ExerciseNameFormAddChallengeSelfSpecifyExerciseNameInput");
        const sportChange = screen.getByTestId("ExerciseNameFormAddChallengeExerciseNameSelect");

        fireEvent.change(sportChange, {target:{value:"Enter Your Own"}})
        fireEvent.change(selfSpecify, {target:{value:"baseball"}})
        expect(updateExerciseNameMock).toBeCalledWith("Baseball");
    })

    it("Test select own exercise, but give it an invalid length", () => {
        render(<ExerciseNameForm defaultExerciseName = {"not a real exercise"} updateExerciseName = {updateExerciseNameMock} />)

        const selfSpecify = screen.getByTestId("ExerciseNameFormAddChallengeSelfSpecifyExerciseNameInput");
        const sportChange = screen.getByTestId("ExerciseNameFormAddChallengeExerciseNameSelect");

        fireEvent.change(sportChange, {target:{value:"Enter Your Own"}})
        fireEvent.change(selfSpecify, {target:{value:"this is a very logn exercise that is going to fail the test"}})
        expect(updateExerciseNameMock).toBeCalledWith("");
    })

});