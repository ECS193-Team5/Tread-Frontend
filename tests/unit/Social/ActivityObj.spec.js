import React from 'react';
import { render } from "@testing-library/react";
import ActivityObj from '../../../src/components/Social/ActivityObj';
import '@testing-library/jest-dom'

let ActivityData = {
    level: 1,
    progress: 10,
    exercise:{
        exerciseName:"Baseball",
        unit:"m",
        amount:5
    },
    loggedDate:"4T0",
    username:"user#34"
}

describe("Test /Social/ActivityObj", () => {
    it("Test render", () => {
        render(<ActivityObj>{ActivityData}</ActivityObj>)
    })
});