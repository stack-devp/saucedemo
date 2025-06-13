import { Page,expect } from '@playwright/test';
import { Selectors, Texts } from '../commons/constants';
import { URLS } from '../commons/urls';

export default class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.locator(Selectors.loginPage.username).fill(username);
    await this.page.locator(Selectors.loginPage.password).fill(password);
    await this.page.getByRole('button', { name: Texts.login }).click();

  }

  async verifyIsVisible(): Promise<void> {
    await expect(this.page).toHaveURL(`${URLS.base}`);
  }

}
