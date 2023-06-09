import { test, expect } from '@playwright/test';
import * as helpers from "../src/helpers/helperFunction.js";
import { create } from 'qrcode';
require('dotenv').config();
const testPassword = process.env.TEST_PASSWORD;
const testEmail = process.env.TEST_EMAIL
///test2
//test.use({storageState: 'playwright/.auth/treadUser1.json'})
test('As a user of Tread, I would like to be able to login using Google authentication to save my progress and settings.', async ({ browser }) => {
    const user1Context = await browser.newContext({ storageState: './playwright/.auth/treadUser1.json' });
    const user1Page = await user1Context.newPage();
    await user1Page.goto('https://tread.run/currentChallengePage');
    await user1Context.close();
});

test('Test login user, signing up, and deleting', async ({ page }) => {
    await page.goto('https://tread.run');
    await page.waitForURL('https://tread.run')
    const popupPromise = page.waitForEvent('popup');
    await page.frameLocator('iframe[title="Sign in with Google Button"]')
        .getByRole('button', { name: 'Sign in with Google' }).click();
    const page1 = await popupPromise;

    await page1.getByRole('textbox', { name: 'Email or phone' }).click();
    await page1.getByRole('textbox', { name: 'Email or phone' }).fill(testEmail);
    await page1.getByRole('button', { name: 'Next' }).click();
    await page1.getByRole('textbox', { name: 'Enter your password' }).click();
    await page1.getByRole('textbox', { name: 'Enter your password' }).fill(testPassword);
    await page1.getByRole('button', { name: 'Next' }).click();
    // Wait until the page receives the cookies.
    //
    // Sometimes login flow sets cookies in the process of several redirects.
    // Wait for the final URL to ensure that the cookies are actually set.
    await expect(page).toHaveURL('https://tread.run/signUpPage');
    await page.getByTestId('UsernameFormUsernameInput').click();
    await page.getByTestId('UsernameFormUsernameInput').fill('TreadTest');
    await page.getByTestId('DisplayNameFormDisplayNameInput').click();
    await page.getByTestId('DisplayNameFormDisplayNameInput').fill('TreadTest');
    await page.getByTestId('SignUpFormSignUpButton').click();
    await expect(page).toHaveURL('https://tread.run/currentChallengePage',{timeout: 8000});
    await page.getByTestId('SideBarProfileSettingsButton').click();
    await expect(page).toHaveURL('https://tread.run/profileSettingsPage');
    page.once('dialog', async dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        await dialog.dismiss().catch(() => { });
    });
    await page.getByTestId('DeleteSectionDeleteAccountButton').click();
    page.once('dialog', async dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        await dialog.accept("stsrtrstrs").catch(() => { });
    });
    await page.getByTestId('DeleteSectionDeleteAccountButton').click();
    page.once('dialog', async dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        await dialog.accept("delete account").catch(() => { });
    });
    await page.getByTestId('DeleteSectionDeleteAccountButton').click();
    await page.waitForURL('https://tread.run')
    await expect(page).toHaveURL('https://tread.run');
});

function setShortChallengeTime(duration) {
    const issueDate = Date.now() - 7 * 60 * 60 * 1000;
    const endDate = issueDate + duration * 60 * 1000;
    const issueDateString = new Date(issueDate).toISOString().substring(0,16);
    const endDateString = new Date(endDate).toISOString().substring(0,16);
    return [issueDateString, endDateString]
}

async function addChallengeFromChallengePage(page, exerciseName, amount, unit, duration, type, receiver){
    await page.getByTestId('SideBarChallengesButton').click();
    await page.getByTestId('BarButtonComponent3').click();
    await page.waitForURL('https://tread.run/addChallengePage')
    await addChallenge(page, exerciseName, amount, unit, duration, type, receiver);
}

async function addChallengeFromFriendPage(page, username, exerciseName, amount, unit, duration) {
    await page.getByTestId('SideBarSocialPageButton').click();
    await page.getByTestId('BarButtonComponent0').click();
    await page.getByTestId('FriendObjMoreInfoButton' + username).click();
    await page.getByTestId('DropDownEntryDropDownText' + username + 'FriendObj-2').click();
    await page.waitForURL('https://tread.run/addChallengePage?prefill=friend.' + username);
    await addChallenge(page, exerciseName, amount, unit, duration);
    await page.waitForResponse('https://api.tread.run/challenges/add_friend_challenge');
}

async function addChallenge(page, exerciseName, amount, unit, duration, type, receiver) {
    await page.getByTestId('ExerciseNameFormAddChallengeExerciseNameSelect').selectOption(exerciseName);
    await page.getByTestId('ExerciseAmountFormExerciseAmountInput').click();
    await page.getByTestId('ExerciseAmountFormExerciseAmountInput').fill(amount);
    await page.getByTestId('ExerciseAmountFormUnitSelect').selectOption(unit);
    const [issueDate, dueDate] = setShortChallengeTime(duration);
    await page.getByTestId('ExerciseDateFormIssueDateInput').fill(issueDate);
    await page.getByTestId('ExerciseDateFormDueDateInput').fill(dueDate);
    if (type) {
        await page.getByTestId('ExerciseReceiverFormChallengeTypeSelect').selectOption(type);
    }
    if (receiver) {
        await page.getByTestId('ExerciseReceiverFormReceiverSelect').selectOption(receiver);
    }
    await sleep(2000);
    await page.getByTestId('ChallengeFormSubmitButton').click();
    if (type) {
        await page.waitForResponse('https://api.tread.run/challenges/add_' + type +'_challenge');
    }
}

test('Send self challenge', async ({ browser }) => {
    const user1Context = await browser.newContext({ storageState: './playwright/.auth/treadUser1.json' });
    const page = await user1Context.newPage();
    await page.goto('https://tread.run/currentChallengePage');
    await addChallengeFromChallengePage(page, "Badminton", '5', "min", 1, "self")
    await expect(page).toHaveURL('https://tread.run/currentChallengePage');
    await user1Context.close();
});


