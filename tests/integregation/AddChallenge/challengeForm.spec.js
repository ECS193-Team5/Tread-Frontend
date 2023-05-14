import { loginTread1 } from '../../helperFunction';
const { test, expect } = require('@playwright/test');
import { fillCorrectAddChallengeData } from '../../helperFunction';



test.describe("testing Challenge/ChallengeForm.js", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://tread.run/');
        await loginTread1(page);
        await page.goto("https://tread.run/addChallengePage");
    });

    test('ChallengeForm Test correct submission', async ({ page }) => {
        await fillCorrectAddChallengeData(page);
        await page.getByRole('button', { name: 'Submit' }).click();
        await expect(page).toHaveURL("https://tread.run/currentChallengePage");
    });
/*
    test('ChallengeForm Test Incorrect Submission - Invalid Exercise Name', async ({ page }) => {
        // Fill the data and test submit
    });

    test('ChallengeForm Test Incorrect Submission - Invalid Amount', async ({ page }) => {
        // Fill the data and test submit
    });

    test('ChallengeForm Test Incorrect Submission - Issue Date after Due Date', async ({ page }) => {
        // Fill the data and test submit
    });

    test('ChallengeForm Test Incorrect Submission - No Issue Date', async ({ page }) => {
        // Fill the data and test submit
    });

    test('ChallengeForm Test Incorrect Submission - No Due Date', async ({ page }) => {
        // Fill the data and test submit
    });

    test('ChallengeForm Test Incorrect Submission - No Friend Listed', async ({ page }) => {
        // Fill the data and test submit
    });

    test('ChallengeForm Test Incorrect Submission - No League Listed', async ({ page }) => {
        // Fill the data and test submit
    });*/
  });