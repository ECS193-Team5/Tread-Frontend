import React from 'react';
import { render, fireEvent, screen } from "@testing-library/react";
import AddChallenge from '../../src/pages/addChallenge';
import '@testing-library/jest-dom'

import * as cssEffects from "../../src/helpers/CssEffects";
import * as statisticsFunc from '../../src/routes/statistics.js';
import * as friendFunc from '../../src/routes/friend_list.js';
import * as leagueFunc from '../../src/routes/league.js';
import * as challengeFunc from "../../src/routes/challenges";
import * as helpers from "../testHelpers/addChallenge";
import * as sharedHelpers from "../testHelpers/shared";

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
        "progress": 0
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
          "exerciseName": "My Own Exercise",
          "unit": "m",
          "amount": 23,
          "unitType": "distance",
          "convertedAmount": 23
        },
        "issueDate": "2023-04-17T00:00:00.000Z",
        "progress": 2
      }
    ])
}
const fakeFuncEmptyList = (setExerciseList) => {
    setExerciseList([]);
}
const successfulFunc = (data, then, err) => {then();}
const failFunc = (data, then,err) =>{err();}

let m = jest.spyOn(statisticsFunc, "getPastChallenges").mockImplementation(fakeFuncMultipleChallenges);
let friendStub = jest.spyOn(friendFunc, "getFriendList").mockImplementation((setFriendInfo) => setFriendInfo(["friend1#0000","friend#0000"]));
let leagueStub = jest.spyOn(leagueFunc, "getAdminLeagues").mockImplementation((setLeagueInfo) => setLeagueInfo({data:[{_id:"1", leagueName:"1league"},{_id:"2", username:"2league"}]}));
let submitChallengeMock = jest.spyOn(challengeFunc, "addChallenge").mockImplementation(successfulFunc);
let getLocationMock = jest.spyOn(cssEffects, "getHrefLocation").mockImplementation(() => {return "/addChallengePage"});
let setLocationMock = jest.spyOn(cssEffects, "setLocation").mockImplementation(() => {});

