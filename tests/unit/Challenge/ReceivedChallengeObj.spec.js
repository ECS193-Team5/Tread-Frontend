import React from 'react';
import { render} from "@testing-library/react";
import ReceivedChallengeObj from '../../../src/components/Challenge/ReceivedChallengeObj';
import '@testing-library/jest-dom'

describe("Test /Challenge/ReceivedChallengeObj.js", () => {
    it("Test render", () => {
        render(<ReceivedChallengeObj index = "0">{{_id:"id", exercise:{exerciseName:"exampleName", convertedAmount:10, amount:10, unit:"m"}, progress:{progress:0, exercise:{exerciseName:"exampleName", convertedAmount:10, amount:10, unit:"m"}}}}</ReceivedChallengeObj>)
    })
});