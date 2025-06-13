# Playwright TypeScript Assessment Project

This project is an end-to-end test automation suite built using [Playwright](https://playwright.dev/) and [TypeScript](https://www.typescriptlang.org/). It validates critical user journeys on e-commerce website (Sauce Demo), focusing on a successful purchase of one of the listed products.

## Project Structure

- **/core/screens/**  
  Contains Page Object Models for various application pages:
  - `LoginPage`
  - `LandingPage`
  - `ProductDetailsPage`
  - `CartPage`
  - `CheckoutListPage`
  - `CheckoutOverviewPage`
  - `CheckoutCompletePage`  

  Each file encapsulates actions and verifications specific to its corresponding page.

- **/commons/**  
  - **Test Data:**  
    Contains files (e.g., `testData.ts`) with credentials, product names, and checkout details. Centralizing test data ensures easier maintenance and updates.
  - **Utilities and Constants:**  
    Centralized selectors and texts are defined in `constants.ts` (e.g., data-test attribute constants) and URL definitions in `urls.ts`.
  - **Enums:**  
    For example, `Sort.enum.ts` is used to handle sorting options.

- **/tests-saucedemo/**  
  Contains end-to-end test specifications (e.g., `purchaseFlowE2E.spec.ts`). These tests simulate real user scenarios by leveraging the Page Objects, test data, and common utilities. The test scenarios are detailed in the `testScenarios.md` file.

- **testScenarios.md**  
  A detailed document outlining:
  - End-to-end test scenarios for a successful product purchase.
  - Clear verification points for each stage of the purchase process.
  - Negative test scenarios (e.g., invalid login, form validation errors).
  - Assumptions made during test development.

## How to Run the Tests

1. **Run Tests:**  
   Ensure you have [Node.js](https://nodejs.org/) installed, then run:
   ```bash
   npx playwright test --project=chromium

## Note to the panelists
    Expect one case to fail
    - End-to-End negative scenarios while purchasing a product › User should not be able to checkout without any items added to the cart
    
## Assumptions
    - The website uses stable data-test attributes for element identification.
    - Playwright’s built-in waiting and assertion mechanisms are sufficient for handling network latency and asynchronous operations.
    - If there are no items in the cart, the user should not be able to proceed to checkout.
    - The user should be able to purchase more than one quantity for a selected product.
    - The focus of the tests is on flow and navigation rather than on verifying exact UI values. Data-test selectors are used instead of relying solely on visible text, though some variations (like button:has-text) are used where appropriate. Dedicated data-test hooks provided by developers ensure consistency throughout the test suite.

## Conclusion
This project demonstrates a production-grade approach to end-to-end testing. Tests are organized using modular Page Object Models, centralized test data, and common utilities. Detailed test scenarios, including negative scenarios, are documented in testScenarios.md to ensure decent coverage of the purchase process.