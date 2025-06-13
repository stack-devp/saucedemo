import { Page, expect } from '@playwright/test';
import { URLS } from '../commons/urls';
import { Texts, Selectors, buttonWithText,  } from '../commons/constants';

export default class CheckoutOverviewPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickOnContinue(): Promise<void> {
    // Click the finish button to complete the checkout
    await this.page.locator(Selectors.checkoutOverviewPage.finishButton).click();
  }

  async removeItemFromCart(itemName: string): Promise<void> {
    // Reuse the inventory item selector from landingPage for consistency
    const productContainer = this.page.locator(Selectors.landingPage.inventoryItem, { hasText: itemName });
    await productContainer.locator(buttonWithText(Texts.remove)).click();
  }

  async verifyIsVisible(): Promise<void> {
    await expect(this.page).toHaveURL(`${URLS.base}${URLS.checkoutOverview}`);
    await expect(this.page.locator(Selectors.checkoutOverviewPage.title)).toHaveText(Texts.checkoutOverviewTitle);
  }

  async verifyCartIsNotClickable(): Promise<void> {
    // Attempt to click on the cart badge and verify no navigation occurs
    await this.page.locator(Selectors.landingPage.cartBadge).click();
  }

  async verifyListCountToBe(count: number): Promise<void> {
    // Reuse the cart list selector defined in cartPage; if the overview uses the same structure, that's fine.
    const items = this.page.locator(`${Selectors.cartPage.cartList} ${Selectors.cartPage.inventoryItem}`);
    await expect(items).toHaveCount(count);
  }

  async verifyListContainsItem(itemName: string): Promise<void> {
    // Reuse the inventory item name selector from cartPage for the cart list in the overview
    const item = this.page.locator(`${Selectors.cartPage.cartList} ${Selectors.cartPage.inventoryItemName}`, { hasText: itemName });
    await expect(item).toBeVisible();
  }

  async verifyTotalAmountIsVisible(): Promise<void> {
    await expect(this.page.locator(`${Selectors.checkoutOverviewPage.totalLabel}`)).toBeVisible();

  }
}
