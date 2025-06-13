/**
 * Global setup for Playwright tests
 * Runs once before all tests to prepare the test environment
 */

import { FullConfig } from '@playwright/test';
import { config } from '../commons/config';
import * as fs from 'fs';
import * as path from 'path';

async function globalSetup(config: FullConfig): Promise<void> {
  console.log(`🚀 Starting test suite in ${process.env.NODE_ENV || 'dev'} environment`);
  console.log(`🌐 Base URL: ${config.use?.baseURL}`);
  console.log(`⚡ Workers: ${config.workers}`);
  console.log(`🔄 Retries: ${config.retries}`);

  // Create necessary directories
  const directories = [
    'test-results',
    'test-results/screenshots',
    'test-results/videos',
    'test-results/traces'
  ];

  for (const dir of directories) {
    const dirPath = path.resolve(process.cwd(), dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`📁 Created directory: ${dir}`);
    }
  }

  // Clean previous test artifacts if not in CI
  if (!process.env.CI) {
    const cleanupPaths = [
      'test-results/screenshots',
      'test-results/videos',
      'test-results/traces'
    ];

    for (const cleanupPath of cleanupPaths) {
      const fullPath = path.resolve(process.cwd(), cleanupPath);
      if (fs.existsSync(fullPath)) {
        const files = fs.readdirSync(fullPath);
        for (const file of files) {
          fs.unlinkSync(path.join(fullPath, file));
        }
      }
    }
    console.log('🧹 Cleaned up previous test artifacts');
  }

  // Validate environment configuration
  await validateEnvironment();

  console.log('✅ Global setup completed successfully');
}

async function validateEnvironment(): Promise<void> {
  console.log('🔍 Validating environment configuration...');

  if (!config.baseUrl) {
    throw new Error('BASE_URL is not configured');
  }

  if (!config.credentials.standard.username || !config.credentials.standard.password) {
    throw new Error('Test credentials are not configured');
  }

  // Test if base URL is accessible (basic check)
  try {
    const response = await fetch(config.baseUrl, { 
      method: 'HEAD',
      timeout: 10000 
    });
    
    if (!response.ok) {
      console.warn(`⚠️  Warning: Base URL returned status ${response.status}`);
    } else {
      console.log('✅ Base URL is accessible');
    }
  } catch (error) {
    console.warn(`⚠️  Warning: Could not validate base URL accessibility: ${error}`);
  }

  console.log('✅ Environment validation completed');
}

export default globalSetup;