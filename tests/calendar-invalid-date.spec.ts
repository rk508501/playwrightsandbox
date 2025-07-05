import { test, expect } from '@playwright/test';

// Test: Select 31 Sept 2025 in Calendars and submit

test('Select 31 Sept 2025 in Calendars and submit', async ({ page }) => {
  // 1. Navigate to the homepage
  await page.goto('https://practice-automation.com/');

  // 2. Click on Calendars
  await page.getByRole('link', { name: 'Calendars' }).click();
  await expect(page).toHaveURL(/.*calendars/);

  // 3. Enter the date 2025-09-31
  const dateInput = page.getByRole('textbox', { name: /Select or enter a date/i });
  await dateInput.fill('2025-09-31');

  // 4. Click Submit
  await page.getByRole('button', { name: 'Submit' }).click();

  // 5. Assert error message for invalid date
  await expect(page.getByText('Please enter a valid date.')).toBeVisible();
});
