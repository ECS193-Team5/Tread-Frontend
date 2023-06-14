import React from 'react';
import { render, fireEvent, screen } from "@testing-library/react";
import League from '../../src/pages/league';
import '@testing-library/jest-dom'
import * as cssFunc from "../../src/helpers/CssEffects";
import * as formHelpers from "../../src/helpers/FormHelpers";
import * as leagueFunc from "../../src/routes/league";
import * as friendFunc from "../../src/routes/friend_list";
import * as userFunc from "../../src/routes/user";
import * as challengeFunc from "../../src/routes/challenges";
import * as firebaseFunc from "../../src/helpers/firebaseHelpers";
import * as h from "../testHelpers/league";
import * as sharedHelpers from "../testHelpers/shared";
jest.mock('firebase/messaging', () => () => {});
jest.mock('../../src/firebase', () => () => {});

jest.spyOn(global, 'FileReader').mockImplementation(function () {
    this.readAsDataURL = jest.fn(()=>{this.result = "foo"});
});


let leagueInfo = {data:{"leagueName":"name", "leagueDescription":"description", "leagueType":"public"}}

let locationMock = jest.spyOn(cssFunc,"getHrefLocation").mockImplementation(()=>{
    return "/leagueMemberPage?=63fb66a1971b753d7edf9c48"
})

const deleteLeague = (num) => {
    const element = screen.getByTestId("LeagueEditFormDeleteButton");
    window.prompt = jest.fn().mockImplementation(()=>{return "delete league"})
    fireEvent.click(element);
}

const submitButton = () => {
    const element = screen.getByTestId("LeagueEditFormSubmitButton");
    fireEvent.click(element);
}

// League Information Mocks
let memberList = {data:["user1#4444", "user2#4444"]}
let getLeagueRoleMock = jest.spyOn(leagueFunc, "getLeagueRole").mockImplementation((id, roleSet)=>{roleSet("admin")});
let getNumberActiveChallengesMock = jest.spyOn(leagueFunc, "getNumberActiveChallengesLeague").mockImplementation((id, roleSet)=>{roleSet(4)});

// User Interaction Mocks
let blockUserMock =  jest.spyOn(friendFunc, "blockUser").mockImplementation((data, func)=>{func()})
let removeFriendMock =  jest.spyOn(friendFunc, "removeFriend").mockImplementation((data, func)=>{func()})
let sendFriendRequestMock =  jest.spyOn(friendFunc, "sendFriendRequest").mockImplementation((data, func)=>{func()})
let unBlockUserMock =  jest.spyOn(friendFunc, "unBlockUser").mockImplementation((data, func)=>{func()})
let setDisplayPropertyMock =  jest.spyOn(cssFunc, "setDisplayProperty").mockImplementation()
let reloadPageMock =  jest.spyOn(cssFunc, "reloadPage").mockImplementation()
let removeAdminUserMock =  jest.spyOn(leagueFunc, "removeAdminUser").mockImplementation((data, func)=>{func()})
let addAdminUserMock =  jest.spyOn(leagueFunc, "addAdminUser").mockImplementation((data, func)=>{func()})
let banUserMock =  jest.spyOn(leagueFunc, "banUser").mockImplementation((data, func)=>{func()})
let unbanUserMock =  jest.spyOn(leagueFunc, "unbanUser").mockImplementation((data, func)=>{func()})
let acceptUserMock =  jest.spyOn(leagueFunc, "acceptUser").mockImplementation((data, func)=>{func()})
let declineUserMock =  jest.spyOn(leagueFunc, "declineUser").mockImplementation((data, func)=>{func()})
let revokeUserMock =  jest.spyOn(leagueFunc, "revokeUser").mockImplementation((data, func)=>{func()})
let kickOutUserMock =  jest.spyOn(leagueFunc, "kickOutUser").mockImplementation((data, func)=>{func()})

// Edit Mocks
let updateLeagueDescriptionMock =  jest.spyOn(leagueFunc, "updateLeagueDescription").mockImplementation(()=>{})
let updateLeaguePhotoMock =  jest.spyOn(leagueFunc, "updateLeaguePhoto").mockImplementation(()=>{})
let updateLeagueNameMock =  jest.spyOn(leagueFunc, "updateLeagueName").mockImplementation(()=>{})
let updateLeagueTypeMock =  jest.spyOn(leagueFunc, "updateLeagueType").mockImplementation(()=>{})
let deleteLeagueMock =  jest.spyOn(leagueFunc, "deleteLeague").mockImplementation((id, then, err)=>{then()})

