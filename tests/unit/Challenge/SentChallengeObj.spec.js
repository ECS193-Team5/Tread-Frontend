import React from 'react';
import { render} from "@testing-library/react";
import SentChallengeObj from '../../../src/components/Challenge/SentChallengeObj';
import '@testing-library/jest-dom'

describe("Test /Challenge/SentChallengeObj.js", () => {
    it("Test render", () => {
        render(<SentChallengeObj index = "0">{{_id:"id", exercise:{exerciseName:"exampleName", convertedAmount:10, amount:10, unit:"m"}, progress:{progress:0, exercise:{exerciseName:"exampleName", convertedAmount:10, amount:10, unit:"m"}}}}</SentChallengeObj>)
    })
});