async function addFriend(page, username) {
    await page.getByTestId('SideBarSocialPageButton').click();
    await page.getByTestId('BarButtonComponent4').click();
    await page.getByTestId('UserAddFormDescriptionUsernameInput').click();
    await page.getByTestId('UserAddFormDescriptionUsernameInput').fill(username);
    await page.getByTestId('UserAddFormSendButton').click();
    await page.waitForResponse('https://api.tread.run/friend_list/send_friend_request');
}

async function acceptFriendRequest(page, username) {
    await page.getByTestId('SideBarSocialPageButton').click();
    await page.getByTestId('BarButtonComponent2').click();
    await page.getByTestId('FriendObjMoreInfoButton' + username).click();
    await page.getByTestId('DropDownEntryDropDownText' + username + 'FriendObj-0').click();
    await page.waitForResponse('https://api.tread.run/friend_list/accept_received_request');
}

async function unFriend(page, username) {
    await page.getByTestId('SideBarSocialPageButton').click();
    await page.getByTestId('BarButtonComponent0').click();
    await page.getByTestId('FriendObjMoreInfoButton' + username).click();
    await page.getByTestId('DropDownEntryDropDownText'+ username +'FriendObj-0').click();
    await page.waitForResponse('https://api.tread.run/friend_list/remove_friend')
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, 1000));
}

async function deleteAllNotifications(page){
    await page.getByTestId('SideBarExerciseHistoryButton').click();
    await page.getByTestId('MailBoxDeleteAllButton').click();
    await page.waitForResponse('https://api.tread.run/notifications/delete_all_notifications');
}

async function rejectFriendChallengeRequest(page, exerciseName) {
    await page.getByTestId('SideBarChallengesButton').click();
    await page.getByTestId('BarButtonComponent2').click();
    await page.getByTestId('DeclineChallengeButtonComponent' + exerciseName).click();
    await page.waitForResponse("https://api.tread.run/challenges/decline_friend_challenge")
}

async function declineFriendRequest(page, username){
    await page.getByTestId('SideBarSocialPageButton').click();
    await page.getByTestId('BarButtonComponent2').click();
    await page.getByTestId('FriendObjMoreInfoButton' + username).click();
    await page.getByTestId('DropDownEntryDropDownText' + username +'FriendObj-1').click();
    await page.waitForResponse("https://api.tread.run/friend_list/remove_received_request");
}

async function rescindFriendRequest(page, username) {
    await page.getByTestId('SideBarSocialPageButton').click();
    await page.getByTestId('BarButtonComponent1').click();
    await page.getByTestId('FriendObjMoreInfoButton' + username).click();
    await page.getByTestId('DropDownEntryDropDownText'+ username +'FriendObj-0').click()
    await page.waitForResponse("https://api.tread.run/friend_list/remove_sent_request");
}

const user2Username = 'TreadTest#8802';
const user1Username = 'TreadTest2#6945';

test('Friend Functionality', async ({ browser }) => {
    const user1Context = await browser.newContext({ storageState: './playwright/.auth/treadUser1.json'});
    const user1Page = await user1Context.newPage();
    await user1Page.goto('https://tread.run/currentChallengePage');
    const user2Context = await browser.newContext({ storageState: './playwright/.auth/treadUser2.json'});
    const user2Page = await user2Context.newPage();
    await user2Page.goto('https://tread.run/currentChallengePage');

    await addFriend(user1Page, user2Username);
    // add expect: Check the notification exists
    await user2Page.getByTestId('SideBarExerciseHistoryButton').click();
    await user2Page.getByTestId('MailBoxEntryDeclineButton0').click();
    await user2Page.waitForResponse('https://api.tread.run/notifications/delete_notification');
    await user2Page.getByTestId('SideBarChallengesButton').click();
    // undo friend request
    await rescindFriendRequest(user1Page, user2Username);

    await addFriend(user1Page, user2Username);
    // add expect: Check the notification exists
    await user2Page.getByTestId('SideBarExerciseHistoryButton').click();
    await user2Page.getByTestId('MailBoxEntryDeclineButton0').click();
    await user2Page.waitForResponse('https://api.tread.run/notifications/delete_notification');
    // reject friend request
    await declineFriendRequest(user2Page, user1Username);

    // user1 sends user2 invite and user2 deletes notification and accepts
    await addFriend(user1Page, user2Username);
    await user2Page.getByTestId('SideBarExerciseHistoryButton').click();
    await user2Page.waitForURL('https://tread.run/profileStatsPage')
    await user2Page.getByTestId('MailBoxEntryDeclineButton0').click();
    await user2Page.waitForResponse('https://api.tread.run/notifications/delete_notification');
    await acceptFriendRequest(user2Page, user1Username);

    // delete notification for request accepted
    await user1Page.getByTestId('SideBarExerciseHistoryButton').click();
    await user1Page.getByTestId('MailBoxDeleteAllButton').click();
    await user1Page.waitForResponse('https://api.tread.run/notifications/delete_all_notifications');

    // user1 adds challenges and user2 declines them
    await addChallengeFromChallengePage(user1Page, 'Barre', '24', 'min', 1, 'friend', user2Username)
    await addChallengeFromFriendPage(user1Page, user2Username, 'Baseball', '24', 'mi', 1);
    await rejectFriendChallengeRequest(user2Page, 'Barre');
    await rejectFriendChallengeRequest(user2Page, 'Baseball');
    // get rid of notification
    await user2Page.getByTestId('SideBarExerciseHistoryButton').click();
    await user2Page.getByTestId('MailBoxEntryDeclineButton0').click();
    await user2Page.getByTestId('MailBoxEntryDeclineButton1').click();
    await user2Page.waitForResponse('https://api.tread.run/notifications/delete_notification');

    //unfriend
    await unFriend(user2Page, user1Username)

    await user1Context.close();
    await user2Context.close();
});

