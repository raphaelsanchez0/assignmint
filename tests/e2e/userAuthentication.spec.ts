import { test, expect } from '@playwright/test';

test('User can log in and navigate to settings before logging out', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.goto('http://localhost:3000/login');
  await page.getByPlaceholder('johndoe@gmail.com').click();
  await page.getByPlaceholder('johndoe@gmail.com').fill(process.env.NEXT_PUBLIC_TEST_USERNAME!);
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill(process.env.NEXT_PUBLIC_TEST_PASSWORD!);
  await page.getByRole('button', { name: 'Sign In' }).click();
  
  await page.waitForSelector('div:has-text("Settings")', { state: 'visible' });
  await page.locator('div').filter({ hasText: /^Settings$/ }).getByRole('link').click();
  await page.getByRole('button', { name: 'Logout' }).click();
});