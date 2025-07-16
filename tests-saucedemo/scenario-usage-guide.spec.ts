/**
 * Complete guide showing what happens after building custom scenarios
 * This demonstrates the full lifecycle from scenario creation to execution
 */

import { test, expect } from '@playwright/test';
import { TestScenarioBuilder, TestScenario } from '../core/builders/test-scenario-builder';
import LoginPage from '../core/screens/loginPage';
import LandingPage from '../core/screens/landingPage';
import CartPage from '../core/screens/cartPage';
import CheckoutListPage from '../core/screens/checkoutListPage';
import CheckoutOverviewPage from '../core/screens/checkoutOverviewPage';
import CheckoutCompletePage from '../core/screens/checkoutCompletePage';

test.describe('Scenario Usage Guide', () => {

  test('Step 1: Building a Custom Scenario', async ({ page }) => {
    // STEP 1: Build the scenario (this is what you asked about)
    const customScenario: TestScenario = TestScenarioBuilder.create()
      .withStandardUser()           // Creates a standard user with username/password
      .addCheapestProduct()         // Adds the cheapest product to the scenario
      .expectSuccess()              // Sets expectation that this should succeed
      .withName('My Custom Test')   // Gives it a descriptive name
      .withTags('custom', 'cheapest-product', 'beginner-friendly')
      .withPriority('high')
      .withDescription('A custom scenario for learning purposes')
      .addLoginStep()               // Adds login action to the steps
      .addAddToCartStep()           // Adds add-to-cart action to the steps
      .addCheckoutStep()            // Adds checkout action to the steps
      .build();                     // Actually creates the TestScenario object

    // STEP 2: Inspect what was built (great for learning!)
    console.log('=== SCENARIO DETAILS ===');
    console.log('Name:', customScenario.metadata.name);
    console.log('Description:', customScenario.metadata.description);
    console.log('Priority:', customScenario.metadata.priority);
    console.log('Tags:', customScenario.metadata.tags);
    console.log('Expected Outcome:', customScenario.expectedOutcome);
    
    console.log('\n=== USER DETAILS ===');
    console.log('Username:', customScenario.user.username);
    console.log('Password:', customScenario.user.password);
    console.log('First Name:', customScenario.user.firstName);
    console.log('Last Name:', customScenario.user.lastName);
    console.log('Postal Code:', customScenario.user.postalCode);
    
    console.log('\n=== PRODUCTS ===');
    customScenario.products.forEach((product, index) => {
      console.log(`Product ${index + 1}:`, product.name, '-', `$${product.price}`);
    });
    
    console.log('\n=== STEPS TO EXECUTE ===');
    customScenario.steps.forEach((step, index) => {
      console.log(`Step ${index + 1}:`, step.action, '→', step.expectedResult);
    });

    // STEP 3: Execute the scenario (this is the main part!)
    await executeScenario(page, customScenario);
  });

  test('Step 2: Multiple Scenarios with Different Configurations', async ({ page }) => {
    // Build different scenarios to show flexibility
    const scenarios = [
      // Scenario 1: Quick smoke test
      TestScenarioBuilder.create()
        .withStandardUser()
        .addRandomProduct()
        .expectSuccess()
        .withName('Quick Smoke Test')
        .withTags('smoke', 'quick')
        .withPriority('critical')
        .addLoginStep()
        .addAddToCartStep()
        .addCheckoutStep()
        .build(),

      // Scenario 2: Expensive product test
      TestScenarioBuilder.create()
        .withStandardUser()
        .addMostExpensiveProduct()
        .expectSuccess()
        .withName('Expensive Product Purchase')
        .withTags('regression', 'expensive')
        .withPriority('medium')
        .addLoginStep()
        .addAddToCartStep()
        .addCheckoutStep()
        .build(),

      // Scenario 3: Problem user scenario
      TestScenarioBuilder.create()
        .withProblemUser()
        .addRandomProduct()
        .expectFailure()  // We expect this to fail!
        .withName('Problem User Test')
        .withTags('negative', 'edge-case')
        .withPriority('low')
        .addLoginStep()
        .addAddToCartStep()
        .build()
    ];

    // Execute each scenario
    for (const scenario of scenarios) {
      console.log(`\n🎯 Executing: ${scenario.metadata.name}`);
      
      if (scenario.expectedOutcome === 'failure') {
        // For scenarios expected to fail, we handle differently
        try {
          await executeScenario(page, scenario);
          console.log('❌ Scenario was expected to fail but succeeded');
        } catch (error) {
          console.log('✅ Scenario failed as expected');
        }
      } else {
        await executeScenario(page, scenario);
        console.log('✅ Scenario completed successfully');
      }
    }
  });

  test('Step 3: Dynamic Scenario Building Based on Conditions', async ({ page }) => {
    // Build scenarios dynamically based on conditions
    const testEnvironment = 'staging'; // Could come from env vars
    const userType = 'standard'; // Could be parameterized
    
    let scenarioBuilder = TestScenarioBuilder.create()
      .withName('Dynamic Scenario')
      .withDescription(`Built for ${testEnvironment} environment with ${userType} user`);

    // Add user based on type
    if (userType === 'standard') {
      scenarioBuilder = scenarioBuilder.withStandardUser();
    } else if (userType === 'problem') {
      scenarioBuilder = scenarioBuilder.withProblemUser();
    }

    // Add products based on environment
    if (testEnvironment === 'staging') {
      scenarioBuilder = scenarioBuilder
        .addCheapestProduct()  // Use cheaper products in staging
        .withTags('staging', 'cheap-product');
    } else {
      scenarioBuilder = scenarioBuilder
        .addMostExpensiveProduct()  // Use expensive products in production
        .withTags('production', 'expensive-product');
    }

    // Build and execute
    const dynamicScenario = scenarioBuilder
      .expectSuccess()
      .withPriority('high')
      .addLoginStep()
      .addAddToCartStep()
      .addCheckoutStep()
      .build();

    console.log(`\n🔧 Dynamic scenario built for ${testEnvironment}:`);
    console.log('Tags:', dynamicScenario.metadata.tags);
    console.log('Product:', dynamicScenario.products[0].name);
    
    await executeScenario(page, dynamicScenario);
  });
});

