
export async function loginTread1(page) {
    await page.goto('https://tread.run/');
    const page1Promise = page.waitForEvent('popup');
    await page.frameLocator('iframe[title="Sign in with Google Button"]').getByRole('button', { name: 'Sign in with Google' }).click();
    const page1 = await page1Promise;
    await page1.getByRole('textbox', { name: 'Email or phone' }).click();
    await page1.getByRole('textbox', { name: 'Email or phone' }).fill('treadtestuser1@gmail.com');
    await page1.getByRole('button', { name: 'Next' }).click();
    await page1.getByRole('textbox', { name: 'Enter your password' }).click();
    await page1.getByRole('textbox', { name: 'Enter your password' }).fill('TreadTest!!!12');
    await page1.getByRole('button', { name: 'Next' }).click();
    await page.goto('https://tread.run/currentChallengePage');
}

export async function loginTread2(page) {
    await page.goto('https://tread.run/');
    const page1Promise = page.waitForEvent('popup');
    await page.frameLocator('iframe[title="Sign in with Google Button"]').getByRole('button', { name: 'Sign in with Google' }).click();
    const page1 = await page1Promise;
    await page1.getByRole('textbox', { name: 'Email or phone' }).click();
    await page1.getByRole('textbox', { name: 'Email or phone' }).fill('treadtestuser2@gmail.com');
    await page1.getByRole('button', { name: 'Next' }).click();
    await page1.getByRole('textbox', { name: 'Enter your password' }).click();
    await page1.getByRole('textbox', { name: 'Enter your password' }).fill('TreadTest!!!12');
    await page1.getByRole('button', { name: 'Next' }).click();
    await page.goto('https://tread.run/currentChallengePage');
}