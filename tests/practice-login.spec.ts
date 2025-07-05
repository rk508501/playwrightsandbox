import { test, expect } from '@playwright/test';

// Test Login Page - Positive and Negative Scenarios

test.describe('Practice Test Automation - Login Page', () => {
  const baseUrl = 'https://practicetestautomation.com/practice-test-login/';

  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test('Positive Login', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username' }).fill('student');
    await page.getByRole('textbox', { name: 'Password' }).fill('Password123');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page).toHaveURL(/.*logged-in-successfully/);
    await expect(page.getByText(/Congratulations|successfully logged in/i)).toBeVisible();
  });

  test('Negative Username', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username' }).fill('incorrectUser');
    await page.getByRole('textbox', { name: 'Password' }).fill('Password123');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('#error')).toHaveText('Your password is invalid!');
  });

  test('Negative Password', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username' }).fill('student');
    await page.getByRole('textbox', { name: 'Password' }).fill('incorrectPassword');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('#error')).toHaveText('Your password is invalid!');
  });
});