const ISO_TODAY = new Date(Date.now()).toISOString().substring(0, 16);
const ISO_TOMORROW = new Date(Date.now() + 24*60*60*1000).toISOString().substring(0, 16);
describe("Test /pages/addChallenge.js", () => {
    it("Test render", () => {
        render(<AddChallenge />)
    })

    describe("Test prefilled info", () =>{
      it("Test render with prefilled info", () => {
          getLocationMock.mockImplementation(()=>{return "./addChallengePage?prefill=friend.friend1#0000"})
          render(<AddChallenge />)
          helpers.clickSubmitButton()
          helpers.expectSubmitErr("Please give an exercise name. Please give a valid amount. Please give a valid issue date. Please give a valid due date. ")
      })

      it("Test incorrect prefill", () => {
          getLocationMock.mockImplementation(()=>{return "./addChallengePage?prefill=friend"})
          render(<AddChallenge />)
          helpers.setRecevierGroup("friend");
          helpers.clickSubmitButton()
          helpers.expectSubmitErr("Please give an exercise name. Please give a valid amount. Please give a valid issue date. Please give a valid due date. Please select a recipient for your challenge. ")
      })

      it("Test prefill league that works", () => {
        getLocationMock.mockImplementation(()=>{return "./addChallengePage?prefill=league.1"})
        render(<AddChallenge />)
        helpers.setRecevierGroup("league");
        helpers.clickSubmitButton()
        helpers.expectSubmitErr("Please give an exercise name. Please give a valid amount. Please give a valid issue date. Please give a valid due date. ")
      })

      it("Test league that does not work", () => {
        getLocationMock.mockImplementation(()=>{return "./addChallengePage?prefill=league.4"})
        render(<AddChallenge />)
        helpers.setRecevierGroup("league");
        helpers.clickSubmitButton()
        helpers.expectSubmitErr("Please give an exercise name. Please give a valid amount. Please give a valid issue date. Please give a valid due date. Please select a recipient for your challenge. ")
    })
    })

    describe("Test submitting challenges", () => {
      it("Test submit empty challenge",async () => {
        getLocationMock.mockImplementation(()=>{return "./addChallengePage"})
        render(<AddChallenge />)
        helpers.clickSubmitButton()
        helpers.expectSelfSpecifyErr("");
        helpers.expectDateErr("");
        helpers.expectAmountErr("");
        helpers.expectSubmitErr("Please give an exercise name. Please give a valid amount. Please give a valid issue date. Please give a valid due date. ")
      })

      it("Test submitting challenge succesfull", () => {
        render(<AddChallenge/>)
        helpers.setAmount(10);
        helpers.setUnit("m");
        helpers.setExercise("Baseball");
        helpers.setIssueDate(ISO_TODAY);
        helpers.setDueDate(ISO_TOMORROW);
        helpers.clickSubmitButton();
        helpers.expectSelfSpecifyErr("");
        helpers.expectDateErr("");
        helpers.expectAmountErr("");
        helpers.expectSubmitErr("");
      })

      it("Test submitting challenge with own exercise succesfull", () => {
        render(<AddChallenge/>)
        helpers.setAmount(10);
        helpers.setUnit("m");
        helpers.setSelfSpecify("Ex");
        helpers.setIssueDate(ISO_TODAY);
        helpers.setDueDate(ISO_TOMORROW);
        helpers.clickSubmitButton();
        helpers.expectSelfSpecifyErr("");
        helpers.expectDateErr("");
        helpers.expectAmountErr("");
        helpers.expectSubmitErr("");
      })

      it("Test submitting challenge with receiver group", () => {
        render(<AddChallenge/>)
        helpers.setAmount(10);
        helpers.setUnit("m");
        helpers.setSelfSpecify("Ex");
        helpers.setIssueDate(ISO_TODAY);
        helpers.setDueDate(ISO_TOMORROW);
        helpers.setRecevierGroup("league");
        helpers.setRecevier("1league - 1")
        helpers.clickSubmitButton();
        helpers.expectSelfSpecifyErr("");
        helpers.expectDateErr("");
        helpers.expectAmountErr("");
        helpers.expectSubmitErr("");
      })

      it("Test submitting challenge with amount key down", () => {
        render(<AddChallenge/>)
        helpers.pressExerciseAmount(1);
        helpers.setUnit("m");
        helpers.setSelfSpecify("Ex");
        helpers.setIssueDate(ISO_TODAY);
        helpers.setDueDate(ISO_TOMORROW);
        helpers.setRecevierGroup("league");
        helpers.setRecevier("1league - 1")
        helpers.clickSubmitButton();
      })

      it("Test receiver self enter name matches existing name", () => {
        submitChallengeMock.mockImplementation(successfulFunc)
        render(<AddChallenge/>)
        helpers.setAmount(10);
        helpers.setUnit("m");
        helpers.setSelfSpecify("baseball");
        helpers.setIssueDate(ISO_TODAY);
        helpers.setDueDate(ISO_TOMORROW);
        helpers.setRecevierGroup("league");
        helpers.setRecevier("1league - 1")
        helpers.clickSubmitButton();
        helpers.expectSelfSpecifyErr("");
        helpers.expectDateErr("");
        helpers.expectAmountErr("");
        helpers.expectSubmitErr("");
      })

      it("Test failing submit challenge", () => {
        submitChallengeMock.mockImplementation(failFunc)
        render(<AddChallenge/>)
        helpers.setAmount(10);
        helpers.setUnit("m");
        helpers.setSelfSpecify("Ex");
        helpers.setIssueDate(ISO_TODAY);
        helpers.setDueDate(ISO_TOMORROW);
        helpers.setRecevierGroup("league");
        helpers.setRecevier("1league - 1")
        helpers.clickSubmitButton();
        helpers.expectSelfSpecifyErr("");
        helpers.expectDateErr("");
        helpers.expectAmountErr("");
        helpers.expectSubmitErr("The challenge could not be issued. Please try again later.");
      })
    })

    describe("Test failing challenges", () => {
      it("Test bad 0 amount", () => {
        submitChallengeMock.mockImplementation(failFunc)
        render(<AddChallenge/>)
        helpers.setAmount(0);
        helpers.setUnit("m");
        helpers.setSelfSpecify("Ex");
        helpers.setIssueDate(ISO_TODAY);
        helpers.setDueDate(ISO_TOMORROW);
        helpers.setRecevierGroup("league");
        helpers.setRecevier("1league - 1")
        helpers.clickSubmitButton();
        helpers.expectSelfSpecifyErr("");
        helpers.expectDateErr("");
        helpers.expectAmountErr("Exercise Amount must be greater than zero.");
        helpers.expectSubmitErr("Please give a valid amount. ");
      })

      it("Test bad over amount", () => {
        submitChallengeMock.mockImplementation(failFunc)
        render(<AddChallenge/>)
        helpers.setAmount(100000000);
        helpers.setUnit("m");
        helpers.setSelfSpecify("Ex");
        helpers.setIssueDate(ISO_TODAY);
        helpers.setDueDate(ISO_TOMORROW);
        helpers.setRecevierGroup("league");
        helpers.setRecevier("1league - 1")
        helpers.clickSubmitButton();
        helpers.expectSelfSpecifyErr("");
        helpers.expectDateErr("");
        helpers.expectAmountErr("Exercise Amount must be less than 1000000.");
        helpers.expectSubmitErr("Please give a valid amount. ");
      })

      it("Test e key in amount", () => {
        submitChallengeMock.mockImplementation(failFunc)
        render(<AddChallenge/>)
        helpers.pressExerciseAmount("e");
        helpers.setUnit("m");
        helpers.setSelfSpecify("Ex");
        helpers.setIssueDate(ISO_TODAY);
        helpers.setDueDate(ISO_TOMORROW);
        helpers.setRecevierGroup("league");
        helpers.setRecevier("1league - 1")
        helpers.clickSubmitButton();
        helpers.expectSelfSpecifyErr("");
        helpers.expectDateErr("");
        helpers.expectAmountErr("");
        helpers.expectSubmitErr("Please give a valid amount. ");
      })

      it("Test give empty date", () => {
        submitChallengeMock.mockImplementation(failFunc)
        render(<AddChallenge/>)
        helpers.setAmount(10);
        helpers.setUnit("m");
        helpers.setSelfSpecify("Ex");
        helpers.setIssueDate(ISO_TODAY);
        helpers.setIssueDate("");
        helpers.setRecevierGroup("league");
        helpers.setRecevier("1league - 1")
        helpers.clickSubmitButton();
        helpers.expectSelfSpecifyErr("");
        helpers.expectDateErr("");
        helpers.expectAmountErr("");
        helpers.expectSubmitErr("Please give a valid issue date. Please give a valid due date. ");
      })

      it("Test give only due date", () => {
        submitChallengeMock.mockImplementation(failFunc)
        render(<AddChallenge/>)
        helpers.setAmount(10);
        helpers.setUnit("m");
        helpers.setSelfSpecify("Ex");
        helpers.setDueDate(ISO_TOMORROW);
        helpers.setRecevierGroup("league");
        helpers.setRecevier("1league - 1")
        helpers.clickSubmitButton();
        helpers.expectSelfSpecifyErr("");
        helpers.expectDateErr("The due date needs to be after the start date.");
        helpers.expectAmountErr("");
        helpers.expectSubmitErr("Please give a valid issue date. Please give a valid due date. ");
      })

      it("Test give only due date after start date", () => {
        submitChallengeMock.mockImplementation(failFunc)
        render(<AddChallenge/>)
        helpers.setAmount(10);
        helpers.setUnit("m");
        helpers.setSelfSpecify("Ex");
        helpers.setIssueDate(ISO_TOMORROW)
        helpers.setDueDate(ISO_TOMORROW);
        helpers.setRecevierGroup("league");
        helpers.setRecevier("1league - 1")
        helpers.clickSubmitButton();
        helpers.expectSelfSpecifyErr("");
        helpers.expectDateErr("The due date needs to be after the start date.");
        helpers.expectAmountErr("");
        helpers.expectSubmitErr("Please give a valid issue date. Please give a valid due date. ");
      })

      it("Test exercise name invalid name", () => {
        submitChallengeMock.mockImplementation(successfulFunc)
        render(<AddChallenge/>)
        helpers.setAmount(10);
        helpers.setUnit("m");
        helpers.setSelfSpecify("this is an invalid exercise name bceause it is too long for the user to be able to store");
        helpers.setIssueDate(ISO_TODAY);
        helpers.setDueDate(ISO_TOMORROW);
        helpers.setRecevierGroup("league");
        helpers.setRecevier("1league - 1")
        helpers.clickSubmitButton();
        helpers.expectSelfSpecifyErr("The exercise name should be 1-32 characters");
        helpers.expectDateErr("");
        helpers.expectAmountErr("");
        helpers.expectSubmitErr("Please give an exercise name. ");
      })

      it("Test enter fails on issue date", () => {
        submitChallengeMock.mockImplementation(successfulFunc)
        render(<AddChallenge/>)
        helpers.setAmount(10);
        helpers.setUnit("m");
        helpers.setSelfSpecify("Ex");
        helpers.pressIssueDate("e");
        helpers.setIssueDate(ISO_TODAY);
        helpers.setDueDate(ISO_TOMORROW);
        helpers.setRecevierGroup("league");
        helpers.setRecevier("1league - 1")
        helpers.clickSubmitButton();
        helpers.expectSelfSpecifyErr("");
        helpers.expectDateErr("");
        helpers.expectAmountErr("");
        helpers.expectSubmitErr("");
      })

      it("Test receiver fails on invalid option", () => {
        submitChallengeMock.mockImplementation(successfulFunc)
        render(<AddChallenge/>)
        helpers.setAmount(10);
        helpers.setUnit("m");
        helpers.setSelfSpecify("Ex");
        helpers.setIssueDate(ISO_TODAY);
        helpers.setDueDate(ISO_TOMORROW);
        helpers.setRecevierGroup("league");
        helpers.setRecevier("4league - 4")
        helpers.clickSubmitButton();
        helpers.expectSelfSpecifyErr("");
        helpers.expectDateErr("");
        helpers.expectAmountErr("");
        helpers.expectSubmitErr("Please select a recipient for your challenge. ");
      })
    })


    describe("Test hitting recommend button", () => {
      it("Test one empty list", () => {
        m.mockImplementation(fakeFuncEmptyList);
        render(<AddChallenge/>)
        fireEvent.click(screen.getByTestId("ChallengeStatsButton"));
        const element = screen.getByTestId("ChallengeStatsMessage");
        expect(element).toHaveTextContent('We do not currently have enough data to recommend a challenge.')
      });

      it("Test multiple challenges of each type, and the cycle back to start", () => {
          m.mockImplementation(fakeFuncMultipleChallenges);
          render(<AddChallenge/>)
          fireEvent.click(screen.getByTestId("ChallengeStatsButton"));
          let element = screen.getByTestId("ChallengeStatsMessage");
          expect(element).toHaveTextContent('This challenge reflects on one you have already completed. See if you can go a little further!')

          fireEvent.click(screen.getByTestId("ChallengeStatsButton"));
          element = screen.getByTestId("ChallengeStatsMessage");
          expect(element).toHaveTextContent('You were so close last time!')

          fireEvent.click(screen.getByTestId("ChallengeStatsButton"));
          element = screen.getByTestId("ChallengeStatsMessage");
          expect(element).toHaveTextContent('You can do this!')

          fireEvent.click(screen.getByTestId("ChallengeStatsButton"));
          element = screen.getByTestId("ChallengeStatsMessage");
          expect(element).toHaveTextContent('This challenge reflects on one you have already completed. See if you can go a little further!')

      });
    })

    describe("Test move from side bar", () => {

      it("Test click the profile settings button", () => {
          render(<AddChallenge/>)
          sharedHelpers.clickSideBarProfileSettings();
      })

      it("Test click the challenge button", () => {
        render(<AddChallenge/>)
        sharedHelpers.clickSideBarChallenges();
      })

      it("Test click the social button", () => {
        render(<AddChallenge/>)
        sharedHelpers.clickSideBarSocial();
      })

      it("Test click the profile button", () => {
        render(<AddChallenge/>)
        sharedHelpers.clickSideBarExerciseHistory();
      })
    })
});