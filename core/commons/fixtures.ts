import { test as base, Page } from '@playwright/test';
import LoginPage from '../screens/loginPage';
import LandingPage from '../screens/landingPage';
import CartPage from '../screens/cartPage';
import CheckoutListPage from '../screens/checkoutListPage';
import CheckoutOverviewPage from '../screens/checkoutOverviewPage';
import CheckoutCompletePage from '../screens/checkoutCompletePage';
import ProductDetailsPage from '../screens/productDetailsPage';

type MyFixtures = {
  loginPage: LoginPage;
  landingPage: LandingPage;
  productDetailsPage: ProductDetailsPage;
  cartPage: CartPage;
  checkoutListPage: CheckoutListPage;
  checkoutOverviewPage: CheckoutOverviewPage;
  checkoutCompletePage: CheckoutCompletePage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  landingPage: async ({ page }, use) => {
    await use(new LandingPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutListPage: async ({ page }, use) => {
    await use(new CheckoutListPage(page));
  },
  checkoutOverviewPage: async ({ page }, use) => {
    await use(new CheckoutOverviewPage(page));
  },
  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },
  productDetailsPage: async ({ page }, use) => {
    await use(new ProductDetailsPage(page));
  }
});

// Export the test and expect objects for use in your tests.
export { expect } from '@playwright/test';