// Display Mocks
let setLocationMock = jest.spyOn(cssFunc, "setLocation").mockImplementation(() => {});

// League Scroll Mocks
let blockedList = ["batman#6380"];
let friendList = ["NewUser#2224"]
let leagueObj = {data:[
    {username: 'batman#6380', displayName: 'HHHHHHHHHHHHHHHH', role: 'owner'},
    {username: 'batman#9320', displayName: 'Howard', role: 'admin'},
    {username: 'NewUser#2224', displayName: 'd', role: 'participant'},
    {username: 'Kauboy#9630', displayName: 'LeSocialFitness', role: 'admin'}]}
let getBlockedMock = jest.spyOn(friendFunc, "getBlockedList").mockImplementation((func) => {func(blockedList)})
let getFriendMock = jest.spyOn(friendFunc, "getFriendList").mockImplementation((func) => {func(friendList)})
let getLeagueInfoMock = jest.spyOn(leagueFunc, "getLeagueInfo").mockImplementation((leagueID, func) => {func(leagueInfo)})
let getMembersLeagueMock = jest.spyOn(leagueFunc, "getMembersLeague").mockImplementation((leaugeID, func) => {func(leagueObj)})
let getInvitedMock = jest.spyOn(leagueFunc, "getInvited").mockImplementation((leaugeID,func) => {func(leagueObj)})
let getBannedMock = jest.spyOn(leagueFunc, "getBanned").mockImplementation((leagueID, func) => {func(leagueObj)})
let getRequestingMock = jest.spyOn(leagueFunc, "getRequesting").mockImplementation((leagueID, func) => {func(leagueObj)})
let getIssuedLeagueChallenges = jest.spyOn(challengeFunc, "getIssuedLeagueChallenges").mockImplementation(()=>{});

// Token Mocks
let getTokenMock = jest.spyOn(firebaseFunc, "setDeviceToken").mockImplementation((func)=>{func("token")});
let getDisplayNameMock = jest.spyOn(userFunc, "getDisplayName").mockImplementation((func)=>{func("displayName")});
let getUsernameMock = jest.spyOn(userFunc, "getUsername").mockImplementation((func)=>{func("myUsername#3334")});

// Interaction Mocks
let leaderboardInfo = [['bamtan#6380', 2], ["howard#4567", 2], ["howard#4567", 2], ["howard#4567", 2]];
let sendLeagueInviteMock = jest.spyOn(leagueFunc, "sendLeagueInvite").mockImplementation((leaugeID, func) => {func(leagueObj)})
let getLeaderboardInfo = jest.spyOn(leagueFunc, "getLeaderboardInfo").mockImplementation((id, set)=>{set({data:leaderboardInfo})})
let redirectMock = jest.spyOn(formHelpers, "sendChallengeRedirect").mockImplementation((id, roleSet)=>{});
let failfunctionRequest = (data, then , err) => {err("bad")};
let successfunction = (data, then , err) => {then("good")};
let sendLeagueRequestMock = jest.spyOn(leagueFunc, "sendLeagueInvite").mockImplementation(successfunction);

import imageFile from "../../../../src/assets/BronzeTrophy.png";


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

