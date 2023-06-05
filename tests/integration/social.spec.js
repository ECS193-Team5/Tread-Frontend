import React from 'react';
import { render, fireEvent, screen } from "@testing-library/react";
import Social from '../../src/pages/social';
import '@testing-library/jest-dom'
import * as cssFunc from "../../src/helpers/CssEffects";
import * as formHelpers from "../../src/helpers/FormHelpers";
import * as friendFunc from "../../src/routes/friend_list";
import * as userFunc from "../../src/routes/user";
import * as leagueFunc from "../../src/routes/league";
import * as firebaseFunc from "../../src/helpers/firebaseHelpers";
import * as h from "../testHelpers/social";
import * as sharedHelpers from "../testHelpers/shared";

jest.mock('firebase/messaging', () => () => {});
jest.mock('../../src/firebase', () => () => {});

// Token Mocks
let getTokenMock = jest.spyOn(firebaseFunc, "setDeviceToken").mockImplementation((func)=>{func("token")});
let getDisplayNameMock = jest.spyOn(userFunc, "getDisplayName").mockImplementation((func)=>{func("displayName")});
let getUsernameMock = jest.spyOn(userFunc, "getUsername").mockImplementation((func)=>{func("username")});

// Friend Obj Mocks
let setDisplayPropertyMock =  jest.spyOn(cssFunc, "setDisplayProperty").mockImplementation(()=>{})
let revokeFriendRequestMock =  jest.spyOn(friendFunc, "revokeFriendRequest").mockImplementation((username, then)=>{then()})
let unBlockUserMock =  jest.spyOn(friendFunc, "unBlockUser").mockImplementation((username, then)=>{then()})
let blockUserMock =  jest.spyOn(friendFunc, "blockUser").mockImplementation((username, then)=>{then()})
let removeFriendMock =  jest.spyOn(friendFunc, "removeFriend").mockImplementation((username, then)=>{then()})
let acceptFriendRequestMock =  jest.spyOn(friendFunc, "acceptFriendRequest").mockImplementation((username, then)=>{then()})
let declineFriendRequestMock =  jest.spyOn(friendFunc, "declineFriendRequest").mockImplementation((username, then)=>{then()})

// Friend Scroll Mocks
let socialObj = {username:"betty#4000"}
let getFriendsMock = jest.spyOn(friendFunc, "getFriends").mockImplementation((func) => {func([socialObj])})
let getSentFriendMock = jest.spyOn(friendFunc, "getSent").mockImplementation((func) => {func([socialObj])})
let getReceivedMock = jest.spyOn(friendFunc, "getReceived").mockImplementation((func) => {func([socialObj])})
let getBlockedListMock = jest.spyOn(friendFunc, "getBlockedList").mockImplementation((func) => {func([socialObj])})

// League Obj Mocks
let resultFunc = (id, then) => {then()}
let role = "admin";
let setLeagueRoleFunc = (id, process) => {process(role)}
let getLeagueRoleMock =  jest.spyOn(leagueFunc, "getLeagueRole").mockImplementation(setLeagueRoleFunc)
let leaveLeagueMock =  jest.spyOn(leagueFunc, "leaveLeague").mockImplementation(resultFunc)
let removeSelfFromAdminMock =  jest.spyOn(leagueFunc, "removeSelfFromAdmin").mockImplementation(resultFunc)
let revokeLeagueRequestMock =  jest.spyOn(leagueFunc, "revokeLeagueRequest").mockImplementation(resultFunc)
let declineLeagueInviteMock =  jest.spyOn(leagueFunc, "declineLeagueInvite").mockImplementation(resultFunc)
let acceptLeagueInviteMock =  jest.spyOn(leagueFunc, "acceptLeagueInvite").mockImplementation(resultFunc)

// Location Mocks
let setLocationMock = jest.spyOn(cssFunc, "setLocation").mockImplementation();
let getLocationMock = jest.spyOn(cssFunc, "getLocation").mockImplementation(() => { return "/socialFriendPage"})

