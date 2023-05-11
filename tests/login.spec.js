// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('https://tread.run/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Tread/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://tread.run/currentChallengePage');

  await expect(page).toHaveURL(/currentChallengePage/);

  // Click the get started link.c
  const locator =  page.getByTitle('Social Page');
  locator.click();
  console.log(locator);

  // Expects the URL to contain intro.
  //await expect(page).toHaveURL(/socialFriendPage/);

  /*import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.goto('https://tread.run/');
  const page1Promise = page.waitForEvent('popup');
  await page.frameLocator('iframe[title="Sign in with Google Button"]').getByRole('button', { name: 'Sign in with Google' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('textbox', { name: 'Email or phone' }).click();
  await page1.getByRole('textbox', { name: 'Email or phone' }).fill('rebekahgrace234@gmail.com');
  await page1.getByRole('button', { name: 'Next' }).click();
  await page1.getByRole('link', { name: 'Try again' }).click();
  await page1.getByRole('textbox', { name: 'Email or phone' }).click();
  await page1.getByRole('textbox', { name: 'Email or phone' }).fill('rmgrace@ucdavis.edu');
  await page1.getByRole('button', { name: 'Next' }).click();
  await page1.getByLabel('Username:').click();
  await page1.getByLabel('Username:').fill('rmgrace');
  await page1.getByLabel('Username:').press('Tab');
  await page1.getByLabel('Passphrase:').fill('19Jodie_Atlas19');
  await page1.getByRole('button', { name: 'LOGIN' }).click();
  await page1.frameLocator('#duo_iframe').getByRole('button', { name: 'Send Me a Push' }).click();
  await page1.goto('https://shibboleth.ucdavis.edu/idp/profile/SAML2/Redirect/SSO?execution=e1s3');
  await page1.goto('https://www.google.com/a/ucdavis.edu/acs');
  await page1.goto('https://accounts.google.com/signin/continue?sarp=1&scc=0&continue=https%3A%2F%2Faccounts.google.com%2Fgsi%2Fselect%3Fclient_id%3D171571653869-ls5iqdlo1boe6isj7r1koo2tvi57g62m.apps.googleusercontent.com%26ux_mode%3Dpopup%26ui_mode%3Dcard%26as%3D83MfGBOXzUN6zQzYa8swmA%26channel_id%3D297dae795366c39d761d2b08ff4c80a6ac8aa2820b726c71163057d119528a86%26origin%3Dhttps%253A%252F%252Ftread.run&plt=AKgnsbskJiQoi2bOgymQOOX1UQcVO3tI-fcrBP_lFVX1Jp5Q5jRftqYGYWCQDnOK--NZAFcarHjHx_sSWt1R90Glv-yyKgB833HYSYe6U1z86JwQ25XD73aAvX-skZNc22K0nQi9xB07&PersistentCookie=1&checkedDomains=youtube&checkConnection=youtube%3A79%3A0');
  await page1.goto('https://accounts.google.com/gsi/select?client_id=171571653869-ls5iqdlo1boe6isj7r1koo2tvi57g62m.apps.googleusercontent.com&ux_mode=popup&ui_mode=card&as=83MfGBOXzUN6zQzYa8swmA&channel_id=297dae795366c39d761d2b08ff4c80a6ac8aa2820b726c71163057d119528a86&origin=https://tread.run');
  await page1.getByRole('link', { name: 'Google Account, Rebekah Grace\'s profile picture, rmgrace@ucdavis.edu, Rebekah Grace' }).click();
  await page.getByText('TreadStay Fit with FriendsWelcome to Tread, the social exercise app. Compete aga').click();
  await page.goto('https://tread.run/currentChallengePage');
  await page.getByRole('button', { name: 'Button for Social' }).click();
  await page.getByText('ChallengesSocialExercise HistoryProfile Settings').click();
  await page.getByRole('button', { name: 'Button for Profile' }).click();
  await page.getByRole('button', { name: 'Button for Settings' }).click();
  await page.getByRole('button', { name: 'Button for Challenges' }).click();
  await page.getByRole('button', { name: 'Button for Social' }).click();
  await page.getByRole('button', { name: 'Button for Profile' }).click();
  await page.getByRole('button', { name: 'Button for Settings' }).click();
  await page.getByRole('button', { name: 'Button for Challenges' }).click();
});*/
});