async function unblockUser(page, username) {
    await page.getByTestId('SideBarSocialPageButton').click();
    await page.getByTestId('BarButtonComponent3').click();
    await page.getByTestId('FriendObjMoreInfoButton' + username).click();
    await page.getByTestId('DropDownEntryDropDownText' + username + 'FriendObj-0').click();
    await page.waitForResponse('https://api.tread.run/friend_list/unblock_user');
}

async function rescindFriendChallengeRequest(page, exerciseName) {
    await page.getByTestId('SideBarChallengesButton').click();
    await page.getByTestId('BarButtonComponent1').click();
    await page.getByTestId('DeleteChallengeButtonComponent' + exerciseName).click();
    await page.waitForResponse("https://api.tread.run/challenges/delete_friend_challenge")
}

test('Block Functionality', async ({ browser }) => {
    const user1Context = await browser.newContext({ storageState: './playwright/.auth/treadUser1.json'});
    const user1Page = await user1Context.newPage();
    await user1Page.goto('https://tread.run/currentChallengePage');
    const user2Context = await browser.newContext({ storageState: './playwright/.auth/treadUser2.json'});
    const user2Page = await user2Context.newPage();
    await user2Page.goto('https://tread.run/currentChallengePage');

    await addFriend(user1Page, user2Username);

    // user2 checks user1 sent request and block
    await user2Page.getByTestId('SideBarSocialPageButton').click();
    await user2Page.getByTestId('BarButtonComponent2').click();
    await user2Page.getByTestId('FriendObjMoreInfoButton' + user1Username).click();
    await user2Page.getByTestId('DropDownEntryDropDownText' + user1Username + 'FriendObj-2').click();
    await user2Page.waitForResponse('https://api.tread.run/friend_list/block_user');
    // user2 checks user1 is blocked
    await user2Page.getByTestId('BarButtonComponent3').click();
    // user2 sends friend request to user1;
    await addFriend(user2Page, user1Username);
    // user2 checks user1 unblocked
    await user2Page.getByTestId('BarButtonComponent3').click();
    // user2 checks user1 is in sent requests and block them again
    await user2Page.getByTestId('BarButtonComponent1').click();
    await user2Page.getByTestId('FriendObjMoreInfoButton' + user1Username).click();
    await user2Page.getByTestId('DropDownEntryDropDownText' + user1Username +'FriendObj-1').click();
    await user2Page.waitForResponse('https://api.tread.run/friend_list/block_user');
    // Show blocked from user2
    await user2Page.getByTestId('BarButtonComponent3').click();

    // User1 sends friend request to user2
    await addFriend(user1Page, user2Username);
    // User2 views received requests
    await user2Page.getByTestId('BarButtonComponent2').click();
    // User2 unblocks user1
    await unblockUser(user2Page, user1Username);
    // User1 sends friend request to user2 again
    await addFriend(user1Page, user2Username);
    // User2 checks that user1 sent and add them as friend
    await acceptFriendRequest(user2Page, user1Username);
    // User2 blocks User1 as when friend
    await user2Page.getByTestId('BarButtonComponent0').click();
    await user2Page.getByTestId('FriendObjMoreInfoButton' + user1Username).click();
    await user2Page.getByTestId('DropDownEntryDropDownText'+ user1Username +'FriendObj-1').click();
    await user2Page.waitForResponse('https://api.tread.run/friend_list/block_user');
    // User2 unblocks user1 and sees other tabs
    await unblockUser(user2Page, user1Username);
    await user2Page.getByTestId('BarButtonComponent2').click();
    await user2Page.getByTestId('BarButtonComponent1').click();
    await user2Page.getByTestId('BarButtonComponent0').click();

    // delete notification for request accepted
    await deleteAllNotifications(user1Page);
    await deleteAllNotifications(user2Page);

    await user1Context.close();
    await user2Context.close();
});

async function acceptFriendChallenge(page, exerciseName) {
    await page.getByTestId('SideBarChallengesButton').click();
    await page.getByTestId('BarButtonComponent2').click();
    await page.getByTestId('AcceptChallengeButtonComponent' + exerciseName).click();
    await page.waitForResponse('https://api.tread.run/challenges/accept_friend_challenge');
}

test('Friend Challenge Interaction', async ({ browser }) => {
    const user1Context = await browser.newContext({ storageState: './playwright/.auth/treadUser1.json'});
    const user1Page = await user1Context.newPage();
    await user1Page.goto('https://tread.run/currentChallengePage');
    const user2Context = await browser.newContext({ storageState: './playwright/.auth/treadUser2.json'});
    const user2Page = await user2Context.newPage();
    await user2Page.goto('https://tread.run/currentChallengePage');

    await addFriend(user1Page, user2Username);
    await acceptFriendRequest(user2Page, user1Username);
    await addChallengeFromFriendPage(user2Page, user1Username, 'Beach Volleyball', '125', 'ct', 1);
    await rescindFriendChallengeRequest(user2Page, 'Beach Volleyball');
    await addChallengeFromChallengePage(user2Page, 'Billards', '80', 'hr', 1, 'friend', user1Username);
    await rejectFriendChallengeRequest(user1Page, 'Billards');
    await addChallengeFromFriendPage(user2Page, user1Username, 'Bocce', '85', 'ft', 2);
    // Switch component to refresh invite list
    await user1Page.getByTestId('BarButtonComponent0').click();
    await acceptFriendChallenge(user1Page, 'Bocce');

    //navigate to see challenge
    await user1Page.getByTestId('BarButtonComponent0').click();

    //unfriend
    await unFriend(user2Page, user1Username);

    // delete notification for request accepted
    await deleteAllNotifications(user1Page);
    await deleteAllNotifications(user2Page);

    await user1Context.close();
    await user2Context.close();
});

