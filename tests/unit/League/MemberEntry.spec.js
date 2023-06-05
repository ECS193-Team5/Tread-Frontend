import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import MemberEntry from '../../../src/components/League/MemberEntry';
import * as cssFunc from "../../../src/helpers/CssEffects";
import * as friendFunc from "../../../src/routes/friend_list";
import * as leagueFunc from "../../../src/routes/league";

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

let memberDataParticipant = {
    "username":"user#2224",
    "role":"participant"
}

let memberDataAdmin = {
    "username":"user#2224",
    "role":"admin"
}

let memberDataNone = {
    "username":"user#2224",
    "role":"none"
}

let memberDataOwner = {
    "username":"user#2224",
    "role":"owner"
}

let allMemberScroll = {
    blocked : ["blocked#4444"],
    friends : ["friend#4444"],
    username : ["me#4444"],
    role:"owner",
    scrollType:"Members",
    leagueID:"id",
    leagueName:"name"
}

const toggleButton = () =>{
    let button = screen.getByTestId("MemberEntryMoreInfoButton");
    fireEvent.click(button)
}

const hitDropdown = (num) =>{
    let button = screen.getByTestId("DropDownEntryComponentuser#2224MemberEntry-"+num)
    fireEvent.click(button)
}
describe("Test /League/MemberEntry.js", () => {
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
    })

    it("Test render", () => {
        render(<MemberEntry index = {""} scrollData = {allMemberScroll}>{{memberData:memberDataParticipant}}</MemberEntry>)
    })

    it("Test render when user is participant", () => {
        let copyMemberScroll = allMemberScroll;
        copyMemberScroll.role = "participant";
        render(<MemberEntry index = {""} scrollData = {allMemberScroll}>{{memberData:memberDataParticipant}}</MemberEntry>)
        toggleButton();
    })

    it("Test render when user is admin", () => {
        let copyMemberScroll = allMemberScroll;
        copyMemberScroll.role = "admin";
        render(<MemberEntry index = {""} scrollData = {allMemberScroll}>{{memberData:memberDataParticipant}}</MemberEntry>)
        toggleButton();
    })

    it("Test render when member is owner", () => {
        let copyMemberScroll = allMemberScroll;
        copyMemberScroll.role = "admin";
        render(<MemberEntry index = {""} scrollData = {allMemberScroll}>{{memberData:memberDataOwner}}</MemberEntry>)
        toggleButton();
    })

    it("Test render when member is admin", () => {
        let copyMemberScroll = allMemberScroll;
        copyMemberScroll.role = "admin";
        render(<MemberEntry index = {""} scrollData = {allMemberScroll}>{{memberData:memberDataAdmin}}</MemberEntry>)
        toggleButton();
    })

    it("Test render when member is no one", () => {
        let copyMemberScroll = allMemberScroll;
        copyMemberScroll.role = "admin";
        render(<MemberEntry index = {""} scrollData = {allMemberScroll}>{{memberData:memberDataNone}}</MemberEntry>)
        toggleButton();
    })

    it("Test render when member is user", () => {
        let copyMemberScroll = allMemberScroll;
        copyMemberScroll.username = "user#2224"
        render(<MemberEntry index = {""} scrollData = {allMemberScroll}>{{memberData:memberDataNone}}</MemberEntry>)
        toggleButton();
    })

    it("Test render when member is friend", () => {
        let copyMemberScroll = allMemberScroll;
        copyMemberScroll.username = "me#2224"
        copyMemberScroll.friends = ["user#2224"]
        render(<MemberEntry index = {""} scrollData = {allMemberScroll}>{{memberData:memberDataNone}}</MemberEntry>)
        toggleButton();
    })

    it("Test render when member is blocked", () => {
        let copyMemberScroll = allMemberScroll;
        copyMemberScroll.friends = []
        copyMemberScroll.blocked = ["user#2224"]
        render(<MemberEntry index = {""} scrollData = {allMemberScroll}>{{memberData:memberDataNone}}</MemberEntry>)
        toggleButton();
    })

    it("Test render when received", () => {
        let copyMemberScroll = allMemberScroll;
        copyMemberScroll.friends = []
        copyMemberScroll.blocked = []
        copyMemberScroll.scrollType = "Received"
        copyMemberScroll.role = "owner"
        render(<MemberEntry index = {""} scrollData = {allMemberScroll}>{{memberData:memberDataNone}}</MemberEntry>)
        toggleButton();
    })

    it("Test render when banned", () => {
        let copyMemberScroll = allMemberScroll;
        copyMemberScroll.friends = []
        copyMemberScroll.blocked = []
        copyMemberScroll.scrollType = "Banned"
        copyMemberScroll.role = "owner"
        render(<MemberEntry index = {""} scrollData = {allMemberScroll}>{{memberData:memberDataNone}}</MemberEntry>)
        toggleButton();
    })

    describe("Test user interactions", () =>{
        let memberData;
        let scrollData;

        beforeEach(()=>{
            memberData = {
                "username":"user#2224",
                "role":"participant"
            }

            scrollData = {
                blocked : ["blocked#4444"],
                friends : ["friend#4444"],
                username : ["me#4444"],
                role:"owner",
                scrollType:"Members",
                leagueID:"id",
                leagueName:"name"
            }

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
            scrollData.friends = ["user#2224"]
            render(<MemberEntry index = {""} scrollData = {scrollData}>{{memberData:memberData}}</MemberEntry>)
            toggleButton();
            hitDropdown(0);
            expect(blockUserMock).toBeCalledTimes(0)
            expect(removeFriendMock).toBeCalledTimes(1)
            expect(sendFriendRequestMock).toBeCalledTimes(0)
            expect(unBlockUserMock).toBeCalledTimes(0)
            expect(reloadPageMock).toBeCalledTimes(1)
            expect(removeAdminUserMock).toBeCalledTimes(0)
            expect(addAdminUserMock).toBeCalledTimes(0)
            expect(banUserMock).toBeCalledTimes(0)
            expect(unbanUserMock).toBeCalledTimes(0)
            expect(acceptUserMock).toBeCalledTimes(0)
            expect(declineUserMock).toBeCalledTimes(0)
            expect(revokeUserMock).toBeCalledTimes(0)
            expect(kickOutUserMock).toBeCalledTimes(0)
            expect(removeFriendMock).toBeCalledWith("user#2224", reloadPageMock)
        })

        it("Test block", () => {
            scrollData.friends = ["user#2224"]
            render(<MemberEntry index = {""} scrollData = {scrollData}>{{memberData:memberData}}</MemberEntry>)
            toggleButton();
            hitDropdown(1);
            expect(blockUserMock).toBeCalledTimes(1)
            expect(removeFriendMock).toBeCalledTimes(0)
            expect(sendFriendRequestMock).toBeCalledTimes(0)
            expect(unBlockUserMock).toBeCalledTimes(0)
            expect(reloadPageMock).toBeCalledTimes(1)
            expect(removeAdminUserMock).toBeCalledTimes(0)
            expect(addAdminUserMock).toBeCalledTimes(0)
            expect(banUserMock).toBeCalledTimes(0)
            expect(unbanUserMock).toBeCalledTimes(0)
            expect(acceptUserMock).toBeCalledTimes(0)
            expect(declineUserMock).toBeCalledTimes(0)
            expect(revokeUserMock).toBeCalledTimes(0)
            expect(kickOutUserMock).toBeCalledTimes(0)
            expect(blockUserMock).toBeCalledWith("user#2224", reloadPageMock)
        })

        it("Test blocked person, try to friend", () => {
            scrollData.blocked = ["user#2224"]
            render(<MemberEntry index = {""} scrollData = {scrollData}>{{memberData:memberData}}</MemberEntry>)
            toggleButton();
            hitDropdown(0);
            expect(blockUserMock).toBeCalledTimes(0)
            expect(removeFriendMock).toBeCalledTimes(0)
            expect(sendFriendRequestMock).toBeCalledTimes(1)
            expect(unBlockUserMock).toBeCalledTimes(0)
            expect(reloadPageMock).toBeCalledTimes(1)
            expect(removeAdminUserMock).toBeCalledTimes(0)
            expect(addAdminUserMock).toBeCalledTimes(0)
            expect(banUserMock).toBeCalledTimes(0)
            expect(unbanUserMock).toBeCalledTimes(0)
            expect(acceptUserMock).toBeCalledTimes(0)
            expect(declineUserMock).toBeCalledTimes(0)
            expect(revokeUserMock).toBeCalledTimes(0)
            expect(kickOutUserMock).toBeCalledTimes(0)
            expect(sendFriendRequestMock).toBeCalledWith("user#2224", reloadPageMock)
        })

        it("Test blocked person, try to unblock", () => {
            scrollData.blocked = ["user#2224"]
            render(<MemberEntry index = {""} scrollData = {scrollData}>{{memberData:memberData}}</MemberEntry>)
            toggleButton();
            hitDropdown(1);
            expect(blockUserMock).toBeCalledTimes(0)
            expect(removeFriendMock).toBeCalledTimes(0)
            expect(sendFriendRequestMock).toBeCalledTimes(0)
            expect(unBlockUserMock).toBeCalledTimes(1)
            expect(reloadPageMock).toBeCalledTimes(1)
            expect(removeAdminUserMock).toBeCalledTimes(0)
            expect(addAdminUserMock).toBeCalledTimes(0)
            expect(banUserMock).toBeCalledTimes(0)
            expect(unbanUserMock).toBeCalledTimes(0)
            expect(acceptUserMock).toBeCalledTimes(0)
            expect(declineUserMock).toBeCalledTimes(0)
            expect(revokeUserMock).toBeCalledTimes(0)
            expect(kickOutUserMock).toBeCalledTimes(0)
            expect(unBlockUserMock).toBeCalledWith("user#2224", reloadPageMock)
        })

        it("Test unknown person, try to friend", () => {
            render(<MemberEntry index = {""} scrollData = {scrollData}>{{memberData:memberData}}</MemberEntry>)
            toggleButton();
            hitDropdown(0);
            expect(blockUserMock).toBeCalledTimes(0)
            expect(removeFriendMock).toBeCalledTimes(0)
            expect(sendFriendRequestMock).toBeCalledTimes(1)
            expect(unBlockUserMock).toBeCalledTimes(0)
            expect(reloadPageMock).toBeCalledTimes(1)
            expect(removeAdminUserMock).toBeCalledTimes(0)
            expect(addAdminUserMock).toBeCalledTimes(0)
            expect(banUserMock).toBeCalledTimes(0)
            expect(unbanUserMock).toBeCalledTimes(0)
            expect(acceptUserMock).toBeCalledTimes(0)
            expect(declineUserMock).toBeCalledTimes(0)
            expect(revokeUserMock).toBeCalledTimes(0)
            expect(kickOutUserMock).toBeCalledTimes(0)
            expect(sendFriendRequestMock).toBeCalledWith("user#2224", reloadPageMock)
        })

        it("Test unknown person, try to block", () => {
            render(<MemberEntry index = {""} scrollData = {scrollData}>{{memberData:memberData}}</MemberEntry>)
            toggleButton();
            hitDropdown(1);
            expect(blockUserMock).toBeCalledTimes(1)
            expect(removeFriendMock).toBeCalledTimes(0)
            expect(sendFriendRequestMock).toBeCalledTimes(0)
            expect(unBlockUserMock).toBeCalledTimes(0)
            expect(reloadPageMock).toBeCalledTimes(1)
            expect(removeAdminUserMock).toBeCalledTimes(0)
            expect(addAdminUserMock).toBeCalledTimes(0)
            expect(banUserMock).toBeCalledTimes(0)
            expect(unbanUserMock).toBeCalledTimes(0)
            expect(acceptUserMock).toBeCalledTimes(0)
            expect(declineUserMock).toBeCalledTimes(0)
            expect(revokeUserMock).toBeCalledTimes(0)
            expect(kickOutUserMock).toBeCalledTimes(0)
            expect(blockUserMock).toBeCalledWith("user#2224", reloadPageMock)
        })

        it("Test kick out user", () => {
            render(<MemberEntry index = {""} scrollData = {scrollData}>{{memberData:memberData}}</MemberEntry>)
            toggleButton();
            hitDropdown(2);
            expect(blockUserMock).toBeCalledTimes(0)
            expect(removeFriendMock).toBeCalledTimes(0)
            expect(sendFriendRequestMock).toBeCalledTimes(0)
            expect(unBlockUserMock).toBeCalledTimes(0)
            expect(reloadPageMock).toBeCalledTimes(0)
            expect(removeAdminUserMock).toBeCalledTimes(0)
            expect(addAdminUserMock).toBeCalledTimes(0)
            expect(banUserMock).toBeCalledTimes(0)
            expect(unbanUserMock).toBeCalledTimes(0)
            expect(acceptUserMock).toBeCalledTimes(0)
            expect(declineUserMock).toBeCalledTimes(0)
            expect(revokeUserMock).toBeCalledTimes(0)
            expect(kickOutUserMock).toBeCalledTimes(1)
            expect(kickOutUserMock).toBeCalledWith({"leagueID": "id", "leagueName": "name", "recipient": "user#2224"}, expect.any(Function))
        })
        it("Test ban user", () => {
            render(<MemberEntry index = {""} scrollData = {scrollData}>{{memberData:memberData}}</MemberEntry>)
            toggleButton();
            hitDropdown(3);
            expect(blockUserMock).toBeCalledTimes(0)
            expect(removeFriendMock).toBeCalledTimes(0)
            expect(sendFriendRequestMock).toBeCalledTimes(0)
            expect(unBlockUserMock).toBeCalledTimes(0)
            expect(reloadPageMock).toBeCalledTimes(0)
            expect(removeAdminUserMock).toBeCalledTimes(0)
            expect(addAdminUserMock).toBeCalledTimes(0)
            expect(banUserMock).toBeCalledTimes(1)
            expect(unbanUserMock).toBeCalledTimes(0)
            expect(acceptUserMock).toBeCalledTimes(0)
            expect(declineUserMock).toBeCalledTimes(0)
            expect(revokeUserMock).toBeCalledTimes(0)
            expect(kickOutUserMock).toBeCalledTimes(0)
            expect(banUserMock).toBeCalledWith({"leagueID": "id", "leagueName": "name", "recipient": "user#2224"}, expect.any(Function))
        })

        it("Test remove admin", () => {
            memberData.role = "admin"
            render(<MemberEntry index = {""} scrollData = {scrollData}>{{memberData:memberData}}</MemberEntry>)
            toggleButton();
            hitDropdown(4);
            expect(blockUserMock).toBeCalledTimes(0)
            expect(removeFriendMock).toBeCalledTimes(0)
            expect(sendFriendRequestMock).toBeCalledTimes(0)
            expect(unBlockUserMock).toBeCalledTimes(0)
            expect(reloadPageMock).toBeCalledTimes(1)
            expect(removeAdminUserMock).toBeCalledTimes(1)
            expect(addAdminUserMock).toBeCalledTimes(0)
            expect(banUserMock).toBeCalledTimes(0)
            expect(unbanUserMock).toBeCalledTimes(0)
            expect(acceptUserMock).toBeCalledTimes(0)
            expect(declineUserMock).toBeCalledTimes(0)
            expect(revokeUserMock).toBeCalledTimes(0)
            expect(kickOutUserMock).toBeCalledTimes(0)
            expect(removeAdminUserMock).toBeCalledWith({"leagueID": "id", "leagueName": "name", "recipient": "user#2224"}, reloadPageMock)
        })

        it("Test add admin", () => {
            render(<MemberEntry index = {""} scrollData = {scrollData}>{{memberData:memberData}}</MemberEntry>)
            toggleButton();
            hitDropdown(4);
            expect(blockUserMock).toBeCalledTimes(0)
            expect(removeFriendMock).toBeCalledTimes(0)
            expect(sendFriendRequestMock).toBeCalledTimes(0)
            expect(unBlockUserMock).toBeCalledTimes(0)
            expect(reloadPageMock).toBeCalledTimes(1)
            expect(removeAdminUserMock).toBeCalledTimes(0)
            expect(addAdminUserMock).toBeCalledTimes(1)
            expect(banUserMock).toBeCalledTimes(0)
            expect(unbanUserMock).toBeCalledTimes(0)
            expect(acceptUserMock).toBeCalledTimes(0)
            expect(declineUserMock).toBeCalledTimes(0)
            expect(revokeUserMock).toBeCalledTimes(0)
            expect(kickOutUserMock).toBeCalledTimes(0)
            expect(addAdminUserMock).toBeCalledWith({"leagueID": "id", "leagueName": "name", "recipient": "user#2224"}, reloadPageMock)

        })

        it("Test accept invite", () => {
            scrollData.scrollType="Received";
            render(<MemberEntry index = {""} scrollData = {scrollData}>{{memberData:memberData}}</MemberEntry>)
            toggleButton();
            hitDropdown(2);
            expect(blockUserMock).toBeCalledTimes(0)
            expect(removeFriendMock).toBeCalledTimes(0)
            expect(sendFriendRequestMock).toBeCalledTimes(0)
            expect(unBlockUserMock).toBeCalledTimes(0)
            expect(reloadPageMock).toBeCalledTimes(1)
            expect(removeAdminUserMock).toBeCalledTimes(0)
            expect(addAdminUserMock).toBeCalledTimes(0)
            expect(banUserMock).toBeCalledTimes(0)
            expect(unbanUserMock).toBeCalledTimes(0)
            expect(acceptUserMock).toBeCalledTimes(1)
            expect(declineUserMock).toBeCalledTimes(0)
            expect(revokeUserMock).toBeCalledTimes(0)
            expect(kickOutUserMock).toBeCalledTimes(0)
            expect(acceptUserMock).toBeCalledWith({"leagueID": "id",  "recipient": "user#2224"},  expect.any(Function))
        })

        it("Test decline invite", () => {
            scrollData.scrollType="Received";
            render(<MemberEntry index = {""} scrollData = {scrollData}>{{memberData:memberData}}</MemberEntry>)
            toggleButton();
            hitDropdown(3);
            expect(blockUserMock).toBeCalledTimes(0)
            expect(removeFriendMock).toBeCalledTimes(0)
            expect(sendFriendRequestMock).toBeCalledTimes(0)
            expect(unBlockUserMock).toBeCalledTimes(0)
            expect(reloadPageMock).toBeCalledTimes(1)
            expect(removeAdminUserMock).toBeCalledTimes(0)
            expect(addAdminUserMock).toBeCalledTimes(0)
            expect(banUserMock).toBeCalledTimes(0)
            expect(unbanUserMock).toBeCalledTimes(0)
            expect(acceptUserMock).toBeCalledTimes(0)
            expect(declineUserMock).toBeCalledTimes(1)
            expect(revokeUserMock).toBeCalledTimes(0)
            expect(kickOutUserMock).toBeCalledTimes(0)
            expect(declineUserMock).toBeCalledWith({"leagueID": "id", "recipient": "user#2224"},  expect.any(Function))
        })

        it("Test unban", () => {
            scrollData.scrollType="Banned";
            render(<MemberEntry index = {""} scrollData = {scrollData}>{{memberData:memberData}}</MemberEntry>)
            toggleButton();
            hitDropdown(2);
            expect(blockUserMock).toBeCalledTimes(0)
            expect(removeFriendMock).toBeCalledTimes(0)
            expect(sendFriendRequestMock).toBeCalledTimes(0)
            expect(unBlockUserMock).toBeCalledTimes(0)
            expect(reloadPageMock).toBeCalledTimes(0)
            expect(removeAdminUserMock).toBeCalledTimes(0)
            expect(addAdminUserMock).toBeCalledTimes(0)
            expect(banUserMock).toBeCalledTimes(0)
            expect(unbanUserMock).toBeCalledTimes(1)
            expect(acceptUserMock).toBeCalledTimes(0)
            expect(declineUserMock).toBeCalledTimes(0)
            expect(revokeUserMock).toBeCalledTimes(0)
            expect(kickOutUserMock).toBeCalledTimes(0)
            expect(unbanUserMock).toBeCalledWith({"leagueID": "id", "recipient": "user#2224"},  expect.any(Function))
        })

        it("Test revoke invite", () => {
            scrollData.scrollType="Invited";
            render(<MemberEntry index = {""} scrollData = {scrollData}>{{memberData:memberData}}</MemberEntry>)
            toggleButton();
            hitDropdown(2);
            expect(blockUserMock).toBeCalledTimes(0)
            expect(removeFriendMock).toBeCalledTimes(0)
            expect(sendFriendRequestMock).toBeCalledTimes(0)
            expect(unBlockUserMock).toBeCalledTimes(0)
            expect(reloadPageMock).toBeCalledTimes(0)
            expect(removeAdminUserMock).toBeCalledTimes(0)
            expect(addAdminUserMock).toBeCalledTimes(0)
            expect(banUserMock).toBeCalledTimes(0)
            expect(unbanUserMock).toBeCalledTimes(0)
            expect(acceptUserMock).toBeCalledTimes(0)
            expect(declineUserMock).toBeCalledTimes(0)
            expect(revokeUserMock).toBeCalledTimes(1)
            expect(kickOutUserMock).toBeCalledTimes(0)
            expect(revokeUserMock).toBeCalledWith({"leagueID": "id", "recipient": "user#2224"},  expect.any(Function))
        })
    })
});
