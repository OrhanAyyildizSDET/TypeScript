import { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class helpers {
    constructor(private page: Page) {}

    async retryUntilSuccess(action, retries = 3, delay = 1000) {
        for (let i = 0; i < retries; i++) {
        try {
            await action;
            return;  
        } catch (error) {
            if (i === retries - 1) throw error; 
            console.log(`Retrying... Attempt ${i + 1} failed.`);
            await new Promise(resolve => setTimeout(resolve, delay)); 
        }
        }
    }

    async pageElementHasItem(productName: any, locator: string, flag: boolean) {
        flag==true?await expect(this.page.locator(locator).getByText(productName)).toBeVisible():
                   await expect(this.page.locator(locator).getByText(productName)).not.toBeVisible();;
    }
  
  // async pageElementHasItem(productName, locator, index) {
  //   const cartItems = await this.page.locator(`${locator}`).allTextContents();
  //   const matchingItems = cartItems.filter(text => text.includes(`${productName}`));
  //   return matchingItems.length > 0 ? (index=="first"?matchingItems[0]:matchingItems[matchingItems.length - 1]) : null; // Returns the index found item or null if none found
  // }
}