async function inviteUserToLeague(page, username, leagueName) {
    await page.getByTestId('SideBarSocialPageButton').click();
    await page.getByTestId('PageSwitchLeagueButton').click();
    await page.getByTestId('LeagueObjLeagueName'+ leagueName).click();
    await page.getByTestId('PageSwitchMemberButton').click();
    await page.getByTestId('BarButtonComponent4').click();
    await page.getByTestId('UserAddFormDescriptionUsernameInput').click();
    await page.getByTestId('UserAddFormDescriptionUsernameInput').fill(username);
    await page.getByTestId('UserAddFormSendButton').click();
    await page.waitForResponse('https://api.tread.run/league/invite_to_join');

}

async function declineInviteToLeague(page, leagueName) {
    await page.getByTestId('SideBarSocialPageButton').click();
    await page.getByTestId('PageSwitchLeagueButton').click();
    await page.getByTestId('BarButtonComponent3').click();
    await page.getByTestId('LeagueObjMoreInfoButton'+ leagueName).click();
    await page.getByTestId('DropDownEntryDropDownText' + leagueName + 'LeagueObj-1').click();
    await page.waitForResponse('https://api.tread.run/league/user_decline_invite');
}

async function acceptLeagueInvitation(page, leagueName) {
    await page.getByTestId('SideBarSocialPageButton').click();
    await page.getByTestId('PageSwitchLeagueButton').click();
    await page.getByTestId('BarButtonComponent3').click();
    await page.getByTestId('LeagueObjMoreInfoButton' + leagueName).click();
    await page.getByTestId('DropDownEntryDropDownText' + leagueName + 'LeagueObj-0').click();
    await page.waitForResponse('https://api.tread.run/league/user_accept_invite');
}

async function createLeague(page, leagueName, leagueType){
    await page.getByTestId('SideBarSocialPageButton').click();
    await page.getByTestId('PageSwitchLeagueButton').click();
    await page.getByTestId('BarButtonComponent4').click();
    await page.getByTestId('LeagueNameFormUpdateLeagueNameInput').click();
    await page.getByTestId('LeagueNameFormUpdateLeagueNameInput').fill(leagueName);
    await page.getByTestId('LeagueDescriptionFormUpdateDescriptionInput').click();
    await page.getByTestId('LeagueDescriptionFormUpdateDescriptionInput').fill('TestDescription');
    await page.getByTestId('LeagueTypeFormUpdateLeagueTypeSelect').selectOption(leagueType);
    await page.getByTestId('LeagueFormButton').click();
    await page.waitForResponse('https://api.tread.run/league/create_league');
};

test('League Invite System', async ({ browser }) => {
    //triple the timeout
    test.slow();
    const leagueName = 'TestLeague';
    const user1Context = await browser.newContext({ storageState: './playwright/.auth/treadUser1.json'});
    const user1Page = await user1Context.newPage();
    await user1Page.goto('https://tread.run/currentChallengePage');
    const user2Context = await browser.newContext({ storageState: './playwright/.auth/treadUser2.json'});
    const user2Page = await user2Context.newPage();
    await user2Page.goto('https://tread.run/currentChallengePage');

    // user1 creating a private league
    await user1Page.getByTestId('SideBarSocialPageButton').click();
    await user1Page.getByTestId('PageSwitchLeagueButton').click();
    await user1Page.getByTestId('BarButtonComponent4').click();
    await user1Page.getByTestId('LeagueNameFormUpdateLeagueNameInput').click();
    await user1Page.getByTestId('LeagueNameFormUpdateLeagueNameInput').fill(leagueName);
    await user1Page.getByTestId('LeagueDescriptionFormUpdateDescriptionInput').click();
    await user1Page.getByTestId('LeagueDescriptionFormUpdateDescriptionInput').fill('TestDescription');
    await user1Page.getByTestId('LeagueFormButton').click();
    await user1Page.waitForResponse('https://api.tread.run/league/create_league');
    // invite user2 to league
    await inviteUserToLeague(user1Page, user2Username, leagueName);
    const leaguePageURL = new URL(user1Page.url());
    const leagueID = leaguePageURL["search"].substring(2);
    console.log(leagueID);
    // Unsend the invite
    await user1Page.getByTestId('BarButtonComponent2').click();
    await user1Page.getByTestId('MemberEntryMoreInfoButton' + user2Username).click();
    await user1Page.getByTestId('DropDownEntryDropDownText'+ user2Username + 'MemberEntry-2').click();
    await user1Page.waitForResponse('https://api.tread.run/league/undo_invite');

    // user1 resends invite to user2 and user2 declines
    await inviteUserToLeague(user1Page, user2Username, leagueName);
    await declineInviteToLeague(user2Page, leagueName);

    // user1 resends invite to user2
    await inviteUserToLeague(user1Page, user2Username, leagueName);
    await acceptLeagueInvitation(user2Page, leagueName);

    // user1 bans user2 from league
    await user1Page.getByTestId('BarButtonComponent0').click();
    await user1Page.getByTestId('MemberEntryMoreInfoButton' + user2Username).click();
    await user1Page.getByTestId('DropDownEntryDropDownText' + user2Username +'MemberEntry-3').click();
    await user1Page.waitForResponse('https://api.tread.run/league/ban_user');
    //  user1 resends invite to user2
    await inviteUserToLeague(user1Page, user2Username, leagueName);
    await acceptLeagueInvitation(user2Page, leagueName);
    await user1Page.getByTestId('BarButtonComponent0').click();

    // user2 leaves league
    await user2Page.getByTestId('SideBarSocialPageButton').click();
    await user2Page.getByTestId('PageSwitchLeagueButton').click();
    await user2Page.getByTestId('BarButtonComponent0').click();
    await user2Page.getByTestId('LeagueObjMoreInfoButton' + leagueName).click();
    await user2Page.getByTestId('DropDownEntryDropDownText' + leagueName +'LeagueObj-0').click();
    await user2Page.waitForResponse('https://api.tread.run/league/leave_league');

    // user2 request to join league then user1 invites to league
    await user2Page.goto('https://tread.run/requestLeague?' + leagueID);
    await user2Page.waitForResponse('https://api.tread.run/league/user_request_to_join');
    await inviteUserToLeague(user1Page, user2Username, leagueName);
    //  check user2 in league and kick them
    await user1Page.getByTestId('BarButtonComponent0').click();
    // Playwright thinks that going to bar component can't find button in time
    await user1Page.getByTestId('MemberEntryMoreInfoButton' + user2Username).click();
    await user1Page.getByTestId('DropDownEntryDropDownText' + user2Username + 'MemberEntry-2').click();
    await user1Page.waitForResponse('https://api.tread.run/league/kick_member');

    // invite user to league then user2 requests to join
    await inviteUserToLeague(user1Page, user2Username, leagueName);
    await user2Page.goto('https://tread.run/requestLeague?' + leagueID);
    await user2Page.waitForResponse('https://api.tread.run/league/user_request_to_join');
    await user2Page.waitForURL('https://tread.run/socialLeaguePage');
    await user2Page.getByTestId('LeagueObjLeagueNameTestLeague').click();
    await user2Page.getByTestId('PageSwitchMemberButton').click();
    // delete league
    await user1Page.getByTestId('PageSwitchMemberButton').click();
    await user1Page.getByTestId('PageSwitchDescriptionButton').click();
    await user1Page.getByTestId('LeagueHeaderMoveEditPageButton').click();
    await user1Page.getByTestId('LeagueEditFormDeleteButton').click();
    await user1Page.waitForResponse('https://api.tread.run/league/delete_league');

    // delete notification for request accepted
    //await deleteAllNotifications(user1Page);
    await deleteAllNotifications(user2Page);

    await user1Context.close();
    await user2Context.close();
});

