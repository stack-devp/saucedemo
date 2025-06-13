// tests/e2e/purchaseFlow.spec.ts
import { test, expect } from '../core/commons/fixtures';
import { credentials, productData, checkoutData } from '../core/commons/testData';
import { SortBy } from '../core/commons/sort.enum';
import { URLS } from '../core/commons/urls';

test.describe('End-to-End Successful Purchase Flow of 1 Product', () => {

  test('User should be able to successfully purchase a single product(Sanity + happy flow)', async ({
    page,
    loginPage,
    landingPage,
    cartPage,
    checkoutListPage,
    checkoutOverviewPage,
    checkoutCompletePage
  }) => {

    // Navigate to the base URL
    await page.goto(URLS.base);

    // Login
    await loginPage.login(credentials.username, credentials.password);

    // On the landing page
    await landingPage.verifyIsVisible();

    // Add item to the cart
    await landingPage.addItemToCart(productData.productName);
    await landingPage.verifyRemoveButtonIsVisible(productData.productName);
    await landingPage.verifyItemsInTheCartToBe(1);
    // Click on cart
    await landingPage.clickOnCart();

    // On the cart page
    await cartPage.verifyIsVisible();
    await cartPage.verifyListCountToBe(1);
    await cartPage.verifyListContainsItem(productData.productName);
    await cartPage.clickOnCheckout();

    // On the Checkout Step One Page
    await checkoutListPage.verifyIsVisible();
    await checkoutListPage.fillUserDetails(
      checkoutData.firstName,
      checkoutData.lastName,
      checkoutData.postalCode
    );
    await checkoutListPage.clickOnContinue();

    // On the Checkout Overview Page
    await checkoutOverviewPage.verifyIsVisible();
    await checkoutOverviewPage.verifyListCountToBe(1);
    await checkoutOverviewPage.verifyListContainsItem(productData.productName);
    await checkoutOverviewPage.verifyTotalAmountIsVisible()
    await checkoutOverviewPage.clickOnContinue();

    // On the Checkout Complete Page
    await checkoutCompletePage.verifyIsVisible();
    await checkoutCompletePage.clickOnBackToProducts();
    await landingPage.verifyIsVisible();
  });

  test('User should be able to successfully purchase a single product via product details screen', async ({
    page,
    loginPage,
    landingPage,
    productDetailsPage,
    cartPage,
    checkoutListPage,
    checkoutOverviewPage,
    checkoutCompletePage
  }) => {

    // Navigate to the base URL
    await page.goto(URLS.base);

    // Login
    await loginPage.login(credentials.username, credentials.password);

    // On the landing page
    await landingPage.verifyIsVisible();

    await landingPage.clickOnProduct(productData.productName);

    // products should be visible
    await productDetailsPage.verifyIsVisible()

    // Add item to the cart
    await productDetailsPage.addItemToCart(productData.productName);
    await productDetailsPage.verifyRemoveButtonIsVisible(productData.productName);
    await productDetailsPage.verifyItemsInTheCartToBe(1);
    // Click on cart
    await productDetailsPage.clickOnCart();

    // On the cart page
    await cartPage.verifyIsVisible();
    await cartPage.verifyListCountToBe(1);
    await cartPage.verifyListContainsItem(productData.productName);
    await cartPage.clickOnCheckout();

    // On the Checkout Step One Page
    await checkoutListPage.verifyIsVisible();
    await checkoutListPage.fillUserDetails(
      checkoutData.firstName,
      checkoutData.lastName,
      checkoutData.postalCode
    );
    await checkoutListPage.clickOnContinue();

    // On the Checkout Overview Page
    await checkoutOverviewPage.verifyIsVisible();
    await checkoutOverviewPage.verifyListCountToBe(1);
    await checkoutOverviewPage.verifyListContainsItem(productData.productName);
    await checkoutOverviewPage.verifyTotalAmountIsVisible()
    await checkoutOverviewPage.clickOnContinue();

    // On the Checkout Complete Page
    await checkoutCompletePage.verifyIsVisible();
    await checkoutCompletePage.clickOnBackToProducts();
    await landingPage.verifyIsVisible();
  });

  test('User should be able to successfully purchase a single product after sorting and changing cart items', async ({
    page,
    loginPage,
    landingPage,
    cartPage,
    checkoutListPage,
    checkoutOverviewPage,
    checkoutCompletePage
  }) => {


    // Navigate to the base URL
    await page.goto(URLS.base);

    // Login
    await loginPage.login(credentials.username, credentials.password);

    // On the landing page
    await landingPage.verifyIsVisible();

    // Sort items by Price (low to high)
    await landingPage.sortList(SortBy.price_low_to_high);
    await landingPage.verifyListIsSortedBtPriceAsc();

    // Add item to the cart
    await landingPage.addItemToCart(productData.productName);
    await landingPage.verifyRemoveButtonIsVisible(productData.productName);
    await landingPage.verifyItemsInTheCartToBe(1);
    // Click on cart
    await landingPage.clickOnCart();

    
    // On the cart page
    await cartPage.verifyIsVisible();
    await cartPage.verifyListCountToBe(1);
    await cartPage.verifyListContainsItem(productData.productName);
    // remove item from the cart
    await cartPage.removeItemFromCart(productData.productName)
    await cartPage.verifyListCountToBe(0);

    // Click on continue shopping
    await cartPage.clickOnContinueShopping();

    await landingPage.verifyIsVisible();

    // Add item to the cart
    await landingPage.addItemToCart(productData.productName);
    await landingPage.verifyRemoveButtonIsVisible(productData.productName);
    await landingPage.verifyItemsInTheCartToBe(1);

    // Click on cart
    await landingPage.clickOnCart();
    
    // On the cart page
    await cartPage.verifyIsVisible();
    await cartPage.verifyListCountToBe(1);
    await cartPage.verifyListContainsItem(productData.productName);
    await cartPage.clickOnCheckout();

    // On the Checkout Step One Page
    await checkoutListPage.verifyIsVisible();
    await checkoutListPage.fillUserDetails(
      checkoutData.firstName,
      checkoutData.lastName,
      checkoutData.postalCode
    );
    await checkoutListPage.clickOnContinue();

    // On the Checkout Overview Page
    await checkoutOverviewPage.verifyIsVisible();
    await checkoutOverviewPage.verifyListCountToBe(1);
    await checkoutOverviewPage.verifyListContainsItem(productData.productName);
    await checkoutOverviewPage.verifyTotalAmountIsVisible()
    await checkoutOverviewPage.clickOnContinue();

    // On the Checkout Complete Page
    await checkoutCompletePage.verifyIsVisible();
    await checkoutCompletePage.clickOnBackToProducts();
    await landingPage.verifyIsVisible();
  });

  test('User should be able to successfully purchase a single product after re authenticating', async ({
    page,
    loginPage,
    landingPage,
    cartPage,
    checkoutListPage,
    checkoutOverviewPage,
    checkoutCompletePage
  }) => {

    // Navigate to the base URL
    await page.goto(URLS.base);

    // Login
    await loginPage.login(credentials.username, credentials.password);

    // On the landing page
    await landingPage.verifyIsVisible();

    // Add item to the cart
    await landingPage.addItemToCart(productData.productName);
    await landingPage.verifyRemoveButtonIsVisible(productData.productName);
    await landingPage.verifyItemsInTheCartToBe(1);


    // logout
    await landingPage.logout()
    
    await loginPage.verifyIsVisible();
    await loginPage.login(credentials.username, credentials.password);

    // On the landing page
    await landingPage.verifyIsVisible();

    // Click on cart
    await landingPage.clickOnCart();
    
    // On the cart page
    await cartPage.verifyIsVisible();
    await cartPage.verifyListCountToBe(1);
    await cartPage.verifyListContainsItem(productData.productName);
    await cartPage.clickOnCheckout();

    // On the Checkout Step One Page
    await checkoutListPage.verifyIsVisible();
    await checkoutListPage.fillUserDetails(
      checkoutData.firstName,
      checkoutData.lastName,
      checkoutData.postalCode
    );
    await checkoutListPage.clickOnContinue();

    // On the Checkout Overview Page
    await checkoutOverviewPage.verifyIsVisible();
    await checkoutOverviewPage.verifyListCountToBe(1);
    await checkoutOverviewPage.verifyListContainsItem(productData.productName);
    await checkoutOverviewPage.verifyTotalAmountIsVisible()
    await checkoutOverviewPage.clickOnContinue();

    // On the Checkout Complete Page
    await checkoutCompletePage.verifyIsVisible();
    await checkoutCompletePage.clickOnBackToProducts();
    await landingPage.verifyIsVisible();
  });

});
