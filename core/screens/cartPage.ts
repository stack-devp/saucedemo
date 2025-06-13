import { Page, expect } from '@playwright/test';
import { URLS } from '../commons/urls';
import { Texts, Selectors, buttonWithText,  } from '../commons/constants';
export default class CartPage {
  readonly page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  async clickOnContinueShopping(): Promise<void> {
    await this.page.locator(Selectors.cartPage.continueShoppingButton).click();
  }

  async clickOnCheckout(): Promise<void> {
    await this.page.locator(Selectors.cartPage.checkoutButton).click();
  }

  async removeItemFromCart(itemName: string): Promise<void> {
    const productContainer = this.page.locator(Selectors.cartPage.inventoryItem, { hasText: itemName });
    await productContainer.locator(buttonWithText(Texts.remove)).click();
  }

  async verifyIsVisible(): Promise<void> {
    await expect(this.page).toHaveURL(`${URLS.base}${URLS.cart}`);
    await expect(this.page.locator(Selectors.landingPage.title)).toHaveText(Texts.yourCart);
  }

  async verifyCartIsNotClickable(): Promise<void> {
    await this.page.locator(Selectors.cartPage.cartBadge).click();
  }

  async verifyListCountToBe(count: number): Promise<void> {
    const items = this.page.locator(`${Selectors.cartPage.cartList} ${Selectors.cartPage.inventoryItem}`);
    await expect(items).toHaveCount(count);
  }

  async verifyListContainsItem(itemName: string): Promise<void> {
    const item = this.page.locator(`${Selectors.cartPage.cartList} ${Selectors.cartPage.inventoryItemName}`, { hasText: itemName });
    await expect(item).toBeVisible();
  }

  async verifyCheckoutButtonIsDisabled(): Promise<void> {
    const currentURL = this.page.url();
    await this.page.locator(Selectors.cartPage.checkoutButton).click();
    await expect(this.page).toHaveURL(currentURL);
  }
}
