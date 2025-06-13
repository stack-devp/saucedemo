import dotenv from 'dotenv';
import path from 'path';

// Load environment-specific config
const env = process.env.NODE_ENV || 'dev';
const envFile = `.env.${env}`;

// Try to load environment-specific file first, then fall back to .env
dotenv.config({ path: path.resolve(process.cwd(), envFile) });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const config = {
  baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
  timeout: parseInt(process.env.TEST_TIMEOUT || '30000'),
  retryCount: parseInt(process.env.RETRY_COUNT || '0'),
  // Force headless in CI environments, otherwise use environment setting
  headless: process.env.CI === 'true' || process.env.HEADLESS === 'true',
  environment: process.env.ENVIRONMENT || 'dev',
  
  // Test credentials
  credentials: {
    standard: {
      username: process.env.TEST_USERNAME || 'standard_user',
      password: process.env.TEST_PASSWORD || 'secret_sauce'
    },
    locked: {
      username: process.env.LOCKED_USER || 'locked_out_user',
      password: process.env.TEST_PASSWORD || 'secret_sauce'
    },
    problem: {
      username: process.env.PROBLEM_USER || 'problem_user',
      password: process.env.TEST_PASSWORD || 'secret_sauce'
    },
    performance: {
      username: process.env.PERFORMANCE_USER || 'performance_glitch_user',
      password: process.env.TEST_PASSWORD || 'secret_sauce'
    }
  }
};

// Ensure base URL ends with /
if (!config.baseUrl.endsWith('/')) {
  config.baseUrl += '/';
}