test('League Request Public System', async ({ browser }) => {
    //triple the timeout
    test.slow();
    const leagueName = 'TestLeaguePublic';
    const user1Context = await browser.newContext({ storageState: './playwright/.auth/treadUser1.json'});
    const user1Page = await user1Context.newPage();
    await user1Page.goto('https://tread.run/currentChallengePage');
    const user2Context = await browser.newContext({ storageState: './playwright/.auth/treadUser2.json'});
    const user2Page = await user2Context.newPage();
    await user2Page.goto('https://tread.run/currentChallengePage');

    // user1 creating a public league
    await createLeague(user1Page, leagueName, "public");

    // grab the leagueID
    await sleep(2000);
    await user1Page.waitForURL('https://tread.run/socialLeaguePage');
    await user1Page.getByTestId('BarButtonComponent0').click();
    await user1Page.getByTestId('BarButtonComponent1').click();
    await user1Page.getByTestId('BarButtonComponent0').click();
    await user1Page.getByTestId('LeagueObjLeagueName'+leagueName).click();

    // User 2 requests entry into league
    const leaguePageURL = new URL(user1Page.url());
    const leagueID = leaguePageURL["search"].substring(2);
    await user2Page.goto('https://tread.run/requestLeague?' + leagueID);
    await user2Page.waitForResponse('https://api.tread.run/league/user_request_to_join');
    await user2Page.waitForURL('https://tread.run/socialLeaguePage')

    await user1Page.getByTestId('LeagueHeaderMoveEditPageButton').click();
    await user1Page.getByTestId('LeagueEditFormDeleteButton').click();
    await user1Page.waitForResponse('https://api.tread.run/league/delete_league');


    await user1Context.close();
    await user2Context.close();
});

async function userRequestEntryToLeague(page, leagueID){
    await page.goto('https://tread.run/requestLeague?' + leagueID);
    await page.waitForResponse('https://api.tread.run/league/user_request_to_join');
    await page.waitForURL('https://tread.run/socialLeaguePage')
}

