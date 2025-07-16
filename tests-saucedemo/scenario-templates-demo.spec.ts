/**
 * Demo test file showcasing ScenarioTemplates usage
 * This demonstrates how to use the pre-built scenario templates
 */

import { test, expect } from '@playwright/test';
import { ScenarioTemplates } from '../core/builders/test-scenario-builder';
import LoginPage from '../core/screens/loginPage';
import LandingPage from '../core/screens/landingPage';
import CartPage from '../core/screens/cartPage';
import CheckoutListPage from '../core/screens/checkoutListPage';
import CheckoutOverviewPage from '../core/screens/checkoutOverviewPage';
import CheckoutCompletePage from '../core/screens/checkoutCompletePage';

test.describe('ScenarioTemplates Demo', () => {
  
  test('Demo: Happy Path Purchase using ScenarioTemplates', async ({ page }) => {
    // Get the pre-built scenario
    const scenario = ScenarioTemplates.happyPathPurchase();
    
    console.log(`Running scenario: ${scenario.metadata.name}`);
    console.log(`Description: ${scenario.metadata.description}`);
    console.log(`Tags: ${scenario.metadata.tags.join(', ')}`);
    console.log(`Priority: ${scenario.metadata.priority}`);
    console.log(`Expected outcome: ${scenario.expectedOutcome}`);
    console.log(`User: ${scenario.user.username}`);
    console.log(`Products: ${scenario.products.map(p => p.name).join(', ')}`);
    
    // Initialize page objects
    const loginPage = new LoginPage(page);
    const landingPage = new LandingPage(page);
    const cartPage = new CartPage(page);
    const checkoutListPage = new CheckoutListPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);
    
    // Navigate to the application
    await page.goto('/');
    
    // Execute the scenario steps
    for (const step of scenario.steps) {
      console.log(`Executing step: ${step.action} - ${step.expectedResult}`);
      
      switch (step.action) {
        case 'login':
          await loginPage.login(scenario.user.username, scenario.user.password);
          await expect(page).toHaveURL(/.*inventory/);
          break;
          
        case 'addToCart':
          const productName = step.target || scenario.products[0].name;
          await landingPage.addItemToCart(productName);
          await landingPage.verifyItemsInTheCartToBe(1);
          break;
          
        case 'checkout':
          await landingPage.clickOnCart();
          await cartPage.clickOnCheckout();
          await checkoutListPage.fillUserDetails(
            scenario.user.firstName,
            scenario.user.lastName,
            scenario.user.postalCode
          );
          await checkoutListPage.clickOnContinue();
          await checkoutOverviewPage.clickOnContinue();
          
          if (scenario.expectedOutcome === 'success') {
            await checkoutCompletePage.verifyIsVisible();
          }
          break;
      }
    }
    
    console.log(`Scenario completed with expected outcome: ${scenario.expectedOutcome}`);
  });

  test('Demo: Multiple Products Purchase using ScenarioTemplates', async ({ page }) => {
    const scenario = ScenarioTemplates.multipleProductsPurchase();
    
    console.log(`\nRunning scenario: ${scenario.metadata.name}`);
    console.log(`Products count: ${scenario.products.length}`);
    
    const loginPage = new LoginPage(page);
    const landingPage = new LandingPage(page);
    const cartPage = new CartPage(page);
    const checkoutListPage = new CheckoutListPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);
    
    await page.goto('/');
    
    // Login
    await loginPage.login(scenario.user.username, scenario.user.password);
    await expect(page).toHaveURL(/.*inventory/);
    
    // Add multiple products
    let cartCount = 0;
    for (const product of scenario.products) {
      await landingPage.addItemToCart(product.name);
      cartCount++;
      await landingPage.verifyItemsInTheCartToBe(cartCount);
    }
    
    // Complete checkout
    await landingPage.clickOnCart();
    await cartPage.clickOnCheckout();
    await checkoutListPage.fillUserDetails(
      scenario.user.firstName,
      scenario.user.lastName,
      scenario.user.postalCode
    );
    await checkoutListPage.clickOnContinue();
    await checkoutOverviewPage.clickOnContinue();
    
    if (scenario.expectedOutcome === 'success') {
      await checkoutCompletePage.verifyIsVisible();
    }
  });

  test('Demo: Problem User Scenario using ScenarioTemplates', async ({ page }) => {
    const scenario = ScenarioTemplates.problemUserScenario();
    
    console.log(`\nRunning scenario: ${scenario.metadata.name}`);
    console.log(`Expected outcome: ${scenario.expectedOutcome}`);
    
    const loginPage = new LoginPage(page);
    const landingPage = new LandingPage(page);
    
    await page.goto('/');
    
    // Login with problem user
    await loginPage.login(scenario.user.username, scenario.user.password);
    await expect(page).toHaveURL(/.*inventory/);
    
    // Try to add product (this may fail for problem user)
    try {
      await landingPage.addItemToCart(scenario.products[0].name);
      // Problem user might have issues, so we check if expected outcome is failure
      if (scenario.expectedOutcome === 'failure') {
        console.log('Problem user scenario: Issues detected as expected');
      }
    } catch (error) {
      if (scenario.expectedOutcome === 'failure') {
        console.log('Problem user scenario: Failed as expected');
      } else {
        throw error;
      }
    }
  });

  test('Demo: Custom Scenario using TestScenarioBuilder', async ({ page }) => {
    // This shows how to create a custom scenario using the builder
    const { TestScenarioBuilder } = await import('../core/builders/test-scenario-builder');
    
    const customScenario = TestScenarioBuilder.create()
      .withStandardUser()
      .addCheapestProduct()
      .expectSuccess()
      .addLoginStep()
      .addAddToCartStep()
      .addCheckoutStep()
      .withName('Custom Single Product Purchase')
      .withDescription('Custom scenario for purchasing the cheapest product')
      .withTags('custom', 'cheapest-product')
      .withPriority('low')
      .build();
    
    console.log(`\nRunning custom scenario: ${customScenario.metadata.name}`);
    console.log(`Product: ${customScenario.products[0].name} - $${customScenario.products[0].price}`);
    
    const loginPage = new LoginPage(page);
    const landingPage = new LandingPage(page);
    const cartPage = new CartPage(page);
    const checkoutListPage = new CheckoutListPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);
    
    await page.goto('/');
    await loginPage.login(customScenario.user.username, customScenario.user.password);
    await landingPage.addItemToCart(customScenario.products[0].name);
    await landingPage.clickOnCart();
    await cartPage.clickOnCheckout();
    await checkoutListPage.fillUserDetails(
      customScenario.user.firstName,
      customScenario.user.lastName,
      customScenario.user.postalCode
    );
    await checkoutListPage.clickOnContinue();
    await checkoutOverviewPage.clickOnContinue();
    
    await checkoutCompletePage.verifyIsVisible();
  });
});