// League Scroll Mocks
let leagueObj = {
    _id:"1",
    leagueName:"name",
    members:["user#2225"],
    activeChallenges: 4
}
let getAllLeaguesMock = jest.spyOn(leagueFunc, "getAll").mockImplementation((func) => {func([leagueObj])})
let getSentLeagueMock = jest.spyOn(leagueFunc, "getSent").mockImplementation((func) => {func([leagueObj])})
let getInviteMock = jest.spyOn(leagueFunc, "getInvite").mockImplementation((func) => {func([leagueObj])})
let getAdminMock = jest.spyOn(leagueFunc, "getAdmin").mockImplementation((func) => {func([leagueObj])})

// League Suggestion & Recent Mocks
let suggestedFriendData = [["username#4444", 3],["username#4434", 4]]
let suggestedLeagueData = [{"_id":4, "leagueName":"name"},{"_id":5, "leagueName":"name"}]

let activityList = [{
    level: 1,
    progress: 10,
    exercise:{
        exerciseName:"Baseball",
        unit:"m",
        amount:5
    },
    loggedDate:"2023-05-29T00:00.000Z",
    username:"user#34"
},{
    level: 2,
    progress: 10,
    exercise:{
        exerciseName:"Baseball",
        unit:"m",
        amount:5
    },
    loggedDate:"2023-05-29T00:00.000Z",
    username:"user#34"
},{
    level: 3,
    progress: 10,
    exercise:{
        exerciseName:"Baseball",
        unit:"m",
        amount:5
    },
    loggedDate:"2023-05-29T00:00.000Z",
    username:"user#34"
},{
    level: 4,
    progress: 10,
    exercise:{
        exerciseName:"Baseball",
        unit:"m",
        amount:5
    },
    loggedDate:"2023-05-29T00:00.000Z",
    username:"user#34"
}]

let successfunction = (then) => {then([])};
let getRecentFriendsMock = jest.spyOn(friendFunc, "getRecentFriends").mockImplementation((then) => {then(activityList)});
let getSuggestedFriendsMock = jest.spyOn(friendFunc, "getSuggestedFriends").mockImplementation((then) => {then(suggestedFriendData)});
let getRecentLeaguesMock = jest.spyOn(leagueFunc, "getRecentLeagues").mockImplementation((then) => {then(activityList)});
let getSuggestedLeaguesMock = jest.spyOn(leagueFunc, "getSuggestedLeagues").mockImplementation((then) => {then(suggestedLeagueData)});


let failfunctionRequest = (data, then , err) => {err("bad")};
let successfunctionRequest = (data, then , err) => {then("good")};
let sendFriendRequestMock = jest.spyOn(friendFunc, "sendFriendRequest").mockImplementation(successfunctionRequest);
let sendLeagueRequestMock = jest.spyOn(leagueFunc, "sendLeagueRequest").mockImplementation(successfunctionRequest);

const clickSubmit = () => {
    let element = screen.getByTestId("UserAddFormSendButton");
    fireEvent.click(element);
}

const keyDown = (key) => {
    let element = screen.getByTestId("UserAddFormDescriptionUsernameInput");
    fireEvent.keyDown(element, {key: key, code: key});
}


const fillBox = (text) => {
    let element = screen.getByTestId("UserAddFormDescriptionUsernameInput");
    fireEvent.change(element, {target:{value:text}});
}

const expectGoodText = (text) => {
    let element = screen.getByTestId("UserAddFormUserGoodResponse");
    expect(element).toHaveTextContent(text);
}

const expectBadText = (text) => {
    let element = screen.getByTestId("UserAddFormUserBadResponse");
    expect(element).toHaveTextContent(text);
}

