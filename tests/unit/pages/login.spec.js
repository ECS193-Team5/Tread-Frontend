import { loginTread1, loginTread2 } from '../../helperFunction';
const { test, expect } = require('@playwright/test');

test('login works', async ({ page }) => {
    await page.goto('https://tread.run/');
    await loginTread1(page);
});