import { test, expect } from '@playwright/test';

test('Add Sauce Labs Backpack to cart and verify', async ({ page }) => {
  // 1. Navigate to the site
  await page.goto('https://www.saucedemo.com/v1/');

  // 2. Log in with valid credentials
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'LOGIN' }).click();

  // 3. Add a backpack to the cart
  await page
    .locator('.inventory_item')
    .filter({ hasText: 'Sauce Labs Backpack' })
    .getByRole('button', { name: 'ADD TO CART' })
    .click();

  // 4. Click on the cart icon
  await page.locator('#shopping_cart_container a').click();

  // 5. Verify if the intended item is added to the cart
  const cartItem = page.locator('.cart_item').filter({ hasText: 'Sauce Labs Backpack' });
  await expect(cartItem).toBeVisible();

  // 6. Click the checkout button
  await page.getByRole('link', { name: 'CHECKOUT' }).click();
});
