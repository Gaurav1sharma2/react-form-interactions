import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3001',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    // Original: 3 tests on Chromium - PARALLEL (2-4 workers)
    {
      name: 'chromium-parallel',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/complete-flow.spec.js',
      fullyParallel: true,
      workers: process.env.CI ? 2 : undefined,
    },
    
    // New Scenario: Same 3 tests on 3 browsers - SEQUENTIAL (1 worker only)
    {
      name: 'chromium-sequential',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**/complete-flow.spec.js',
      fullyParallel: false,
      workers: 1,
    },
    {
      name: 'firefox-sequential',
      use: { ...devices['Desktop Firefox'] },
      testMatch: '**/complete-flow.spec.js',
      fullyParallel: false,
      workers: 1,
    },
    {
      name: 'webkit-sequential',
      use: { ...devices['Desktop Safari'] },
      testMatch: '**/complete-flow.spec.js',
      fullyParallel: false,
      workers: 1,
    },
  ],

  webServer: undefined,
});
