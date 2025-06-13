/**
 * Test data factories for creating consistent test data
 * Follows the Factory pattern for scalable test data management
 */

export interface User {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  postalCode: string;
  email?: string;
}

export interface Product {
  name: string;
  price: number;
  description: string;
  id: string;
}

export class UserFactory {
  private static readonly DEFAULT_PASSWORD = 'secret_sauce';

  static createStandardUser(overrides: Partial<User> = {}): User {
    return {
      username: 'standard_user',
      password: this.DEFAULT_PASSWORD,
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '12345',
      email: 'john.doe@example.com',
      ...overrides
    };
  }

  static createProblemUser(overrides: Partial<User> = {}): User {
    return {
      username: 'problem_user',
      password: this.DEFAULT_PASSWORD,
      firstName: 'Problem',
      lastName: 'User',
      postalCode: '54321',
      email: 'problem.user@example.com',
      ...overrides
    };
  }

  static createPerformanceUser(overrides: Partial<User> = {}): User {
    return {
      username: 'performance_glitch_user',
      password: this.DEFAULT_PASSWORD,
      firstName: 'Performance',
      lastName: 'Glitch',
      postalCode: '67890',
      email: 'performance.glitch@example.com',
      ...overrides
    };
  }

  static createLockedUser(overrides: Partial<User> = {}): User {
    return {
      username: 'locked_out_user',
      password: this.DEFAULT_PASSWORD,
      firstName: 'Locked',
      lastName: 'User',
      postalCode: '99999',
      email: 'locked.user@example.com',
      ...overrides
    };
  }

  static createRandomUser(overrides: Partial<User> = {}): User {
    const randomId = Math.random().toString(36).substring(7);
    return {
      username: `user_${randomId}`,
      password: this.DEFAULT_PASSWORD,
      firstName: `FirstName_${randomId}`,
      lastName: `LastName_${randomId}`,
      postalCode: Math.floor(Math.random() * 99999).toString().padStart(5, '0'),
      email: `user_${randomId}@example.com`,
      ...overrides
    };
  }
}

export class ProductFactory {
  private static readonly PRODUCTS: Product[] = [
    {
      id: 'sauce-labs-backpack',
      name: 'Sauce Labs Backpack',
      price: 29.99,
      description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.'
    },
    {
      id: 'sauce-labs-bike-light',
      name: 'Sauce Labs Bike Light',
      price: 9.99,
      description: 'A red light isn\'t the desired state in testing but it sure helps when riding your bike at night.'
    },
    {
      id: 'sauce-labs-bolt-t-shirt',
      name: 'Sauce Labs Bolt T-Shirt',
      price: 15.99,
      description: 'Get your testing superhero on with the Sauce Labs bolt T-shirt.'
    },
    {
      id: 'sauce-labs-fleece-jacket',
      name: 'Sauce Labs Fleece Jacket',
      price: 49.99,
      description: 'It\'s not every day that you come across a midweight quarter-zip fleece jacket.'
    },
    {
      id: 'sauce-labs-onesie',
      name: 'Sauce Labs Onesie',
      price: 7.99,
      description: 'Rib snap infant onesie for the junior automation engineer in development.'
    },
    {
      id: 'test-allthethings-t-shirt-red',
      name: 'Test.allTheThings() T-Shirt (Red)',
      price: 15.99,
      description: 'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard.'
    }
  ];

  static getRandomProduct(): Product {
    const randomIndex = Math.floor(Math.random() * this.PRODUCTS.length);
    return this.PRODUCTS[randomIndex]!;
  }

  static getProductByName(name: string): Product | undefined {
    return this.PRODUCTS.find(product => product.name === name);
  }

  static getCheapestProduct(): Product {
    return this.PRODUCTS.reduce((cheapest, current) => 
      current.price < cheapest.price ? current : cheapest
    );
  }

  static getMostExpensiveProduct(): Product {
    return this.PRODUCTS.reduce((expensive, current) => 
      current.price > expensive.price ? current : expensive
    );
  }

  static getAllProducts(): Product[] {
    return [...this.PRODUCTS];
  }

  static getProductsByPriceRange(min: number, max: number): Product[] {
    return this.PRODUCTS.filter(product => 
      product.price >= min && product.price <= max
    );
  }
}