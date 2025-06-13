import { Page, expect } from '@playwright/test';
import { Selectors, Texts, buttonWithText } from '../commons/constants';
import { URLS } from '../commons/urls';
import { SortBy } from '../commons/sort.enum';

export default class LandingPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickOnCart(): Promise<void> {
    await this.page.locator(Selectors.landingPage.cartLink).click();

  }

  async sortList(sortBy: SortBy): Promise<void> {
    // Map the SortBy enum to the visible label from our Texts
    const sortLabelMap: { [key in SortBy]: string } = {
      [SortBy.name_a_z]: Texts.sortLabels.nameAtoZ,
      [SortBy.name_z_a]: Texts.sortLabels.nameZtoA,
      [SortBy.price_low_to_high]: Texts.sortLabels.priceLowToHigh,
      [SortBy.price_high_to_low]: Texts.sortLabels.priceHighToLow,
    };

    const label = sortLabelMap[sortBy];
    await this.page.locator(Selectors.landingPage.sortContainer).click();
    await this.page.locator(Selectors.landingPage.sortContainer).selectOption({ label });
  }

  async clickOnProduct(itemName: string): Promise<void> {
    const productContainer = this.page.locator(Selectors.landingPage.inventoryItem, { hasText: itemName });
    await productContainer.locator(Selectors.landingPage.inventoryItemName).click();
  }

  async addItemToCart(itemName: string): Promise<void> {
    const productContainer = this.page.locator(Selectors.landingPage.inventoryItem, { hasText: itemName });
    await productContainer.locator(buttonWithText(Texts.addToCart)).click();
  }

  async verifyIsVisible(): Promise<void> {
    await expect(this.page).toHaveURL(`${URLS.base}${URLS.inventory}`);
    await expect(this.page.locator(Selectors.landingPage.title)).toHaveText(Texts.productsTitle);
  }

  async verifyRemoveButtonIsVisible(itemName: string): Promise<void> {
    const productContainer = this.page.locator(Selectors.landingPage.inventoryItem, { hasText: itemName });
    await expect(productContainer.locator(buttonWithText(Texts.remove))).toBeVisible();
  }

  async verifyListIsSortedBtPriceAsc(): Promise<void> {
    const prices = await this.page.$$eval(
      Selectors.landingPage.inventoryItemPrice,
      elements => elements.map(el => parseFloat(el.textContent?.replace(/[^0-9.]/g, '') || '0'))
    );
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  }

  async verifyItemsInTheCartToBe(expectedCount: number): Promise<void> {
    const cartBadgeLocator = this.page.locator(Selectors.landingPage.cartBadge);
    const cartCountText = await cartBadgeLocator.innerText();
    const cartCount = parseInt(cartCountText, 10);
    expect(cartCount).toEqual(expectedCount);
  }

  async logout(): Promise<void>{
    await this.page.getByRole('button', { name: 'Open Menu' }).click();

    // await this.page.locator(Selectors.landingPage.menu).click();
    await this.page.locator(Selectors.landingPage.logout).click();
  }
}
