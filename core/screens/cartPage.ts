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
    // Check if checkout button is disabled or clicking it shows an error
    const checkoutButton = this.page.locator(Selectors.cartPage.checkoutButton);
    
    // First check if button is disabled
    const isDisabled = await checkoutButton.isDisabled();
    if (isDisabled) {
      return; // Button is disabled as expected
    }
    
    // If button is not disabled, check if clicking proceeds to checkout
    // (SauceDemo allows empty cart checkout, so this test may need adjustment)
    const currentURL = this.page.url();
    await checkoutButton.click();
    
    // For SauceDemo, empty cart checkout actually works, so this assertion will fail
    // This indicates the test scenario needs to be updated to match actual behavior
    const newURL = this.page.url();
    if (newURL !== currentURL) {
      throw new Error('Expected checkout to be prevented with empty cart, but navigation occurred');
    }
  }
}
