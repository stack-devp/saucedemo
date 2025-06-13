// tests/e2e/purchaseFlow.spec.ts
import { test, expect } from '../core/commons/fixtures';
import { credentials, productData, checkoutData } from '../core/commons/testData';
import { SortBy } from '../core/commons/sort.enum';
import { URLS } from '../core/commons/urls';

test.describe('End-to-End negative scenarios while purchasing a product', () => {

  test('User should not be able to checkout without any items added to the cart', async ({
    page,
    loginPage,
    landingPage,
    cartPage,
    checkoutListPage,
    checkoutOverviewPage,
    checkoutCompletePage
  }) => {

  
    await page.goto(URLS.base);
    await loginPage.login(credentials.username, credentials.password);
    await landingPage.verifyIsVisible();
    await landingPage.clickOnCart();

    // On the cart page
    await cartPage.verifyIsVisible();
    await cartPage.verifyListCountToBe(0);
    await cartPage.verifyCheckoutButtonIsDisabled()
    
  });

});
