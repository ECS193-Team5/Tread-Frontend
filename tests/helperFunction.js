// @ts-check
import {getTodayString, getTomorrowString} from "../src/helpers/FormHelpers";

const { test, expect } = require("playwright-test-coverage");
//const { test, expect } = require('@playwright/test');
export async function loginTread1(page) {
    const [page1] = await Promise.all([
        page.waitForEvent('popup'),
        page.getByRole('button', { name: 'Sign in with Google' }).click()
    ])
    console.log(await page1.title());
    await page1.getByRole('textbox', { name: 'Email or phone' }).click();
    await page1.getByRole('textbox', { name: 'Email or phone' }).fill('treadtestuser1@gmail.com');
    await page1.getByRole('button', { name: 'Next' }).click();
    await page1.getByRole('textbox', { name: 'Enter your password' }).click();
    await page1.getByRole('textbox', { name: 'Enter your password' }).fill('Tr');
    await page1.locator('div').filter({ hasText: /^Enter your passwordShow passwordType the text you hear or see$/ }).first().click();
    await page1.getByRole('textbox', { name: 'Enter your password' }).click();
    await page1.getByRole('textbox', { name: 'Enter your password' }).fill('TreadTest!!!12');
    await page1.getByRole('button', { name: 'Next' }).click();
    await page.goto('https://tread.run/currentChallengePage');
    await expect(page).toHaveURL('https://tread.run/currentChallengePage');
}

export async function fillCorrectAddChallengeData(page) {
    await page.locator('#AddChallengeExerciseNameSelect').selectOption('Badminton');
    await page.getByPlaceholder('0').click();
    await page.getByPlaceholder('0').fill('4');
    await page.locator('#addChallengeFormSelect').selectOption('hr');
    await page.locator('#issueDateInput').fill(getTodayString());
    await page.locator('#dueDateInput').fill(getTomorrowString());
    await page.locator('div').filter({ hasText: /^SelfFriendLeague$/ }).getByRole('combobox').selectOption('friend');
    await page.locator('div').filter({ hasText: /^TreadTest2#6945$/ }).getByRole('combobox').selectOption('TreadTest2#6945');


}