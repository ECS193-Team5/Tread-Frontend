import { test, expect } from '@playwright/test';
import * as helpers from "../src/helpers/helperFunction.js";
///test2
//test.use({storageState: 'playwright/.auth/treadUser1.json'})
test('As a user of Tread, I would like to be able to login using Google authentication to save my progress and settings.', async ({ browser}) => {
    const user1Context = await browser.newContext({ storageState: './playwright/.auth/treadUser1.json'});
    const user1Page = await user1Context.newPage();
    await user1Page.goto('https://tread.run/currentChallengePage');
    await user1Context.close();
});
/*
test('test', async ({ page }) => {
    await page.goto('https://tread.run/currentChallengePage');
    await page.getByRole('button', { name: 'Send Challenge' }).click();
    await page.locator('#AddChallengeExerciseNameSelect').selectOption('Badminton');
    await page.locator('#addChallengeFormSelect').selectOption('ct');
    await page.getByPlaceholder('0').click();
    await page.getByPlaceholder('0').fill('3');
    await page.getByPlaceholder('0').click();
    await page.getByPlaceholder('0').fill('30');
    await page.locator('#issueDateInput').fill('2023-05-21');
    await page.locator('#dueDateInput').fill('2023-05-23');
    await page.locator('div').filter({ hasText: /^SelfFriendLeague$/ }).getByRole('combobox').selectOption('friend');
    await page.locator('div').filter({ hasText: /^TreadTest2#6945$/ }).getByRole('combobox').selectOption('TreadTest2#6945');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('button', { name: 'Sent' }).click();
});
*/

test('Add friend and and check notification', async ({ browser }) => {
    const user1Context = await browser.newContext({ storageState: './playwright/.auth/treadUser1.json'});
    const user1Page = await user1Context.newPage();
    await user1Page.goto('https://tread.run/currentChallengePage');
    await user1Page.getByRole('button', { name: 'Button for Social' }).click();
    await user1Page.getByRole('button', { name: 'Add User' }).click();
    await user1Page.getByPlaceholder('username#0000').fill('TreadTest2#6945');
    await user1Page.getByRole('button', { name: 'Send' }).click();
    const user2Context = await browser.newContext({ storageState: './playwright/.auth/treadUser2.json'});
    const user2Page = await user2Context.newPage();
    await user2Page.goto('https://tread.run/currentChallengePage');
    await user2Page.getByRole('button', { name: 'Button for Profile' }).click();
    await user2Page.locator('#DeclineButtonundefined').click()
    await user2Page.locator('div').filter({ hasText: /^TestUser1#0455 sent you a friend request\.$/ }).locator('#DeclineButtonundefined').click();
    await user2Page.getByRole('button', { name: 'Button for Social' }).click();
    await user2Page.getByRole('button', { name: 'Received' }).click();
    await user2Page.locator('[id="FriendObjTestUser1\\#0455"] > div:nth-child(3)').click();
    await user2Page.getByText('Accept').click();
    await user2Page.getByRole('button', { name: 'Friends' }).click();
    await user2Page.getByRole('button', { name: 'Dropdown' }).click();
    await user2Page.locator('div').filter({ hasText: /^UnfriendBlock$/ }).first().click();
    await user2Page.getByText('Unfriend').click();
    await user1Context.close();
    await user2Context.close();
  });