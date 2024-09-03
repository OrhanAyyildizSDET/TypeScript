import { test, expect } from '@playwright/test';
import { send } from 'process';

test('has title', async ({ page }) => {
  await page.goto('https://www.google.com', {timeout:10000});

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Google/);
  await page.getByRole('combobox').fill('car');
  await page.keyboard.press("Enter");
  await expect(page).toHaveTitle(/car/);
  await page.getByRole('link', { name: 'Garenta: Araç Kiralama - Rent' }).click()
  await page.waitForTimeout(3000);
  await page.locator(`text=Kampanyalar`).isVisible();
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