describe("Test pages/league", () => {

    describe("Test renders", ()=>{
        it("Test render description page as participant", () => {
            getLeagueRoleMock.mockImplementation((id, roleSet)=>{roleSet("participant")})
            render(<League>{{type:"description"}}</League>)
        })

        it("Test render member page as participant", () => {
            getLeagueRoleMock.mockImplementation((id, roleSet)=>{roleSet("participant")})
            render(<League>{{type:"member"}}</League>)
        })

        it("Test render description page as owner", () => {
            getLeagueRoleMock.mockImplementation((id, roleSet)=>{roleSet("owner")})
            render(<League>{{type:"description"}}</League>)
        })

        it("Test render description page as owner with a private league", () => {
            let leagueInfo = {data:{"leagueName":"name", "leagueDescription":"description", "leagueType":"private"}}
            let getLeagueInfoMock = jest.spyOn(leagueFunc, "getLeagueInfo").mockImplementation((leagueID, func) => {func(leagueInfo)})
            getLeagueRoleMock.mockImplementation((id, roleSet)=>{roleSet("owner")})
            render(<League>{{type:"description"}}</League>)
        })

        it("Test render member page as owner", () => {
            getLeagueRoleMock.mockImplementation((id, roleSet)=>{roleSet("owner")})
            render(<League>{{type:"member"}}</League>)
        })

        it("Test render edit page as owner", () => {
            getLeagueRoleMock.mockImplementation((id, roleSet)=>{roleSet("owner")})
            render(<League>{{type:"edit"}}</League>)
        })
    })

    describe("Test the page switch in the header", ()=>{
        it("Test change to member page", () => {
            render(<League>{{type:"description"}}</League>)
            h.clickMemberPage()
            expect(setLocationMock).toBeCalled
        })

        it("Test change to description page", () => {
            render(<League>{{type:"member"}}</League>)
            h.clickDescriptionPage()
            expect(setLocationMock).toBeCalled
        })
    })

    describe("Test description page", () =>{
        it("Test clicking on the send challenge", () =>{
                getLeagueRoleMock.mockImplementation((id, roleSet)=>{roleSet("owner")})
                render(<League>{{type:"description"}}</League>)
                sharedHelpers.clickBarButton(0);
                expect(redirectMock).toBeCalledWith("league", "63fb66a1971b753d7edf9c48")
        })

        it("Test clicking on the edit button", () =>{
            getLeagueRoleMock.mockImplementation((id, roleSet)=>{roleSet("owner")})
            render(<League>{{type:"description"}}</League>)
            fireEvent.click(screen.getByTestId("LeagueHeaderMoveEditPageButton"));
            expect(setLocationMock).toBeCalledTimes(1);
        })

        it("Test leaderboard with no info", () =>{
            getLeaderboardInfo.mockImplementation((id, set)=>{set({data:[]})})
            render(<League>{{type:"description"}}</League>)
        })
    });

    describe("Test changing the member page bar options", () =>{
        it("Test the members button", () =>{
            getLeagueRoleMock.mockImplementation((id, roleSet)=>{roleSet("owner")})
            render(<League>{{type:"member"}}</League>)
            sharedHelpers.clickBarButton(0);
        })

        it("Test the received button", () =>{
            getLeagueRoleMock.mockImplementation((id, roleSet)=>{roleSet("owner")})
            render(<League>{{type:"member"}}</League>)
            sharedHelpers.clickBarButton(1);
        })

        it("Test the invited button", () =>{
            getLeagueRoleMock.mockImplementation((id, roleSet)=>{roleSet("owner")})
            render(<League>{{type:"member"}}</League>)
            sharedHelpers.clickBarButton(2);
        })

        it("Test the banned button", () =>{
            getLeagueRoleMock.mockImplementation((id, roleSet)=>{roleSet("owner")})
            render(<League>{{type:"member"}}</League>)
            sharedHelpers.clickBarButton(3);
        })

        it("Test the add users button", () =>{
            getLeagueRoleMock.mockImplementation((id, roleSet)=>{roleSet("owner")})
            render(<League>{{type:"member"}}</League>)
            sharedHelpers.clickBarButton(4);
        })

        describe("Test add invite user", () =>{
            it("Test success", () =>{
                getLeagueRoleMock.mockImplementation((id, roleSet)=>{roleSet("owner")})
                render(<League>{{type:"member"}}</League>)
                sharedHelpers.clickBarButton(4);
                fillBox("user#2225");
                clickSubmit()
                expectGoodText("good")
                expectBadText("")
                sendLeagueRequestMock.mockClear()
            })

            it("Test failure", () =>{
                getLeagueRoleMock.mockImplementation((id, roleSet)=>{roleSet("owner")})
                sendLeagueRequestMock.mockImplementation(failfunctionRequest);
                render(<League>{{type:"member"}}</League>)
                sharedHelpers.clickBarButton(4);
                fillBox("user#2225");
                clickSubmit()
                expectGoodText("")
                expectBadText("Sorry, a league invite could not be sent to user#2225")
            })

            it("Test handle enter", () => {
                getLeagueRoleMock.mockImplementation((id, roleSet)=>{roleSet("owner")})
                sendLeagueRequestMock.mockImplementation(failfunctionRequest);
                render(<League>{{type:"member"}}</League>)
                sharedHelpers.clickBarButton(4);
                fillBox("user#2225");
                keyDown("Enter")
                expectGoodText("")
                expectBadText("Sorry, a league invite could not be sent to user#2225")
            })

            it("Test handle enter", () => {
                getLeagueRoleMock.mockImplementation((id, roleSet)=>{roleSet("owner")})
                sendLeagueRequestMock.mockImplementation(failfunctionRequest);
                render(<League>{{type:"member"}}</League>)
                sharedHelpers.clickBarButton(4);
                fillBox("user#2225");
                keyDown("e")
                expectGoodText("")
                expectBadText("")
            })
        })


        it("Test showing an empty members list", () =>{
            getMembersLeagueMock = jest.spyOn(leagueFunc, "getMembersLeague").mockImplementation((leaugeID, func) => {func({data:[]})})
            getLeagueRoleMock.mockImplementation((id, roleSet)=>{roleSet("owner")})
            render(<League>{{type:"member"}}</League>)
            sharedHelpers.clickBarButton(0);
            getMembersLeagueMock = jest.spyOn(leagueFunc, "getMembersLeague").mockImplementation((leaugeID, func) => {func(leagueObj)})
        })
    });

    describe("Test edit league", () =>{
        it("Test update with info", () => {
            render(<League>{{type:"edit"}}</League>)
            const elementT = screen.getByTestId("LeagueTypeFormUpdateLeagueTypeSelect");
            fireEvent.change(elementT, {target:{value:'private'}});
            const elementD = screen.getByTestId("LeagueDescriptionFormUpdateDescriptionInput");
            fireEvent.change(elementD, {target:{value:'exampleValidName'}});
            const elementN = screen.getByTestId("LeagueNameFormUpdateLeagueNameInput");
            fireEvent.change(elementN, {target:{value:'exampleValidName'}});
            submitButton()
            expect(updateLeagueDescriptionMock).toBeCalled();
            expect(updateLeagueNameMock).toBeCalled();
            expect(updateLeagueTypeMock).toBeCalled();
        })

        it("Test update with info and picture", () => {
            render(<League>{{type:"edit"}}</League>)
            const element = screen.getByTestId("PhotoUploadFormUploadPhotoInput");
            fireEvent.change(element, {
                target:{
                    files:[imageFile]
                }} );
            let reader = FileReader.mock.instances[0];
            reader.onload({ target: { result: 'foo' } });
            const elementT = screen.getByTestId("LeagueTypeFormUpdateLeagueTypeSelect");
            fireEvent.change(elementT, {target:{value:'private'}});
            const elementD = screen.getByTestId("LeagueDescriptionFormUpdateDescriptionInput");
            fireEvent.change(elementD, {target:{value:'exampleValidName'}});
            const elementN = screen.getByTestId("LeagueNameFormUpdateLeagueNameInput");
            fireEvent.change(elementN, {target:{value:'exampleValidName'}});


            submitButton()
            expect(updateLeagueDescriptionMock).toBeCalled();
            expect(updateLeagueNameMock).toBeCalled();
            expect(updateLeagueTypeMock).toBeCalled();
        })

        it("Test delete league", () => {
            render(<League>{{type:"edit"}}</League>)
            deleteLeague();
            expect(setLocationMock).toBeCalledWith("./SocialLeaguePage")
            expect(screen.getByTestId("LeagueEditFormDeleteError")).toHaveTextContent("");
        })

        it("Test delete league without giving it the call", () => {
            render(<League>{{type:"edit"}}</League>)
            const element = screen.getByTestId("LeagueEditFormDeleteButton");
            window.prompt = jest.fn().mockImplementation(()=>{return "do not delete league"})
            fireEvent.click(element);
            expect(setLocationMock).toBeCalledWith("./SocialLeaguePage")
            expect(screen.getByTestId("LeagueEditFormDeleteError")).toHaveTextContent("");
        })

        it("Test delete league err", () => {
            deleteLeagueMock =  jest.spyOn(leagueFunc, "deleteLeague").mockImplementation((id, then, err)=>{err()})
            render(<League>{{type:"edit"}}</League>)
            deleteLeague();
            expect(screen.getByTestId("LeagueEditFormDeleteError")).toHaveTextContent("Could not delete league. Please refresh the page or try again later.");
        })

        it("Test update with no info", () => {
            render(<League>{{type:"edit"}}</League>)
            submitButton()
        })


    });

    describe("Test user interactions", () =>{

        beforeEach(()=>{

            blockUserMock.mockClear()
            removeFriendMock.mockClear()
            sendFriendRequestMock.mockClear()
            unBlockUserMock.mockClear()
            setDisplayPropertyMock.mockClear()
            reloadPageMock.mockClear()
            removeAdminUserMock.mockClear()
            addAdminUserMock.mockClear()
            banUserMock.mockClear()
            unbanUserMock.mockClear()
            acceptUserMock.mockClear()
            declineUserMock.mockClear()
            revokeUserMock.mockClear()
            kickOutUserMock.mockClear()
        })

        it("Test unfriend", () => {
            getLeagueRoleMock.mockImplementation((id, roleSet)=>{roleSet("owner")})
            render(<League>{{type:"member"}}</League>)
            sharedHelpers.clickBarButton(0);
            sharedHelpers.clickBarButton(1);
            sharedHelpers.clickBarButton(0);
            h.toggleButton("NewUser#2224");
            h.hitDropdown("NewUser#2224",0);
        })

        it("Test block", () => {
            render(<League>{{type:"member"}}</League>)
            sharedHelpers.clickBarButton(0);
            sharedHelpers.clickBarButton(1);
            sharedHelpers.clickBarButton(0);
            h.toggleButton("NewUser#2224");
            h.hitDropdown("NewUser#2224",1);
        })

        it("Test blocked person, try to friend", () => {
            render(<League>{{type:"member"}}</League>)
            sharedHelpers.clickBarButton(0);
            sharedHelpers.clickBarButton(1);
            sharedHelpers.clickBarButton(0);
            h.toggleButton("batman#6380");
            h.hitDropdown("batman#6380",0);
        })

        it("Test blocked person, try to unblock", () => {
            render(<League>{{type:"member"}}</League>)
            sharedHelpers.clickBarButton(0);
            sharedHelpers.clickBarButton(1);
            sharedHelpers.clickBarButton(0);
            h.toggleButton("batman#6380");
            h.hitDropdown("batman#6380",1);
        })

        it("Test unknown person, try to friend", () => {
            render(<League>{{type:"member"}}</League>)
            sharedHelpers.clickBarButton(0);
            sharedHelpers.clickBarButton(1);
            sharedHelpers.clickBarButton(0);
            h.toggleButton("Kauboy#9630");
            h.hitDropdown("Kauboy#9630",0);
        })

        it("Test unknown person, try to block", () => {
            render(<League>{{type:"member"}}</League>)
            sharedHelpers.clickBarButton(0);
            sharedHelpers.clickBarButton(1);
            sharedHelpers.clickBarButton(0);
            h.toggleButton("Kauboy#9630");
            h.hitDropdown("Kauboy#9630",1);
        })

        it("Test kick out user", () => {
            render(<League>{{type:"member"}}</League>)
            sharedHelpers.clickBarButton(0);
            sharedHelpers.clickBarButton(1);
            sharedHelpers.clickBarButton(0);
            h.toggleButton("NewUser#2224");
            h.hitDropdown("NewUser#2224",2);
        })

        it("Test ban user", () => {
            render(<League>{{type:"member"}}</League>)
            sharedHelpers.clickBarButton(0);
            sharedHelpers.clickBarButton(1);
            sharedHelpers.clickBarButton(0);
            h.toggleButton("NewUser#2224");
            h.hitDropdown("NewUser#2224",3);
        })

        it("Test remove admin", () => {
            render(<League>{{type:"member"}}</League>)
            sharedHelpers.clickBarButton(0);
            sharedHelpers.clickBarButton(1);
            sharedHelpers.clickBarButton(0);
            h.toggleButton("Kauboy#9630");
            h.hitDropdown("Kauboy#9630",4);
        })

        it("Test add admin", () => {
            render(<League>{{type:"member"}}</League>)
            sharedHelpers.clickBarButton(0);
            sharedHelpers.clickBarButton(1);
            sharedHelpers.clickBarButton(0);
            h.toggleButton("NewUser#2224");
            h.hitDropdown("NewUser#2224",4);

        })

        it("Test accept invite", () => {
            render(<League>{{type:"member"}}</League>)
            sharedHelpers.clickBarButton(1);
            h.toggleButton("NewUser#2224");
            h.hitDropdown("NewUser#2224",2);
        })

        it("Test decline invite", () => {
            render(<League>{{type:"member"}}</League>)
            sharedHelpers.clickBarButton(1);
            h.toggleButton("NewUser#2224");
            h.hitDropdown("NewUser#2224",3);
        })

        it("Test unban", () => {
            render(<League>{{type:"member"}}</League>)
            sharedHelpers.clickBarButton(3);
            h.toggleButton("NewUser#2224");
            h.hitDropdown("NewUser#2224",2);
        })

        it("Test revoke invite", () => {
            render(<League>{{type:"member"}}</League>)
            sharedHelpers.clickBarButton(2);
            h.toggleButton("NewUser#2224");
            h.hitDropdown("NewUser#2224",2);
        })

        it("Test is self", () => {
            let getUsernameMock = jest.spyOn(userFunc, "getUsername").mockImplementation((func)=>{func("NewUser#2224")});
            render(<League>{{type:"member"}}</League>)
        })
    })

});