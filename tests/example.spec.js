// @ts-check
import { test, expect } from '@playwright/test';

test.skip('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test.skip('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('login page title', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Express Server/);
});

test('login page submit', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const usernameInput = page.getByPlaceholder('Username');
  const passwordInput = page.getByPlaceholder('Password');
  const submitButton = page.getByRole('button', { name: 'Login' });
  await usernameInput.fill('admin');
  await passwordInput.fill('password');
  await submitButton.click();
  // await page.fill('#username', 'admin');
  // await page.fill('#password', 'password');
  // await page.click('button[type="submit"]');
  
  //expect page to have alert with text "Login successful"
  page.on('dialog', async dialog => {
    console.log(dialog.message());
    expect(dialog.message()).toBe('Login successful!');
    await dialog.dismiss();
  });


  await page.screenshot({fullPage: true, path: './screenshots/login-success.png' });
  await submitButton.screenshot({path: './screenshots/login-button.png' });
});