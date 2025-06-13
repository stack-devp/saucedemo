# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Playwright TypeScript end-to-end test automation suite for e-commerce testing, specifically targeting the Sauce Demo website. The project uses a Page Object Model (POM) architecture with centralized test data and utilities.

## Environment Setup

### Environment Configuration
The project supports multiple environments through environment files:
- Copy `.env.example` to `.env` for local development
- Use `NODE_ENV` to specify environment: `dev`, `staging`, `prod`
- Environment-specific files: `.env.dev`, `.env.staging`, `.env.prod`

### Environment Variables
- `BASE_URL`: Target application URL
- `TEST_USERNAME/TEST_PASSWORD`: Standard user credentials
- `TEST_TIMEOUT`: Test timeout in milliseconds
- `RETRY_COUNT`: Number of retries on failure
- `HEADLESS`: Run tests in headless mode (true/false)
- `ENVIRONMENT`: Current environment name

## Commands

### Running Tests
- Run all tests: `npx playwright test`
- Run tests on specific browser: `npx playwright test --project=chromium`
- Run tests with specific environment: `NODE_ENV=staging npx playwright test`
- Run tests on all browsers: configured for chromium, firefox, and webkit
- View test reports: Open `playwright-report/index.html` after test execution

### Development
- Install dependencies: `npm install`
- Set up environment: `cp .env.example .env` (then edit values)

## Architecture

### Core Structure
- **`/core/screens/`**: Page Object Models for each application page (LoginPage, LandingPage, ProductDetailsPage, CartPage, etc.)
- **`/core/commons/`**: Shared utilities, constants, test data, and configuration
  - `config.ts`: Environment-aware configuration management
  - `constants.ts`: Centralized selectors using data-test attributes and text constants
  - `testData.ts`: Test credentials, product names, and checkout details
  - `urls.ts`: URL definitions
  - `sort.enum.ts`: Sorting options enum
- **`/core/utils/`**: Advanced testing utilities
  - `test-helpers.ts`: Custom assertions and common operations
  - `accessibility-helpers.ts`: WCAG compliance and accessibility testing
- **`/core/factories/`**: Test data factories for consistent data generation
  - `user-factory.ts`: User and product data factories
- **`/core/builders/`**: Test scenario builders for complex test flows
  - `test-scenario-builder.ts`: Builder pattern for flexible test composition
- **`/core/setup/`**: Global test configuration and setup
  - `global-setup.ts`: Environment validation and test preparation
- **`/tests-saucedemo/`**: Test specifications organized by functionality

### Page Object Pattern
Each page class follows this structure:
- Constructor accepts `Page` object
- Methods for page actions (e.g., `login()`, `addToCart()`)
- Verification methods (e.g., `verifyIsVisible()`)
- Uses centralized selectors from `constants.ts`

### Test Data Strategy
- Test data is centralized in `/core/commons/` files
- Uses data-test attributes for reliable element selection
- Selectors are organized by page in the `Selectors` object
- Text constants are stored in the `Texts` object

### Test Configuration
- Tests are configured to run in `./tests-saucedemo` directory
- Parallel execution enabled
- HTML reporter configured
- Screenshot and trace capture on failures
- Supports multiple browser projects (chromium, firefox, webkit)

## Key Test Scenarios
As documented in `testScenarios.md`:
- Successful single product purchase (multiple variants)
- Product purchase via product details screen
- Purchase flow with sorting and cart modifications
- Purchase flow with re-login
- Negative scenarios (empty cart checkout, quantity validation)

## Production-Grade Features

### Code Quality
- **ESLint & Prettier**: Automated code formatting and linting
- **TypeScript Strict Mode**: Enhanced type safety and error prevention
- **Pre-commit Hooks**: Automated quality checks before commits
- **Comprehensive Scripts**: npm scripts for all common development tasks

### CI/CD Pipeline
- **GitHub Actions**: Automated testing across multiple browsers and environments
- **Parallel Execution**: Optimized test runs using available CPU cores
- **Multiple Reporters**: HTML, JSON, JUnit, and GitHub integration
- **Security Scanning**: npm audit integration
- **Environment-specific Testing**: Separate staging and production test runs

### Advanced Testing Features
- **Custom Test Utilities**: Enhanced assertions and helper methods
- **Test Data Factories**: Consistent and scalable test data generation
- **Scenario Builders**: Flexible test composition using Builder pattern
- **Accessibility Testing**: WCAG compliance checking with axe-core
- **Global Setup**: Environment validation and test preparation
- **Enhanced Reporting**: Multiple output formats with detailed tracing

### Performance & Reliability
- **Parallel Test Execution**: CPU-optimized worker allocation
- **Retry Mechanisms**: Environment-specific retry strategies
- **Enhanced Timeouts**: Granular timeout configuration
- **Video & Screenshot Capture**: Comprehensive debugging artifacts
- **Network Resilience**: HTTP error handling and retry logic

## Known Issues
- One test case is expected to fail: "User should not be able to checkout without any items added to the cart"
- Reset app functionality noted as not working

## Quality Gates
- All tests must pass before deployment
- Code coverage thresholds enforced
- Accessibility standards (WCAG AA) compliance required
- Performance budgets maintained
- Security vulnerabilities addressed