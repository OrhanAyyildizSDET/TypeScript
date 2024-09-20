import { Locator } from '@playwright/test';
import { Page } from '@playwright/test';

export class N11Page {
  constructor(private page: Page) {}

  get rejectButton(): Locator {
    return this.page.locator('efilli-layout-dynamic [data-name="Reject Button"]');
  }

  get searchInput(): Locator {
    return this.page.locator('[id=searchData]');
  }

  get searchButton(): Locator {
    return this.page.locator('#view ul li');
  }

  get productNameElement(): Locator {
    return this.page.locator('#breadCrumb + div h1');
  }

  get addToCartButton(): Locator {
    return this.page.locator('#unfDetailForm div .product-add-cart');
  }

  get cartLink(): Locator {
    return this.page.locator('.myBasketHolder.active div').locator('a[href="//www.n11.com/sepetim"]');
  }

  get termOkButton(): Locator {
    return this.page.locator('body #userKvkkModal span[class="btn btnBlack"]');
  }

  get loginButton(): Locator {
    return this.page.locator('.login-btn-container a');
  }

  get emailInput(): Locator {
    return this.page.locator('#email');
  }

  get passwordInput(): Locator {
    return this.page.locator('#password');
  }

  get loginSubmitButton(): Locator {
    return this.page.locator('#loginButton');
  }

  async goto() {
    await this.page.goto('https://www.n11.com/', { timeout: 20000 });
  }

  async search(productName: string) {
    await this.searchInput.clear();
    await this.searchInput.fill(productName);
    await this.searchInput.press('Enter');
  }

  async clickProduct(index: number) {
    await this.searchButton.nth(index).click();
  }

  async getProductName() {
    const productName = await this.productNameElement.textContent();
    return productName;
  }

  async addToCart() {
    await this.addToCartButton.scrollIntoViewIfNeeded();
    await this.addToCartButton.click({ force: true });
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async goLoginPage() {
    await this.loginButton.click();
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginSubmitButton.click();
  }
}