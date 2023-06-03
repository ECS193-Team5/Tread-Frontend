import React from 'react';
import { render } from "@testing-library/react";
import MedalObj from '../../../src/components/Profile/MedalObj';
import '@testing-library/jest-dom'

let medalData = {
    level: 1,
    progress: 10,
    exercise:{
        exerciseName:"Baseball",
        unit:"m",
        amount:5
    }
}

describe("Test /Profile/MedalObj", () => {
    it("Test render", () => {
        render(<MedalObj>{medalData}</MedalObj>)
    })

    it("Test undercomplete progress", () => {
        medalData.progress= 4
        render(<MedalObj>{medalData}</MedalObj>)
    })

    it("Test level 2", () => {
        medalData.level= 2
        render(<MedalObj>{medalData}</MedalObj>)
    })

    it("Test level 3", () => {
        medalData.level= 3
        render(<MedalObj>{medalData}</MedalObj>)
    })
});