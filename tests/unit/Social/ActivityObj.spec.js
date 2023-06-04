import React from 'react';
import { render, screen } from "@testing-library/react";
import ActivityObj from '../../../src/components/Social/ActivityObj';
import '@testing-library/jest-dom'
import { scryRenderedComponentsWithType } from 'react-dom/test-utils';

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
        expect(screen.getByTestId("ActivityObjActivityText")).toHaveTextContent("user#34 did Baseball 5 m on 4")
    })
});