// @ts-check


/*
test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();


  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});
*/

/*

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');
  await page.goto('https://demo.playwright.dev/todomvc/#/');

  await page.getByRole('button', { name: 'Send Challenge' }).click();
  await page.locator('#AddChallengeExerciseNameSelect').selectOption('Badminton');
  await page.getByPlaceholder('0').click();
  await page.getByPlaceholder('0').fill('23');
  await page.locator('#issueDateInput').fill('2023-05-11');
  await page.locator('#dueDateInput').fill('2023-05-19');
  await page.locator('div').filter({ hasText: /^SelfFriendLeague$/ }).getByRole('combobox').selectOption('friend');
  await page.locator('div').filter({ hasText: /^TreadTest2#6945$/ }).getByRole('combobox').selectOption('TreadTest2#6945');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Received' }).click();
  await page.getByRole('button', { name: 'Sent' }).click();
  await page.frameLocator('#webpack-dev-server-client-overlay').getByText('Compiled with problems:×ERRORInvalid flags supplied to RegExp constructor \' >> n').click();
  await page.frameLocator('#webpack-dev-server-client-overlay').getByText('Compiled with problems:×ERRORInvalid flags supplied to RegExp constructor \' >> n').click();
  await page.frameLocator('#webpack-dev-server-client-overlay').getByText('Compiled with problems:').click();
  await page.frameLocator('#webpack-dev-server-client-overlay').getByText('Compiled with problems:').click();
  await page.frameLocator('#webpack-dev-server-client-overlay').getByRole('button', { name: 'Dismiss' }).click();
  await page.getByRole('button', { name: 'Received' }).click();
  await page.getByRole('button', { name: 'Sent' }).click();
  await page.locator('#buttonUserDropDown').click();
  await page.getByText('Logout').click();
  const page2Promise = page.waitForEvent('popup');
  await page.frameLocator('iframe[title="Sign in with Google Button"]').getByRole('button', { name: 'Tread\'s profile image Sign in as Tread treadtestuser1@gmail.com' }).click();
  const page2 = await page2Promise;
  await page2.getByRole('link', { name: 'Use another account' }).click();
  await page2.getByRole('textbox', { name: 'Email or phone' }).fill('treadtestuser2@gmail.com');
  await page2.getByRole('textbox', { name: 'Email or phone' }).press('Enter');
  await page2.getByRole('textbox', { name: 'Enter your password' }).click();
  await page2.getByRole('textbox', { name: 'Enter your password' }).fill('TreadTest!!!12');
  await page2.getByRole('textbox', { name: 'Enter your password' }).press('Enter');
  await page.goto('https://tread.run/currentChallengePage');
  await page.getByRole('button', { name: 'Received' }).click();
  await page.locator('#ChallengeScroll').getByRole('button').first().click();
});

*/