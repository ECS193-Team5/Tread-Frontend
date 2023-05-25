// @ts-check
import {getTodayString, getTomorrowString} from "./FormHelpers";

const { test, expect } = require("playwright-test-coverage");
//const { test, expect } = require('@playwright/test');

const treadUser1File = 'playwright/.auth/treadUser1.json';

export async function logoutUser(page) {
    await page.locator('#buttonUserDropDown').click();
    await page.getByText('Logout').click();
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

async function signUp(page){
//sign in as third account
    await page.goto('https://tread.run/signUpPage');
    await page.locator('div').filter({ hasText: /^UsernameThis is a unique identifier for your account\. It is public\.$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^UsernameThis is a unique identifier for your account\. It is public\.$/ }).getByRole('textbox').fill('TreadTest');
    await page.locator('div').filter({ hasText: /^Display NameThis is public name that others will see\.$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Display NameThis is public name that others will see\.$/ }).getByRole('textbox').fill('Tready');
    await page.getByRole('button', { name: 'Sign Up' }).click();
    await page.goto('https://tread.run/currentChallengePage');
}