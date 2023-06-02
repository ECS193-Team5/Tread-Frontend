import React from 'react';
import { render } from "@testing-library/react";
import Profile from "../../../src/pages/profile";
import '@testing-library/jest-dom'

jest.mock('../../../src/components/Shared/Header', () => ()=> {return (<div></div>)});
jest.mock('../../../src/components/Shared/SideBar', () => ()=> {return (<div></div>)});
jest.mock('../../../src/components/Shared/Line', () => ()=> {return (<div></div>)});
jest.mock('../../../src/components/Profile/StatsExerciseSection', () => ()=> {return (<div></div>)});
jest.mock('../../../src/components/Profile/MedalsSection', () => ()=> {return (<div></div>)});
jest.mock('../../../src/components/Profile/ProfileHeader', () => ()=> {return (<div></div>)});
jest.mock('../../../src/components/Profile/StatsChallengeSection', () => ()=> {return (<div></div>)});
jest.mock('../../../src/components/Profile/MailBox', () => ()=> {return (<div></div>)});

describe("Test /pages/profile.js", () => {
    it("Test render stats page", () => {
        render(<Profile>{{"type":"stats"}}</Profile>)
    })

    it("Test render medals page", () => {
        render(<Profile>{{"type":"medals"}}</Profile>)
    })

});