/**
 * Test scenario builder for creating complex test flows
 * Implements the Builder pattern for flexible test composition
 */

import { User, Product, UserFactory, ProductFactory } from '../factories/user-factory';

export interface TestScenario {
  user: User;
  products: Product[];
  expectedOutcome: 'success' | 'failure';
  steps: TestStep[];
  metadata: {
    name: string;
    description: string;
    tags: string[];
    priority: 'low' | 'medium' | 'high' | 'critical';
  };
}

export interface TestStep {
  action: string;
  target?: string;
  expectedResult: string;
  timeout?: number;
}

export class TestScenarioBuilder {
  private scenario: Partial<TestScenario> = {
    products: [],
    steps: [],
    metadata: {
      name: '',
      description: '',
      tags: [],
      priority: 'medium'
    }
  };

  static create(): TestScenarioBuilder {
    return new TestScenarioBuilder();
  }

  withUser(user: User): TestScenarioBuilder {
    this.scenario.user = user;
    return this;
  }

  withStandardUser(): TestScenarioBuilder {
    this.scenario.user = UserFactory.createStandardUser();
    return this;
  }

  withProblemUser(): TestScenarioBuilder {
    this.scenario.user = UserFactory.createProblemUser();
    return this;
  }

  withRandomUser(): TestScenarioBuilder {
    this.scenario.user = UserFactory.createRandomUser();
    return this;
  }

  addProduct(product: Product): TestScenarioBuilder {
    this.scenario.products!.push(product);
    return this;
  }

  addRandomProduct(): TestScenarioBuilder {
    this.scenario.products!.push(ProductFactory.getRandomProduct());
    return this;
  }

  addCheapestProduct(): TestScenarioBuilder {
    this.scenario.products!.push(ProductFactory.getCheapestProduct());
    return this;
  }

  addMostExpensiveProduct(): TestScenarioBuilder {
    this.scenario.products!.push(ProductFactory.getMostExpensiveProduct());
    return this;
  }

  expectSuccess(): TestScenarioBuilder {
    this.scenario.expectedOutcome = 'success';
    return this;
  }

  expectFailure(): TestScenarioBuilder {
    this.scenario.expectedOutcome = 'failure';
    return this;
  }

  addStep(step: TestStep): TestScenarioBuilder {
    this.scenario.steps!.push(step);
    return this;
  }

  addLoginStep(): TestScenarioBuilder {
    this.scenario.steps!.push({
      action: 'login',
      expectedResult: 'User should be redirected to inventory page',
      timeout: 5000
    });
    return this;
  }

  addAddToCartStep(productName?: string): TestScenarioBuilder {
    this.scenario.steps!.push({
      action: 'addToCart',
      target: productName || this.scenario.products![0]?.name,
      expectedResult: 'Product should be added to cart with updated count',
      timeout: 3000
    });
    return this;
  }

  addCheckoutStep(): TestScenarioBuilder {
    this.scenario.steps!.push({
      action: 'checkout',
      expectedResult: 'Order should be completed successfully',
      timeout: 10000
    });
    return this;
  }

  withMetadata(metadata: Partial<TestScenario['metadata']>): TestScenarioBuilder {
    this.scenario.metadata = { ...this.scenario.metadata!, ...metadata };
    return this;
  }

  withName(name: string): TestScenarioBuilder {
    this.scenario.metadata!.name = name;
    return this;
  }

  withDescription(description: string): TestScenarioBuilder {
    this.scenario.metadata!.description = description;
    return this;
  }

  withTags(...tags: string[]): TestScenarioBuilder {
    this.scenario.metadata!.tags.push(...tags);
    return this;
  }

  withPriority(priority: TestScenario['metadata']['priority']): TestScenarioBuilder {
    this.scenario.metadata!.priority = priority;
    return this;
  }

  build(): TestScenario {
    if (!this.scenario.user) {
      throw new Error('User is required for test scenario');
    }

    if (!this.scenario.expectedOutcome) {
      throw new Error('Expected outcome is required for test scenario');
    }

    return this.scenario as TestScenario;
  }
}

/**
 * Pre-built scenario templates for common test cases
 */
export class ScenarioTemplates {
  static happyPathPurchase(): TestScenario {
    return TestScenarioBuilder.create()
      .withStandardUser()
      .addRandomProduct()
      .expectSuccess()
      .addLoginStep()
      .addAddToCartStep()
      .addCheckoutStep()
      .withName('Happy Path Purchase')
      .withDescription('Standard user successfully purchases a single product')
      .withTags('smoke', 'happy-path', 'purchase')
      .withPriority('critical')
      .build();
  }

  static multipleProductsPurchase(): TestScenario {
    return TestScenarioBuilder.create()
      .withStandardUser()
      .addCheapestProduct()
      .addMostExpensiveProduct()
      .expectSuccess()
      .addLoginStep()
      .addAddToCartStep()
      .addAddToCartStep()
      .addCheckoutStep()
      .withName('Multiple Products Purchase')
      .withDescription('User purchases multiple products in single transaction')
      .withTags('regression', 'multi-product', 'purchase')
      .withPriority('high')
      .build();
  }

  static problemUserScenario(): TestScenario {
    return TestScenarioBuilder.create()
      .withProblemUser()
      .addRandomProduct()
      .expectFailure()
      .addLoginStep()
      .addAddToCartStep()
      .withName('Problem User Scenario')
      .withDescription('Problem user encounters issues during purchase flow')
      .withTags('negative', 'problem-user', 'edge-case')
      .withPriority('medium')
      .build();
  }

  static emptyCartCheckout(): TestScenario {
    return TestScenarioBuilder.create()
      .withStandardUser()
      .expectFailure()
      .addLoginStep()
      .addStep({
        action: 'attemptCheckout',
        expectedResult: 'Checkout should be prevented with empty cart',
        timeout: 3000
      })
      .withName('Empty Cart Checkout')
      .withDescription('User attempts to checkout with empty cart')
      .withTags('negative', 'validation', 'edge-case')
      .withPriority('medium')
      .build();
  }
}