import { Page, expect } from '@playwright/test';
import { Selectors, Texts, buttonWithText } from '../commons/constants';
import { URLS } from '../commons/urls';
import { SortBy } from '../commons/sort.enum';

export default class ProductDetailsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickOnCart(): Promise<void> {
    await this.page.locator(Selectors.productDetails.cartBadge).click();
  }

  async addItemToCart(itemName: string): Promise<void> {
    const productContainer = this.page.locator(Selectors.productDetails.inventoryItem, { hasText: itemName });
    await productContainer.locator(buttonWithText(Texts.addToCart)).click();
  }

  async verifyIsVisible(): Promise<void> {
    await this.page.locator(Selectors.productDetails.backToProducts).isVisible();
  }

  async verifyRemoveButtonIsVisible(itemName: string): Promise<void> {
    const productContainer = this.page.locator(Selectors.productDetails.inventoryItem, { hasText: itemName });
    await expect(productContainer.locator(buttonWithText(Texts.remove))).toBeVisible();
  }

  async verifyItemsInTheCartToBe(expectedCount: number): Promise<void> {
    const cartBadgeLocator = this.page.locator(Selectors.productDetails.cartBadge);
    const cartCountText = await cartBadgeLocator.innerText();
    const cartCount = parseInt(cartCountText, 10);
    expect(cartCount).toEqual(expectedCount);
  }

}
