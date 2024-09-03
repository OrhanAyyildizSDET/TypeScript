import { test, expect } from '@playwright/test';
import { N11Page } from './pages/n11/n11.ts';

test('N11 POM Test', async ({ page }) => {
  const n11Page = new N11Page(page);

  await n11Page.goto();
  await expect(page).toHaveTitle(/n11 - 10 Üzerinden 11'lik Alışveriş Deneyimi/);
  if (await n11Page.rejectButton.isVisible()) {
    await n11Page.rejectButton.click();
  }
  await n11Page.search('4080 laptop');
  await n11Page.clickProduct(15);
  const productName = await n11Page.getProductName();
  await n11Page.addToCart();
  await n11Page.goToCart();
  await n11Page.goLoginPage();
  await n11Page.login('****@gmail.com', '*****');

  const isProductInCart = await n11Page.pageElementHasItem(productName, '.prodInfo a'); 
  expect(isProductInCart, 'Product should be present in cart').toBe(false);
});




