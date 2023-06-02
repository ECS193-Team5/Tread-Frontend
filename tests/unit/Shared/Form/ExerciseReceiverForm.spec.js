import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import ExerciseReceiverForm from '../../../../src/components/Shared/Form/ExerciseReceiverForm';
import '@testing-library/jest-dom'
import * as friendFunc from '../../../../src/routes/friend_list.js';
import * as leagueFunc from '../../../../src/routes/league.js';

let friendStub = jest.spyOn(friendFunc, "getFriendList").mockImplementation((setFriendInfo) => setFriendInfo(["user1","user2"]));
let leagueStub = jest.spyOn(leagueFunc, "getAdminLeagues").mockImplementation((setLeagueInfo) => setLeagueInfo({data:[{_id:"4", leagueName:"4league"},{_id:"5", username:"5league"}]}));

describe("Test /Shared/Form/ExerciseReceiverForm.js", () => {
    let setReceiverMock = jest.fn();
    let setReceiverGroupMock = jest.fn();


    afterEach(()=>{
        setReceiverMock.mockClear()
        setReceiverGroupMock.mockClear()
    })

    it("Test render", () => {
        render(<ExerciseReceiverForm updateReceiver = {setReceiverMock} updateReceiverGroup = {setReceiverGroupMock}/>)
    })

    it("Test set receiver group to self", () => {
        render(<ExerciseReceiverForm updateReceiver = {setReceiverMock} updateReceiverGroup = {setReceiverGroupMock}/>)
        const recevierGroupSelect = screen.getByTestId("ExerciseReceiverFormChallengeTypeSelect")
        fireEvent.change(recevierGroupSelect, {target:{value:"self"}})
        expect(setReceiverMock).not.toHaveBeenCalled;
        expect(setReceiverGroupMock).toHaveBeenCalled;
    })

    it("Test set receiver group to friend", () => {
        render(<ExerciseReceiverForm updateReceiver = {setReceiverMock} updateReceiverGroup = {setReceiverGroupMock}/>)
        const recevierGroupSelect = screen.getByTestId("ExerciseReceiverFormChallengeTypeSelect")
        fireEvent.change(recevierGroupSelect, {target:{value:"league"}})
        expect(setReceiverMock).not.toHaveBeenCalled;
        expect(setReceiverGroupMock).toHaveBeenCalled;
    })

    it("Test set receiver group to league", () => {
        render(<ExerciseReceiverForm updateReceiver = {setReceiverMock} updateReceiverGroup = {setReceiverGroupMock}/>)
        const recevierGroupSelect = screen.getByTestId("ExerciseReceiverFormChallengeTypeSelect")
        fireEvent.change(recevierGroupSelect, {target:{value:"friend"}})
        expect(setReceiverMock).not.toHaveBeenCalled;
        expect(setReceiverGroupMock).toHaveBeenCalled;
    })

    it("Set default receiver group", () => {
        render(<ExerciseReceiverForm defaultReceiverGroup ={'friend'}  updateReceiver = {setReceiverMock} updateReceiverGroup = {setReceiverGroupMock}/>)
        expect(setReceiverMock).not.toHaveBeenCalled;
        expect(setReceiverGroupMock).not.toHaveBeenCalled;
    })

    it("Set default receiver group to friend and valid default receiver", () => {
        render(<ExerciseReceiverForm defaultReceiverGroup ={'friend'}  defaultReceiver = {"user1"} updateReceiver = {setReceiverMock} updateReceiverGroup = {setReceiverGroupMock}/>)
        expect(setReceiverMock).not.toHaveBeenCalled;
        expect(setReceiverGroupMock).not.toHaveBeenCalled;
    })

    it("Set default receiver group to friend and invalid default receiver", () => {
        render(<ExerciseReceiverForm defaultReceiverGroup ={'friend'}  defaultReceiver = {"user3"} updateReceiver = {setReceiverMock} updateReceiverGroup = {setReceiverGroupMock}/>)
        expect(setReceiverMock).not.toHaveBeenCalled;
        expect(setReceiverGroupMock).not.toHaveBeenCalled;
    })

    it("Set default receiver group to friend and valid default receiver", () => {
        render(<ExerciseReceiverForm defaultReceiverGroup ={'league'}  defaultReceiver = {"4"} updateReceiver = {setReceiverMock} updateReceiverGroup = {setReceiverGroupMock}/>)
        expect(setReceiverMock).not.toHaveBeenCalled;
        expect(setReceiverGroupMock).not.toHaveBeenCalled;
    })

    it("Set default receiver group to friend and invalid default receiver", () => {
        render(<ExerciseReceiverForm defaultReceiverGroup ={'league'}  defaultReceiver = {"7"} updateReceiver = {setReceiverMock} updateReceiverGroup = {setReceiverGroupMock}/>)
        expect(setReceiverMock).not.toHaveBeenCalled;
        expect(setReceiverGroupMock).not.toHaveBeenCalled;
    })

    it("Change to a friend", () => {
        render(<ExerciseReceiverForm updateReceiver = {setReceiverMock} updateReceiverGroup = {setReceiverGroupMock}/>)
        const recevierGroupSelect = screen.getByTestId("ExerciseReceiverFormChallengeTypeSelect")
        fireEvent.change(recevierGroupSelect, {target:{value:"friend"}})
        const recevierSelect = screen.getByTestId("ExerciseReceiverFormReceiverSelect")
        fireEvent.change(recevierSelect, {target:{value:"user1"}})

        expect(setReceiverMock).toHaveBeenCalledWith("user1");
        expect(setReceiverGroupMock).toHaveBeenCalledWith("friend");
    })

    it("Change to a league", () => {
        render(<ExerciseReceiverForm updateReceiver = {setReceiverMock} updateReceiverGroup = {setReceiverGroupMock}/>)
        const recevierGroupSelect = screen.getByTestId("ExerciseReceiverFormChallengeTypeSelect")
        fireEvent.change(recevierGroupSelect, {target:{value:"league"}})
        const receiverSelect = screen.getByTestId("ExerciseReceiverFormReceiverSelect")
        fireEvent.change(receiverSelect, {target:{value:"4league - 4"}})

        expect(setReceiverMock).toHaveBeenCalledWith("4league - 4");
        expect(setReceiverGroupMock).toHaveBeenCalledWith("league");
    })
});