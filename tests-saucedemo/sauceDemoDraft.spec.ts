// import { test, expect } from '@playwright/test';
// import LoginPage from "../core/screens/login_page"
// import LandingPage from "../core/screens/landing_page"
// import CartPage from "../core/screens/cart_page"
// import { SortBy } from '../core/commons/Sort.enum';
// import CheckoutListPage from '../core/screens/checkout_list_page';
// import CheckoutOverviewPage from '../core/screens/checkout_overview_page';
// import CheckoutCompletePage from '../core/screens/checkout_complete_page';

// // create a git repository on github
// // create a folder on local system
// // create an empty npm project
// // install playwright into that project
// // add, commit and push to the remote repo

// // understand the requirement
// // write a test plan
// // outline project structure
// // implement the test plan using
//     // POM
//     // data class
//     // constants class
//     // e2e tests
//     // Fixtures
//     // auto wait features
//     // use good, resilient selectors, avoid xpath and css selectors
//     // handle dynamic locaters using playwrights locators
//     // cover auth, shopping flow, edge cases
//     // network intercepting and mocking
//     // parallel executions
    
    
// test('User can login successfully and land on landing page', async ({ page }) => {

//   const loginPage = new LoginPage(page);

//   await page.goto('https://www.saucedemo.com/');

//   await loginPage.login("standard_user", "secret_sauce")

//   await page.waitForURL('https://www.saucedemo.com/inventory.html');
  
//   await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

//   await expect(page.locator('[data-test="title"]')).toHaveText('Products');
// });


// test('User can login, sort by price (low to high)', async ({ page }) => {

//   const loginPage = new LoginPage(page);
//   const landingPage = new LandingPage(page);

//   await page.goto('https://www.saucedemo.com/');

//   await loginPage.login("standard_user", "secret_sauce")

//   await page.waitForURL('https://www.saucedemo.com/inventory.html');
  
//   await landingPage.verifyIsVisible()

//   await landingPage.sortList(SortBy.price_low_to_high)

//   await landingPage.verifyListIsSorted(SortBy.price_low_to_high)

// });

// test('User can login, sort by price (low to high), add item to the cart', async ({ page }) => {

//   const loginPage = new LoginPage(page);
//   const landingPage = new LandingPage(page);

//   await page.goto('https://www.saucedemo.com/');

//   await loginPage.login("standard_user", "secret_sauce")

//   await page.waitForURL('https://www.saucedemo.com/inventory.html');
  
//   await landingPage.verifyIsVisible()

//   await landingPage.sortList(SortBy.price_low_to_high)

//   await landingPage.verifyListIsSorted(SortBy.price_low_to_high)

//   await landingPage.addItemToCart('Sauce Labs Backpack');

//   await landingPage.verifyRemoveButtonIsVisible('Sauce Labs Backpack');

//   await landingPage.verifyItemsInTheCartToBe(1);

// });



// // test('User can login, sort by price (low to high), add item to the cart, go to checkout page, remove item, validate checkout button', async ({ page }) => {

// //   const loginPage = new LoginPage(page);
// //   const landingPage = new LandingPage(page);
// //   const cartPage = new CartPage(page);

// //   await page.goto('https://www.saucedemo.com/');

// //   await loginPage.login("standard_user", "secret_sauce")

// //   await page.waitForURL('https://www.saucedemo.com/inventory.html');
  
// //   await landingPage.verifyIsVisible()

// //   await landingPage.sortList(SortBy.price_low_to_high)

// //   await landingPage.verifyListIsSorted(SortBy.price_low_to_high)

// //   await landingPage.addItemToCart('Sauce Labs Backpack');

// //   await landingPage.verifyRemoveButtonIsVisible('Sauce Labs Backpack');

// //   await landingPage.verifyItemsInTheCartToBe(1);

// //   await landingPage.clickOnCart();

// //   await cartPage.verifyIsVisible()

// //   // await checkoutPage.verifyCartIsNotClickable()

// //   await cartPage.verifyListCountToBe(1)

// //   await cartPage.verifyListContainsItem('Sauce Labs Backpack')

// //   // remove item
// //   await cartPage.removeItemFromCart('Sauce Labs Backpack');

// //   // verify it is removed
// //   await cartPage.verifyListCountToBe(0)

// //   // verify Checkout button is disabled
// //   await cartPage.verifyCheckoutButtonIsDisabled()
// //   // 
  
// // });

// test('User can login, sort by price (low to high), add item to the cart, go to checkout page', async ({ page }) => {

//   const loginPage = new LoginPage(page);
//   const landingPage = new LandingPage(page);
//   const cartPage = new CartPage(page);
//   const checkoutListPage = new CheckoutListPage(page);

//   await page.goto('https://www.saucedemo.com/');

//   await loginPage.login("standard_user", "secret_sauce")

//   await page.waitForURL('https://www.saucedemo.com/inventory.html');
  
//   await landingPage.verifyIsVisible()

//   await landingPage.sortList(SortBy.price_low_to_high)

//   await landingPage.verifyListIsSorted(SortBy.price_low_to_high)

