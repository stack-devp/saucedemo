import { expect, Locator, Page } from '@playwright/test';

/**
 * Custom test utilities for enhanced assertions and common operations
 */

export class TestHelpers {
  /**
   * Wait for an element to be visible and stable before interacting
   */
  static async waitForStableElement(locator: Locator, timeout = 5000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.waitFor({ state: 'attached', timeout });
  }

  /**
   * Enhanced click that ensures element is ready
   */
  static async safeClick(locator: Locator): Promise<void> {
    await this.waitForStableElement(locator);
    await locator.click();
  }

  /**
   * Enhanced fill that clears field first
   */
  static async safeFill(locator: Locator, value: string): Promise<void> {
    await this.waitForStableElement(locator);
    await locator.clear();
    await locator.fill(value);
  }

  /**
   * Wait for page to be fully loaded
   */
  static async waitForPageLoad(page: Page): Promise<void> {
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');
  }

  /**
   * Take screenshot with timestamp
   */
  static async takeTimestampedScreenshot(page: Page, name: string): Promise<Buffer> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    return await page.screenshot({ 
      path: `test-results/screenshots/${name}-${timestamp}.png`,
      fullPage: true 
    });
  }

  /**
   * Retry operation with exponential backoff
   */
  static async retryOperation<T>(
    operation: () => Promise<T>,
    maxRetries = 3,
    baseDelay = 1000
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        if (attempt === maxRetries) break;
        
        const delay = baseDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw lastError!;
  }
}

/**
 * Custom assertions for enhanced test verification
 */
export class CustomAssertions {
  /**
   * Assert URL contains specific path
   */
  static async expectUrlToContain(page: Page, path: string): Promise<void> {
    await expect(page).toHaveURL(new RegExp(path));
  }

  /**
   * Assert element has specific CSS property
   */
  static async expectElementToHaveCSS(
    locator: Locator, 
    property: string, 
    value: string
  ): Promise<void> {
    await expect(locator).toHaveCSS(property, value);
  }

  /**
   * Assert cart count matches expected value
   */
  static async expectCartCount(cartBadge: Locator, expectedCount: number): Promise<void> {
    if (expectedCount === 0) {
      await expect(cartBadge).not.toBeVisible();
    } else {
      await expect(cartBadge).toBeVisible();
      await expect(cartBadge).toHaveText(expectedCount.toString());
    }
  }

  /**
   * Assert page loads within performance threshold
   */
  static async expectPageLoadTime(page: Page, maxLoadTime = 3000): Promise<void> {
    const startTime = Date.now();
    await TestHelpers.waitForPageLoad(page);
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(maxLoadTime);
  }

  /**
   * Assert no console errors on page
   */
  static async expectNoConsoleErrors(page: Page): Promise<void> {
    const consoleErrors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Wait a bit to catch any errors
    await page.waitForTimeout(1000);
    
    expect(consoleErrors).toHaveLength(0);
  }
}