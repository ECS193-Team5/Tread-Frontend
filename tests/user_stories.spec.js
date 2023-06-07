import { test, expect } from '@playwright/test';
import * as helpers from "../src/helpers/helperFunction.js";
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

async function addChallengeFromFriendPage(page, username, exerciseName, amount, unit, duration, type, receiver) {
    await page.getByTestId('SideBarSocialPageButton').click();
    await page.getByTestId('FriendObjMoreInfoButton' + username).click();
    await page.getByTestId('DropDownEntryDropDownText' + username + 'FriendObj-2').click();
    await page.waitForURL('https://tread.run/addChallengePage?prefill=' + type + '.' + username);
    await addChallenge(page, exerciseName, amount, unit, duration, type, receiver);
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
    await page.getByTestId('ChallengeFormSubmitButton').click();
    await sleep(1000);
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
    await sleep(1000);
}

async function acceptFriendRequest(page, username) {
    await page.getByTestId('SideBarSocialPageButton').click();
    await page.getByTestId('BarButtonComponent2').click();
    await page.getByTestId('FriendObjMoreInfoButton' + username).click();
    await page.getByTestId('DropDownEntryDropDownText' + username + 'FriendObj-0').click();
    await sleep(1000);
}

async function unFriend(page, username) {
    await page.getByTestId('SideBarSocialPageButton').click();
    await page.getByTestId('BarButtonComponent0').click();
    await page.getByTestId('FriendObjMoreInfoButton' + username).click();
    await page.getByTestId('DropDownEntryDropDownText'+ username +'FriendObj-0').click();
    await sleep(1000);
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, 1000));
}

test('Friend Functionality', async ({ browser }) => {
    const user2Username = 'TreadTest#8802';
    const user1Username = 'TreadTest2#6945';
    const user1Context = await browser.newContext({ storageState: './playwright/.auth/treadUser1.json'});
    const user1Page = await user1Context.newPage();
    await user1Page.goto('https://tread.run/currentChallengePage');
    await addFriend(user1Page, user2Username);
    const user2Context = await browser.newContext({ storageState: './playwright/.auth/treadUser2.json'});
    const user2Page = await user2Context.newPage();
    await user2Page.goto('https://tread.run/currentChallengePage');
    // add expect: Check the notification exists
    await user2Page.getByTestId('SideBarExerciseHistoryButton').click();
    await user2Page.getByTestId('MailBoxEntryDeclineButton0').click();
    await sleep(2000);
    // reject friend request
    await user2Page.getByTestId('SideBarSocialPageButton').click();
    await user2Page.getByTestId('BarButtonComponent2').click();
    await user2Page.getByTestId('FriendObjMoreInfoButton' + user1Username).click();
    await user2Page.getByTestId('DropDownEntryDropDownText'+ user1Username +'FriendObj-1').click();
    await sleep(1000);

    await addFriend(user1Page, user2Username);
    await user2Page.getByTestId('SideBarExerciseHistoryButton').click();
    await user2Page.waitForURL('https://tread.run/profileStatsPage')
    await user2Page.getByTestId('MailBoxEntryDeclineButton0').click();
    await sleep(2000);
    await acceptFriendRequest(user2Page, user1Username);

    // delete notification for request accepted
    await user1Page.getByTestId('SideBarExerciseHistoryButton').click();
    await user1Page.getByTestId('MailBoxDeleteAllButton').click();

    await addChallengeFromChallengePage(user1Page, 'Barre', '24', 'min', '1', 'friend', user2Username)
    // change later
    await addChallengeFromFriendPage(user1Page, user2Username, 'Baseball', '24', 'mi', '1', 'friend', user2Username);
    await user2Page.getByTestId('SideBarChallengesButton').click();
    await user2Page.getByTestId('BarButtonComponent2').click();
    await user2Page.getByTestId('DeclineChallengeButtonComponentBarre').click();
    await user2Page.getByTestId('DeclineChallengeButtonComponentBaseball').click();
    // get rid of notification
    await user2Page.getByTestId('SideBarExerciseHistoryButton').click();
    await user2Page.getByTestId('MailBoxEntryDeclineButton0').click();
    await user2Page.getByTestId('MailBoxEntryDeclineButton1').click();
    await sleep(2000);



    //unfriend
    await unFriend(user2Page, user1Username)

    await user1Context.close();
    await user2Context.close();
});