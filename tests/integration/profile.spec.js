import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import Profile from "../../src/pages/profile";
import * as userFunc from "../../src/routes/user";
import * as cssFunc from "../../src/helpers/CssEffects";
import * as statsFunc from "../../src/routes/statistics";
import * as notificationFunc from "../../src/routes/notifications";
import * as medalsFunc from "../../src/routes/medals";
import * as firebaseFunc from "../../src/helpers/firebaseHelpers";
import * as authFunc from "../../src/routes/auth";
import * as sharedHelpers from "../testHelpers/shared";
import { setExerciseName, setExerciseUnit, setEarnedMedals, setInProgressMedals } from '../testHelpers/profile';
import * as h from "../testHelpers/profile";

jest.mock('firebase/messaging', () => () => {});
jest.mock('../../src/firebase', () => () => {});

let medalData = [
    {
        level: 1,
        progress: 3,
        exercise:{
            exerciseName:"Baseball",
            unit:"m",
            amount:5
        }
    },
    {
        level: 2,
        progress: 10,
        exercise:{
            exerciseName:"Baseball",
            unit:"m",
            amount:5
        }
    },
    {
        level: 3,
        progress: 400,
        exercise:{
            exerciseName:"Baseball",
            unit:"m",
            amount:5
        }
    },
    {
        level: 4,
        progress: 3,
        exercise:{
            exerciseName:"Baseball",
            unit:"m",
            amount:5
        }
    }]
let notifications = [{"_id":1, message:"This is the first message"}, {"_id":2, message:"This is the second message"}]
let setLocationMock = jest.spyOn(cssFunc, "setLocation");

let getEarnedMock = jest.spyOn(medalsFunc, "getEarnedMedals").mockImplementation((func) => {func(medalData)})
let getInProgressMock = jest.spyOn(medalsFunc, "getInProgressMedals").mockImplementation((func) => {func(medalData)})
let getUsername = jest.spyOn(userFunc, "getUsername").mockImplementation((func)=>{func("name")});
let getDisplayName = jest.spyOn(userFunc, "getDisplayName").mockImplementation((func)=>{func("user#4444")});
let cssFuncMock = jest.spyOn(cssFunc, "setLocation");
let requestMock = jest.spyOn(notificationFunc, "requestNotifications").mockImplementation((func) => {func(notifications)})
let deleteNotificationMock = jest.spyOn(notificationFunc, "deleteNotification").mockImplementation((id, func) => {func()})
let deleteAllNotificationsMock = jest.spyOn(notificationFunc, "deleteAllNotifications").mockImplementation((func) => {func()})

let logoutMock = jest.spyOn(authFunc, "logout").mockImplementation(()=>{});
let getTokenMock = jest.spyOn(firebaseFunc, "setDeviceToken").mockImplementation((func)=>{func("token")});
let getDisplayNameMock = jest.spyOn(userFunc, "getDisplayName").mockImplementation((func)=>{func("displayName")});
let getUsernameMock = jest.spyOn(userFunc, "getUsername").mockImplementation((func)=>{func("username")});
global.URL.createObjectURL = jest.fn(()=>{return "url"});
jest.mock('react-chartjs-2', () => ({
    Bar: () => null
}));


const fakeFuncMultipleChallenges = (setExerciseList) => {
    setExerciseList([{
        "completed": true,
        "dueDate": "2023-04-20T00:00:00.000Z",
        "exercise": {
          "exerciseName": "Baseball",
          "unit": "m",
          "amount": 23,
          "unitType": "distance",
          "convertedAmount": 23
        },
        "issueDate": "2023-04-17T00:00:00.000Z",
        "progress": 25
      },
      {
        "completed": false,
        "dueDate": "2023-04-20T00:00:00.000Z",
        "exercise": {
          "exerciseName": "Baseball",
          "unit": "m",
          "amount": 23,
          "unitType": "distance",
          "convertedAmount": 23
        },
        "issueDate": "2023-04-17T00:00:00.000Z",
        "progress": 21
      },
      {
        "completed": false,
        "dueDate": "2023-04-20T00:00:00.000Z",
        "exercise": {
          "exerciseName": "Baseball",
          "unit": "m",
          "amount": 23,
          "unitType": "distance",
          "convertedAmount": 23
        },
        "issueDate": "2023-04-17T00:00:00.000Z",
        "progress": 2
      }])}
let getPastChallengesMock = jest.spyOn(statsFunc, "getPastChallenges").mockImplementation(fakeFuncMultipleChallenges);

