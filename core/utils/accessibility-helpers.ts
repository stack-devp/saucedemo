/**
 * Accessibility testing utilities using axe-core
 * Helps ensure WCAG compliance and accessibility standards
 */

import { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

export interface AccessibilityOptions {
  tags?: string[];
  exclude?: string[];
  include?: string[];
  rules?: Record<string, { enabled: boolean }>;
}

export class AccessibilityHelpers {
  /**
   * Run comprehensive accessibility scan on current page
   */
  static async scanPage(
    page: Page, 
    options: AccessibilityOptions = {}
  ): Promise<any> {
    const axeBuilder = new AxeBuilder({ page });

    // Configure axe based on options
    if (options.tags) {
      axeBuilder.withTags(options.tags);
    }

    if (options.exclude) {
      axeBuilder.exclude(options.exclude);
    }

    if (options.include) {
      axeBuilder.include(options.include);
    }

    if (options.rules) {
      axeBuilder.withRules(options.rules);
    }

    return await axeBuilder.analyze();
  }

  /**
   * Scan page for WCAG AA compliance
   */
  static async scanForWCAG_AA(page: Page): Promise<any> {
    return await this.scanPage(page, {
      tags: ['wcag2a', 'wcag2aa']
    });
  }

  /**
   * Scan page for common accessibility issues
   */
  static async scanForCommonIssues(page: Page): Promise<any> {
    return await this.scanPage(page, {
      tags: ['best-practice']
    });
  }

  /**
   * Scan specific component or region
   */
  static async scanComponent(
    page: Page, 
    selector: string, 
    options: AccessibilityOptions = {}
  ): Promise<any> {
    return await this.scanPage(page, {
      ...options,
      include: [selector]
    });
  }

  /**
   * Check keyboard navigation accessibility
   */
  static async checkKeyboardNavigation(page: Page): Promise<void> {
    // Focus on first interactive element
    await page.keyboard.press('Tab');
    
    // Get all focusable elements
    const focusableElements = await page.locator(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ).all();

    // Verify each element can be reached via keyboard
    for (let i = 0; i < focusableElements.length; i++) {
      const element = focusableElements[i]!;
      await page.keyboard.press('Tab');
      
      // Check if element is focused
      const isFocused = await element.evaluate(el => 
        document.activeElement === el
      );
      
      if (!isFocused) {
        console.warn(`Element at index ${i} may not be keyboard accessible`);
      }
    }
  }

  /**
   * Check color contrast ratios
   */
  static async checkColorContrast(page: Page): Promise<any> {
    return await this.scanPage(page, {
      tags: ['cat.color']
    });
  }

  /**
   * Check for proper heading structure
   */
  static async checkHeadingStructure(page: Page): Promise<void> {
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    const headingLevels: number[] = [];

    for (const heading of headings) {
      const tagName = await heading.evaluate(el => el.tagName.toLowerCase());
      const level = parseInt(tagName.charAt(1)!);
      headingLevels.push(level);
    }

    // Check for proper heading hierarchy
    for (let i = 1; i < headingLevels.length; i++) {
      const current = headingLevels[i]!;
      const previous = headingLevels[i - 1]!;
      
      if (current > previous + 1) {
        console.warn(`Heading level jump detected: h${previous} to h${current}`);
      }
    }
  }

  /**
   * Check for alternative text on images
   */
  static async checkImageAltText(page: Page): Promise<void> {
    const images = await page.locator('img').all();
    
    for (const image of images) {
      const alt = await image.getAttribute('alt');
      const src = await image.getAttribute('src');
      
      if (!alt) {
        console.warn(`Image missing alt text: ${src}`);
      } else if (alt.trim() === '') {
        console.warn(`Image has empty alt text: ${src}`);
      }
    }
  }

  /**
   * Check form accessibility
   */
  static async checkFormAccessibility(page: Page): Promise<void> {
    // Check for proper labels
    const inputs = await page.locator('input, select, textarea').all();
    
    for (const input of inputs) {
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');
      
      if (id) {
        const label = await page.locator(`label[for="${id}"]`).count();
        if (label === 0 && !ariaLabel && !ariaLabelledBy) {
          console.warn(`Input missing label: ${id}`);
        }
      } else if (!ariaLabel && !ariaLabelledBy) {
        console.warn('Input missing ID and label');
      }
    }
  }

  /**
   * Generate accessibility report
   */
  static generateReport(results: any): string {
    const violations = results.violations || [];
    const passes = results.passes || [];
    const incomplete = results.incomplete || [];

    let report = `
# Accessibility Test Report

## Summary
- ✅ **Passed**: ${passes.length} rules
- ❌ **Violations**: ${violations.length} issues
- ⚠️  **Incomplete**: ${incomplete.length} checks

`;

    if (violations.length > 0) {
      report += `## Violations\n\n`;
      violations.forEach((violation: any, index: number) => {
        report += `### ${index + 1}. ${violation.id}\n`;
        report += `**Impact**: ${violation.impact}\n`;
        report += `**Description**: ${violation.description}\n`;
        report += `**Help**: ${violation.helpUrl}\n`;
        report += `**Affected Elements**: ${violation.nodes.length}\n\n`;
      });
    }

    return report;
  }
}