test('League Request Private System', async ({ browser }) => {
    //triple the timeout
    test.slow();
    const leagueName = 'TestLeaguePrivate1';
    const user1Context = await browser.newContext({ storageState: './playwright/.auth/treadUser1.json'});
    const user1Page = await user1Context.newPage();
    await user1Page.goto('https://tread.run/currentChallengePage');
    const user2Context = await browser.newContext({ storageState: './playwright/.auth/treadUser2.json'});
    const user2Page = await user2Context.newPage();
    await user2Page.goto('https://tread.run/currentChallengePage');

    // user1 creating a private league
    await createLeague(user1Page, leagueName, "private");

    // grab the leagueID
    await sleep(2000);
    await user1Page.waitForURL('https://tread.run/socialLeaguePage');
    await user1Page.getByTestId('BarButtonComponent0').click();
    await user1Page.getByTestId('BarButtonComponent1').click();
    await user1Page.getByTestId('BarButtonComponent0').click();
    await user1Page.getByTestId('LeagueObjLeagueName'+leagueName).click();

    // User 2 requests entry into league
    const leaguePageURL = new URL(user1Page.url());
    const leagueID = leaguePageURL["search"].substring(2);
    await user2Page.goto('https://tread.run/requestLeague?' + leagueID);
    await user2Page.waitForResponse('https://api.tread.run/league/user_request_to_join');
    await user2Page.waitForURL('https://tread.run/socialLeaguePage')

    // User 2 revokes his request
    await user2Page.getByTestId('BarButtonComponent2').click();
    await user2Page.getByTestId('LeagueObjMoreInfoButton'+leagueName).click();
    await user2Page.getByTestId('DropDownEntryDropDownText'+leagueName+'LeagueObj-0').click();

    // User 2 requests entry
    await userRequestEntryToLeague(user2Page, leagueID);

    // User 1 declines
    await user1Page.getByTestId('PageSwitchDescriptionButton').click();
    await user1Page.getByTestId('PageSwitchMemberButton').click();
    await user1Page.getByTestId('BarButtonComponent1').click();
    await user1Page.getByTestId('MemberEntryMoreInfoButton' + user2Username).click();
    await user1Page.getByTestId('DropDownEntryDropDownTextTreadTest#8802MemberEntry-3').click();

    // User 2 requests entry
    await userRequestEntryToLeague(user2Page, leagueID);

    // User 1 accepts
    await user1Page.getByTestId('PageSwitchDescriptionButton').click();
    await user1Page.getByTestId('PageSwitchMemberButton').click();
    await user1Page.getByTestId('BarButtonComponent1').click();
    await user1Page.getByTestId('MemberEntryMoreInfoButton' + user2Username).click();
    await user1Page.getByTestId('DropDownEntryDropDownTextTreadTest#8802MemberEntry-2').click();

    // User 2 leaves league
    await user2Page.getByTestId('SideBarProfileSettingsButton').click();
    await expect(user2Page).toHaveURL('https://tread.run/profileSettingsPage');
    await user2Page.getByTestId('SideBarSocialPageButton').click();
    await expect(user2Page).toHaveURL('https://tread.run/socialFriendPage');
    await user2Page.getByTestId("PageSwitchLeagueButton").click();
    await expect(user2Page).toHaveURL('https://tread.run/socialLeaguePage');
    await user2Page.getByTestId('BarButtonComponent1').click();
    await user2Page.getByTestId('BarButtonComponent0').click();
    await user2Page.getByTestId('LeagueObjMoreInfoButton'+leagueName).click();
    await user2Page.getByTestId('DropDownEntryDropDownText'+leagueName+'LeagueObj-0').click();

    // User 1 deletes delete
    await user1Page.getByTestId('LeagueHeaderMoveEditPageButton').click();
    await user1Page.getByTestId('LeagueEditFormDeleteButton').click();
    await user1Page.waitForResponse('https://api.tread.run/league/delete_league');


    await user1Context.close();
    await user2Context.close();
});


test('Test Add Exercise', async ({ browser }) => {
    //triple the timeout
    test.slow();
    const user1Context = await browser.newContext({ storageState: './playwright/.auth/treadUser1.json'});
    const user1Page = await user1Context.newPage();
    await user1Page.goto('https://tread.run/currentChallengePage');
    const user2Context = await browser.newContext({ storageState: './playwright/.auth/treadUser2.json'});
    const user2Page = await user2Context.newPage();
    await user2Page.goto('https://tread.run/currentChallengePage');

    // User 1 creates a self challenge
    await addChallengeFromChallengePage(user1Page, "Yoga", "10","hr", 5, "self");
    await expect(user1Page).toHaveURL('https://tread.run/currentChallengePage');

    // User 1 puts in an exercise of the right amount
    await user1Page.getByTestId('AddExerciseBoxToggleShowStateButton').click();
    await user1Page.getByTestId('ExerciseNameFormAddChallengeExerciseNameSelect').selectOption('Yoga');
    await user1Page.getByTestId('ExerciseAmountFormExerciseAmountInput').click();
    await user1Page.getByTestId('ExerciseAmountFormExerciseAmountInput').fill('2');
    await user1Page.getByTestId('ExerciseAmountFormUnitSelect').selectOption('hr');
    const now = new Date(Date.now()-7*60*60*1000).toISOString().substring(0,16);
    await user1Page.getByTestId("ExerciseLoggedDateFormDateInput").fill(now);
    await user1Page.getByTestId("AddExerciseBoxSubmitExerciseButton").click();
    await user1Page.waitForResponse('https://api.tread.run/exercise_log/add');

    sleep(5000)


    await user1Context.close();
    await user2Context.close();
});

test('Test Edit League', async ({ browser }) => {
    //triple the timeout
    test.slow();
    const user1Context = await browser.newContext({ storageState: './playwright/.auth/treadUser1.json'});
    const user1Page = await user1Context.newPage();
    await user1Page.goto('https://tread.run/currentChallengePage');

    // User 1 creates a league
    await createLeague(user1Page, "editLeague", "public");

    // User 1 navigates to edit page
    await user1Page.getByTestId('PageSwitchLeagueButton').click();
    await user1Page.getByTestId('LeagueObjLeagueNameeditLeague').first().click();
    await user1Page.getByTestId('LeagueHeaderMoveEditPageButton').click();

    // User 1 edits league Info
    await user1Page.getByTestId('LeagueNameFormUpdateLeagueNameInput').click();
    await user1Page.getByTestId('LeagueNameFormUpdateLeagueNameInput').fill('newLeagueName');
    await user1Page.getByTestId('LeagueDescriptionFormUpdateDescriptionInput').click();
    await user1Page.getByTestId('LeagueDescriptionFormUpdateDescriptionInput').fill('newLeagueDescription');
    await user1Page.getByTestId('LeagueTypeFormUpdateLeagueTypeSelect').selectOption('public');
    await user1Page.getByTestId('LeagueEditFormSubmitButton').click();

    // User 1 deletes league
    await user1Page.getByTestId('SideBarSocialPageButton').click();
    await user1Page.getByTestId('PageSwitchLeagueButton').click();
    await user1Page.getByTestId('LeagueObjLeagueNamenewLeagueName').click();
    await user1Page.getByTestId('LeagueHeaderMoveEditPageButton').click();
    await user1Page.getByTestId('LeagueEditFormDeleteButton').click();
    await user1Page.waitForResponse('https://api.tread.run/league/delete_league');

    await user1Context.close();
});

