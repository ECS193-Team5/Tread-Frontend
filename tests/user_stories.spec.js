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

test('Send self challenge', async ({ browser }) => {
    const user1Context = await browser.newContext({ storageState: './playwright/.auth/treadUser1.json' });
    const page = await user1Context.newPage();
    await page.goto('https://tread.run/currentChallengePage');
    await page.getByTestId('BarButtonComponent3').click();
    await page.getByTestId('ExerciseNameFormAddChallengeExerciseNameSelect').selectOption('Aikido');
    await page.getByTestId('ExerciseAmountFormExerciseAmountInput').click();
    await page.getByTestId('ExerciseAmountFormExerciseAmountInput').fill('5');
    const [issueDate, dueDate] = setShortChallengeTime(1);
    await page.getByTestId('ExerciseDateFormIssueDateInput').fill(issueDate);
    await page.getByTestId('ExerciseDateFormDueDateInput').fill(dueDate);
    await page.getByTestId('ChallengeFormSubmitButton').click();
    await expect(page).toHaveURL('https://tread.run/currentChallengePage');
    await user1Context.close();
});
/*
test('Friend Functionality', async ({ browser }) => {
    const user1Context = await browser.newContext({ storageState: './playwright/.auth/treadUser1.json'});
    const user1Page = await user1Context.newPage();
    await user1Page.goto('https://tread.run/currentChallengePage');
    await user1Page.getByTestId('SideBarSocialPageButton').click();
    await user1Page.getByTestId('BarButtonComponent4').click();
    await user1Page.getByTestId('UserAddFormDescriptionUsernameInput').click();
    await user1Page.getByTestId('UserAddFormDescriptionUsernameInput').fill('TreadTest2#6945');
    await user1Page.getByTestId('UserAddFormSendButton').click();
    const user2Context = await browser.newContext({ storageState: './playwright/.auth/treadUser2.json'});
    const user2Page = await user2Context.newPage();
    await user2Page.goto('https://tread.run/currentChallengePage');
    await user2Page.getByTestId('SideBarExerciseHistoryButton').click();
    // add expect: Check the notification exists
    await user2Page.getByTestId('MailBoxEntryDeclineButton0').click();
    await user2Page.getByTestId('SideBarSocialPageButton').click();
    await user2Page.getByTestId('BarButtonComponent2').click();
    await user2Page.getByTestId('FriendObjMoreInfoButtonTestUser1#0455').click();
    await user2Page.getByTestId('DropDownEntryDropDownTextTestUser1#0455FriendObj-1').click();
    await user2Page.getByRole('button', { name: 'Friends' }).click();
    await user2Page.getByRole('button', { name: 'Dropdown' }).click();
    await user2Page.locator('div').filter({ hasText: /^UnfriendBlock$/ }).first().click();
    await user2Page.getByText('Unfriend').click();

    await user1Context.close();
    await user2Context.close();
});*/