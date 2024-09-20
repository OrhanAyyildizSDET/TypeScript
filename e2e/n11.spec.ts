import { test, expect } from '@playwright/test';
import { N11Page } from './pages/n11/n11.ts';
import { helpers } from './helper.ts';

let n11Page : N11Page;
let helper : helpers;

test.beforeEach(async ({ page }) => {
  n11Page = new N11Page(page);
  helper = new helpers(page);
  await n11Page.goto();
  await expect(page).toHaveTitle(/n11 - 10 Üzerinden 11'lik Alışveriş Deneyimi/);


})

test('N11 POM Test', async () => {
  if (await n11Page.rejectButton.isVisible()) {
    await n11Page.rejectButton.click();
  }
  await n11Page.search('4080 laptop');
  await n11Page.clickProduct(10);
  const productName = await n11Page.getProductName();
  await helper.retryUntilSuccess(n11Page.addToCart())
  await helper.retryUntilSuccess(n11Page.goToCart());
  // await n11Page.goLoginPage();
  // await n11Page.login('**********', '************');
  await helper.retryUntilSuccess(n11Page.termOkButton.click());
  await helper.pageElementHasItem(productName, '#newCheckout tbody', true);
});