let exerciseData = [{"loggedDate":"2011-10-05T14:48:00.000Z", "postedDate":"2011-10-05T14:48:00.000Z", "exercise":{exerciseName:"Baseball", amount:10, "unit":"m", unitType:"distance", convertedAmount:10}},
{"loggedDate":"2011-10-05T14:48:00.000Z", "postedDate":"2011-10-05T14:48:00.000Z", "exercise":{exerciseName:"Baseball", amount:10, "unit":"min", unitType:"time", convertedAmount:10}},
{"loggedDate":"2011-10-05T14:48:00.000Z", "postedDate":"2011-10-05T14:48:00.000Z", "exercise":{exerciseName:"Baseball", amount:10, "unit":"ct", unitType:"count", convertedAmount:10}},
{"loggedDate":"2011-10-05T14:48:00.000Z", "postedDate":"2011-10-05T14:48:00.000Z", "exercise":{exerciseName:"Hockey", amount:10, "unit":"m", unitType:"distance", convertedAmount:10}},
{"loggedDate":"2011-10-05T14:48:00.000Z", "postedDate":"2011-10-05T14:48:00.000Z", "exercise":{exerciseName:"Throwing", amount:10, "unit":"min", unitType:"time", convertedAmount:10}}]
let getPastExercsiesMock = jest.spyOn(statsFunc, "getPastExercises").mockImplementation((func) => {func(exerciseData)});
let getLocationMock = jest.spyOn(cssFunc, "getLocation").mockImplementation(() => { return "/profileStatsPage"});

describe("Test /Profile", () => {

    beforeEach(()=>{
        getEarnedMock.mockClear()
        getInProgressMock.mockClear()
        getUsername.mockClear()
        getDisplayName.mockClear()
        cssFuncMock.mockClear()
        requestMock.mockClear()
        deleteNotificationMock.mockClear()
        deleteAllNotificationsMock.mockClear()
    })

    it("Test render stats", () => {
        render(<Profile>{{type:"stats"}}</Profile>)
    })

    it("Test render medals", () => {
        render(<Profile>{{type:"medal"}}</Profile>)
    })

    describe("Test changing the exercise section", () => {
        it("Test render challenge", () => {
            render(<Profile>{{type:"stats"}}</Profile>)
        })

        it("Test change unit", () => {
            render(<Profile>{{type:"stats"}}</Profile>)
            setExerciseName("Baseball")
            setExerciseUnit("ct");
            setExerciseUnit("min");
            setExerciseUnit("m");
        })

        it("Test change exercise", () => {
            render(<Profile>{{type:"stats"}}</Profile>)
            setExerciseName("Hockey")
        })

        it("Test change exercise", () => {
            render(<Profile>{{type:"stats"}}</Profile>)
            setExerciseName("Throwing")
        })
        it("Test emptylist", () => {
            getPastExercsiesMock.mockImplementation((setExerciseList)=>{setExerciseList([])})
            render(<Profile>{{type:"stats"}}</Profile>)
        })
    })

    describe("Test navigate medals", () => {
        it("Test go to send challenge", () => {
            render(<Profile>{{type:"medals"}}</Profile>)
            setEarnedMedals();
        });

        it("Test go to issued challenge", () => {
            render(<Profile>{{type:"medals"}}</Profile>)
            setInProgressMedals();
        });
    })

    describe("Interact with mailbox", () => {
        it("Test delete a notification", () => {
            render(<Profile>{{type:"stats"}}</Profile>)
            expect(screen.getByTestId("MailBoxEntryMessage0")).toHaveTextContent("This is the first message")
            let button = screen.getByTestId("MailBoxEntryDeclineButton0");
            fireEvent.click(button);

            expect(requestMock).toBeCalledTimes(1);
            expect(deleteAllNotificationsMock).toBeCalledTimes(0);
            expect(deleteNotificationMock).toBeCalledTimes(1);
        });

        it("Test delete all notifications", () => {
            render(<Profile>{{type:"stats"}}</Profile>)
            expect(screen.getByTestId("MailBoxEntryMessage0")).toHaveTextContent("This is the first message")
            let button = screen.getByTestId("MailBoxDeleteAllButton");
            fireEvent.click(button);

            expect(requestMock).toBeCalledTimes(1);
            expect(deleteAllNotificationsMock).toBeCalledTimes(1);
            expect(deleteNotificationMock).toBeCalledTimes(0);
        });
    })

    it("Test interact with header", () => {
        render(<Profile>{{type:"medals"}}</Profile>)

        fireEvent.click(screen.getByTestId("ProfileHeaderMoveSettingPageButton"));
        expect(cssFuncMock).toBeCalledWith("./profileSettingsPage");

    })

    describe("Test the page switch up in the header", () =>{
        it("Test change to stats page", () => {
            render(<Profile>{{type:"medals"}}</Profile>)
            h.clickStatsPage()
            expect(setLocationMock).toBeCalled
        })

        it("Test change to medals page", () => {
            render(<Profile>{{type:"stats"}}</Profile>)
            h.clickMedalsPage()
            expect(setLocationMock).toBeCalled
        })
    })


    describe("Test move from side bar", () => {

        it("Test click the profile settings button", () => {
            render(<Profile>{{type:"stats"}}</Profile>)
            sharedHelpers.clickSideBarProfileSettings();
        })

        it("Test click the challenge button", () => {
            render(<Profile>{{type:"stats"}}</Profile>)
            sharedHelpers.clickSideBarChallenges();
        })

        it("Test click the social button", () => {
            render(<Profile>{{type:"stats"}}</Profile>)
            sharedHelpers.clickSideBarSocial();
        })

        it("Test click the profile button", () => {
            render(<Profile>{{type:"stats"}}</Profile>)
            sharedHelpers.clickSideBarExerciseHistory();
        })
    })
});