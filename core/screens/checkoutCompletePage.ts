import { Page, expect } from '@playwright/test';
import { Selectors, Texts } from '../commons/constants';
import { URLS } from '../commons/urls';

export default class CheckoutCompletePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickOnBackToProducts(): Promise<void> {
    await this.page.locator(Selectors.checkoutCompletePage.backToProducts).click();
  }

  async verifyIsVisible(): Promise<void> {
    await expect(this.page).toHaveURL(`${URLS.base}${URLS.checkoutComplete}`);
    await expect(this.page.locator(Selectors.checkoutCompletePage.title)).toHaveText(Texts.checkoutCompleteTitle);
  }
}