test('Test Update Profile', async ({ browser }) => {
    //triple the timeout
    test.slow();
    const user1Context = await browser.newContext({ storageState: './playwright/.auth/treadUser1.json'});
    const user1Page = await user1Context.newPage();
    await user1Page.goto('https://tread.run/currentChallengePage');

    await user1Page.getByTestId('SideBarProfileSettingsButton').click();
    await user1Page.getByTestId('DisplayNameFormDisplayNameInput').click();
    await user1Page.getByTestId('DisplayNameFormDisplayNameInput').fill('TreadTest2');
    await user1Page.getByTestId('ProfileSettingsFormDisplayNameSubmit').click();
    await user1Page.waitForResponse('https://api.tread.run/user/update_display_name');

    await user1Context.close();
});

test('Test Global Leaderboard', async ({ browser }) => {
    //triple the timeout
    test.slow();
    const user1Context = await browser.newContext({ storageState: './playwright/.auth/treadUser1.json'});
    const user1Page = await user1Context.newPage();
    await user1Page.goto('https://tread.run/currentChallengePage');

    // User 1 puts in an exercise that would add to a global challenge
    await user1Page.getByTestId('AddExerciseBoxToggleShowStateButton').click();
    await user1Page.getByTestId('ExerciseNameFormAddChallengeExerciseNameSelect').selectOption('Swim');
    await user1Page.getByTestId('ExerciseAmountFormExerciseAmountInput').click();
    await user1Page.getByTestId('ExerciseAmountFormExerciseAmountInput').fill('5');
    await user1Page.getByTestId('ExerciseAmountFormUnitSelect').selectOption('min');
    const now = new Date(Date.now() - 7*60*60*1000).toISOString().substring(0,16);
    await user1Page.getByTestId("ExerciseLoggedDateFormDateInput").fill(now);
    await user1Page.getByTestId("AddExerciseBoxSubmitExerciseButton").click();
    await user1Page.waitForResponse('https://api.tread.run/exercise_log/add');


    // Navigate to global challenge page
    await user1Page.getByTestId('PageSwitchGlobalButton').click();
    await expect(user1Page).toHaveURL('https://tread.run/globalChallengePage');

    await user1Context.close();
});

test('Test Medals', async ({ browser }) => {
    //triple the timeout
    test.slow();
    const user1Context = await browser.newContext({ storageState: './playwright/.auth/treadUser1.json'});
    const user1Page = await user1Context.newPage();
    await user1Page.goto('https://tread.run/currentChallengePage');

    // User 1 puts in an exercise that would add to a global challenge
    await user1Page.getByTestId('AddExerciseBoxToggleShowStateButton').click();
    await user1Page.getByTestId('ExerciseNameFormAddChallengeExerciseNameSelect').selectOption('HIIT');
    await user1Page.getByTestId('ExerciseAmountFormExerciseAmountInput').click();
    await user1Page.getByTestId('ExerciseAmountFormExerciseAmountInput').fill('5');
    await user1Page.getByTestId('ExerciseAmountFormUnitSelect').selectOption('min');
    const now = new Date(Date.now() - 7*60*60*1000).toISOString().substring(0,16);
    await user1Page.getByTestId("ExerciseLoggedDateFormDateInput").fill(now);
    await user1Page.getByTestId("AddExerciseBoxSubmitExerciseButton").click();
    await user1Page.waitForResponse('https://api.tread.run/exercise_log/add');


    // Navigate to medals page
    await user1Page.getByTestId('SideBarExerciseHistoryButton').click();
    await expect(user1Page).toHaveURL('https://tread.run/profileStatsPage');
    await user1Page.getByTestId('PageSwitchMedalButton').click();
    await expect(user1Page).toHaveURL('https://tread.run/profileMedalPage');

    await user1Context.close();
});

test('League Challenge System', async ({ browser }) => {
    //triple the timeout
    test.slow();
    const leagueName = 'ChallengeLeague';
    const user1Context = await browser.newContext({ storageState: './playwright/.auth/treadUser1.json'});
    const user1Page = await user1Context.newPage();
    await user1Page.goto('https://tread.run/currentChallengePage');

    // user1 creating a private league
    await createLeague(user1Page, leagueName, "private");

    // Grab the leagueID
    await user1Page.waitForURL('https://tread.run/socialLeaguePage');
    await user1Page.getByTestId('BarButtonComponent0').click();
    await user1Page.getByTestId('LeagueObjLeagueName'+leagueName).click();
    const leaguePageURL = new URL(user1Page.url());
    const leagueID = leaguePageURL["search"].substring(2);

    // Send a league challenge from the socialLeaguePage
    await user1Page.getByTestId('SideBarSocialPageButton').click();
    await user1Page.getByTestId('PageSwitchLeagueButton').click();
    await expect(user1Page).toHaveURL('https://tread.run/socialLeaguePage');
    await user1Page.getByTestId('BarButtonComponent0').click();
    await user1Page.getByTestId('LeagueObjMoreInfoButton' + leagueName).click();
    await user1Page.getByTestId('DropDownEntryDropDownText' + leagueName + 'LeagueObj-0').click();
    await user1Page.waitForURL('https://tread.run/addChallengePage?prefill=league.' + leagueID);
    await addChallenge(user1Page, "Wrestling", "10", "hr", 1);

    // Send a league challenge from the send challenge page
    await expect(user1Page).toHaveURL('https://tread.run/currentChallengePage');
    await user1Page.getByTestId('BarButtonComponent3').click();
    await expect(user1Page).toHaveURL('https://tread.run/addChallengePage');
    await addChallenge(user1Page, "Weightlifting", "10", "hr", 1, "league", leagueName + " - " + leagueID);
    await expect(user1Page).toHaveURL('https://tread.run/currentChallengePage');

    // Send a league challenge from the league edit page
    await user1Page.getByTestId('SideBarSocialPageButton').click();
    await user1Page.getByTestId('PageSwitchLeagueButton').click();
    await user1Page.getByTestId('LeagueObjLeagueName'+leagueName).click();
    await user1Page.waitForURL('https://tread.run/leagueDescriptionPage?=' + leagueID);
    await user1Page.getByTestId('BarButtonComponent0').click();
    await user1Page.waitForURL('https://tread.run/addChallengePage?prefill=league.' + leagueID);
    await addChallenge(user1Page, "Water Polo", "10", "hr", 1);
    await expect(user1Page).toHaveURL('https://tread.run/currentChallengePage');

    // delete league
    await user1Page.getByTestId('SideBarSocialPageButton').click();
    await user1Page.getByTestId('PageSwitchLeagueButton').click();
    await user1Page.getByTestId('LeagueObjLeagueName'+leagueName).click();
    await user1Page.getByTestId('LeagueHeaderMoveEditPageButton').click();
    await user1Page.getByTestId('LeagueEditFormDeleteButton').click();
    await user1Page.waitForResponse('https://api.tread.run/league/delete_league');

    await user1Context.close();
});