describe("Test pages/social", () => {
    beforeEach(()=>{
    })

    describe("Test renders", ()=>{
        it("Test render description page as participant", () => {
            render(<Social>{{type:"friend"}}</Social>)
        })

        it("Test render member page as participant", () => {
            render(<Social>{{type:"league"}}</Social>)
        })
    })

    describe("Test the recent and suggested activity", () =>{
        beforeEach(()=>{
            getRecentFriendsMock.mockClear()
            getSuggestedFriendsMock.mockClear()
            getRecentLeaguesMock.mockClear()
            getSuggestedFriendsMock.mockClear()
        })

        it("Test send league request", () =>{
            successfunction = (then) => {then(suggestedLeagueData)};
            getSuggestedLeaguesMock.mockImplementation(successfunction);
            render(<Social>{{type:"league"}}</Social>)
            let element = screen.getByTestId("SuggestedLeagueObjRequestJoinLeagueButton1");
            fireEvent.click(element);
        })

        it("Test send friend request", () =>{
            successfunction = (then) => {then(suggestedFriendData)};
            getSuggestedFriendsMock.mockImplementation(successfunction);
            render(<Social>{{type:"friend"}}</Social>)
            let element = screen.getByTestId("SuggestedFriendObjSendFriendRequestButton1");
            fireEvent.click(element);
        })

    })

    describe("Test the user interactions on friend page", () =>{
        describe("Test current friends", () =>{
            it("Test get to page", () =>{
                render(<Social>{{type:"friend"}}</Social>)
                h.setFriendsList();
            })
        })

        describe("Test sent friends", () =>{
            it("Test get to page", () =>{
                render(<Social>{{type:"friend"}}</Social>)
                h.setSentFriendsList();
            })
        })

        describe("Test received friends", () =>{
            it("Test get to page", () =>{
                render(<Social>{{type:"friend"}}</Social>)
                h.setReceivedFriendsList();
            })
        })

        describe("Test blocked friends", () =>{
            it("Test get to page", () =>{
                render(<Social>{{type:"friend"}}</Social>)
                h.setBlockedFriendsList();
            })
        })

        describe("Test add user friends", () =>{
            it("Test success", () =>{
                render(<Social>{{type:"friend"}}</Social>)
                h.setAddFriendList()
                fillBox("user#2225");
                clickSubmit()
                expect(sendFriendRequestMock).toBeCalledWith("user#2225", expect.any(Function), expect.any(Function))
                expectGoodText("good")
                expectBadText("")
            })

            it("Test failure", () =>{
                sendFriendRequestMock.mockImplementation(failfunctionRequest);
                render(<Social>{{type:"friend"}}</Social>)
                h.setAddFriendList()
                fillBox("user#2225");
                clickSubmit()
                expect(sendFriendRequestMock).toBeCalledWith("user#2225", expect.any(Function), expect.any(Function))
                expectGoodText("")
                expectBadText("Sorry, a friend request could not be sent to user#2225")
            })
        })

        describe("Test user interactions", () =>{

            beforeEach(()=>{
                revokeFriendRequestMock.mockClear()
                unBlockUserMock.mockClear()
                blockUserMock.mockClear()
                removeFriendMock.mockClear()
                acceptFriendRequestMock.mockClear()
                declineFriendRequestMock.mockClear()
            })

            it("Test unfriend", () => {
                render(<Social>{{type:"friend"}}</Social>)
                h.setFriendsList();
                h.toggleButtonFriend();
                h.hitDropDownFriend(0);
                expect(revokeFriendRequestMock).toBeCalledTimes(0)
                expect(unBlockUserMock).toBeCalledTimes(0)
                expect(blockUserMock).toBeCalledTimes(0)
                expect(removeFriendMock).toBeCalledTimes(1)
                expect(acceptFriendRequestMock).toBeCalledTimes(0)
                expect(declineFriendRequestMock).toBeCalledTimes(0)
                expect(removeFriendMock).toBeCalledWith("betty#4000", expect.any(Function))
            })

            it("Test block", () => {
                render(<Social>{{type:"friend"}}</Social>)
                h.setFriendsList();
                h.toggleButtonFriend();
                h.hitDropDownFriend(1);
                expect(revokeFriendRequestMock).toBeCalledTimes(0)
                expect(unBlockUserMock).toBeCalledTimes(0)
                expect(blockUserMock).toBeCalledTimes(1)
                expect(removeFriendMock).toBeCalledTimes(0)
                expect(acceptFriendRequestMock).toBeCalledTimes(0)
                expect(declineFriendRequestMock).toBeCalledTimes(0)
                expect(blockUserMock).toBeCalledWith("betty#4000", expect.any(Function))
            })

            it("Test sendChallenge", () => {
                render(<Social>{{type:"friend"}}</Social>)
                h.setFriendsList();
                h.toggleButtonFriend();
                h.hitDropDownFriend(2);
                expect(revokeFriendRequestMock).toBeCalledTimes(0)
                expect(unBlockUserMock).toBeCalledTimes(0)
                expect(blockUserMock).toBeCalledTimes(0)
                expect(removeFriendMock).toBeCalledTimes(0)
                expect(acceptFriendRequestMock).toBeCalledTimes(0)
                expect(declineFriendRequestMock).toBeCalledTimes(0)
            })

            it("Test revoke request", () => {
                render(<Social>{{type:"friend"}}</Social>)
                h.setSentFriendsList();
                h.toggleButtonFriend();
                h.hitDropDownFriend(0);
                expect(revokeFriendRequestMock).toBeCalledTimes(1)
                expect(unBlockUserMock).toBeCalledTimes(0)
                expect(blockUserMock).toBeCalledTimes(0)
                expect(removeFriendMock).toBeCalledTimes(0)
                expect(acceptFriendRequestMock).toBeCalledTimes(0)
                expect(declineFriendRequestMock).toBeCalledTimes(0)
                expect(revokeFriendRequestMock).toBeCalledWith("betty#4000", expect.any(Function))
            })

            it("Test accept request", () => {
                render(<Social>{{type:"friend"}}</Social>)
                h.setReceivedFriendsList();
                h.toggleButtonFriend();
                h.hitDropDownFriend(0);
                expect(revokeFriendRequestMock).toBeCalledTimes(0)
                expect(unBlockUserMock).toBeCalledTimes(0)
                expect(blockUserMock).toBeCalledTimes(0)
                expect(removeFriendMock).toBeCalledTimes(0)
                expect(acceptFriendRequestMock).toBeCalledTimes(1)
                expect(declineFriendRequestMock).toBeCalledTimes(0)
                expect(acceptFriendRequestMock).toBeCalledWith("betty#4000", expect.any(Function))
            })

            it("Test decline request", () => {
                render(<Social>{{type:"friend"}}</Social>)
                h.setReceivedFriendsList();
                h.toggleButtonFriend();
                h.hitDropDownFriend(1);
                expect(revokeFriendRequestMock).toBeCalledTimes(0)
                expect(unBlockUserMock).toBeCalledTimes(0)
                expect(blockUserMock).toBeCalledTimes(0)
                expect(removeFriendMock).toBeCalledTimes(0)
                expect(acceptFriendRequestMock).toBeCalledTimes(0)
                expect(declineFriendRequestMock).toBeCalledTimes(1)
                expect(declineFriendRequestMock).toBeCalledWith("betty#4000", expect.any(Function))
            })

            it("Test unblock request", () => {
                render(<Social>{{type:"friend"}}</Social>)
                h.setBlockedFriendsList();
                h.toggleButtonFriend();
                h.hitDropDownFriend(0);
                expect(revokeFriendRequestMock).toBeCalledTimes(0)
                expect(unBlockUserMock).toBeCalledTimes(1)
                expect(blockUserMock).toBeCalledTimes(0)
                expect(removeFriendMock).toBeCalledTimes(0)
                expect(acceptFriendRequestMock).toBeCalledTimes(0)
                expect(declineFriendRequestMock).toBeCalledTimes(0)
                expect(unBlockUserMock).toBeCalledWith("betty#4000", expect.any(Function))
            })
        })


        describe("Test empty friend scroll", () =>{

            it("Test get to page", () =>{
                getFriendsMock.mockImplementation((func) => {func([])})
                render(<Social>{{type:"friend"}}</Social>)
                h.setFriendsList()
            })
        })


    })

    describe("Test the user interactions on league page", () =>{

        it("Test move league page", () => {
            render(<Social>{{type:"league"}}</Social>)
            let element = screen.getByTestId("LeagueObjComponentMoveLeaguePageButtonname");
            fireEvent.click(element);
            expect(setLocationMock).lastCalledWith("leagueDescriptionPage?=1")
        })


        describe("Test current friends", () =>{
            it("Test get to page", () =>{
                render(<Social>{{type:"league"}}</Social>)
                h.setLeaguesList();
            })
        })

        describe("Test admin leagues", () =>{
            it("Test get to page", () =>{
                render(<Social>{{type:"league"}}</Social>)
                h.setAdminLeagueList();
            })
        })

        describe("Test sent leagues", () =>{
            it("Test get to page", () =>{
                render(<Social>{{type:"league"}}</Social>)
                h.setSentLeagueList();
            })
        })

        describe("Test invited leagues", () =>{
            it("Test get to page", () =>{
                render(<Social>{{type:"league"}}</Social>)
                h.setInviteLeagueList();
            })
        })

        describe("Test create league", () =>{
            it("Test get to page", () =>{
                render(<Social>{{type:"league"}}</Social>)
                h.setCreateLeagueList()
            })
        })

        describe("Test league interactions", () =>{

        beforeEach(()=>{
            getLeagueRoleMock.mockClear()
            leaveLeagueMock.mockClear()
            removeSelfFromAdminMock.mockClear()
            revokeLeagueRequestMock.mockClear()
            declineLeagueInviteMock.mockClear()
            acceptLeagueInviteMock.mockClear()
        })

        it("Test sendChallenge", () => {
            setLeagueRoleFunc = (id, process) => {process("admin")}
            getLeagueRoleMock =  jest.spyOn(leagueFunc, "getLeagueRole").mockImplementation(setLeagueRoleFunc)

            render(<Social>{{type:"league"}}</Social>)
            h.setLeaguesList();
            h.toggleButtonLeague();
            h.hitDropDownLeague(0);
            expect(leaveLeagueMock).toBeCalledTimes(0)
            expect(removeSelfFromAdminMock).toBeCalledTimes(0)
            expect(revokeLeagueRequestMock).toBeCalledTimes(0)
            expect(declineLeagueInviteMock).toBeCalledTimes(0)
            expect(acceptLeagueInviteMock).toBeCalledTimes(0)
        })

        it("Test leave league ", () => {
            setLeagueRoleFunc = (id, process) => {process("admin")}
            getLeagueRoleMock =  jest.spyOn(leagueFunc, "getLeagueRole").mockImplementation(setLeagueRoleFunc)

            render(<Social>{{type:"league"}}</Social>)
            h.setLeaguesList();
            h.toggleButtonLeague();
            h.hitDropDownLeague(1);
            expect(leaveLeagueMock).toBeCalledTimes(1)
            expect(removeSelfFromAdminMock).toBeCalledTimes(0)
            expect(revokeLeagueRequestMock).toBeCalledTimes(0)
            expect(declineLeagueInviteMock).toBeCalledTimes(0)
            expect(acceptLeagueInviteMock).toBeCalledTimes(0)
            expect(leaveLeagueMock).toBeCalledWith("1", expect.any(Function))
        })

        it("Test remove self as admin ", () => {
            setLeagueRoleFunc = (id, process) => {process("admin")}
            getLeagueRoleMock =  jest.spyOn(leagueFunc, "getLeagueRole").mockImplementation(setLeagueRoleFunc)

            render(<Social>{{type:"league"}}</Social>)
            h.setAdminLeagueList();
            h.toggleButtonLeague();
            h.hitDropDownLeague(2);
            expect(leaveLeagueMock).toBeCalledTimes(0)
            expect(removeSelfFromAdminMock).toBeCalledTimes(1)
            expect(revokeLeagueRequestMock).toBeCalledTimes(0)
            expect(declineLeagueInviteMock).toBeCalledTimes(0)
            expect(acceptLeagueInviteMock).toBeCalledTimes(0)
            expect(removeSelfFromAdminMock).toBeCalledWith("1", expect.any(Function))
        })

        it("Test revoke sent request", () => {
            setLeagueRoleFunc = (id, process) => {process("none")}
            getLeagueRoleMock =  jest.spyOn(leagueFunc, "getLeagueRole").mockImplementation(setLeagueRoleFunc)

            render(<Social>{{type:"league"}}</Social>)
            h.setSentLeagueList();
            h.toggleButtonLeague();
            h.hitDropDownLeague(0);
            expect(leaveLeagueMock).toBeCalledTimes(0)
            expect(removeSelfFromAdminMock).toBeCalledTimes(0)
            expect(revokeLeagueRequestMock).toBeCalledTimes(1)
            expect(declineLeagueInviteMock).toBeCalledTimes(0)
            expect(acceptLeagueInviteMock).toBeCalledTimes(0)
            expect(revokeLeagueRequestMock).toBeCalledWith("1", expect.any(Function))
        })


        it("Test accept league invite", () => {
            setLeagueRoleFunc = (id, process) => {process("none")}
            getLeagueRoleMock =  jest.spyOn(leagueFunc, "getLeagueRole").mockImplementation(setLeagueRoleFunc)

            render(<Social>{{type:"league"}}</Social>)
            h.setInviteLeagueList();
            h.toggleButtonLeague();
            h.hitDropDownLeague(0);
            expect(leaveLeagueMock).toBeCalledTimes(0)
            expect(removeSelfFromAdminMock).toBeCalledTimes(0)
            expect(revokeLeagueRequestMock).toBeCalledTimes(0)
            expect(declineLeagueInviteMock).toBeCalledTimes(0)
            expect(acceptLeagueInviteMock).toBeCalledTimes(1)
            expect(acceptLeagueInviteMock).toBeCalledWith("1", expect.any(Function))
        })


        it("Test decline league invite", () => {
            setLeagueRoleFunc = (id, process) => {process("none")}
            getLeagueRoleMock =  jest.spyOn(leagueFunc, "getLeagueRole").mockImplementation(setLeagueRoleFunc)

            render(<Social>{{type:"league"}}</Social>)
            h.setInviteLeagueList();
            h.toggleButtonLeague();
            h.hitDropDownLeague(1);
            expect(leaveLeagueMock).toBeCalledTimes(0)
            expect(removeSelfFromAdminMock).toBeCalledTimes(0)
            expect(revokeLeagueRequestMock).toBeCalledTimes(0)
            expect(declineLeagueInviteMock).toBeCalledTimes(1)
            expect(acceptLeagueInviteMock).toBeCalledTimes(0)
            expect(declineLeagueInviteMock).toBeCalledWith("1", expect.any(Function))
        })

        })
        describe("Test empty league scroll", () =>{
            it("Test get to page", () =>{
                getAllLeaguesMock.mockImplementation((func) => {func([])})
                render(<Social>{{type:"league"}}</Social>)
                h.setLeaguesList()
            })
        })
    })



    describe("Test move from side bar", () => {

        it("Test click the profile settings button", () => {
            render(<Social>{{"type":"friend"}}</Social>)
            sharedHelpers.clickSideBarProfileSettings();
        })

        it("Test click the challenge button", () => {
            render(<Social>{{"type":"friend"}}</Social>)
            sharedHelpers.clickSideBarChallenges();
        })

        it("Test click the social button", () => {
            render(<Social>{{"type":"friend"}}</Social>)
            sharedHelpers.clickSideBarSocial();
        })

        it("Test click the profile button", () => {
            render(<Social>{{"type":"friend"}}</Social>)
            sharedHelpers.clickSideBarExerciseHistory();
        })
        })

    describe("Test the page switch up in the header", () =>{
        it("Test change to league page", () => {
            render(<Social>{{"type":"friend"}}</Social>)
            h.clickLeaguePage()
            expect(setLocationMock).toBeCalled
        })

        it("Test change to friend page", () => {
            render(<Social>{{"type":"league"}}</Social>)
            h.clickFriendPage()
            expect(setLocationMock).toBeCalled
        })
    })


});