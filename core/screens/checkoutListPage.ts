import { Page, expect } from '@playwright/test';
import { URLS } from '../commons/urls';
import { Selectors, Texts } from '../commons/constants';

export default class CheckoutListPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillUserDetails(firstName: string, lastName: string, zipCode: string): Promise<void> {
    await this.page.fill(Selectors.checkoutListPage.firstName, firstName);
    await this.page.fill(Selectors.checkoutListPage.lastName, lastName);
    await this.page.fill(Selectors.checkoutListPage.postalCode, zipCode);
  }

  async clickOnContinue(): Promise<void> {
    await this.page.locator(Selectors.checkoutListPage.continueButton).click();
  }

  async verifyIsVisible(): Promise<void> {
    await expect(this.page).toHaveURL(`${URLS.base}${URLS.checkoutList}`);
    await expect(this.page.locator(Selectors.checkoutListPage.title)).toHaveText(Texts.checkoutListTitle);
  }
}
