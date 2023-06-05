import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom'

import * as s from "./shared";

export function setFriendsList(name){
    s.clickBarButton(0);
}

export function setSentFriendsList(name){
    s.clickBarButton(1);
}

export function setReceivedFriendsList(name){
    s.clickBarButton(2);
}

export function setBlockedFriendsList(name){
    s.clickBarButton(3);
}

export function setAddFriendList(name){
    s.clickBarButton(4);
}

export function setLeaguesList(name){
    s.clickBarButton(0);
}

export function setAdminLeagueList(name){
    s.clickBarButton(1);
}

export function setSentLeagueList(name){
    s.clickBarButton(2);
}

export function setInviteLeagueList(name){
    s.clickBarButton(3);
}

export function setCreateLeagueList(name){
    s.clickBarButton(4);
}

export function clickFriendPage(){
    s.clickButton("PageSwitchFriendButton");
}

export function clickLeaguePage(){
    s.clickButton("PageSwitchLeagueButton");
}

export function  toggleButtonFriend () {
    let button = screen.getByTestId("FriendObjMoreInfoButtonbetty#4000");
    fireEvent.click(button)
}

export function hitDropDownFriend  (num) {
    let button = screen.getByTestId("DropDownEntryComponentbetty#4000FriendObj-"+num)
    fireEvent.click(button)
}

export function toggleButtonLeague  () {
    let button = screen.getByTestId("LeagueObjMoreInfoButtonname");
    fireEvent.click(button)
}

export function hitDropDownLeague  (num) {
    let button = screen.getByTestId("DropDownEntryComponentnameLeagueObj-"+num)
    fireEvent.click(button)
}