/**
 * This function shows HOW to execute a built scenario
 * This is the "what happens after building" part you asked about!
 */
async function executeScenario(page: any, scenario: TestScenario): Promise<void> {
  // Initialize all the page objects we need
  const loginPage = new LoginPage(page);
  const landingPage = new LandingPage(page);
  const cartPage = new CartPage(page);
  const checkoutListPage = new CheckoutListPage(page);
  const checkoutOverviewPage = new CheckoutOverviewPage(page);
  const checkoutCompletePage = new CheckoutCompletePage(page);

  // Navigate to the starting page
  await page.goto('/');

  // Execute each step in the scenario
  for (const step of scenario.steps) {
    console.log(`  🔄 Executing: ${step.action}`);
    
    switch (step.action) {
      case 'login':
        await loginPage.login(scenario.user.username, scenario.user.password);
        await expect(page).toHaveURL(/.*inventory/);
        console.log(`    ✅ Logged in as ${scenario.user.username}`);
        break;

      case 'addToCart':
        const productName = step.target || scenario.products[0]?.name;
        await landingPage.addItemToCart(productName);
        console.log(`    ✅ Added ${productName} to cart`);
        break;

      case 'checkout':
        // Navigate to cart
        await landingPage.clickOnCart();
        console.log(`    🛒 Navigated to cart`);
        
        // Proceed to checkout
        await cartPage.clickOnCheckout();
        console.log(`    📝 Started checkout process`);
        
        // Fill user details
        await checkoutListPage.fillUserDetails(
          scenario.user.firstName,
          scenario.user.lastName,
          scenario.user.postalCode
        );
        await checkoutListPage.clickOnContinue();
        console.log(`    👤 Filled user details`);
        
        // Complete the order
        await checkoutOverviewPage.clickOnContinue();
        console.log(`    🎉 Completed order`);
        
        // Verify completion if expected to succeed
        if (scenario.expectedOutcome === 'success') {
          await checkoutCompletePage.verifyIsVisible();
          console.log(`    ✅ Order completed successfully!`);
        }
        break;

      default:
        console.log(`    ⚠️  Unknown step: ${step.action}`);
    }
  }
}