test('League Role System', async ({ browser }) => {
    //triple the timeout
    test.slow();
    const leagueName = 'RoleLeague';
    const user1Context = await browser.newContext({ storageState: './playwright/.auth/treadUser1.json'});
    const user1Page = await user1Context.newPage();
    await user1Page.goto('https://tread.run/currentChallengePage');
    const user2Context = await browser.newContext({ storageState: './playwright/.auth/treadUser2.json'});
    const user2Page = await user2Context.newPage();
    await user2Page.goto('https://tread.run/currentChallengePage');

    // user1 creating a private league and user 2 joins
    await createLeague(user1Page, leagueName, "public");
    await inviteUserToLeague(user1Page, user2Username, leagueName);
    await acceptLeagueInvitation(user2Page, leagueName);

    // User 1 adds user as admin
    await user1Page.getByTestId('SideBarChallengesButton').click();
    await user1Page.waitForURL('https://tread.run/currentChallengePage');
    await user1Page.getByTestId('SideBarSocialPageButton').click();
    await user1Page.getByTestId('PageSwitchLeagueButton').click();

    await user1Page.waitForURL('https://tread.run/socialLeaguePage');
    await user1Page.getByTestId('LeagueObjLeagueName'+leagueName).click();
    const leaguePageURL = new URL(user1Page.url());
    const leagueID = leaguePageURL["search"].substring(2);
    await user1Page.waitForURL('https://tread.run/leagueDescriptionPage?=' + leagueID);
    await user1Page.getByTestId('PageSwitchMemberButton').click();
    await user1Page.waitForURL('https://tread.run/leagueMemberPage?=' + leagueID);
    await user1Page.getByTestId('MemberEntryMoreInfoButton'+user2Username).click();
    await user1Page.getByTestId('DropDownEntryDropDownText'+user2Username+'MemberEntry-4').click();

    // user removes self from admin
    await user2Page.getByTestId('SideBarSocialPageButton').click();
    await user2Page.getByTestId('PageSwitchLeagueButton').click();
    await user2Page.getByTestId('LeagueObjMoreInfoButton' + leagueName).click();
    await user2Page.getByTestId('DropDownEntryDropDownText'+ leagueName + 'LeagueObj-2').click();

    //User 1 adds user 2 to admin, and then removes user 2 from admin
    await user1Page.getByTestId('SideBarSocialPageButton').click();
    await user1Page.getByTestId('PageSwitchLeagueButton').click();
    await user1Page.getByTestId('LeagueObjLeagueName'+ leagueName).click();
    await user1Page.getByTestId('PageSwitchMemberButton').click();
    await user1Page.waitForResponse('https://api.tread.run/friend_list/blocked_list');
    await user1Page.getByTestId('MemberEntryMoreInfoButton' + user2Username).click();
    await user1Page.getByTestId('DropDownEntryDropDownText'+ user2Username + 'MemberEntry-4').click();
    await user1Page.waitForResponse('https://api.tread.run/friend_list/blocked_list');
    await user1Page.getByTestId('MemberEntryMoreInfoButton' + user2Username).click();
    await user1Page.getByTestId('DropDownEntryDropDownText'+ user2Username +'MemberEntry-4').click();


    // User 1 kicks out user 2, and user 2 requests to rejoin
    await user1Page.waitForResponse('https://api.tread.run/friend_list/blocked_list');
    await user1Page.getByTestId('MemberEntryMoreInfoButton' + user2Username).click();
    await user1Page.getByTestId('DropDownEntryDropDownText' + user2Username + 'MemberEntry-2').click();
    await userRequestEntryToLeague(user2Page, leagueID);

    // User 1 bans user 2
    await user1Page.getByTestId('SideBarSocialPageButton').click();
    await user1Page.getByTestId('PageSwitchLeagueButton').click();
    await user1Page.getByTestId('LeagueObjLeagueNameRoleLeague').click();
    await user1Page.getByTestId('PageSwitchMemberButton').click();
    await user1Page.waitForResponse('https://api.tread.run/friend_list/blocked_list');
    await user1Page.getByTestId('MemberEntryMoreInfoButton' + user2Username).click();
    await user1Page.getByTestId('DropDownEntryDropDownText'+ user2Username +'MemberEntry-3').click();
    // navigate to banned
    await user1Page.getByTestId('BarButtonComponent3').click();
    await user1Page.waitForResponse('https://api.tread.run/league/get_banned_list');
    // user2 requests to rejoin
    await userRequestEntryToLeague(user2Page, leagueID);

    // delete league
    await user1Page.getByTestId('SideBarSocialPageButton').click();
    await user1Page.getByTestId('PageSwitchLeagueButton').click();
    await user1Page.getByTestId('LeagueObjLeagueName'+leagueName).click();
    await user1Page.getByTestId('LeagueHeaderMoveEditPageButton').click();
    await user1Page.getByTestId('LeagueEditFormDeleteButton').click();
    await user1Page.waitForResponse('https://api.tread.run/league/delete_league');


    await user1Context.close();
});