//   await landingPage.addItemToCart('Sauce Labs Backpack');

//   await landingPage.verifyRemoveButtonIsVisible('Sauce Labs Backpack');

//   await landingPage.verifyItemsInTheCartToBe(1);

//   await landingPage.clickOnCart();

//   await cartPage.verifyIsVisible()

//   // await checkoutPage.verifyCartIsNotClickable()

//   await cartPage.verifyListCountToBe(1)

//   await cartPage.verifyListContainsItem('Sauce Labs Backpack')

//   // navigate to checkout page
//   await cartPage.clickOnCheckout()

//   await checkoutListPage.verifyIsVisible()

//   await checkoutListPage.fillUserDetails('Shubha', 'Desai', '2146')

//   await checkoutListPage.clickOnContinue()

//   // test add to cart, logout and login to check the cart value
//   // assume we are testing more functional than UI values
  
// });


// test('User can login, sort by price (low to high), add item to the cart, go to checkout page, continue to overview page', async ({ page }) => {

//   const loginPage = new LoginPage(page);
//   const landingPage = new LandingPage(page);
//   const cartPage = new CartPage(page);
//   const checkoutListPage = new CheckoutListPage(page);
//   const checkoutOverviewPage = new CheckoutOverviewPage(page);

//   await page.goto('https://www.saucedemo.com/');

//   await loginPage.login("standard_user", "secret_sauce")

//   await page.waitForURL('https://www.saucedemo.com/inventory.html');
  
//   await landingPage.verifyIsVisible()

//   await landingPage.sortList(SortBy.price_low_to_high)

//   await landingPage.verifyListIsSorted(SortBy.price_low_to_high)

//   await landingPage.addItemToCart('Sauce Labs Backpack');

//   await landingPage.verifyRemoveButtonIsVisible('Sauce Labs Backpack');

//   await landingPage.verifyItemsInTheCartToBe(1);

//   await landingPage.clickOnCart();

//   await cartPage.verifyIsVisible()

//   // await checkoutPage.verifyCartIsNotClickable()

//   await cartPage.verifyListCountToBe(1)

//   await cartPage.verifyListContainsItem('Sauce Labs Backpack')

//   // navigate to checkout page
//   await cartPage.clickOnCheckout()

//   await checkoutListPage.verifyIsVisible()

//   await checkoutListPage.fillUserDetails('Shubha', 'Desai', '2146')

//   await checkoutListPage.clickOnContinue()

//   await checkoutOverviewPage.verifyIsVisible()

//   await checkoutOverviewPage.verifyListCountToBe(1)

//   await checkoutOverviewPage.verifyListContainsItem('Sauce Labs Backpack')

//   // test add to cart, logout and login to check the cart value
//   // assume we are testing more functional than UI values
//   // fixtures
//   // mocks
  
// });

// test('User can login, sort by price (low to high), add item to the cart, go to checkout page, continue to overview page, continue to final page', async ({ page }) => {

//   const loginPage = new LoginPage(page);
//   const landingPage = new LandingPage(page);
//   const cartPage = new CartPage(page);
//   const checkoutListPage = new CheckoutListPage(page);
//   const checkoutOverviewPage = new CheckoutOverviewPage(page);
//   const checkoutCompletePage = new CheckoutCompletePage(page);

//   await page.goto('https://www.saucedemo.com/');

//   await loginPage.login("standard_user", "secret_sauce")

//   // await page.waitForURL('https://www.saucedemo.com/inventory.html');
  
//   await landingPage.verifyIsVisible()

//   await landingPage.sortList(SortBy.price_low_to_high)

//   await landingPage.verifyListIsSorted(SortBy.price_low_to_high)

//   await landingPage.addItemToCart('Sauce Labs Backpack');

//   await landingPage.verifyRemoveButtonIsVisible('Sauce Labs Backpack');

//   await landingPage.verifyItemsInTheCartToBe(1);

//   await landingPage.clickOnCart();

//   await cartPage.verifyIsVisible()

//   // await checkoutPage.verifyCartIsNotClickable()

//   await cartPage.verifyListCountToBe(1)

//   await cartPage.verifyListContainsItem('Sauce Labs Backpack')

//   // navigate to checkout page
//   await cartPage.clickOnCheckout()

//   await checkoutListPage.verifyIsVisible()

//   await checkoutListPage.fillUserDetails('Shubha', 'Desai', '2146')

//   await checkoutListPage.clickOnContinue()

//   await checkoutOverviewPage.verifyIsVisible()

//   await checkoutOverviewPage.verifyListCountToBe(1)

//   await checkoutOverviewPage.verifyListContainsItem('Sauce Labs Backpack')

//   await checkoutOverviewPage.clickOnContinue()

//   await checkoutCompletePage.verifyIsVisible()

//   await checkoutCompletePage.clickOnBackToProducts()

//   await landingPage.verifyIsVisible()

//   // test add to cart, logout and login to check the cart value
//   // assume we are testing more functional than UI values
//   // fixtures
//   // mocks
  
// });


