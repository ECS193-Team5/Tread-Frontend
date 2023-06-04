import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import MemberEntry from '../../../src/components/League/MemberEntry';
import * as cssFunc from "../../../src/helpers/CssEffects";
import * as friendFunc from "../../../src/routes/friend_list";


let setDisplayPropertyMock =  jest.spyOn(cssFunc, "setDisplayProperty").mockImplementation()


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
        render(<MemberEntry index = {""}>{{memberData:memberDataParticipant, scrollData:allMemberScroll}}</MemberEntry>)
    })

    it("Test render when user is participant", () => {
        let copyMemberScroll = allMemberScroll;
        copyMemberScroll.role = "participant";
        render(<MemberEntry index = {""}>{{memberData:memberDataParticipant, scrollData:copyMemberScroll}}</MemberEntry>)
        toggleButton();
    })

    it("Test render when user is admin", () => {
        let copyMemberScroll = allMemberScroll;
        copyMemberScroll.role = "admin";
        render(<MemberEntry index = {""}>{{memberData:memberDataParticipant, scrollData:copyMemberScroll}}</MemberEntry>)
        toggleButton();
    })

    it("Test render when member is owner", () => {
        let copyMemberScroll = allMemberScroll;
        copyMemberScroll.role = "admin";
        render(<MemberEntry index = {""}>{{memberData:memberDataOwner, scrollData:copyMemberScroll}}</MemberEntry>)
        toggleButton();
    })

    it("Test render when member is admin", () => {
        let copyMemberScroll = allMemberScroll;
        copyMemberScroll.role = "admin";
        render(<MemberEntry index = {""}>{{memberData:memberDataAdmin, scrollData:copyMemberScroll}}</MemberEntry>)
        toggleButton();
    })

    it("Test render when member is no one", () => {
        let copyMemberScroll = allMemberScroll;
        copyMemberScroll.role = "admin";
        render(<MemberEntry index = {""}>{{memberData:memberDataNone, scrollData:copyMemberScroll}}</MemberEntry>)
        toggleButton();
    })

    it("Test render when member is user", () => {
        let copyMemberScroll = allMemberScroll;
        copyMemberScroll.username = "user#2224"
        render(<MemberEntry index = {""}>{{memberData:memberDataNone, scrollData:copyMemberScroll}}</MemberEntry>)
        toggleButton();
    })

    it("Test render when member is friend", () => {
        let copyMemberScroll = allMemberScroll;
        copyMemberScroll.username = "me#2224"
        copyMemberScroll.friends = ["user#2224"]
        render(<MemberEntry index = {""}>{{memberData:memberDataNone, scrollData:copyMemberScroll}}</MemberEntry>)
        toggleButton();
    })

    it("Test render when member is blocked", () => {
        let copyMemberScroll = allMemberScroll;
        copyMemberScroll.friends = []
        copyMemberScroll.blocked = ["user#2224"]
        render(<MemberEntry index = {""}>{{memberData:memberDataNone, scrollData:copyMemberScroll}}</MemberEntry>)
        toggleButton();
    })

    it("Test render when received", () => {
        let copyMemberScroll = allMemberScroll;
        copyMemberScroll.friends = []
        copyMemberScroll.blocked = []
        copyMemberScroll.scrollType = "Received"
        copyMemberScroll.role = "owner"
        render(<MemberEntry index = {""}>{{memberData:memberDataNone, scrollData:copyMemberScroll}}</MemberEntry>)
        toggleButton();
    })

    it("Test render when banned", () => {
        let copyMemberScroll = allMemberScroll;
        copyMemberScroll.friends = []
        copyMemberScroll.blocked = []
        copyMemberScroll.scrollType = "Banned"
        copyMemberScroll.role = "owner"
        render(<MemberEntry index = {""}>{{memberData:memberDataNone, scrollData:copyMemberScroll}}</MemberEntry>)
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
            render(<MemberEntry index = {""}>{{memberData:memberData, scrollData:scrollData}}</MemberEntry>)
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
            render(<MemberEntry index = {""}>{{memberData:memberData, scrollData:scrollData}}</MemberEntry>)
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
            render(<MemberEntry index = {""}>{{memberData:memberData, scrollData:scrollData}}</MemberEntry>)
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
            render(<MemberEntry index = {""}>{{memberData:memberData, scrollData:scrollData}}</MemberEntry>)
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
            render(<MemberEntry index = {""}>{{memberData:memberData, scrollData:scrollData}}</MemberEntry>)
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
            render(<MemberEntry index = {""}>{{memberData:memberData, scrollData:scrollData}}</MemberEntry>)
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
            render(<MemberEntry index = {""}>{{memberData:memberData, scrollData:scrollData}}</MemberEntry>)
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
            render(<MemberEntry index = {""}>{{memberData:memberData, scrollData:scrollData}}</MemberEntry>)
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
            render(<MemberEntry index = {""}>{{memberData:memberData, scrollData:scrollData}}</MemberEntry>)
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
            render(<MemberEntry index = {""}>{{memberData:memberData, scrollData:scrollData}}</MemberEntry>)
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
            render(<MemberEntry index = {""}>{{memberData:memberData, scrollData:scrollData}}</MemberEntry>)
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
            render(<MemberEntry index = {""}>{{memberData:memberData, scrollData:scrollData}}</MemberEntry>)
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
            render(<MemberEntry index = {""}>{{memberData:memberData, scrollData:scrollData}}</MemberEntry>)
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
            render(<MemberEntry index = {""}>{{memberData:memberData, scrollData:scrollData}}</MemberEntry>)
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
